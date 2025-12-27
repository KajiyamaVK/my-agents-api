import { Controller, Get, Post } from '@nestjs/common';
import { LlmModelsService } from './llm-models.service';

@Controller('llm/models')
export class LlmModelsController {
  constructor(private llmModelsService: LlmModelsService) {}
  @Get('health')
  checkHealth() {
    return this.llmModelsService.checkHealth();
  }

  @Get()
  getLlmModels() {
    return this.llmModelsService.getLlmModels();
  }
}
