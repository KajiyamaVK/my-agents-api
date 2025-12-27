import { Controller, Post } from '@nestjs/common';
import { ChatCompletionService } from './chat-completion.service';

@Controller('chat-completion')
export class ChatCompletionController {
  constructor(private chatCompletionService: ChatCompletionService) {}
  @Post()
  createChatCompletion() {
    return this.chatCompletionService.createChatCompletion();
  }
}
