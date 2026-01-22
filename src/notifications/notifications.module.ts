import { Module } from '@nestjs/common';
import { WhatsappModule } from '../whatsapp/whatsapp.module'; //
import { DocScraperListener } from './listeners/doc-scraper.listener';
import { BullModule } from '@nestjs/bullmq';
import { QueueMonitorService } from './queue-monitor.service';
import { QueueMonitorController } from './queue-monitor.controller';

@Module({
  imports: [
    WhatsappModule,
    BullModule.registerQueue({
      name: 'scrape-docs',
    }),
    QueueMonitorController
  ],
  providers: [DocScraperListener, QueueMonitorService],
  exports: [QueueMonitorService],
})
export class NotificationsModule {}