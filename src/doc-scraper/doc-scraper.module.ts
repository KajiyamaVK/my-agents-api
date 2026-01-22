import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { DocScraperService } from './doc-scraper.service';
import { DocScraperController } from './doc-scraper.controller';
import { DocScraperProcessor } from './doc-scraper.processor'; 

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'scrape-docs',
    }),
  ],
  controllers: [DocScraperController],
  providers: [DocScraperService, DocScraperProcessor], 
})
export class DocScraperModule {}
