import { Update, Start, On, Message } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiTool } from '../common/decorators/ai-tool.decorator';

/**
 * BEST PRACTICE: Custom Guard to ensure only YOU can talk to the bot.
 */
@Injectable()
class TelegramGuard {
  constructor(private configService: ConfigService) {}
  canActivate(context: any): boolean {
    const ctx = context.getArgByIndex(0) as Context;
    const allowedId = this.configService.get<string>('MY_TELEGRAM_CHAT_ID');
    // Using loose equality or toString() to ensure matching between string/number
    return ctx.chat?.id.toString() === allowedId?.toString();
  }
}

@Update()
@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly myChatId: string;

  constructor(
    private readonly bot: Telegraf<Context>,
    private readonly configService: ConfigService,
  ) {
    // Non-null assertion (!) because Joi validates this at startup
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
   * Unified sendMessage for external notifications.
   */
  async sendMessage(message: string, chatId: string = this.myChatId) {
    try {
      await this.bot.telegram.sendMessage(chatId, message);
    } catch (error) {
      this.logger.error(`Failed to send Telegram message: ${error.message}`);
    }
  }

  /**
   * AI Tool: Send Camera Snapshots
   * Added the 'parameters' property to satisfy the AiToolOptions type.
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

  /**
   * Main AI Processing Loop
   */
  @On('text')
  // @UseGuards(TelegramGuard) // Uncomment this once you have the ID in .env
  async onMessage(@Message('text') text: string, ctx: Context) {
    this.logger.log(`Processing message: ${text}`);
    
    // As a Senior Dev, you'll likely inject your AgentOrchestrator here
    await ctx.reply('🤖 Agente está processando seu pedido...');
  }
}