import { Controller, Post, Body, Param } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { LocalNetworkGuard } from '../common/guards/local-network.guard';
import { UseGuards } from '@nestjs/common';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post('test-self')
  async sendTestMessage(@Body('message') message: string) {
    const msg = message || 'Hello from my-agents-api! This is a test automation.';
    await this.whatsappService.sendTestMessageToSelf(msg);
    return { status: 'Message sent to self', content: msg };
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
    await this.whatsappService.sendCameraSnapshotToSelf(cameraName);
    return { status: 'Snapshot sent', camera: cameraName };
  }

  @Post('doorbell')
  @UseGuards(LocalNetworkGuard)
  async notifyDoorbell(@Body('camera') cameraName: string) {
    // Define um padrão caso o HA não envie o nome (ex: cam_13)
    const targetCamera = cameraName || 'cam_13'; 
    
    await this.whatsappService.sendCameraSnapshotToSelf(
      targetCamera, 
      'Ding Dong! Campainha tocou!' // Título personalizado
    );
    
    return { status: 'Doorbell notification sent', camera: targetCamera };
  }
  
}