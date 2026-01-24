import { Update, On, Message, InjectBot, Action, Ctx, Start, Command } from 'nestjs-telegraf';
import { Context, Telegraf, Markup } from 'telegraf';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AiTool } from '../common/decorators/ai-tool.decorator';
import { AgentOrchestratorService } from '../ai/services/agent-orchestrator.service';
import { TokenService } from '../llm/token/token.service';

@Update()
@Injectable()
export class TelegramService implements OnModuleInit {
  private readonly logger = new Logger(TelegramService.name);
  private readonly myChatId: string;

  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly agentOrchestrator: AgentOrchestratorService,
    private readonly tokenService: TokenService,
  ) {
    // Trim para evitar que espaços no .env quebrem a comparação
    this.myChatId = this.configService.get<string>('MY_TELEGRAM_CHAT_ID')?.toString().trim() || '';
  }

  async onModuleInit() {
    try {
      await this.bot.telegram.setMyCommands([
        { command: 'start', description: 'Inicia o bot e exibe seu ID' },
        { command: 'help', description: 'Lista de comandos' },
        { command: 'pending', description: 'Usuários aguardando aprovação' },
        { command: 'approved', description: 'Gerenciar usuários ativos' },
        { command: 'rejected', description: 'Lista de usuários recusados' },
      ]);
      this.logger.log('Commands registered.');
    } catch (e) {
      this.logger.error(`Failed to set commands: ${e.message}`);
    }
  }

  private isAdmin(chatId: string | number): boolean {
    return chatId.toString().trim() === this.myChatId;
  }

  private async replySafe(ctx: Context, content: any) {
    const text = typeof content === 'string' ? content : JSON.stringify(content, null, 2);
    await ctx.reply(text || 'Sem resposta.');
  }

  @Start()
  async onStart(ctx: Context) {
    const id = ctx.chat?.id;
    await ctx.reply(`Online. Seu ID: ${id}`);
    if (this.isAdmin(id!)) {
      await ctx.reply('👑 Você é o administrador reconhecido.');
    }
  }

  @Command('help')
  async listHelp(@Ctx() ctx: Context) {
    const chatId = ctx.chat?.id.toString();
    const isMe = this.isAdmin(chatId!);
    
    let msg = "🤖 *Comandos:*\n/start, /help\n";
    if (isMe) {
      msg += "\n*Admin:*\n/pending - Pendentes\n/approved - Ativos\n/rejected - Recusados";
    }
    await ctx.reply(msg, { parse_mode: 'Markdown' });
  }

  @Command('pending')
  async listPending(@Ctx() ctx: Context) {
    const chatId = ctx.chat?.id.toString();
    this.logger.debug(`Command /pending by ${chatId}`);

    if (!this.isAdmin(chatId!)) return ctx.reply("Acesso negado.");

    const users = await this.prisma.contact.findMany({
      where: { isApproved: false, onboardingStep: 'NONE' },
    });

    if (users.length === 0) return ctx.reply("Nenhuma solicitação pendente no momento.");

    await ctx.reply("⏳ *Solicitações Pendentes:*", { parse_mode: 'Markdown' });
    for (const user of users) {
      await ctx.reply(
        `👤 ${user.alias || 'N/A'} (ID: ${user.whatsappId})`,
        Markup.inlineKeyboard([
          Markup.button.callback('Aprovar ✅', `approve_${user.whatsappId}`),
          Markup.button.callback('Recusar ❌', `reject_${user.whatsappId}`),
        ])
      );
    }
  }

  @Command('approved')
  async listApproved(@Ctx() ctx: Context) {
    const chatId = ctx.chat?.id.toString();
    this.logger.debug(`Command /approved by ${chatId}`);

    if (!this.isAdmin(chatId!)) return ctx.reply("Acesso negado.");

    const users = await this.prisma.contact.findMany({
      where: { isApproved: true },
    });

    if (users.length === 0) return ctx.reply("Nenhum usuário aprovado no sistema.");

    await ctx.reply("✅ *Usuários Ativos:*", { parse_mode: 'Markdown' });
    let count = 0;
    for (const user of users) {
      if (user.whatsappId === this.myChatId) continue;
      count++;
      await ctx.reply(
        `🟢 ${user.alias || 'User'} (ID: ${user.whatsappId})`,
        Markup.inlineKeyboard([
          Markup.button.callback('Revogar 🚫', `revoke_${user.whatsappId}`),
        ])
      );
    }

    if (count === 0) await ctx.reply("Apenas você (Admin) está aprovado no momento.");
  }

  @Command('rejected')
  async listRejected(@Ctx() ctx: Context) {
    const chatId = ctx.chat?.id.toString();
    if (!this.isAdmin(chatId!)) return ctx.reply("Acesso negado.");

    const users = await this.prisma.contact.findMany({
      where: { onboardingStep: 'REJECTED' },
    });

    if (users.length === 0) return ctx.reply("Não há usuários na lista de recusados.");

    await ctx.reply("❌ *Usuários Recusados:*", { parse_mode: 'Markdown' });
    for (const user of users) {
      await ctx.reply(
        `🔴 ${user.alias || 'N/A'} (ID: ${user.whatsappId})`,
        Markup.inlineKeyboard([
          Markup.button.callback('Aprovar agora ✅', `approve_${user.whatsappId}`),
        ])
      );
    }
  }

  @On('text')
  async onMessage(@Message('text') text: string, @Ctx() ctx: Context) {
    // Ignorar se for um comando para não duplicar processamento
    if (text.startsWith('/')) return;

    const chatId = ctx.chat?.id.toString();
    const isMe = this.isAdmin(chatId!);

    let contact = await this.prisma.contact.findUnique({ where: { whatsappId: chatId } });

    if (!contact) {
      contact = await this.prisma.contact.create({
        data: {
          whatsappId: chatId!,
          onboardingStep: isMe ? 'NONE' : 'AWAITING_NAME',
          isMe: isMe,
          isApproved: isMe,
          alias: isMe ? 'Admin' : null,
        },
      });
      if (!isMe) return ctx.reply("Olá! Qual o seu nome?");
    }

    // Bloqueio de segurança
    if (!isMe && !contact.isApproved) {
      if (contact.onboardingStep === 'REJECTED') return ctx.reply("Seu acesso foi recusado pelo administrador.");
      if (contact.onboardingStep !== 'NONE') return this.handleOnboarding(text, contact, ctx);
      return ctx.reply("Aguardando aprovação do administrador.");
    }

    // Fluxo de IA
    try {
      await ctx.reply('🤖 Agente processando...');
      const token = await this.tokenService.createToken();
      const response = await this.agentOrchestrator.chat(text, token.access_token);
      await this.replySafe(ctx, response);
    } catch (e) {
      this.logger.error(`AI Error: ${e.message}`);
      await ctx.reply(`❌ Erro: ${e.message}`);
    }
  }

  private async handleOnboarding(text: string, contact: any, ctx: Context) {
    if (contact.onboardingStep === 'AWAITING_NAME') {
      await this.prisma.contact.update({ where: { id: contact.id }, data: { alias: text, onboardingStep: 'AWAITING_AGE' } });
      return ctx.reply("Entendido. E sua idade?");
    }
    if (contact.onboardingStep === 'AWAITING_AGE') {
      const age = parseInt(text);
      if (isNaN(age)) return ctx.reply("Mande apenas números.");
      await this.prisma.contact.update({ where: { id: contact.id }, data: { age, onboardingStep: 'NONE' } });
      await ctx.reply("Obrigado! Solicitação enviada.");
      await this.bot.telegram.sendMessage(this.myChatId, `🔔 Novo acesso: ${contact.alias || text} (ID: ${contact.whatsappId})`);
    }
  }

  @Action(/approve_(.+)/)
  async onApprove(@Ctx() ctx: Context) {
    const userId = (ctx as any).match[1];
    await this.prisma.contact.update({
      where: { whatsappId: userId },
      data: { isApproved: true, onboardingStep: 'NONE' }
    });
    await ctx.answerCbQuery("Aprovado!");
    await ctx.editMessageText(`✅ Usuário ${userId} aprovado.`);
    await this.bot.telegram.sendMessage(userId, "🎉 Seu acesso foi aprovado!");
  }

  @Action(/reject_(.+)/)
  async onReject(@Ctx() ctx: Context) {
    const userId = (ctx as any).match[1];
    await this.prisma.contact.update({
      where: { whatsappId: userId },
      data: { isApproved: false, onboardingStep: 'REJECTED' }
    });
    await ctx.answerCbQuery("Recusado.");
    await ctx.editMessageText(`❌ Usuário ${userId} recusado.`);
    await this.bot.telegram.sendMessage(userId, "Sinto muito, seu acesso não foi autorizado.");
  }

  @Action(/revoke_(.+)/)
  async onRevoke(@Ctx() ctx: Context) {
    const userId = (ctx as any).match[1];
    await this.prisma.contact.update({ where: { whatsappId: userId }, data: { isApproved: false } });
    await ctx.answerCbQuery("Acesso revogado!");
    await ctx.editMessageText(`🚫 Acesso de ${userId} revogado.`);
  }

  async sendMessage(message: any, chatId: string = this.myChatId) {
    const text = typeof message === 'string' ? message : JSON.stringify(message, null, 2);
    await this.bot.telegram.sendMessage(chatId, text);
  }

  @AiTool({ 
    name: 'send_camera_snapshot', 
    description: 'Envia foto da câmera Frigate.',
    parameters: { type: 'object', properties: { cameraName: { type: 'string' } }, required: ['cameraName'] },
  })
  async sendCameraSnapshot(cameraName: string) {
    const url = `${this.configService.get('FRIGATE_URL')}/api/${cameraName}/latest.jpg`;
    await this.bot.telegram.sendPhoto(this.myChatId, { url });
    return `Snapshot enviado: ${cameraName}`;
  }
}