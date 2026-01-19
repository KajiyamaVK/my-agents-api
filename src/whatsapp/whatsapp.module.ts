import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';

@Module({
  providers: [WhatsappService],
  controllers: [WhatsappController],
  exports: [WhatsappService], // Export if you want other modules (like Agents) to use it later
})
export class WhatsappModule {}