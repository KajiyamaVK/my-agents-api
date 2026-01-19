import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { WhatsappService } from '../../src/whatsapp/whatsapp.service';
import { WhatsappServiceMock } from '../fixtures/whatsapp.mock';

const request = require('supertest');
import { AppModule } from '../../src/app.module';
import { FlowAuthGuard } from 'src/common/guards/flow.guard';

describe('API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // --- YOUR EXISTING FETCH MOCK (Unchanged) ---
    const fetchMock = jest.fn((url: string) => {
      if (url.includes('/auth-engine-api')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({ access_token: 'token123' }),
        } as any);
      }

      if (url.includes('/ai-orchestration-api/v1/health')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({}),
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

      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({}),
      } as any);
    });

    (global as any).fetch = fetchMock;

    // --- MODULE SETUP ---
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(FlowAuthGuard)
      .useValue({
        canActivate: jest.fn().mockReturnValue(true),
      })
      // FIX 2: CHAIN THIS HERE TO STOP BROWSER LAUNCH
      .overrideProvider(WhatsappService)
      .useValue(WhatsappServiceMock)
      // ---------------------------------------------
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
    try {
      delete (global as any).fetch;
    } catch {}
  });

  // ... (Rest of your tests remain identical)
  it('/ (GET) should return Hello World!', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/ (GET) should return Hello World!', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('GET /llm/token/health should return status ok', async () => {
    const res = await request(app.getHttpServer())
      .get('/llm/token/health')
      .expect(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('POST /llm/token should return mocked token json', async () => {
    const res = await request(app.getHttpServer())
      .post('/llm/token')
      .send({ clientId: 'a', clientSecret: 'b', appToAccess: 'c' })
      .expect(201);

    expect(res.body).toEqual({ access_token: 'token123' });
  });

  it('GET /llm/chat-completion/health should return status ok', async () => {
    const res = await request(app.getHttpServer())
      .get('/llm/chat-completion/health')
      .expect(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('POST /llm/chat-completion should return mocked reply', async () => {
    const res = await request(app.getHttpServer())
      .post('/llm/chat-completion')
      .send({ message: 'hello' })
      .expect(201);

    expect(res.body).toEqual({
      choices: [{ message: { content: 'mock-reply' } }],
    });
  });
});
