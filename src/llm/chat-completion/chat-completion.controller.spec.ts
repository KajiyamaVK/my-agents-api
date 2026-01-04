import { Test, TestingModule } from '@nestjs/testing';
import { ChatCompletionController } from './chat-completion.controller';
import { ChatCompletionService } from './chat-completion.service';
import { FlowAuthGuard } from 'src/commom/guards/flow.guard';

describe('ChatCompletionController', () => {
  let controller: ChatCompletionController;
  let chatService: any;

  beforeEach(async () => {
    const mockChatService = {
      checkHealth: jest.fn().mockResolvedValue({ status: 'ok' }),
      createChatCompletion: jest.fn().mockResolvedValue({ reply: 'hi' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatCompletionController],
      providers: [
        { provide: ChatCompletionService, useValue: mockChatService },
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
    await expect(
      controller.createChatCompletion('hello', mockToken),
    ).resolves.toEqual({
      reply: 'hi',
    });
    expect(chatService.createChatCompletion).toHaveBeenCalledWith(
      'hello',
      mockToken,
    );
  });
});
