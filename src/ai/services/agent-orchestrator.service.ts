// src/ai/services/agent-orchestrator.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ToolDiscoveryService } from './tool-discovery.service';
import { GeminiService } from './gemini.service';

export interface ToolExecutionResult {
  name: string;
  output: any;
}

@Injectable()
export class AgentOrchestratorService {
  private readonly logger = new Logger(AgentOrchestratorService.name);

  constructor(
    private readonly toolDiscovery: ToolDiscoveryService,
    private readonly gemini: GeminiService,
  ) {}

  async chat(userPrompt: string) {
    const tools = this.toolDiscovery.getToolDefinitions();

    // 1. Chamada inicial para o Gemini
    let { text, toolCalls, chatInstance } = await this.gemini.generateResponse(userPrompt, tools);

    // O "LISTENER" de chamadas de função
    while (toolCalls && toolCalls.length > 0) {
      const results: ToolExecutionResult[] = [];

      for (const call of toolCalls) {
        this.logger.log(`Executando tool: ${call.name} com args: ${JSON.stringify(call.args)}`);
        
        try {
          // 2. Executa a função real no service decorado
          const output = await this.toolDiscovery.execute(call.name, call.args);
          
          results.push({
            name: call.name,
            output: output, // O GeminiService tratará o stringify se necessário
          });
        } catch (error) {
          this.logger.error(`Erro ao executar tool ${call.name}:`, error.message);
          results.push({
            name: call.name,
            output: { error: error.message }, // Informa o erro à IA para ela tentar corrigir
          });
        }
      }

      // 3. ATUALIZAÇÃO CRÍTICA: Envia os resultados e pega o próximo estado da IA
      const nextStep = await this.gemini.continueWithToolResults(chatInstance, results);
      
      text = nextStep.text;
      toolCalls = nextStep.toolCalls;
      // chatInstance continua o mesmo objeto, mas o histórico interno dele foi atualizado
    }

    // 4. Retorna a resposta final em linguagem natural
    return text;
  }
}