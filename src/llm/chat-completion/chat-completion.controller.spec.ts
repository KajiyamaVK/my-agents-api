import { Test, TestingModule } from '@nestjs/testing';
import { ChatCompletionController } from './chat-completion.controller';
import { ChatCompletionService } from './chat-completion.service';
import { FlowAuthGuard } from 'src/common/guards/flow.guard';
import { AgentOrchestratorService } from '../../ai/services/agent-orchestrator.service';
import { JwtService } from '@nestjs/jwt'; // Added

describe('ChatCompletionController', () => {
  let controller: ChatCompletionController;
  let chatService: any;

  const mockOrchestratorService = {
    chat: jest.fn().mockResolvedValue('hi'),
  };

  const mockJwtService = {
    verifyAsync: jest.fn().mockResolvedValue({ sub: 'user-id' }),
  };

  beforeEach(async () => {
    const mockChatService = {
      checkHealth: jest.fn().mockResolvedValue({ status: 'ok' }),
      createChatCompletion: jest.fn().mockResolvedValue({ reply: 'hi' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatCompletionController],
      providers: [
        { provide: ChatCompletionService, useValue: mockChatService },
        { provide: AgentOrchestratorService, useValue: mockOrchestratorService },
        { provide: JwtService, useValue: mockJwtService }, // Added mock
      ],
    })
      .overrideGuard(FlowAuthGuard)
      .useValue({
        canActivate: jest.fn().mockReturnValue(true),
      })
      .compile();

    controller = module.get<ChatCompletionController>(ChatCompletionController);
    chatService = module.get(ChatCompletionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('checkHealth should return service result', async () => {
    await expect(controller.checkHealth()).resolves.toEqual({ status: 'ok' });
    expect(chatService.checkHealth).toHaveBeenCalled();
  });

  it('createChatCompletion should call service with message and token', async () => {
    const mockToken = 'test-token';
    const result = await controller.createChatCompletion('hello', mockToken);

    expect(result).toEqual({ reply: 'hi' });
    expect(mockOrchestratorService.chat).toHaveBeenCalledWith('hello', mockToken);
  });
});