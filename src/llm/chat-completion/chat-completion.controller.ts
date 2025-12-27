import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatCompletionService } from './chat-completion.service';

@Controller('llm/chat-completion')
export class ChatCompletionController {
  constructor(private chatCompletionService: ChatCompletionService) {}

  @Get('health')
  checkHealth() {
    return this.chatCompletionService.checkHealth();
  }

  @Post()
  async createChatCompletion(@Body('message') message: string) {
    return await this.chatCompletionService.createChatCompletion(message);
  }
}
