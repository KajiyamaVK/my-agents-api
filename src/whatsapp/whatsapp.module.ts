// src/whatsapp/whatsapp.module.ts
import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';
import { RegistryModule } from '../registry/registry.module'; // Changed
import { AiModule } from '../ai/ai.module'; // Keep for other AI features if needed

@Module({
  imports: [RegistryModule, AiModule],
  providers: [WhatsappService],
  controllers: [WhatsappController],
  exports: [WhatsappService],
})
export class WhatsappModule {}