// src/llm/chat-completion/chat-completion.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { ChatCompletionService } from './chat-completion.service';

describe('ChatCompletionService', () => {
  let service: ChatCompletionService;
  let configService: ConfigService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'FLOW_TENANT') return 'tenant';
      if (key === 'FLOW_AGENT') return 'agent';
      return null;
    }),
    getOrThrow: jest.fn((key: string) => {
      if (key === 'FLOW_TENANT') return 'tenant';
      if (key === 'FLOW_AGENT') return 'agent';
      throw new Error(`Config key ${key} not found`);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatCompletionService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<ChatCompletionService>(ChatCompletionService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createChatCompletion', () => {
    it('returns parsed data when fetch responds ok', async () => {
      const mockResp = { id: '1', choices: [{ message: { content: 'hello back' } }] };
      const userToken = 'test-token';
      const messages = [{ role: 'user', content: 'hello' }];

      (global as any).fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResp),
      });

      const res = await service.createChatCompletion(messages, userToken);

      expect(res).toEqual(mockResp);
      expect((global as any).fetch).toHaveBeenCalled();

      const call = ((global as any).fetch as jest.Mock).mock.calls[0];
      expect(call[0]).toContain('/openai/chat/completions');
      
      const opts = call[1];
      expect(opts.method).toBe('POST');
      expect(opts.headers.Authorization).toBe('Bearer ' + userToken);
      expect(opts.headers.FlowTenant).toBe('tenant');
      
      const body = JSON.parse(opts.body);
      expect(body.messages).toEqual(messages);
    });

    it('returns an error object when response is not ok', async () => {
      (global as any).fetch = jest
        .fn()
        .mockResolvedValue({ 
          ok: false, 
          status: 500,
          text: jest.fn().mockResolvedValue('Internal Error')
        });

      const res = await service.createChatCompletion([{ role: 'user', content: 'hello' }], 'token');

      expect(res.status).toBe('error');
      expect(res.details).toContain('500');
    });

    it('returns an error object when fetch throws', async () => {
      (global as any).fetch = jest.fn().mockRejectedValue(new Error('network'));

      const res = await service.createChatCompletion([{ role: 'user', content: 'hello' }], 'token');

      expect(res).toEqual({ status: 'error', details: 'network' });
    });
  });

  describe('checkHealth', () => {
    it('returns ok when health endpoint returns ok', async () => {
      (global as any).fetch = jest.fn().mockResolvedValue({ ok: true });

      const res = await service.checkHealth();

      expect(res).toEqual({ status: 'ok' });
      expect((global as any).fetch).toHaveBeenCalled();
    });

    it('returns error when health endpoint returns non-ok', async () => {
      (global as any).fetch = jest
        .fn()
        .mockResolvedValue({ ok: false, status: 503 });

      const res = await service.checkHealth();

      expect(res).toEqual({ status: 'error', details: 'Status code: 503' });
    });
  });
});