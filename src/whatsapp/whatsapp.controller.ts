// src/whatsapp/whatsapp.controller.ts
import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { LocalNetworkGuard } from '../common/guards/local-network.guard';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

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
  async notifyDoorbell(@Body('camera') cameraName: string) {
    const targetCamera = cameraName || 'cam_13'; 
    // FIX: Pass object to match service signature
    await this.whatsappService.sendCameraSnapshotToSelf({
      cameraAlias: targetCamera, 
      customTitle: 'Ding Dong! Campainha tocou!'
    });
    return { status: 'Doorbell notification sent', camera: targetCamera };
  }
}