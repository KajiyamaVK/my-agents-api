// src/ai/services/agent-orchestrator.service.ts
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ToolDiscoveryService } from './tool-discovery.service';
import { ChatCompletionService } from '../../llm/chat-completion/chat-completion.service';
import { TokenService } from '../../llm/token/token.service';

@Injectable()
export class AgentOrchestratorService {
  private readonly logger = new Logger(AgentOrchestratorService.name);

  constructor(
    private readonly toolDiscovery: ToolDiscoveryService,
    private readonly chatCompletion: ChatCompletionService, 
    private readonly tokenService: TokenService,
  ) {}

  async chat(userPrompt: string, token: string) {
    const functions = this.toolDiscovery.getToolDefinitions();
    const messages: any[] = [{ role: 'user', content: userPrompt }];

    // Use activeToken so it can be updated if a refresh happens mid-orchestration
    let activeToken = token;

    // Helper to call LLM with automatic 1-time retry on 401 Unauthorized
    const callLlmWithRetry = async () => {
      let res = await this.chatCompletion.createChatCompletion(messages, activeToken, functions);
      
      // If the provider returns a 401, we attempt to get a fresh token from our TokenService
      if (res?.status === 'error' && res.details?.includes('Status 401')) {
        this.logger.warn('Token expired mid-orchestration. Requesting fresh token from TokenService...');
        
        const tokenResponse = await this.tokenService.createToken();
        
        if (tokenResponse && tokenResponse.access_token) {
          activeToken = tokenResponse.access_token;
          this.logger.log('Token refreshed successfully. Retrying LLM call.');
          // Retry exactly once with the new token
          res = await this.chatCompletion.createChatCompletion(messages, activeToken, functions);
        } else {
          this.logger.error(`Token refresh failed: ${tokenResponse?.details || 'Unknown error'}`);
        }
      }
      return res;
    };

    // Initial completion call
    let response = await callLlmWithRetry();
    
    if (!response || response.status === 'error') {
      throw new HttpException(
        response?.details || 'LLM Provider Error', 
        response?.details?.includes('Status 401') ? HttpStatus.UNAUTHORIZED : HttpStatus.BAD_REQUEST
      );
    }

    let choice = response.choices[0];

    // Orchestration loop: handles both legacy function_call and modern tool_calls
    while (choice.message.function_call || (choice.message.tool_calls && choice.message.tool_calls.length > 0)) {
      
      // Add assistant's tool call to history
      messages.push(choice.message);

      // 1. Handle Legacy Format (function_call)
      if (choice.message.function_call) {
        const { name, arguments: argsString } = choice.message.function_call;
        await this.executeTool(name, argsString, messages, null);
      }

      // 2. Handle Modern Format (tool_calls - supports parallel execution)
      if (choice.message.tool_calls) {
        for (const tool of choice.message.tool_calls) {
          const { name, arguments: argsString } = tool.function;
          await this.executeTool(name, argsString, messages, tool.id);
        }
      }

      // Re-trigger completion with the result history using the retry helper
      response = await callLlmWithRetry();
      
      if (!response || response.status === 'error') {
        throw new HttpException(
          response?.details || 'LLM Error during orchestration', 
          response?.details?.includes('Status 401') ? HttpStatus.UNAUTHORIZED : HttpStatus.BAD_REQUEST
        );
      }
      
      choice = response.choices[0];
    }

    // Return the final text content, or a default message if the model finished without content
    const finalReply = choice.message.content || 'Processamento concluído com sucesso.';
    
    // BEST PRACTICE: Added safety check for null/undefined token before logging slice
    const tokenPreview = activeToken ? `...${activeToken.slice(-10)}` : 'None';
    this.logger.log(`Orchestration finished. Final token used: ${tokenPreview}`);
    
    return finalReply;
  }

  private async executeTool(name: string, argsString: string, messages: any[], toolId: string | null) {
    try {
      const args = JSON.parse(argsString);
      
      // BEST PRACTICE: Enhanced logging for tool execution and input observability
      this.logger.log(`Executing tool: ${name} | Args: ${argsString}`);
      
      const output = await this.toolDiscovery.execute(name, args);
      const content = typeof output === 'string' ? output : JSON.stringify(output);

      // Log the result to see what the tool returned to the orchestrator
      this.logger.log(`Tool [${name}] output: ${content.substring(0, 100)}${content.length > 100 ? '...' : ''}`);

      // Add result with proper role: 'tool' for tool_calls, 'function' for legacy
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