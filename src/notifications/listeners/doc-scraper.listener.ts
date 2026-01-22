import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WhatsappService } from '../../whatsapp/whatsapp.service'; //

@Injectable()
export class DocScraperListener {
  private readonly logger = new Logger(DocScraperListener.name);

  constructor(private readonly whatsappService: WhatsappService) {} //

  @OnEvent('docScraper.completed')
  async handleScraperCompleted(payload: { jobId: string; url: string; outputPath: string }) {
    this.logger.log(`Job ${payload.jobId} completed. Sending WhatsApp notification...`);

    const message = 
      `✅ *Scraping Concluído!*\n\n` +
      `🌐 *URL:* ${payload.url}\n` +
      `📂 *Pasta:* \`${payload.outputPath}\`\n` +
      `🆔 *Job ID:* ${payload.jobId}`;

    try {
      // Uses your existing service to send the message
      await this.whatsappService.sendTestMessageToSelf(message); 
    } catch (error) {
      this.logger.error(`Failed to send WhatsApp notification: ${error.message}`);
    }
  }

  @OnEvent('docScraper.failed')
  async handleScraperFailed(payload: { jobId: string; url: string; error: string }) {
    const message = 
      `❌ *Scraping Falhou*\n\n` +
      `🌐 *URL:* ${payload.url}\n` +
      `⚠️ *Erro:* ${payload.error}`;

    await this.whatsappService.sendTestMessageToSelf(message);
  }
}