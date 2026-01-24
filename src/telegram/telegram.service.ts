import { Update, On, Message, InjectBot, Action, Ctx, Start, Command } from 'nestjs-telegraf';
import { Context, Telegraf, Markup } from 'telegraf';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AiTool } from '../common/decorators/ai-tool.decorator';
import { AgentOrchestratorService } from '../ai/services/agent-orchestrator.service';
import { TokenService } from '../llm/token/token.service';

@Update()
@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly myChatId: string;

  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly agentOrchestrator: AgentOrchestratorService,
    private readonly tokenService: TokenService,
  ) {
    this.myChatId = this.configService.get<string>('MY_TELEGRAM_CHAT_ID')!;
  }

  /**
   * Helper centralizado para garantir que mensagens enviadas ao Telegram sejam SEMPRE strings.
   * Isso evita o erro [object Object] caso a IA ou uma ferramenta retorne um objeto.
   */
  private async replySafe(ctx: Context, content: any) {
    const text = typeof content === 'string' ? content : JSON.stringify(content, null, 2);
    try {
      await ctx.reply(text || 'Processamento concluído, mas sem resposta textual.');
    } catch (e) {
      this.logger.error(`Failed to reply to Telegram: ${e.message}`);
    }
  }

  @Start()
  async onStart(ctx: Context) {
    const id = ctx.chat?.id;
    this.logger.log(`New user started bot: ${id}`);
    
    await ctx.reply(`Agent System Online. Chat ID: ${id}`);
    await ctx.reply(`Certifique-se de que este ID está no seu .env como MY_TELEGRAM_CHAT_ID.`);
  }

  /**
   * Lista todos os comandos disponíveis baseados no nível de acesso do usuário.
   */
  @Command('help')
  async listHelp(@Ctx() ctx: Context) {
    const chatId = ctx.chat?.id.toString();
    const isMe = chatId === this.myChatId;

    let helpMessage = `🤖 *Central de Ajuda - My Agents API*\n\n`;
    helpMessage += `*Comandos Gerais:*\n`;
    helpMessage += `[/start] - Inicia o bot e exibe seu ID\n`;
    helpMessage += `[/help] - Exibe esta lista de comandos\n\n`;

    if (isMe) {
      helpMessage += `*Comandos Administrativos (Apenas você):*\n`;
      helpMessage += `[/pending] - Lista solicitações de acesso pendentes\n`;
      helpMessage += `[/approved] - Lista usuários aprovados (permite revogar)\n`;
      helpMessage += `[/rejected] - Lista usuários recusados (permite reavaliar)\n\n`;
      helpMessage += `*Dica:* Como admin, você pode enviar qualquer texto para interagir diretamente com a IA.`;
    } else {
      helpMessage += `*Status do Acesso:*\n`;
      helpMessage += `Seu acesso deve ser aprovado pelo administrador para habilitar a interação com a IA.`;
    }

    await ctx.reply(helpMessage, { parse_mode: 'Markdown' });
  }

  /**
   * Lista usuários pendentes ou que foram recusados (isApproved: false).
   */
  @Command('pending')
  @Command('rejected')
  async listPending(@Ctx() ctx: Context) {
    const chatId = ctx.chat?.id.toString();
    if (chatId !== this.myChatId) return ctx.reply("Acesso negado.");

    const users = await this.prisma.contact.findMany({
      where: {
        isApproved: false,
        onboardingStep: 'NONE',
      },
    });

    if (users.length === 0) {
      return ctx.reply("Não há solicitações pendentes ou usuários recusados.");
    }

    await ctx.reply(`📋 *Usuários não autorizados:*`, { parse_mode: 'Markdown' });

    for (const user of users) {
      await ctx.reply(
        `👤 *Nome:* ${user.alias || 'N/A'}\n🎂 *Idade:* ${user.age || 'N/A'}\n🆔 *ID:* ${user.whatsappId}`,
        Markup.inlineKeyboard([
          Markup.button.callback('Aprovar ✅', `approve_${user.whatsappId}`),
          Markup.button.callback('Recusar ❌', `reject_${user.whatsappId}`),
        ])
      );
    }
  }

  /**
   * Lista usuários aprovados e permite revogar o acesso.
   */
  @Command('approved')
  async listApproved(@Ctx() ctx: Context) {
    const chatId = ctx.chat?.id.toString();
    if (chatId !== this.myChatId) return ctx.reply("Acesso negado.");

    const users = await this.prisma.contact.findMany({
      where: { isApproved: true },
    });

    if (users.length === 0 || (users.length === 1 && users[0].whatsappId === this.myChatId)) {
      return ctx.reply("Não há outros usuários aprovados além de você.");
    }

    await ctx.reply(`✅ *Usuários Autorizados:*`, { parse_mode: 'Markdown' });

    for (const user of users) {
      // Não listar o próprio admin para evitar revogação acidental do próprio acesso
      if (user.whatsappId === this.myChatId) continue;

      await ctx.reply(
        `👤 *Nome:* ${user.alias || 'Admin'}\n🆔 *ID:* ${user.whatsappId}`,
        Markup.inlineKeyboard([
          Markup.button.callback('Revogar Acesso 🚫', `revoke_${user.whatsappId}`),
        ])
      );
    }
  }

  /**
   * Loop principal de processamento de texto.
   * Gerencia onboarding para novos usuários e orquestração de IA para aprovados.
   */
  @On('text')
  async onMessage(@Message('text') text: string, @Ctx() ctx: Context) {
    const chatId = ctx.chat?.id.toString();
    if (!chatId) return;

    const isMe = chatId === this.myChatId;

    // 1. Verificar se o usuário já existe
    let contact = await this.prisma.contact.findUnique({
      where: { whatsappId: chatId },
    });

    // 2. Fluxo para Novo Usuário
    if (!contact) {
      contact = await this.prisma.contact.create({
        data: {
          whatsappId: chatId,
          // Se for o Admin, pula o onboarding (onboardingStep: 'NONE')
          onboardingStep: isMe ? 'NONE' : 'AWAITING_NAME',
          isMe: isMe,
          isApproved: isMe, 
          alias: isMe ? 'Admin' : null,
        },
      });

      // Se não for o dono, inicia o fluxo de perguntas
      if (!isMe) {
        return ctx.reply("Olá! É a primeira vez que nos falamos. Como você se chama?");
      }
    }

    // 3. Gerenciar Onboarding (Cadastro) - Ignorado se for o Admin
    if (!isMe && contact.onboardingStep !== 'NONE') {
      if (contact.onboardingStep === 'AWAITING_NAME') {
        contact = await this.prisma.contact.update({
          where: { whatsappId: chatId },
          data: { alias: text, onboardingStep: 'AWAITING_AGE' },
        });
        return ctx.reply(`Prazer, ${text}! Qual a sua idade?`);
      }

      if (contact.onboardingStep === 'AWAITING_AGE') {
        const age = parseInt(text);
        if (isNaN(age)) {
          return ctx.reply("Por favor, envie apenas números para a idade.");
        }

        await this.prisma.contact.update({
          where: { whatsappId: chatId },
          data: { age, onboardingStep: 'NONE' },
        });

        await ctx.reply("Obrigado! Seus dados foram enviados para aprovação.");
        
        // Notifica o dono sobre o novo usuário
        await this.bot.telegram.sendMessage(
          this.myChatId,
          `🔔 Novo acesso solicitado:\nNome: ${contact.alias || text}\nIdade: ${age}\nID: ${chatId}`,
          Markup.inlineKeyboard([
            Markup.button.callback('Aprovar ✅', `approve_${chatId}`),
            Markup.button.callback('Recusar ❌', `reject_${chatId}`),
          ])
        );
        return;
      }
    }

    // 4. Verificar Aprovação (Bloqueia apenas usuários externos não aprovados)
    if (!isMe && !contact.isApproved) {
      return ctx.reply("Seu acesso ainda está pendente de aprovação.");
    }

    // 5. Fluxo de Orquestração de IA (Admin e Usuários Aprovados)
    this.logger.log(`Processing message from ${contact.alias || 'Admin'}: ${text}`);
    
    try {
      await ctx.reply('🤖 Agente está processando...');

      // 5.1 Autenticação Flow
      const tokenResponse = await this.tokenService.createToken();
      if (!tokenResponse || tokenResponse.status === 'error') {
        throw new Error(`Falha no token: ${tokenResponse?.details || 'N/A'}`);
      }

      // 5.2 Chamada ao Orquestrador
      const aiReply = await this.agentOrchestrator.chat(text, tokenResponse.access_token);

      // 5.3 Envio seguro da resposta (Stringified)
      await this.replySafe(ctx, aiReply);

    } catch (error) {
      this.logger.error(`Telegram AI Error: ${error.message}`);
      await ctx.reply(`❌ Erro no processamento: ${error.message}`);
    }
  }

  /**
   * Handlers de Aprovação via Botões Inline
   */
  @Action(/approve_(.+)/)
  async onApprove(@Ctx() ctx: Context) {
    const match = (ctx as any).match;
    const userId = match[1];

    await this.prisma.contact.update({
      where: { whatsappId: userId },
      data: { isApproved: true },
    });
    
    await ctx.answerCbQuery("Usuário aprovado!");
    await ctx.editMessageText(`✅ Usuário ${userId} aprovado.`);
    await this.bot.telegram.sendMessage(userId, "🎉 Seu acesso foi aprovado! Como posso ajudar?");
  }

  @Action(/reject_(.+)/)
  async onReject(@Ctx() ctx: Context) {
    const match = (ctx as any).match;
    const userId = match[1];

    await ctx.answerCbQuery("Usuário recusado.");
    await ctx.editMessageText(`❌ Usuário ${userId} recusado.`);
    await this.bot.telegram.sendMessage(userId, "Sinto muito, seu acesso não foi autorizado.");
  }

  /**
   * Revoga o acesso de um usuário anteriormente aprovado.
   */
  @Action(/revoke_(.+)/)
  async onRevoke(@Ctx() ctx: Context) {
    const match = (ctx as any).match;
    const userId = match[1];

    await this.prisma.contact.update({
      where: { whatsappId: userId },
      data: { isApproved: false },
    });
    
    await ctx.answerCbQuery("Acesso revogado!");
    await ctx.editMessageText(`🚫 Acesso de ${userId} revogado.`);
    await this.bot.telegram.sendMessage(userId, "Seu acesso foi revogado pelo administrador.");
  }

  /**
   * Método público para notificações externas (ex: BullMQ Processors)
   * Garante que o payload enviado não resulte em [object Object]
   */
  async sendMessage(message: any, chatId: string = this.myChatId) {
    try {
      const text = typeof message === 'string' ? message : JSON.stringify(message, null, 2);
      await this.bot.telegram.sendMessage(chatId, text);
    } catch (error) {
      this.logger.error(`Failed to send Telegram message: ${error.message}`);
    }
  }

  /**
   * AI Tool: Captura do Frigate
   */
  @AiTool({ 
    name: 'send_camera_snapshot', 
    description: 'Envia uma foto de uma câmera residencial (ex: portao, garagem) para o Telegram.',
    parameters: {
      type: 'object',
      properties: {
        cameraName: { type: 'string', description: 'O apelido da câmera no Frigate.' },
      },
      required: ['cameraName'],
    },
  })
  async sendCameraSnapshot(cameraName: string) {
    const frigateUrl = this.configService.get<string>('FRIGATE_URL');
    const imageUrl = `${frigateUrl}/api/${cameraName}/latest.jpg`;
    
    try {
      await this.bot.telegram.sendPhoto(this.myChatId, { url: imageUrl }, {
        caption: `📸 Snapshot: ${cameraName}\n🕒 ${new Date().toLocaleTimeString('pt-BR')}`
      });
      return `Snapshot enviado com sucesso para a câmera ${cameraName}`;
    } catch (error) {
      this.logger.error(`Frigate error: ${error.message}`);
      return `Falha ao obter snapshot: ${error.message}`;
    }
  }
}