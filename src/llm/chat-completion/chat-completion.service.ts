import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatCompletionService {
  //Receives a string param that is the message
  async createChatCompletion(message: string) {
    const token = process.env.FLOW_TOKEN;
    const flowTenant = process.env.FLOW_TENANT;
    const flowAgent = process.env.FLOW_AGENT;

    let data = JSON.stringify({
      stream: false,
      max_tokens: 4096,
      temperature: 0.7,
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://flow.ciandt.com/ai-orchestration-api/v1/openai/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        FlowTenant: flowTenant || '',
        FlowAgent: flowAgent || '',
      },
      data: data,
    };

    const createChatCompletionResponse = async () => {
      try {
        const response = await fetch(config.url!, {
          method: config.method,
          headers: config.headers,
          body: config.data,
        });
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          return {
            status: 'error',
            details: `Status code: ${response.status}`,
          };
        }
      } catch (error) {
        return { status: 'error', details: error.message };
      }
    };

    return await createChatCompletionResponse();
  }

  checkHealth() {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://flow.ciandt.com/ai-orchestration-api/v1/health',
      headers: {
        Accept: 'application/json',
      },
    };

    const checkHealthResponse = async () => {
      try {
        const response = await fetch(config.url!, {
          method: config.method,
          headers: config.headers,
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
    };

    return checkHealthResponse();
  }
}
