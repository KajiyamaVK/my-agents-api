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
  
        // [CORREÇÃO 1] Mova isto para o TOPO.
        // Isso garante que o crawler encontre os próximos links antes de tentar extrair o conteúdo.
        await enqueueLinks({
          globs: [`${url}/**`],
          strategy: 'same-domain',
        });

        // [CORREÇÃO 2] Lógica para encontrar o seletor correto dinamicamente.
        // O 'main' falha em sites JSDoc, por isso tentamos outros comuns.
        const possibleSelectors = ['#jsdoc-content', 'main', '.main-content', 'article', 'body'];
        let contentSelector = '';

        for (const selector of possibleSelectors) {
          const element = await page.$(selector);
          if (element) {
            contentSelector = selector;
            break; // Encontrou um, para de procurar
          }
        }

        // Se mesmo assim não encontrar nada, loga e sai (mas os links já foram enfileirados acima!)
        if (!contentSelector) {
          log.warning(`Nenhum seletor de conteúdo encontrado em: ${request.url}`);
          return;
        }

          // Lógica de extração (agora mais segura)
          try {
            // Aumentei o timeout para 10s para garantir
            await page.waitForSelector(contentSelector, { timeout: 10000 });
          } catch {
            log.warning(`Timeout ao esperar pelo seletor ${contentSelector}: ${request.url}`);
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
