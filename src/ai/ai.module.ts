// src/ai/ai.module.ts
import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { AgentOrchestratorService } from './services/agent-orchestrator.service';
import { ToolDiscoveryService } from './services/tool-discovery.service';
import { ChatCompletionModule } from '../llm/chat-completion/chat-completion.module';
import { ChatCompletionController } from 'src/llm/chat-completion/chat-completion.controller';
import { Prisma } from '@prisma/client';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RegistryService } from './services/registry.service';

@Module({
  imports: [
    // O DiscoveryModule é essencial para que o ToolDiscoveryService consiga 
    // escanear os providers e encontrar os métodos decorados com @AiTool
    DiscoveryModule,
    // Importamos o ChatCompletionModule para que o AgentOrchestratorService 
    // possa injetar o ChatCompletionService
    ChatCompletionModule,
    PrismaModule
  ],
  controllers: [ChatCompletionController],
  providers: [
    AgentOrchestratorService,
    ToolDiscoveryService,
    RegistryService
  ],
  // Exportamos o AgentOrchestratorService para que ele possa ser utilizado 
  // em controllers ou outros módulos da aplicação
  exports: [AgentOrchestratorService, RegistryService],
})
export class  AiModule {}