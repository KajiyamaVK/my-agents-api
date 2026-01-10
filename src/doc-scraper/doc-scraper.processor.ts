import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { PlaywrightCrawler } from 'crawlee';
import TurndownService from 'turndown';
import * as path from 'path';
import * as fs from 'fs';

@Processor('scrape-docs') // Nome da fila
export class DocScraperProcessor extends WorkerHost {
  private readonly logger = new Logger(DocScraperProcessor.name);
  private readonly outputBaseDir = './scraped_docs';

  constructor() {
    super();
    // Garante que o diretório base existe na inicialização
    if (!fs.existsSync(this.outputBaseDir)) {
      fs.mkdirSync(this.outputBaseDir);
    }
  }

  async process(job: Job<{ url: string }>): Promise<any> {
    this.logger.log(`Iniciando job ${job.id}: Scraping de ${job.data.url}`);

    try {
      const { url } = job.data;
      const domainName = new URL(url).hostname.replace('www.', '');
      const outputDir = path.join(this.outputBaseDir, domainName);

      if (fs.existsSync(outputDir)) {
        fs.rmSync(outputDir, { recursive: true, force: true });
      }
      fs.mkdirSync(outputDir, { recursive: true });

      const turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced',
      });

      turndownService.remove([
        'script',
        'style',
        'nav',
        'footer',
        'header',
        'iframe',
      ]);

      const crawler = new PlaywrightCrawler({
        maxConcurrency: 2,
        requestHandler: async ({ page, request, log, enqueueLinks }) => {
          // Lógica original de scraping...
          const contentSelector = 'main';
          try {
            await page.waitForSelector(contentSelector, { timeout: 5000 });
          } catch {
            log.warning(`Selector not found: ${request.url}`);
            return;
          }

          const html = await page.$eval(contentSelector, (el) => el.innerHTML);
          const markdown = turndownService.turndown(html);
          const finalContent = `Source: ${request.url}\n\n${markdown}`;

          const fileName =
            request.url
              .replace(url, '')
              .replace(/[\/\\?%*:|"<>]/g, '-')
              .replace(/^-/, '') || 'index';

          fs.writeFileSync(
            path.join(outputDir, `${fileName}.md`),
            finalContent,
          );

          await enqueueLinks({
            globs: [`${url}/**`],
            strategy: 'same-domain',
          });
        },
      });

      await crawler.run([url]);

      this.logger.log(`Job ${job.id} finalizado com sucesso!`);
      return { success: true, path: outputDir };
    } catch (error) {
      this.logger.error(`Job ${job.id} falhou: ${error.message}`);
      throw error; // O BullMQ tentará novamente se configurado
    }
  }
}
