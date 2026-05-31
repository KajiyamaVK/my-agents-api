import { Module } from '@nestjs/common';
import { TelegramModule } from '../telegram/telegram.module';
import { WhatsappModule } from '../whatsapp/whatsapp.module';
import { DocScraperListener } from './listeners/doc-scraper.listener';
import { BullModule } from '@nestjs/bullmq';
import { QueueMonitorService } from './queue-monitor.service';
import { QueueMonitorController } from './queue-monitor.controller';
import { NotificationsController } from './notifications.controller';
import { FrigateFixerService } from './frigate-fixer.service';

@Module({
  imports: [
    TelegramModule,
    WhatsappModule,
    BullModule.registerQueue({
      name: 'scrape-docs',
    }),
  ],
  controllers: [QueueMonitorController, NotificationsController],
  providers: [DocScraperListener, QueueMonitorService, FrigateFixerService],
  exports: [QueueMonitorService],
})
export class NotificationsModule { }
