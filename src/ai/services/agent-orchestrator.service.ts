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
    let choice = response.choices[0];

    // Orchestration loop using the 'function_call' legacy pattern
    while (choice.message.function_call) {
      const { name, arguments: argsString } = choice.message.function_call;
      const args = JSON.parse(argsString);

      this.logger.log(`Triggering Flow Tool: ${name}`);

      // Add the assistant's function call to history
      messages.push(choice.message);

      try {
        const output = await this.toolDiscovery.execute(name, args);
        
        // Add the result using the 'function' role
        messages.push({
          role: 'function',
          name: name,
          content: typeof output === 'string' ? output : JSON.stringify(output),
        });
      } catch (error) {
        this.logger.error(`Tool error: ${name}`, error.message);
        messages.push({
          role: 'function',
          name: name,
          content: JSON.stringify({ error: error.message }),
        });
      }

      // Get the final or next step from the Flow API
      response = await this.chatCompletion.createChatCompletion(messages, token, functions);
      choice = response.choices[0];
    }

    return choice.message.content;
  }
}