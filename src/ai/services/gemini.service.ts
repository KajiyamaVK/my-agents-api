// src/ai/services/gemini.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { 
  GoogleGenerativeAI, 
  ChatSession, 
  Part, 
  GenerativeModel 
} from '@google/generative-ai';
import { AiToolOptions } from '../decorators/ai-tool.decorator';

export interface ToolCall {
  name: string;
  args: any;
}

export interface ParsedAiResponse {
  text: string;
  toolCalls: ToolCall[];
  chatInstance: ChatSession;
}

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;
  private readonly logger = new Logger(GeminiService.name);

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.getOrThrow<string>('GEMINI_API_KEY');
    this.genAI = new GoogleGenerativeAI(apiKey);
    
    // Configuração do modelo com parâmetros de segurança/temperatura se desejar
    this.model = this.genAI.getGenerativeModel({ 
      model: 'gemini-1.5-pro',
    });
  }

  async generateResponse(prompt: string, toolDefinitions: AiToolOptions[]): Promise<ParsedAiResponse> {
    const tools = toolDefinitions.length > 0 ? [{
      functionDeclarations: toolDefinitions.map(tool => ({
        name: tool.name,
        description: tool.description,
        parameters: tool.parameters,
      })),
    }] : [];

    const chat = this.model.startChat({ tools });
    const result = await chat.sendMessage(prompt);
    
    return this.parseResponse(result.response, chat);
  }

  async continueWithToolResults(chat: ChatSession, toolResponses: any[]): Promise<ParsedAiResponse> {
    const toolParts: Part[] = toolResponses.map(res => ({
      functionResponse: {
        name: res.name,
        response: { content: res.output }, // Enviamos como um objeto nomeado 'content'
      },
    }));

    const result = await chat.sendMessage(toolParts);
    return this.parseResponse(result.response, chat);
  }

  private parseResponse(response: any, chat: ChatSession): ParsedAiResponse {
    const candidate = response.candidates?.[0];
    const parts = candidate?.content?.parts || [];

    const toolCalls: ToolCall[] = parts
      .filter((p: any) => p.functionCall)
      .map((p: any) => ({
        name: p.functionCall.name,
        args: p.functionCall.args,
      }));

    // Safe text extraction: a IA pode retornar apenas functionCalls sem texto
    let text = '';
    try {
      text = response.text();
    } catch (e) {
      // Se não houver texto (apenas tool call), mantemos vazio para o orquestrador processar
      text = '';
    }

    return {
      text,
      toolCalls,
      chatInstance: chat,
    };
  }
}