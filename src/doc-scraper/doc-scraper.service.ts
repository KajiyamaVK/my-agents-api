import { Injectable, Logger } from '@nestjs/common';
import { PlaywrightCrawler } from 'crawlee';
import TurndownService from 'turndown';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class DocScraperService {
  private readonly logger = new Logger(DocScraperService.name);
  private readonly outputBaseDir = './scraped_docs';

  constructor() {
    // Garante que o diretório base existe
    if (!fs.existsSync(this.outputBaseDir)) {
      fs.mkdirSync(this.outputBaseDir);
    }
  }

  async scrapeDocumentation(url: string) {
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
        log.info(`Processing: ${request.url}`);

        const contentSelector = 'main'; // Ajustável, poderia vir no DTO

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
            .replace(url, '') // Remove a base para manter estrutura limpa
            .replace(/[\/\\?%*:|"<>]/g, '-')
            .replace(/^-/, '') || 'index';

        fs.writeFileSync(path.join(outputDir, `${fileName}.md`), finalContent);

        await enqueueLinks({
          globs: [`${url}/**`],
          strategy: 'same-domain',
        });
      },
    });

    await crawler.run([url]);

    return {
      status: 'success',
      message: `Documentation scraped for ${domainName}`,
      outputDirectory: outputDir,
      filesCount: fs.readdirSync(outputDir).length,
    };
  }
}
