import { Test, TestingModule } from '@nestjs/testing';
import { ChatCompletionController } from './chat-completion.controller';

describe('ChatCompletionController', () => {
  let controller: ChatCompletionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatCompletionController],
    }).compile();

    controller = module.get<ChatCompletionController>(ChatCompletionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
