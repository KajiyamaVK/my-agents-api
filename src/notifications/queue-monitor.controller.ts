import { Controller, Get, Logger } from '@nestjs/common';
import { QueueMonitorService } from './queue-monitor.service';

@Controller('notifications/queue')
export class QueueMonitorController {
  private readonly logger = new Logger(QueueMonitorController.name);

  constructor(private readonly queueMonitor: QueueMonitorService) {}

  @Get('status')
  async getStatus() {
    this.logger.log('Requesting BullMQ queue status...');
    
    // This calls the utility method we added to the service
    const status = await this.queueMonitor.getQueueStatus();
    
    return {
      timestamp: new Date().toISOString(),
      queue: 'scrape-docs',
      metrics: status,
    };
  }
}