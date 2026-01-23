// src/ai/services/tool-discovery.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, ModuleRef } from '@nestjs/core';
import { AI_TOOL_METADATA, AiToolOptions } from '../../common/decorators/ai-tool.decorator';

@Injectable()
export class ToolDiscoveryService implements OnModuleInit {
  private tools: Map<string, { options: AiToolOptions; method: Function; target: any }> = new Map();

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    const providers = this.discoveryService.getProviders();

    providers.forEach((wrapper) => {
      const { instance } = wrapper;
      if (!instance || !Object.getPrototypeOf(instance)) return;

      this.metadataScanner.scanFromPrototype(
        instance,
        Object.getPrototypeOf(instance),
        (methodName) => {
          const metadata: AiToolOptions = Reflect.getMetadata(
            AI_TOOL_METADATA,
            instance[methodName],
          );

          if (metadata) {
            this.tools.set(metadata.name, {
              options: metadata,
              method: instance[methodName],
              target: instance,
            });
          }
        },
      );
    });
  }

  // Retorna o catálogo para enviar ao Flow/OpenAI
  getToolDefinitions() {
    return Array.from(this.tools.values()).map(t => t.options);
  }

  // Executa a função dinamicamente quando a IA solicitar
  async execute(name: string, args: any) {
    const tool = this.tools.get(name);
    if (!tool) throw new Error(`Tool ${name} not found`);
    
    // Executa o método no contexto correto do service
    return await tool.method.apply(tool.target, [args]);
  }
}