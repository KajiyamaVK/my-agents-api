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
  async createChatCompletion(messages: any[], token: string, functionDefinitions?: any[]) {
    const flowTenant = this.configService.get<string>('FLOW_TENANT');
    const flowAgent = this.configService.get<string>('FLOW_AGENT');

    // Prepare the request body according to Flow API documentation
    const body: any = {
      model: 'gpt-4o-mini',
      messages: messages, // Receives the full history for agentic loops
      temperature: 0.7,
      max_tokens: 4096,
      stream: false,
    };

    // Use legacy 'functions' property instead of 'tools' per Flow documentation
    if (functionDefinitions && functionDefinitions.length > 0) {
      body.functions = functionDefinitions.map(f => ({
        name: f.name,
        description: f.description,
        parameters: f.parameters,
      }));
      body.function_call = 'auto'; // Model determines when to use a tool
    }

    const url = 'https://flow.ciandt.com/ai-orchestration-api/v1/openai/chat/completions';
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'FlowTenant': flowTenant || '',
      'FlowAgent': flowAgent || '',
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body), // Stringify only when sending the request
      });

      if (response.ok) {
        return await response.json();
      } else {
        const errorText = await response.text();
        return {
          status: 'error',
          details: `Status code: ${response.status} - ${errorText}`,
        };
      }
    } catch (error) {
      return { status: 'error', details: error.message };
    }
  }

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