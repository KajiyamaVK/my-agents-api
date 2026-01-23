// src/llm/chat-completion/chat-completion.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatCompletionService {
  constructor(private configService: ConfigService) {}

  /**
   * Creates a completion for the chat message using the Flow API.
   * Now accepts an array of messages to support conversation history and agent orchestration.
   */

  async createChatCompletion(messages: any[], token: string, functions?: any[]) {
    const flowTenant = this.configService.getOrThrow<string>('FLOW_TENANT');
    const flowAgent = this.configService.getOrThrow<string>('FLOW_AGENT');

    const body: any = {
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 4096,
      stream: false,
    };

    if (functions && functions.length > 0) {
      body.functions = functions;
      body.function_call = 'auto';
    }

    try {
      const response = await fetch('https://flow.ciandt.com/ai-orchestration-api/v1/openai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'FlowTenant': flowTenant,
          'FlowAgent': flowAgent,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.text();
        return { status: 'error', details: `Status ${response.status}: ${error}` };
      }

      return await response.json();
    } catch (error) {
      return { status: 'error', details: error.message };
    }}

  async checkHealth() {
    const url = 'https://flow.ciandt.com/ai-orchestration-api/v1/health';
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      
      if (response.ok) {
        return { status: 'ok' };
      } else {
        return {
          status: 'error',
          details: `Status code: ${response.status}`,
        };
      }
    } catch (error) {
      return { status: 'error', details: error.message };
    }
  }
}