// src/ai/services/agent-orchestrator.service.ts
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ToolDiscoveryService } from './tool-discovery.service';
import { ChatCompletionService } from '../../llm/chat-completion/chat-completion.service';

@Injectable()
export class AgentOrchestratorService {
  private readonly logger = new Logger(AgentOrchestratorService.name);

  constructor(
    private readonly toolDiscovery: ToolDiscoveryService,
    private readonly chatCompletion: ChatCompletionService, 
  ) {}

  async chat(userPrompt: string, token: string) {
    const functions = this.toolDiscovery.getToolDefinitions();
    const messages: any[] = [{ role: 'user', content: userPrompt }];

    let response = await this.chatCompletion.createChatCompletion(messages, token, functions);
    
    // Initial error check
    if (!response || response.status === 'error') {
      throw new HttpException(response?.details || 'LLM Provider Error', HttpStatus.BAD_REQUEST);
    }

    let choice = response.choices[0];

    // BEST PRACTICE: Support both modern tool_calls and legacy function_call
    while (choice.message.function_call || (choice.message.tool_calls && choice.message.tool_calls.length > 0)) {
      
      // Add assistant's call to history
      messages.push(choice.message);

      // 1. Handle Legacy Format (function_call)
      if (choice.message.function_call) {
        const { name, arguments: argsString } = choice.message.function_call;
        await this.executeTool(name, argsString, messages, null);
      }

      // 2. Handle Modern Format (tool_calls - allows parallel execution)
      if (choice.message.tool_calls) {
        for (const tool of choice.message.tool_calls) {
          const { name, arguments: argsString } = tool.function;
          await this.executeTool(name, argsString, messages, tool.id);
        }
      }

      // Re-trigger completion with the result history
      response = await this.chatCompletion.createChatCompletion(messages, token, functions);
      
      // CRITICAL: Check for errors inside the loop (e.g., token expiration after tool run)
      if (!response || response.status === 'error') {
        throw new HttpException(response?.details || 'LLM Error during orchestration', HttpStatus.UNAUTHORIZED);
      }
      
      choice = response.choices[0];
    }

    // Fallback: If the model finishes without text, provide a default confirmation
    const finalReply = choice.message.content || 'Processamento concluído com sucesso.';
    this.logger.log(`Orchestration finished. Reply: ${finalReply}`);
    
    return finalReply;
  }

  private async executeTool(name: string, argsString: string, messages: any[], toolId: string | null) {
    try {
      const args = JSON.parse(argsString);
      this.logger.log(`Executing tool: ${name}`);
      
      const output = await this.toolDiscovery.execute(name, args);
      const content = typeof output === 'string' ? output : JSON.stringify(output);

      // Add result with proper role based on API version
      messages.push({
        role: toolId ? 'tool' : 'function',
        name: name,
        tool_call_id: toolId,
        content: content,
      });
    } catch (error) {
      this.logger.error(`Tool execution failed [${name}]: ${error.message}`);
      messages.push({
        role: toolId ? 'tool' : 'function',
        name: name,
        tool_call_id: toolId,
        content: JSON.stringify({ error: error.message }),
      });
    }
  }
}