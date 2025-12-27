import { Test, TestingModule } from '@nestjs/testing';
import { ChatCompletionService } from './chat-completion.service';

describe('ChatCompletionService', () => {
  let service: ChatCompletionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatCompletionService],
    }).compile();

    service = module.get<ChatCompletionService>(ChatCompletionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
