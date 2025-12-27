import { Injectable } from '@nestjs/common';

export interface Model {
  id: string;
  name: string;
  provider: string;
}

@Injectable()
export class LlmModelsService {
  async getLlmModels() {
    const token = process.env.FLOW_TOKEN;

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://flow.ciandt.com/ai-orchestration-api/v1/models',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const getLlmModelsResponse = async () => {
      try {
        const response = await fetch(config.url!, {
          method: config.method,
          headers: config.headers,
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

    const models = await getLlmModelsResponse();

    // const response = models;
    const openAiModels = [
      'gpt-4',
      'gpt-5',
      'gpt-4o',
      'gpt-4o-mini',
      'gpt-3.5-turbo',
      'gpt-3.5-turbo-16k',
      'gpt-3.5-turbo-0613',
      'whisper',
      'text-embedding-ada-002',
      'dall-e-3',
      'gpt-4.1',
      'o3-mini',
      'dall-e-3',
      'o1',
      'text-embedding-3-small',
    ];

    const deepSeekModels = ['deepseek-1', 'deepseek-2', 'deepseek-r1'];

    const grokModels = ['grok-1', 'grok-1.5', 'grok-3'];

    const response: Model[] = [];

    models.map((model) => {
      let provider = '';

      if (
        openAiModels.includes(model.name.toLowerCase()) ||
        model.provider.toLowerCase().includes('openai')
      ) {
        provider = 'openai';
      } else if (grokModels.includes(model.name.toLowerCase())) {
        provider = 'grok';
      } else if (deepSeekModels.includes(model.name.toLowerCase())) {
        provider = 'deepseek';
      } else if (model.provider.includes('google')) {
        provider = 'google';
      } else if (model.provider.includes('amazon')) {
        provider = 'amazon';
      }

      response.push({
        id: model.id,
        name: model.name,
        provider: provider || model.provider,
      });
    });

    return response;
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
