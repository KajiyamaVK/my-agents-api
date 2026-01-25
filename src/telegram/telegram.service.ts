// src/telegram/telegram.service.ts
import { Update, On, Message, InjectBot, Action, Ctx, Start, Command } from 'nestjs-telegraf';
import { Context, Telegraf, Markup } from 'telegraf';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AiTool } from '../common/decorators/ai-tool.decorator';
import { AgentOrchestratorService } from '../ai/services/agent-orchestrator.service';
import { TokenService } from '../llm/token/token.service';
import { RegistryService } from '../registry/registry.service'; // UPDATED IMPORT

@Update()
@Injectable()
export class TelegramService implements OnModuleInit {
  private readonly logger = new Logger(TelegramService.name);
  private readonly myChatId: string;
  private readonly frigateUrl: string;

  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly agentOrchestrator: AgentOrchestratorService,
    private readonly tokenService: TokenService,
    private readonly registryService: RegistryService,
  ) {
    this.myChatId = this.configService.get<string>('MY_TELEGRAM_CHAT_ID')?.toString().trim() || '';
    this.frigateUrl = this.configService.get<string>('FRIGATE_URL') || 'http://localhost:5000';
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
      this.logger.log('Telegram commands registered.');
    } catch (e) {
      this.logger.error(`Failed to register commands: ${e.message}`);
    }
  }

  private isAdmin(chatId: string | number): boolean {
    const inbound = chatId.toString().trim();
    return inbound === this.myChatId;
  }

  private async replySafe(ctx: Context, content: any) {
    const text = typeof content === 'string' ? content : JSON.stringify(content, null, 2);
    await ctx.reply(text || 'Sem resposta do agente.');
  }

  @Start()
  async onStart(ctx: Context) {
    const id = ctx.chat?.id;
    await ctx.reply(`Sistema Online. Seu Chat ID: ${id}`);
    if (this.isAdmin(id!)) {
      await ctx.reply('👑 Admin reconhecido com sucesso.');
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
    if (!this.isAdmin(chatId!)) return ctx.reply("Acesso negado.");

    const users = await this.prisma.contact.findMany({
      where: { isApproved: false, onboardingStep: 'NONE' },
    });

    if (users.length === 0) return ctx.reply("Não há solicitações pendentes.");

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
    if (!this.isAdmin(chatId!)) return ctx.reply("Acesso negado.");

    const users = await this.prisma.contact.findMany({
      where: { isApproved: true },
    });

    if (users.length === 0) return ctx.reply("Nenhum usuário aprovado.");

    await ctx.reply("✅ *Usuários Ativos:*", { parse_mode: 'Markdown' });
    let otherUsers = false;

    for (const user of users) {
      if (user.whatsappId === this.myChatId) continue;
      otherUsers = true;
      await ctx.reply(
        `🟢 ${user.alias || 'User'} (ID: ${user.whatsappId})`,
        Markup.inlineKeyboard([
          Markup.button.callback('Revogar 🚫', `revoke_${user.whatsappId}`),
        ])
      );
    }

    if (!otherUsers) await ctx.reply("Apenas você (Admin) está aprovado.");
  }

  @Command('rejected')
  async listRejected(@Ctx() ctx: Context) {
    const chatId = ctx.chat?.id.toString();
    if (!this.isAdmin(chatId!)) return ctx.reply("Acesso negado.");

    const users = await this.prisma.contact.findMany({
      where: { onboardingStep: 'REJECTED' },
    });

    if (users.length === 0) return ctx.reply("Lista de recusados vazia.");

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

    if (!isMe && !contact.isApproved) {
      if (contact.onboardingStep === 'REJECTED') return ctx.reply("Acesso recusado.");
      if (contact.onboardingStep !== 'NONE') return this.handleOnboarding(text, contact, ctx);
      return ctx.reply("Aguardando aprovação.");
    }

    try {
      await ctx.reply('🤖 Processando...');
      const token = await this.tokenService.createToken();
      
      // FIX: Inject context so LLM knows this is Telegram
      const response = await this.agentOrchestrator.chat(
        text, 
        token.access_token, 
        { source: 'telegram', userId: chatId }
      );
      
      await this.replySafe(ctx, response);
    } catch (e) {
      await ctx.reply(`❌ Erro: ${e.message}`);
    }
  }

  private async handleOnboarding(text: string, contact: any, ctx: Context) {
    if (contact.onboardingStep === 'AWAITING_NAME') {
      await this.prisma.contact.update({ where: { id: contact.id }, data: { alias: text, onboardingStep: 'AWAITING_AGE' } });
      return ctx.reply("Qual sua idade?");
    }
    if (contact.onboardingStep === 'AWAITING_AGE') {
      const age = parseInt(text);
      if (isNaN(age)) return ctx.reply("Envie apenas números.");
      await this.prisma.contact.update({ where: { id: contact.id }, data: { age, onboardingStep: 'NONE' } });
      await ctx.reply("Cadastro enviado.");
      await this.bot.telegram.sendMessage(this.myChatId, `🔔 Novo acesso solicitado: ${contact.alias || text}`);
    }
  }

  @Action(/approve_(.+)/)
  async onApprove(@Ctx() ctx: Context) {
    const userId = (ctx as any).match[1];
    await this.prisma.contact.update({ where: { whatsappId: userId }, data: { isApproved: true, onboardingStep: 'NONE' } });
    await ctx.answerCbQuery("Aprovado!");
    await ctx.editMessageText(`✅ Usuário ${userId} aprovado.`);
    await this.bot.telegram.sendMessage(userId, "🎉 Seu acesso foi liberado!");
  }

  @Action(/reject_(.+)/)
  async onReject(@Ctx() ctx: Context) {
    const userId = (ctx as any).match[1];
    await this.prisma.contact.update({ where: { whatsappId: userId }, data: { isApproved: false, onboardingStep: 'REJECTED' } });
    await ctx.answerCbQuery("Recusado.");
    await ctx.editMessageText(`❌ Usuário ${userId} recusado.`);
  }

  @Action(/revoke_(.+)/)
  async onRevoke(@Ctx() ctx: Context) {
    const userId = (ctx as any).match[1];
    await this.prisma.contact.update({ where: { whatsappId: userId }, data: { isApproved: false } });
    await ctx.answerCbQuery("Revogado!");
    await ctx.editMessageText(`🚫 Acesso de ${userId} revogado.`);
  }

  async sendMessage(message: any, chatId: string = this.myChatId) {
    const text = typeof message === 'string' ? message : JSON.stringify(message, null, 2);
    await this.bot.telegram.sendMessage(chatId, text);
  }

  @AiTool({ 
    name: 'send_camera_snapshot_telegram', 
    description: 'Envia foto da câmera Frigate especificamente para o chat do Telegram.',
    parameters: { type: 'object', properties: { cameraName: { type: 'string' } }, required: ['cameraName'] },
  })
  async sendCameraSnapshot({ cameraName }: { cameraName: string }) {
    const camera = await this.registryService.resolveCamera(cameraName);
    if (!camera) throw new Error(`Camera ${cameraName} não encontrada.`);

    const url = `${this.frigateUrl}/api/${camera.frigateName}/latest.jpg`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Falha ao baixar imagem: ${response.statusText}`);
      
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await this.bot.telegram.sendPhoto(this.myChatId, { source: buffer }, { 
        caption: `📸 Snapshot: ${camera.name}` 
      });
      
      return `Snapshot de ${cameraName} enviado com sucesso via Telegram.`;
    } catch (e) {
      this.logger.error(`Failed to send snapshot: ${e.message}`);
      throw new Error(`Erro ao enviar foto: ${e.message}`);
    }
  }
}