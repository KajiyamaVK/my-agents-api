import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatCompletionModule } from './llm/chat-completion/chat-completion.module';
import { PrismaModule } from './prisma/prisma.module';
import { LlmModelsModule } from './llm/models/llm-models.module';
import { TokenModule } from './llm/token/token.module';
import { DocScraperModule } from './doc-scraper/doc-scraper.module';

@Module({
  imports: [
    PrismaModule,
    ChatCompletionModule,
    TokenModule,
    LlmModelsModule,
    DocScraperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
