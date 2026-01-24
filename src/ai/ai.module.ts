import { Module, forwardRef } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { AgentOrchestratorService } from './services/agent-orchestrator.service';
import { ToolDiscoveryService } from './services/tool-discovery.service';
import { ChatCompletionModule } from '../llm/chat-completion/chat-completion.module';
import { RegistryService } from './services/registry.service';
import { PrismaModule } from '../prisma/prisma.module';
import { TokenModule } from '../llm/token/token.module';

@Module({
  imports: [
    DiscoveryModule,
    PrismaModule,
    forwardRef(() => ChatCompletionModule), 
    TokenModule,
  ],
  providers: [
    AgentOrchestratorService,
    ToolDiscoveryService,
    RegistryService,
  ],
  exports: [AgentOrchestratorService, RegistryService],
})
export class AiModule {}