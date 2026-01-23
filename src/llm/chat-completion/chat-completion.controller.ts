import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ChatCompletionService } from './chat-completion.service';
import { AgentOrchestratorService } from '../../ai/services/agent-orchestrator.service';
import { FlowAuthGuard } from 'src/common/guards/flow.guard';
import { Token } from 'src/common/decorators/token.decorator';

@Controller('llm/chat-completion')
@UseGuards(FlowAuthGuard)
export class ChatCompletionController {
  constructor(
    private readonly chatCompletionService: ChatCompletionService,
    private readonly agentOrchestratorService: AgentOrchestratorService,
  ) {}

  @Get('health')
  checkHealth() {
    // Mantemos o health check vindo do service base
    return this.chatCompletionService.checkHealth();
  }

  @Post()
  async createChatCompletion(
    @Body('message') message: string,
    @Token() token: string,
  ) {
    // BEST PRACTICE: Usamos o Orchestrator para permitir Tool Calling (WhatsApp, Câmeras, etc)
    const result = await this.agentOrchestratorService.chat(message, token);
    
    // Retornamos no formato simplificado esperado pelo seu front-end
    return {
      reply: result,
    };
  }
}