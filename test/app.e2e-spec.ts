import { Test, TestingModule } from '@nestjs/testing';
import { getBotToken } from 'nestjs-telegraf';
import { INestApplication } from '@nestjs/common';
const request = require('supertest');
import { AppModule } from './../src/app.module';
import { WhatsappService } from '../src/whatsapp/whatsapp.service';
import { WhatsappServiceMock } from './fixtures/whatsapp.mock';

// Define the mock for Telegram to prevent network calls and shutdown errors
const mockTelegraf = {
  telegram: {
    sendMessage: jest.fn().mockResolvedValue({}),
    sendPhoto: jest.fn().mockResolvedValue({}),
  },
  // We use mockReturnThis() because the library often chains these calls
  use: jest.fn().mockReturnThis(),
  on: jest.fn().mockReturnThis(),
  action: jest.fn().mockReturnThis(), // Critical: Prevents crash when discovering @Action
  hears: jest.fn().mockReturnThis(),  // Critical: Prevents crash when discovering @Hears
  command: jest.fn().mockReturnThis(),
  start: jest.fn().mockReturnThis(),
  help: jest.fn().mockReturnThis(),
  launch: jest.fn().mockResolvedValue({}),
  stop: jest.fn().mockResolvedValue({}),
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      /**
       * BEST PRACTICE: Replace real services with Mocks in E2E tests.
       * - getBotToken() avoids real Telegram API connections and teardown crashes.
       * - WhatsappServiceMock avoids launching Puppeteer/Chromium.
       */
      .overrideProvider(getBotToken())
      .useValue(mockTelegraf)
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

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});