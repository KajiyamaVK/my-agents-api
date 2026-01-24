import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getBotToken } from 'nestjs-telegraf';
import { WhatsappService } from '../../src/whatsapp/whatsapp.service';
import { WhatsappServiceMock } from '../fixtures/whatsapp.mock';
import { TelegramService } from '../../src/telegram/telegram.service';
const request = require('supertest');
import { AppModule } from '../../src/app.module';
import { FlowAuthGuard } from '../../src/common/guards/flow.guard';

// Mock do Telegraf com métodos de discovery
const mockTelegraf = {
  telegram: {
    sendMessage: jest.fn().mockResolvedValue({}),
    sendPhoto: jest.fn().mockResolvedValue({}),
  },
  use: jest.fn().mockReturnThis(),
  on: jest.fn().mockReturnThis(),
  command: jest.fn().mockReturnThis(),
  start: jest.fn().mockReturnThis(),
  help: jest.fn().mockReturnThis(),
  launch: jest.fn().mockResolvedValue({}),
  stop: jest.fn().mockResolvedValue({}),
};

const TelegramServiceMock = {
  sendMessage: jest.fn().mockResolvedValue({}),
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
      .useValue(TelegramServiceMock)
      .overrideProvider(WhatsappService)
      .useValue(WhatsappServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('/doc-scraper/scrape (POST)', () => {
    return request(app.getHttpServer())
      .post('/doc-scraper/scrape')
      .send({ url: 'http://example.com' })
      .expect(201);
  });

  it('/doc-scraper/merge (POST)', () => {
    // FIX: Alinhando o payload com o esperado pelo DocScraperService (domain)
    return request(app.getHttpServer())
      .post('/doc-scraper/merge')
      .send({ domain: 'nestjs.com' }) // Antes era { ids: [1, 2] }
      .expect(201);
  });
});