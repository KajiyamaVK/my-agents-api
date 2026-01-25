import { Module } from '@nestjs/common';
import { TelegramModule } from '../telegram/telegram.module';
import { DocScraperListener } from './listeners/doc-scraper.listener';
import { BullModule } from '@nestjs/bullmq';
import { QueueMonitorService } from './queue-monitor.service';
import { QueueMonitorController } from './queue-monitor.controller';

@Module({
  imports: [
    TelegramModule,
    BullModule.registerQueue({
      name: 'scrape-docs',
    }),
  ],
  controllers: [QueueMonitorController],
  providers: [DocScraperListener, QueueMonitorService],
  exports: [QueueMonitorService],
})
export class NotificationsModule {}