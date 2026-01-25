import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DocScraperService {
  private readonly logger = new Logger(DocScraperService.name);
  // Using path.resolve to ensure the base directory is consistently found
  private readonly outputBaseDir = path.resolve(process.cwd(), 'scraped_docs');
  // Explicitly define the Full Docs directory
  private readonly fullDocsDir = path.join(this.outputBaseDir, 'Full Docs');

  constructor(@InjectQueue('scrape-docs') private docQueue: Queue) {
    // Ensure the base directory exists on startup
    if (!fs.existsSync(this.outputBaseDir)) {
      fs.mkdirSync(this.outputBaseDir, { recursive: true });
    }
    // Ensure the Full Docs directory exists on startup
    if (!fs.existsSync(this.fullDocsDir)) {
      fs.mkdirSync(this.fullDocsDir, { recursive: true });
    }
  }

  async scrapeDocumentation(url: string) {
    // Extract hostname to serve as contextName (e.g., docs.frigate.video)
    let domain: string;
    try {
      const parsedUrl = new URL(url);
      domain = parsedUrl.hostname;
    } catch (error) {
      throw new BadRequestException(`Invalid URL provided: ${url}`);
    }

    // Check if the full version already exists in the "Full Docs" folder
    const existingFullDocPath = path.join(this.fullDocsDir, `${domain}.md`);

    if (fs.existsSync(existingFullDocPath)) {
      this.logger.warn(`Scrape aborted: Full documentation for ${domain} already exists at ${existingFullDocPath}.`);
      throw new BadRequestException(
        `Documentation for ${domain} already exists. Please delete the full version before scraping again.`,
      );
    }

    this.logger.log(`Adicionando tarefa de scraping para: ${url}`);

    await this.docQueue.add(
      'scrape',
      { url },
      {
        attempts: 3,
        backoff: 5000,
        removeOnComplete: true,
      },
    );

    return {
      status: 'pending',
      message: 'Tarefa de scraping adicionada à fila.',
      url,
    };
  }

  /**
   * Reads all .md files from the domain folder and merges them into one file.
   */
  async mergeDocuments(domain: string): Promise<{ path: string | null; totalFiles: number }> {
    // SAFETY CHECK: Prevent path.join(..., undefined)
    if (!domain) {
      this.logger.error('Merge failed: domain argument is undefined or null');
      throw new BadRequestException('Domain is required for merging documents.');
    }

    const sourceDir = path.join(this.outputBaseDir, domain);
    
    // CRITICAL FIX: Output file is now inside "Full Docs" and named <domain>.md
    const outputFile = path.join(this.fullDocsDir, `${domain}.md`);

    if (!fs.existsSync(sourceDir)) {
      throw new NotFoundException(`Directory for domain ${domain} not found at ${sourceDir}`);
    }

    // Get all MD files
    const files = fs
      .readdirSync(sourceDir)
      .filter((file) => file.endsWith('.md'));

    if (files.length === 0) {
      this.logger.warn(`No markdown files found in ${sourceDir}`);
      return { path: null, totalFiles: 0 };
    }

    this.logger.log(`Merging ${files.length} files for ${domain} into ${outputFile}...`);

    const writeStream = fs.createWriteStream(outputFile);

    // Write Header
    writeStream.write(`# Full Documentation for ${domain}\n`);
    writeStream.write(`Generated on: ${new Date().toISOString()}\n\n`);

    // Stream content from each file
    for (const file of files) {
      const filePath = path.join(sourceDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Best practice: Clearly delineate file boundaries
      writeStream.write(`\n\n--- START OF FILE: ${file} ---\n\n`);
      writeStream.write(content);
      writeStream.write(`\n\n--- END OF FILE: ${file} ---\n`);
    }

    writeStream.end();

    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => {
        this.logger.log(`Merge complete: ${outputFile}`);

        // Cleanup: Delete the folder containing the parts
        try {
          if (fs.existsSync(sourceDir)) {
            fs.rmSync(sourceDir, { recursive: true, force: true });
            this.logger.log(`Deleted source directory: ${sourceDir}`);
          }
        } catch (err) {
          this.logger.error(`Failed to delete source directory ${sourceDir}: ${err.message}`);
        }

        resolve({ path: outputFile, totalFiles: files.length });
      });
      writeStream.on('error', (err) => {
        this.logger.error(`Write stream error: ${err.message}`);
        reject(err);
      });
    });
  }
}