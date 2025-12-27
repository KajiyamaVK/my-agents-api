import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatCompletionController } from './llm/chat-completion/chat-completion.controller';
import { ChatCompletionService } from './llm/chat-completion/chat-completion.service';
import { PrismaModule } from './prisma/prisma.module';
import { LlmModelsController } from './llm/models/llm-models.controller';
import { LlmModelsService } from './llm/models/llm-models.service';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, ChatCompletionController, LlmModelsController],
  providers: [AppService, ChatCompletionService, LlmModelsService],
})
export class AppModule {}
