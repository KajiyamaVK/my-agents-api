// src/notifications/listeners/doc-scraper.listener.ts
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WhatsappService } from '../../whatsapp/whatsapp.service';

@Injectable()
export class DocScraperListener {
  private readonly logger = new Logger(DocScraperListener.name);

  constructor(private readonly whatsappService: WhatsappService) {}

  @OnEvent('docScraper.completed')
  async handleScraperCompleted(payload: { jobId: string; url: string; outputPath: string }) {
    this.logger.log(`Job ${payload.jobId} completed. Sending WhatsApp notification...`);

    const message = 
      `✅ *Scraping Concluído!*\n\n` +
      `🌐 *URL:* ${payload.url}\n` +
      `📂 *Pasta:* \`${payload.outputPath}\`\n` +
      `🆔 *Job ID:* ${payload.jobId}`;

    try {
      // BEST PRACTICE: Use the consolidated sendMessage method with the "me" identifier
      await this.whatsappService.sendMessage({ to: 'me', message }); 
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

    try {
      // Standardizing on the unified sendMessage call
      await this.whatsappService.sendMessage({ to: 'me', message });
    } catch (error) {
      this.logger.error(`Failed to send WhatsApp failure notification: ${error.message}`);
    }
  }
}