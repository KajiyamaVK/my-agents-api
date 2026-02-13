
import { NestFactory } from '@nestjs/core';
import { DocScraperModule } from './src/doc-scraper/doc-scraper.module';
import { DocScraperService } from './src/doc-scraper/doc-scraper.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(DocScraperModule);
  const service = app.get(DocScraperService);
  const logger = new Logger('ManualScrape');

  const url = 'https://docs.openclaw.ai/';
  console.log(`Starting manual scrape for ${url}`);
  
  try {
      // We can't easily invoke the processor directly as it's a queue worker.
      // But we can try to replicate the processor logic strictly for testing, 
      // or we can just run a playwright script.
      // Since the issue is likely in the *processor* (crawler), let's create a standalone script 
      // utilizing the same logic as DocScraperProcessor to reproduce.
  } catch (e) {
      console.error(e);
  }
  await app.close();
}
// checkfs is better
