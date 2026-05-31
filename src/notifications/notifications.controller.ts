import { Controller, Post, Body, UseGuards, Logger, HttpCode } from '@nestjs/common';
import { WhatsappService } from '../whatsapp/whatsapp.service';
import { TelegramService } from '../telegram/telegram.service';
import { FrigateFixerService, FRIGATE_FIX_TELEGRAM_MESSAGES } from './frigate-fixer.service';
import { LocalNetworkGuard } from '../common/guards/local-network.guard';

interface JenkinsWebhookBody {
    status: 'started' | 'success' | 'failure' | 'aborted';
    pipeline?: string;
    branch?: string;
    buildUrl?: string;
    buildNumber?: string | number;
}

@Controller('notifications')
export class NotificationsController {
    private readonly logger = new Logger(NotificationsController.name);

    constructor(
        private readonly whatsappService: WhatsappService,
        private readonly telegramService: TelegramService,
        private readonly frigateFixerService: FrigateFixerService,
    ) { }

    @Post('doorbell')
    @UseGuards(LocalNetworkGuard)
    async notifyDoorbell(@Body('camera') cameraName: string) {
        const targetCamera = cameraName || 'cam_13';
        const results: string[] = [];

        try {
            await this.whatsappService.sendCameraSnapshotToSelf({
                cameraAlias: targetCamera,
                customTitle: 'Ding Dong! Campainha tocou!'
            });
            results.push('WhatsApp sent');
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error({ msg: 'Failed to send WhatsApp doorbell', error: errorMessage });
            results.push(`WhatsApp failed: ${errorMessage}`);
        }

        try {
            await this.telegramService.sendCameraSnapshot({ cameraName: targetCamera });
            results.push('Telegram sent');
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error({ msg: 'Failed to send Telegram doorbell', error: errorMessage });
            results.push(`Telegram failed: ${errorMessage}`);
        }

        return { status: 'Doorbell notification processed', camera: targetCamera, results };
    }

    @Post('frigate-down')
    @UseGuards(LocalNetworkGuard)
    @HttpCode(202)
    async handleFrigateDown() {
        // Fire-and-forget: return 202 immediately so Uptime Kuma does not retry on timeout.
        // The actual fix can take several minutes (Claude skill execution), so we must not
        // block the HTTP response waiting for it.
        this.runFrigateAutoFix().catch((error: Error) => {
            this.logger.error({ msg: 'Unhandled error in frigate auto-fix', error: error.message });
        });
        return { status: 'Fix initiated' };
    }

    @Post('jenkins')
    @UseGuards(LocalNetworkGuard)
    async handleJenkinsWebhook(@Body() body: JenkinsWebhookBody) {
        const { status, pipeline = 'BetelSAS', branch = 'main', buildUrl, buildNumber } = body;

        const buildRef = buildNumber ? ` #${buildNumber}` : '';
        const urlLine = buildUrl ? `\n🔗 ${buildUrl}` : '';

        const messages: Record<JenkinsWebhookBody['status'], string> = {
            started:  `🚀 Jenkins iniciou o pipeline ${pipeline}${buildRef}\nBranch: ${branch}${urlLine}`,
            success:  `✅ Jenkins: pipeline ${pipeline}${buildRef} concluído com sucesso!\nBranch: ${branch}${urlLine}`,
            failure:  `❌ Jenkins: pipeline ${pipeline}${buildRef} FALHOU!\nBranch: ${branch}${urlLine}`,
            aborted:  `⚠️ Jenkins: pipeline ${pipeline}${buildRef} foi abortado.\nBranch: ${branch}${urlLine}`,
        };

        const message = messages[status] ?? `ℹ️ Jenkins [${pipeline}]: status desconhecido ${status}`;
        this.logger.log({ msg: 'Jenkins webhook received', status, pipeline, branch, buildNumber });
        await this.telegramService.sendMessage(message);
        return { status: 'Notification sent' };
    }

    private async runFrigateAutoFix() {
        await this.telegramService.sendMessage(
            '🔴 Frigate está offline. Iniciando diagnóstico automático...',
        );
        const result = await this.frigateFixerService.runFrigateFix();
        const message = FRIGATE_FIX_TELEGRAM_MESSAGES[result.reason](result.output);
        await this.telegramService.sendMessage(message);
    }
}
