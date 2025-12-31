import { Module } from '@nestjs/common';
import { LlmModelsController } from './llm-models.controller';
import { LlmModelsService } from './llm-models.service';

@Module({
  controllers: [LlmModelsController],
  providers: [LlmModelsService],
  exports: [LlmModelsService],
})
export class LlmModelsModule {}
