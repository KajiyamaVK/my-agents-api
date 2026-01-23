// src/ai/services/agent-orchestrator.service.ts
import { Injectable, Logger } from '@nestjs/common';
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
    
    // Check for Flow API error response
    if (response.status === 'error') throw new Error(response.details);

    let choice = response.choices[0];

    // Orchestration loop: as long as the model wants to call a function
    while (choice.message.function_call) {
      const { name, arguments: argsString } = choice.message.function_call;
      const args = JSON.parse(argsString);

      this.logger.log(`Executing tool: ${name}`);

      // Add the model's call to history
      messages.push(choice.message);

      try {
        const output = await this.toolDiscovery.execute(name, args);
        
        // Add function result to history with role 'function'
        messages.push({
          role: 'function',
          name: name,
          content: typeof output === 'string' ? output : JSON.stringify(output),
        });
      } catch (error) {
        messages.push({
          role: 'function',
          name: name,
          content: JSON.stringify({ error: error.message }),
        });
      }

      // Re-trigger completion with the new history
      response = await this.chatCompletion.createChatCompletion(messages, token, functions);
      choice = response.choices[0];
    }

    return choice.message.content;
  }
}