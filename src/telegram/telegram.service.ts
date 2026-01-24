import { Update, On, Message, InjectBot, Action, Ctx, Start } from 'nestjs-telegraf';
import { Context, Telegraf, Markup } from 'telegraf';
import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AiTool } from '../common/decorators/ai-tool.decorator';
import { AgentOrchestratorService } from '../ai/services/agent-orchestrator.service';
import { TokenService } from '../llm/token/token.service';

/**
 * BEST PRACTICE: Custom Guard to ensure only YOU can talk to the bot.
 */
@Injectable()
class TelegramGuard {
  constructor(private configService: ConfigService) {}
  canActivate(context: any): boolean {
    const ctx = context.getArgByIndex(0) as Context;
    const allowedId = this.configService.get<string>('MY_TELEGRAM_CHAT_ID');
    return ctx.chat?.id.toString() === allowedId?.toString();
  }
}

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

  @Start()
  async onStart(ctx: Context) {
    const id = ctx.chat?.id;
    this.logger.log(`New user started bot: ${id}`);
    
    await ctx.reply(`Agent System Online. Your Chat ID is: ${id}`);
    await ctx.reply(`Add this to your .env as MY_TELEGRAM_CHAT_ID to secure the bot.`);
  }

  /**
   * Main AI Processing Loop with Onboarding logic
   */
  @On('text')
  async onMessage(@Message('text') text: string, @Ctx() ctx: Context) {
    const chatId = ctx.chat?.id.toString();
    if (!chatId) return;

    // 1. Verificar se o usuário já existe
    let contact = await this.prisma.contact.findUnique({
      where: { whatsappId: chatId },
    });

    // 2. Fluxo para Novo Usuário
    if (!contact) {
      await this.prisma.contact.create({
        data: {
          whatsappId: chatId,
          onboardingStep: 'AWAITING_NAME',
          isMe: chatId === this.myChatId,
          isApproved: chatId === this.myChatId, // Auto-aprova você mesmo
        },
      });
      return ctx.reply("Olá! Pelo que vejo, hoje é a primeira vez que falo com você. Preciso confirmar alguns dados. Qual o seu nome?");
    }

    // 3. Gerenciar Onboarding (Cadastro)
    if (contact.onboardingStep === 'AWAITING_NAME') {
      await this.prisma.contact.update({
        where: { whatsappId: chatId },
        data: { alias: text, onboardingStep: 'AWAITING_AGE' },
      });
      return ctx.reply(`Prazer, ${text}! E qual a sua idade?`);
    }

    if (contact.onboardingStep === 'AWAITING_AGE') {
      const age = parseInt(text);
      if (isNaN(age)) return ctx.reply("Por favor, digite apenas números para a idade.");

      await this.prisma.contact.update({
        where: { whatsappId: chatId },
        data: { age, onboardingStep: 'NONE' },
      });

      await ctx.reply("Obrigado! Seus dados foram enviados para aprovação do administrador.");
      
      // Notificar o admin (você) para aprovação
      return this.bot.telegram.sendMessage(
        this.myChatId,
        `🔔 Novo acesso solicitado:\nNome: ${contact.alias || text}\nIdade: ${age}\nID: ${chatId}`,
        Markup.inlineKeyboard([
          Markup.button.callback('Aprovar ✅', `approve_${chatId}`),
          Markup.button.callback('Recusar ❌', `reject_${chatId}`),
        ])
      );
    }

    // 4. Verificar Aprovação
    if (!contact.isApproved) {
      return ctx.reply("Seu acesso ainda está pendente de aprovação.");
    }

    // 5. Fluxo Normal para usuários aprovados
    this.logger.log(`Processing message from ${contact.alias}: ${text}`);
    
    try {
      await ctx.reply('🤖 Agente está processando seu pedido...');

      // 5.1 Get fresh token
      const tokenResponse = await this.tokenService.createToken();
      if (!tokenResponse || tokenResponse.status === 'error') {
        throw new Error(`Falha na autenticação: ${tokenResponse?.details || 'Erro desconhecido'}`);
      }

      // 5.2 Execute AI Orchestration
      const aiReply = await this.agentOrchestrator.chat(text, tokenResponse.access_token);

      // 5.3 SAFETY: Ensure string output to prevent [object Object] errors
      const finalReply = typeof aiReply === 'string' ? aiReply : JSON.stringify(aiReply, null, 2);
      await ctx.reply(finalReply);

    } catch (error) {
      this.logger.error(`Telegram AI Error: ${error.message}`);
      await ctx.reply(`❌ Ocorreu um erro no processamento: ${error.message}`);
    }
  }

  /**
   * Handler para aprovação via botões Inline
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
   * Unified sendMessage for external notifications.
   */
  async sendMessage(message: any, chatId: string = this.myChatId) {
    try {
      // Ensure string output for all triggers to prevent [object Object] errors
      const text = typeof message === 'string' ? message : JSON.stringify(message, null, 2);
      await this.bot.telegram.sendMessage(chatId, text);
    } catch (error) {
      this.logger.error(`Failed to send Telegram message: ${error.message}`);
    }
  }

  /**
   * AI Tool: Send Camera Snapshots
   */
  @AiTool({ 
    name: 'send_camera_snapshot', 
    description: 'Sends a snapshot from a specific home camera (e.g., doorbell, gate)',
    parameters: {
      type: 'object',
      properties: {
        cameraName: {
          type: 'string',
          description: 'The name of the camera to capture',
        },
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
      return `Snapshot sent for ${cameraName}`;
    } catch (error) {
      this.logger.error(`Frigate error: ${error.message}`);
      return `Failed to fetch/send snapshot: ${error.message}`;
    }
  }
}