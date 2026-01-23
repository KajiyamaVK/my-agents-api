import { Module, forwardRef } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { AgentOrchestratorService } from './services/agent-orchestrator.service';
import { ToolDiscoveryService } from './services/tool-discovery.service';
import { ChatCompletionModule } from '../llm/chat-completion/chat-completion.module';
import { RegistryService } from './services/registry.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    DiscoveryModule,
    PrismaModule,
    forwardRef(() => ChatCompletionModule), // Permite injeção mútua sem erro de circularidade
  ],
  providers: [
    AgentOrchestratorService,
    ToolDiscoveryService,
    RegistryService,
  ],
  exports: [AgentOrchestratorService, RegistryService],
})
export class AiModule {}