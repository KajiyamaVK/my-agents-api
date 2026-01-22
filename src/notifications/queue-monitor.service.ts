import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue, QueueEvents } from 'bullmq';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QueueMonitorService implements OnModuleInit {
  private readonly logger = new Logger(QueueMonitorService.name);
  private queueEvents: QueueEvents;

  constructor(
    @InjectQueue('scrape-docs') private readonly scraperQueue: Queue,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    // Connect to Redis for Queue Events
    this.queueEvents = new QueueEvents('scrape-docs', {
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    });

    this.setupListeners();
    this.logger.log('Queue Monitor initialized for: scrape-docs');
  }

  private setupListeners() {
    this.queueEvents.on('stalled', ({ jobId }) => {
      this.logger.warn(`⚠️ Job ${jobId} is stalled! This might indicate a crash or OOM.`);
    });

    this.queueEvents.on('failed', ({ jobId, failedReason }) => {
      this.logger.error(`❌ Job ${jobId} failed definitively: ${failedReason}`);
    });
  }

  /**
   * Utility to check current health status of the queue
   */
  async getQueueStatus() {
    const [waiting, active, completed, failed, delayed] = await Promise.all([
      this.scraperQueue.getWaitingCount(),
      this.scraperQueue.getActiveCount(),
      this.scraperQueue.getCompletedCount(),
      this.scraperQueue.getFailedCount(),
      this.scraperQueue.getDelayedCount(),
    ]);

    return { waiting, active, completed, failed, delayed };
  }
}