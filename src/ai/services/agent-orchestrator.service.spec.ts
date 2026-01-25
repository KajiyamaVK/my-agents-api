// src/ai/services/agent-orchestrator.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AgentOrchestratorService } from './agent-orchestrator.service';
import { ToolDiscoveryService } from './tool-discovery.service';
import { ChatCompletionService } from '../../llm/chat-completion/chat-completion.service';
import { TokenService } from '../../llm/token/token.service';

describe('AgentOrchestratorService', () => {
  let service: AgentOrchestratorService;
  let chatCompletionService: ChatCompletionService;

  const mockToolDiscovery = {
    getToolDefinitions: jest.fn().mockReturnValue([]),
    execute: jest.fn(),
  };

  const mockChatCompletion = {
    createChatCompletion: jest.fn(),
  };

  const mockTokenService = {
    createToken: jest.fn(),
  };

  beforeEach(async () => {
    // LIMPEZA DOS MOCKS ANTES DE CADA TESTE
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgentOrchestratorService,
        { provide: ToolDiscoveryService, useValue: mockToolDiscovery },
        { provide: ChatCompletionService, useValue: mockChatCompletion },
        { provide: TokenService, useValue: mockTokenService },
      ],
    }).compile();

    service = module.get<AgentOrchestratorService>(AgentOrchestratorService);
    chatCompletionService = module.get<ChatCompletionService>(ChatCompletionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('chat', () => {
    it('should inject Telegram system context when meta.source is telegram', async () => {
      mockChatCompletion.createChatCompletion.mockResolvedValue({
        status: 'success',
        choices: [{ message: { content: 'OK' } }],
      });

      await service.chat('Olá', 'fake-token', { source: 'telegram' });

      const calls = mockChatCompletion.createChatCompletion.mock.calls[0];
      const messages = calls[0];
      
      expect(messages[0].role).toBe('system');
      expect(messages[0].content).toContain('via TELEGRAM');
      expect(messages[0].content).toContain('Priorize o uso de ferramentas compatíveis com telegram');
    });

    it('should use generic system context when meta is missing', async () => {
      mockChatCompletion.createChatCompletion.mockResolvedValue({
        status: 'success',
        choices: [{ message: { content: 'OK' } }],
      });

      // Como limpamos os mocks no beforeEach, esta será a "primeira chamada" deste teste
      await service.chat('Olá', 'fake-token');

      const calls = mockChatCompletion.createChatCompletion.mock.calls[0];
      const messages = calls[0];

      expect(messages[0].role).toBe('system');
      expect(messages[0].content).toBe('Você é um assistente virtual.');
    });
  });
});