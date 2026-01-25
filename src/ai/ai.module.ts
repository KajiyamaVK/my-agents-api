// src/ai/ai.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { AgentOrchestratorService } from './services/agent-orchestrator.service';
import { ToolDiscoveryService } from './services/tool-discovery.service';
import { ChatCompletionModule } from '../llm/chat-completion/chat-completion.module';
import { RegistryModule } from '../registry/registry.module'; // Changed
import { PrismaModule } from '../prisma/prisma.module';
import { TokenModule } from '../llm/token/token.module';

@Module({
  imports: [
    DiscoveryModule,
    PrismaModule,
    RegistryModule, // Import the module instead of providing the service
    forwardRef(() => ChatCompletionModule), 
    TokenModule,
  ],
  providers: [
    AgentOrchestratorService,
    ToolDiscoveryService,
    // RegistryService removed from here as it is imported via RegistryModule
  ],
  exports: [AgentOrchestratorService], // RegistryService is exported by RegistryModule, no need to export here unless re-exporting
})
export class AiModule {}