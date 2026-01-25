import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq'; 
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { PlaywrightCrawler } from 'crawlee';
import TurndownService from 'turndown';
import * as path from 'path';
import * as fs from 'fs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Processor('scrape-docs')
export class DocScraperProcessor extends WorkerHost {
  private readonly logger = new Logger(DocScraperProcessor.name);
  private readonly outputBaseDir = './scraped_docs';

  constructor(private eventEmitter: EventEmitter2) {
    super();
    if (!fs.existsSync(this.outputBaseDir)) {
      fs.mkdirSync(this.outputBaseDir);
    }
  }

  async process(job: Job<{ url: string }>): Promise<any> {
    this.logger.log(`Iniciando job ${job.id}: Scraping de ${job.data.url}`);

    const { url } = job.data;
    // Extract origin to correctly name files relative to the domain root
    const urlObj = new URL(url);
    const origin = urlObj.origin; 
    const domainName = urlObj.hostname.replace('www.', '');
    const outputDir = path.join(this.outputBaseDir, domainName);

    // Prepare directory
    if (fs.existsSync(outputDir)) {
      fs.rmSync(outputDir, { recursive: true, force: true });
    }
    fs.mkdirSync(outputDir, { recursive: true });

    const turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
    });

    turndownService.remove(['script', 'style', 'nav', 'footer', 'header', 'iframe']);

    const crawler = new PlaywrightCrawler({
      maxConcurrency: 2,
      requestHandler: async ({ page, request, log, enqueueLinks }) => {
        // CHANGED: Removed 'globs' to allow crawling links outside the initial path (e.g. /language from /docs)
        // STRICT: 'same-domain' ensures we stay on the same site.
        await enqueueLinks({
          strategy: 'same-domain',
        });

        const possibleSelectors = ['#jsdoc-content', 'main', '.main-content', 'article', 'body'];
        let contentSelector = '';

        for (const selector of possibleSelectors) {
          const element = await page.$(selector);
          if (element) {
            contentSelector = selector;
            break;
          }
        }

        if (!contentSelector) {
          log.warning(`Nenhum seletor de conteúdo encontrado em: ${request.url}`);
          return;
        }

        try {
          await page.waitForSelector(contentSelector, { timeout: 10000 });
          const html = await page.$eval(contentSelector, (el) => el.innerHTML);
          const markdown = turndownService.turndown(html);
          const finalContent = `Source: ${request.url}\n\n${markdown}`;

          // CHANGED: Use 'origin' as base for replacement to handle sibling paths gracefully
          // Example: https://dart.dev/language -> /language -> -language.md
          const fileName = request.url
            .replace(origin, '')
            .replace(/[\/\\?%*:|"<>]/g, '-')
            .replace(/^-/, '') || 'index';

          fs.writeFileSync(path.join(outputDir, `${fileName}.md`), finalContent);
        } catch (e) {
          log.warning(`Erro ao processar página ${request.url}: ${e.message}`);
        }
      },
    });

    await crawler.run([url]);

    // Return the result data. BullMQ passes this to @OnWorkerEvent('completed')
    return { path: outputDir };
  }

  // --- LIFECYCLE EVENTS ---

  @OnWorkerEvent('completed')
  onCompleted(job: Job, result: any) {
    this.logger.log(`Job ${job.id} finalizado com sucesso.`);
    this.eventEmitter.emit('docScraper.completed', {
      jobId: job.id,
      url: job.data.url,
      outputPath: result.path,
    });
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    this.logger.error(`Job ${job.id} falhou: ${error.message}`);
    this.eventEmitter.emit('docScraper.failed', {
      jobId: job.id,
      url: job.data?.url,
      error: error.message,
    });
  }
}