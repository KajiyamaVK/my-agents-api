// src/ai/ai.module.ts
import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { AgentOrchestratorService } from './services/agent-orchestrator.service';
import { ToolDiscoveryService } from './services/tool-discovery.service';
import { ChatCompletionModule } from '../llm/chat-completion/chat-completion.module';
import { RegistryService } from './services/registry.service'; // Importe o serviço
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    DiscoveryModule,
    ChatCompletionModule,
    PrismaModule,
  ],
  providers: [
    AgentOrchestratorService,
    ToolDiscoveryService,
    RegistryService, 
  ],
  exports: [
    AgentOrchestratorService, 
    RegistryService
  ],
})
export class AiModule {}