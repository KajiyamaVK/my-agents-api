import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TelegramService } from '../../telegram/telegram.service';

@Injectable()
export class DocScraperListener {
  private readonly logger = new Logger(DocScraperListener.name);

  constructor(private readonly telegramService: TelegramService) {}

  @OnEvent('docScraper.completed')
  async handleScraperCompleted(payload: { jobId: string; url: string; outputPath: string }) {
    this.logger.log(`Job ${payload.jobId} completed. Sending Telegram notification...`);

    const message = 
      `✅ *Scraping Concluído!*\n\n` +
      `🌐 *URL:* ${payload.url}\n` +
      `📂 *Pasta:* \`${payload.outputPath}\`\n` +
      `🆔 *Job ID:* ${payload.jobId}`;

    try {
      // Using TelegramService to send to the default admin Chat ID
      await this.telegramService.sendMessage(message); 
    } catch (error) {
      this.logger.error(`Failed to send Telegram notification: ${error.message}`);
    }
  }

  @OnEvent('docScraper.failed')
  async handleScraperFailed(payload: { jobId: string; url: string; error: string }) {
    const message = 
      `❌ *Scraping Falhou*\n\n` +
      `🌐 *URL:* ${payload.url}\n` +
      `⚠️ *Erro:* ${payload.error}`;

    try {
      await this.telegramService.sendMessage(message);
    } catch (error) {
      this.logger.error(`Failed to send Telegram failure notification: ${error.message}`);
    }
  }
}