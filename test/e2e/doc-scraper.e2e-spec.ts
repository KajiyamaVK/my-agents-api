import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getBotToken } from 'nestjs-telegraf';
import { WhatsappService } from '../../src/whatsapp/whatsapp.service';
import { WhatsappServiceMock } from '../fixtures/whatsapp.mock';
import { TelegramService } from '../../src/telegram/telegram.service';
import { DocScraperService } from '../../src/doc-scraper/doc-scraper.service';
const request = require('supertest');
import { AppModule } from '../../src/app.module';
import { FlowAuthGuard } from '../../src/common/guards/flow.guard';

// Mock do Telegraf para evitar erros de conexão e teardown
const mockTelegraf = {
  telegram: { sendMessage: jest.fn(), sendPhoto: jest.fn() },
  use: jest.fn().mockReturnThis(),
  on: jest.fn().mockReturnThis(),
  command: jest.fn().mockReturnThis(),
  start: jest.fn().mockReturnThis(),
  help: jest.fn().mockReturnThis(),
  launch: jest.fn().mockResolvedValue({}),
  stop: jest.fn().mockResolvedValue({}),
};

// Mock do serviço de Scraping para não depender de pastas reais no Linux
const DocScraperServiceMock = {
  scrapeDocumentation: jest.fn().mockResolvedValue({ status: 'pending' }),
  // Updated mock to reflect the new path structure (inside Full Docs)
  mergeDocuments: jest.fn().mockResolvedValue({ 
    path: '/app/scraped_docs/Full Docs/nestjs.com.md', 
    totalFiles: 5 
  }),
};

describe('DocScraperController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(FlowAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .overrideProvider(getBotToken())
      .useValue(mockTelegraf)
      .overrideProvider(TelegramService)
      .useValue({ sendMessage: jest.fn() })
      .overrideProvider(WhatsappService)
      .useValue(WhatsappServiceMock)
      // FIX: Mockando o serviço para retornar 201 sem checar o disco
      .overrideProvider(DocScraperService)
      .useValue(DocScraperServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  it('/doc-scraper/scrape (POST)', () => {
    return request(app.getHttpServer())
      .post('/doc-scraper/scrape')
      .send({ url: 'http://example.com' })
      .expect(201);
  });

  it('/doc-scraper/merge (POST)', () => {
    return request(app.getHttpServer())
      .post('/doc-scraper/merge')
      .send({ domain: 'nestjs.com' })
      .expect(201);
  });
});