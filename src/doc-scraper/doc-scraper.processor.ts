import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq'; 
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { PlaywrightCrawler, utils } from 'crawlee';
import TurndownService from 'turndown';
import * as path from 'path';
import * as fs from 'fs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ChatCompletionService } from '../llm/chat-completion/chat-completion.service';
import { ScrapeMode } from './dto/scrape-docs.dto';

@Processor('scrape-docs')
export class DocScraperProcessor extends WorkerHost {
  private readonly logger = new Logger(DocScraperProcessor.name);
  private readonly outputBaseDir = './scraped_docs';


  constructor(
    private eventEmitter: EventEmitter2,
    private chatCompletionService: ChatCompletionService
  ) {
    super();
    if (!fs.existsSync(this.outputBaseDir)) {
      fs.mkdirSync(this.outputBaseDir, { recursive: true });
    }
  }

  async process(job: Job<any>): Promise<any> {
    const { url, mode = ScrapeMode.DOCUMENTATION } = job.data;
    
    if (mode === ScrapeMode.DYNAMIC) {
      return this.processDynamic(job);
    }

    return this.processDocumentation(job);
  }

  private async processDynamic(job: Job<any>): Promise<any> {
    this.logger.log({ msg: 'Starting dynamic scrape', url: job.data.url });
    const { url, scrollIterations = 0, schema, targetSelector } = job.data;
    const urlObj = new URL(url);
    const domainName = urlObj.hostname.replace('www.', '');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    // Create domain-specific directory
    const outputDir = path.join(this.outputBaseDir, domainName);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputFile = path.join(outputDir, `${timestamp}.json`);

    const crawler = new PlaywrightCrawler({
      headless: true,
      requestHandler: async ({ page, log }) => {
        // Infinite Scroll
        if (scrollIterations > 0) {
          log.info(`Scrolling ${scrollIterations} times (max)...`);
          
          // 1. Identify scrollable element (if any) that is better than window
          // Look for element with overflow-y: auto/scroll and scrollHeight > clientHeight
          const scrollableSelector = await page.evaluate(() => {
              const elements = Array.from(document.querySelectorAll('div, main, section, ul'));
              // Sort by scrollHeight descending to find the main container likely
              elements.sort((a, b) => b.scrollHeight - a.scrollHeight);
              
              for (const el of elements) {
                  const style = window.getComputedStyle(el);
                  if (el.scrollHeight > el.clientHeight && (style.overflowY === 'auto' || style.overflowY === 'scroll')) {
                      // Construct a unique selector or rely on class
                      if (el.id) return `#${el.id}`;
                      if (el.className) return `.${el.className.split(' ').join('.')}`;
                      return el.tagName; // Fallback, might be weak
                  }
              }
              return null;
          });

          if (scrollableSelector) {
             const selector = scrollableSelector.toLowerCase(); // Ensure valid
             log.info(`Found specific scrollable container: ${selector}. Using manual scroll.`);
             
             for (let i = 0; i < scrollIterations; i++) {
                 // Scroll to bottom of this element
                 await page.evaluate((sel) => {
                     const el = document.querySelector(sel);
                     if (el) el.scrollTo(0, el.scrollHeight);
                 }, selector);
                 
                 await page.waitForTimeout(2000 + Math.random() * 1000); // Wait for load (2-3s)
             }
          } else {
             // Fallback to window infinite scroll
             log.info('No specific scroll container found. Using window infiniteScroll.');
             let currentScrolls = 0;
             await utils.playwright.infiniteScroll(page, {
                waitForSecs: 2,
                stopScrollCallback: async () => {
                    currentScrolls++;
                    if (currentScrolls >= scrollIterations) return true;
                    return false;
                }
             });
          }
        }

        let extractedData: any;

        // Strategy 1: Target Selector
        if (targetSelector) {
            try {
                // Use innerText to avoid script/style content and get rendered text
                extractedData = await page.$$eval(targetSelector, (elements) => {
                    return elements.map(el => (el as HTMLElement).innerText?.trim()).filter(Boolean);
                });
                log.info(`Extracted ${extractedData.length} items using selector ${targetSelector}`);
            } catch (e) {
                log.warning(`Selector extraction failed: ${e.message}`);
            }
        }

        // Strategy 2: LLM Fallback / Extraction
        if (!extractedData || (Array.isArray(extractedData) && extractedData.length === 0)) {
           log.info('Using LLM for extraction...');
           const bodyContent = await page.evaluate(() => document.body.innerText); // Get text content
           // Truncate if too long (simple safety)
           const cleanedContent = bodyContent.substring(0, 30000); 

           const prompt = `
             Extract data from the following website content based on this schema: ${JSON.stringify(schema || {})}.
             If no schema is provided, summarize the main structured data found (e.g. products, items).
             Return ONLY valid JSON.
             
             Content:
             ${cleanedContent}
           `;

           const messages = [{ role: 'user', content: prompt }];
           // We need a token. In a real scenario, this might come from config or context. 
           // Assuming a system token or env var is available, or passing empty if service handles it.
           // NOTE: The service requires a token. I'll mock one or use a configured one.
           // However, looking at ChatCompletionService, it takes a token. 
           // I will use a dummy token here as the service might need refactoring or I assume internal usage.
           // WAIT, the existing ChatCompletionService takes a token as argument.
           // Validation: The prompt didn't supply a token mechanism for internal calls.
           // I will try to pass 'internal-process' or similar.
           const extractionResult = await this.chatCompletionService.createChatCompletion(
             messages, 
             job.data.token // Use token from job
           );
           
           if (extractionResult.choices && extractionResult.choices[0]) {
               try {
                  const content = extractionResult.choices[0].message.content;
                  // Try to parse JSON from code block if present
                  const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || [null, content];
                  extractedData = JSON.parse(jsonMatch[1]);
               } catch (e) {
                   log.error(`Failed to parse LLM response: ${e.message}`);
                   extractedData = { error: 'Failed to parse LLM output', raw: extractionResult };
               }
           }
        }

        if (extractedData) {
            fs.writeFileSync(outputFile, JSON.stringify(extractedData, null, 2));
            log.info(`Saved structured data to ${outputFile}`);
        } else {
            log.warning('No data extracted.');
        }
      },
    });

    await crawler.run([url]);
    return { path: outputFile };
  }

  private async processDocumentation(job: Job<{ url: string }>): Promise<any> {
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
    this.logger.log({ msg: 'Job finalizado com sucesso', jobId: job.id });
    this.eventEmitter.emit('docScraper.completed', {
      jobId: job.id,
      url: job.data.url,
      outputPath: result.path,
    });
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    this.logger.error({ msg: 'Job falhou', jobId: job.id, error: error.message });
    this.eventEmitter.emit('docScraper.failed', {
      jobId: job.id,
      url: job.data?.url,
      error: error.message,
    });
  }
}