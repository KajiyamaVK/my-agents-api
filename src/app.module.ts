import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from 'joi';
import { ChatCompletionModule } from './llm/chat-completion/chat-completion.module';
import { PrismaModule } from './prisma/prisma.module';
import { LlmModelsModule } from './llm/models/llm-models.module';
import { TokenModule } from './llm/token/token.module';
import { DocScraperModule } from './doc-scraper/doc-scraper.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available everywhere
      validationSchema: Joi.object({
        FLOW_CLIENT_ID: Joi.string().required(),
        FLOW_CLIENT_SECRET: Joi.string().required(),
        FLOW_TENANT: Joi.string().required(),
        FLOW_AGENT: Joi.string().required(),
        FLOW_APP_TO_ACCESS: Joi.string().default('llm-api'), // Default if not provided
      }),
    }),
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
