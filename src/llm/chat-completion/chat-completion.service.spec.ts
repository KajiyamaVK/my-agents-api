import { Test, TestingModule } from '@nestjs/testing';
import { ChatCompletionService } from './chat-completion.service';

describe('ChatCompletionService', () => {
  let service: ChatCompletionService;
  const OLD_ENV = process.env;

  beforeEach(async () => {
    jest.resetModules();
    process.env = {
      ...OLD_ENV,
      FLOW_TOKEN: 'test-token',
      FLOW_TENANT: 'tenant',
      FLOW_AGENT: 'agent',
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatCompletionService],
    }).compile();

    service = module.get<ChatCompletionService>(ChatCompletionService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    process.env = OLD_ENV;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createChatCompletion', () => {
    it('returns parsed data when fetch responds ok', async () => {
      const mockResp = { id: '1', choices: [] };
      (global as any).fetch = jest
        .fn()
        .mockResolvedValue({
          ok: true,
          json: jest.fn().mockResolvedValue(mockResp),
        });

      const res = await service.createChatCompletion('hello');

      expect(res).toEqual(mockResp);
      expect((global as any).fetch).toHaveBeenCalled();

      const call = ((global as any).fetch as jest.Mock).mock.calls[0];
      expect(call[0]).toContain('/openai/chat/completions');
      const opts = call[1];
      expect(opts.method).toBe('post');
      expect(opts.headers.Authorization).toBe('Bearer test-token');
      expect(opts.body).toBeDefined();
    });

    it('returns an error object when response is not ok', async () => {
      (global as any).fetch = jest
        .fn()
        .mockResolvedValue({ ok: false, status: 500 });

      const res = await service.createChatCompletion('hello');

      expect(res).toEqual({ status: 'error', details: 'Status code: 500' });
    });

    it('returns an error object when fetch throws', async () => {
      (global as any).fetch = jest.fn().mockRejectedValue(new Error('network'));

      const res = await service.createChatCompletion('hello');

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

    it('returns error when fetch throws', async () => {
      (global as any).fetch = jest.fn().mockRejectedValue(new Error('down'));

      const res = await service.checkHealth();

      expect(res).toEqual({ status: 'error', details: 'down' });
    });
  });
});
