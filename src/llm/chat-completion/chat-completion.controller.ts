import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ChatCompletionService } from './chat-completion.service';
import { FlowAuthGuard } from 'src/common/guards/flow.guard';
import { Token } from 'src/common/decorators/token.decorator';
import { AgentOrchestratorService } from 'src/ai/services/agent-orchestrator.service';

@Controller('llm/chat-completion')
@UseGuards(FlowAuthGuard)
export class ChatCompletionController {
  constructor(private chatCompletionService: ChatCompletionService, private agentOrchestratorService: AgentOrchestratorService) {}

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
    const result = await this.agentOrchestratorService.chat(message, token);
    return { reply: result };
  }
}
