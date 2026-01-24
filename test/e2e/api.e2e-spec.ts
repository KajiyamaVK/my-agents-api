// test/e2e/api.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { WhatsappService } from '../../src/whatsapp/whatsapp.service';
import { WhatsappServiceMock } from '../fixtures/whatsapp.mock';
const request = require('supertest');
import { AppModule } from '../../src/app.module';
import { FlowAuthGuard } from '../../src/common/guards/flow.guard';

describe('API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
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
      .overrideProvider(WhatsappService)
      .useValue(WhatsappServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
    delete (global as any).fetch;
  });

  it('/ (GET) should return Hello World!', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
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
      .set('Authorization', 'Bearer mock-token') // Added header for @Token() decorator
      .send({ message: 'hello' })
      .expect(201);

    expect(res.body).toEqual({
      reply: 'mock-reply',
    });
  });
});