import { Module } from '@nestjs/common';
import { DocScraperController } from './doc-scraper.controller';
import { DocScraperService } from './doc-scraper.service';

@Module({
  controllers: [DocScraperController],
  providers: [DocScraperService],
})
export class DocScraperModule {}
