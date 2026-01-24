import { Update, On, Message, InjectBot, Action, Ctx, Start } from 'nestjs-telegraf';
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
   * Loop principal de processamento.
   * Agora ignora o onboarding para o administrador para evitar travamentos.
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
   * Handlers de Aprovação via Botões
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
   * Método público para notificações externas (ex: BullMQ)
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