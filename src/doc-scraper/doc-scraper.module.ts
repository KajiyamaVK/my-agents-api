import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { DocScraperService } from './doc-scraper.service';
import { DocScraperController } from './doc-scraper.controller';
import { DocScraperProcessor } from './doc-scraper.processor'; 

import { ChatCompletionModule } from '../llm/chat-completion/chat-completion.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'scrape-docs',
    }),
    ChatCompletionModule,
  ],
  controllers: [DocScraperController],
  providers: [DocScraperService, DocScraperProcessor], 
})
export class DocScraperModule {}
