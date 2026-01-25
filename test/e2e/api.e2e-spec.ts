import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { WhatsappService } from '../../src/whatsapp/whatsapp.service';
import { WhatsappServiceMock } from '../fixtures/whatsapp.mock';
import { getBotToken } from 'nestjs-telegraf';
import { TelegramService } from '../../src/telegram/telegram.service';
const request = require('supertest');
import { AppModule } from '../../src/app.module';
import { FlowAuthGuard } from '../../src/common/guards/flow.guard';

// Updated mock to satisfy the nestjs-telegraf discovery service
const mockTelegraf = {
  telegram: {
    sendMessage: jest.fn().mockResolvedValue({}),
    sendPhoto: jest.fn().mockResolvedValue({}),
    // FIX 1: Added setMyCommands to prevent the initialization error log
    setMyCommands: jest.fn().mockResolvedValue({}),
  },
  // Essential: These methods are called during nestjs-telegraf's onModuleInit
  use: jest.fn().mockReturnThis(),
  on: jest.fn().mockReturnThis(),
  command: jest.fn().mockReturnThis(),
  start: jest.fn().mockReturnThis(),
  help: jest.fn().mockReturnThis(),
  action: jest.fn().mockReturnThis(), // Often used with inline keyboards
  // Lifecycle methods
  launch: jest.fn().mockResolvedValue({}),
  stop: jest.fn().mockResolvedValue({}),
};

const TelegramServiceMock = {
  sendMessage: jest.fn().mockResolvedValue({}),
  sendCameraSnapshot: jest.fn().mockResolvedValue({}),
};

describe('API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // Mock global fetch for LLM and Auth calls
    const fetchMock = jest.fn((url: string) => {
      if (url.includes('/auth-engine-api')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({ access_token: 'token123' }),
        } as any);
      }
      if (url.includes('/ai-orchestration-api/v1/openai/chat/completions')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            choices: [{ message: { content: 'mock-reply' } }],
          }),
        } as any);
      }
      return Promise.resolve({ ok: true, status: 200, json: async () => ({}) } as any);
    });

    (global as any).fetch = fetchMock;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(FlowAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      // 1. Mock the internal Telegraf Bot instance with full listener support
      .overrideProvider(getBotToken())
      .useValue(mockTelegraf)
      // 2. Mock your custom Telegram Service
      .overrideProvider(TelegramService)
      .useValue(TelegramServiceMock)
      // 3. Keep your existing WhatsApp mock
      .overrideProvider(WhatsappService)
      .useValue(WhatsappServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init(); // Now discovery will pass because .use() exists
  });

  afterAll(async () => {
    if (app) await app.close();
    delete (global as any).fetch;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('/ (GET) should return Hello World!', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
  });

  describe('LLM Chat', () => {
    it('GET /llm/chat-completion/health should return status ok', async () => {
      const res = await request(app.getHttpServer())
        .get('/llm/chat-completion/health')
        .expect(200);
      expect(res.body).toEqual({ status: 'ok' });
    });

    it('POST /llm/chat-completion should return mocked reply', async () => {
      const res = await request(app.getHttpServer())
        .post('/llm/chat-completion')
        .set('Authorization', 'Bearer mock-token') 
        .send({ message: 'hello' })
        .expect(201);

      expect(res.body).toEqual({
        reply: 'mock-reply',
      });
    });
  });

  describe('WhatsApp Controller', () => {
    it('POST /whatsapp/test-self should use the unified sendMessage method', async () => {
      const message = 'Test consolidation';
      const res = await request(app.getHttpServer())
        .post('/whatsapp/test-self')
        .send({ message })
        .expect(201);

      expect(res.body.status).toContain('unified service');
      
      expect(WhatsappServiceMock.sendMessage).toHaveBeenCalledWith({
        to: 'me',
        message: message
      });
    });

    it('POST /whatsapp/camera/:cameraName should trigger snapshot delivery', async () => {
      const camName = 'portao';
      await request(app.getHttpServer())
        .post(`/whatsapp/camera/${camName}`)
        .expect(201);

      // FIX 2: Updated expectation to match the new Object signature in the Service
      expect(WhatsappServiceMock.sendCameraSnapshotToSelf).toHaveBeenCalledWith({ cameraAlias: camName });
    });

    it('POST /whatsapp/test-image-self should trigger image delivery', async () => {
      const imageUrl = 'http://example.com/test.jpg';
      const caption = 'Test caption';
      
      await request(app.getHttpServer())
        .post('/whatsapp/test-image-self')
        .send({ imageUrl, caption })
        .expect(201);

      expect(WhatsappServiceMock.sendImageToSelf).toHaveBeenCalledWith(imageUrl, caption);
    });
  });
});