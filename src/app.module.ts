import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from 'joi';
import { ChatCompletionModule } from './llm/chat-completion/chat-completion.module';
import { PrismaModule } from './prisma/prisma.module';
import { LlmModelsModule } from './llm/models/llm-models.module';
import { TokenModule } from './llm/token/token.module';
import { DocScraperModule } from './doc-scraper/doc-scraper.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationsModule } from './notifications/notifications.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available everywhere
      validationSchema: Joi.object({
        FLOW_CLIENT_ID: Joi.string().required(),
        FLOW_CLIENT_SECRET: Joi.string().required(),
        FLOW_TENANT: Joi.string().required(),
        FLOW_AGENT: Joi.string().required(),
        FLOW_APP_TO_ACCESS: Joi.string().default('llm-api'), 
        FRIGATE_URL: Joi.string().default('http://localhost:5000'),
      }),
    }),

    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    }),
    EventEmitterModule.forRoot(),

    PrismaModule,
    ChatCompletionModule,
    TokenModule,
    LlmModelsModule,
    DocScraperModule,
    WhatsappModule,
    NotificationsModule,
    AiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
