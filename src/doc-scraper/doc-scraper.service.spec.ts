import { Test, TestingModule } from '@nestjs/testing';
import { DocScraperService } from './doc-scraper.service';
import { getQueueToken } from '@nestjs/bullmq';

describe('DocScraperService', () => {
  let service: DocScraperService;

  // Mock da Fila do BullMQ
  const mockQueue = {
    add: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocScraperService,
        {
          // Fornece o token de injeção da fila 'scrape-docs'
          provide: getQueueToken('scrape-docs'),
          useValue: mockQueue,
        },
      ],
    }).compile();

    service = module.get<DocScraperService>(DocScraperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a scraping job to the queue', async () => {
    const url = 'https://docs.frigate.video';

    const result = await service.scrapeDocumentation(url);

    // Verifica se o método .add() da fila foi chamado corretamente
    expect(mockQueue.add).toHaveBeenCalledWith(
      'scrape', // Nome do job
      { url }, // Payload
      expect.any(Object), // Opções (delay, attempts, etc)
    );

    // Verifica se o retorno do serviço continua o esperado (Fire-and-forget)
    expect(result).toEqual({
      status: 'pending',
      message: 'Tarefa de scraping adicionada à fila.',
      url,
    });
  });
});
