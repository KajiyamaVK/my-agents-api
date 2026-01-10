import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class DocScraperService {
  private readonly logger = new Logger(DocScraperService.name);

  constructor(@InjectQueue('scrape-docs') private docQueue: Queue) {}

  async scrapeDocumentation(url: string) {
    this.logger.log(`Adicionando tarefa de scraping para: ${url}`);

    // Adiciona o job na fila 'scrape-docs'
    // O nome do job é 'scrape' e o payload é { url }
    await this.docQueue.add(
      'scrape',
      { url },
      {
        attempts: 3, // Tenta 3 vezes se falhar
        backoff: 5000, // Espera 5s entre tentativas
        removeOnComplete: true, // Limpa o Redis após sucesso
      },
    );

    return {
      status: 'pending',
      message: 'Tarefa de scraping adicionada à fila.',
      url,
    };
  }
}
