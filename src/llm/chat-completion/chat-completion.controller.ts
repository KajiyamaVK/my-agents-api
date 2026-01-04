import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ChatCompletionService } from './chat-completion.service';
import { FlowAuthGuard } from 'src/common/guards/flow.guard';
import { Token } from 'src/common/decorators/token.decorator';

@Controller('llm/chat-completion')
@UseGuards(FlowAuthGuard)
export class ChatCompletionController {
  constructor(private chatCompletionService: ChatCompletionService) {}

  @Get('health')
  checkHealth() {
    return this.chatCompletionService.checkHealth();
  }

  @Post()
  @UseGuards(FlowAuthGuard)
  async createChatCompletion(
    @Body('message') message: string,
    @Token() token: string,
  ) {
    return await this.chatCompletionService.createChatCompletion(
      message,
      token,
    );
  }
}
