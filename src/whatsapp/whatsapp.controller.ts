// src/whatsapp/whatsapp.controller.ts
import { Controller, Post, Body, Param, UseGuards, Logger } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { TelegramService } from '../telegram/telegram.service';
import { LocalNetworkGuard } from '../common/guards/local-network.guard';

@Controller('whatsapp')
export class WhatsappController {
  private readonly logger = new Logger(WhatsappController.name);

  constructor(
    private readonly whatsappService: WhatsappService,
    private readonly telegramService: TelegramService,
  ) { }

  @Post('test-self')
  async sendTestMessage(@Body('message') message: string) {
    const msg = message || 'Hello from my-agents-api! This is a test automation.';
    // Standardizing on sendMessage for consistency
    await this.whatsappService.sendMessage({ to: 'me', message: msg });
    return { status: 'Message sent to self via unified service', content: msg };
  }

  @Post('test-image-self')
  async sendTestImage(
    @Body('imageUrl') imageUrl: string,
    @Body('caption') caption: string
  ) {
    if (!imageUrl) {
      return { status: 'Error', message: 'imageUrl is required' };
    }
    await this.whatsappService.sendImageToSelf(imageUrl, caption);
    return { status: 'Image sent to self', imageUrl };
  }

  @Post('camera/:cameraName')
  async sendCameraSnapshot(@Param('cameraName') cameraName: string) {
    // FIX: Pass object to match service signature
    await this.whatsappService.sendCameraSnapshotToSelf({ cameraAlias: cameraName });
    return { status: 'Snapshot sent', camera: cameraName };
  }

  @Post('doorbell')
  @UseGuards(LocalNetworkGuard)
  /**
   * @deprecated Use /notifications/doorbell instead. This endpoint will be removed in future versions.
   */
  async notifyDoorbell(@Body('camera') cameraName: string) {
    const targetCamera = cameraName || 'cam_13';
    const results: string[] = [];

    // 1. WhatsApp Notification
    try {
      await this.whatsappService.sendCameraSnapshotToSelf({
        cameraAlias: targetCamera,
        customTitle: 'Ding Dong! Campainha tocou!'
      });
      results.push('WhatsApp sent');
    } catch (e) {
      this.logger.error(`Failed to send WhatsApp doorbell: ${e.message}`);
      results.push(`WhatsApp failed: ${e.message}`);
    }

    // 2. Telegram Notification
    try {
      await this.telegramService.sendCameraSnapshot({ cameraName: targetCamera });
      results.push('Telegram sent');
    } catch (e) {
      this.logger.error(`Failed to send Telegram doorbell: ${e.message}`);
      results.push(`Telegram failed: ${e.message}`);
    }

    return { status: 'Doorbell notification processed', camera: targetCamera, results };
  }
}