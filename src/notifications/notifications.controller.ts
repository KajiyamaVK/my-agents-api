import { Controller, Post, Body, UseGuards, Logger } from '@nestjs/common';
import { WhatsappService } from '../whatsapp/whatsapp.service';
import { TelegramService } from '../telegram/telegram.service';
import { LocalNetworkGuard } from '../common/guards/local-network.guard';

@Controller('notifications')
export class NotificationsController {
    private readonly logger = new Logger(NotificationsController.name);

    constructor(
        private readonly whatsappService: WhatsappService,
        private readonly telegramService: TelegramService,
    ) { }

    @Post('doorbell')
    @UseGuards(LocalNetworkGuard)
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
