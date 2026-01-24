import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from 'joi';
import { PrismaModule } from './prisma/prisma.module';
import { LlmModelsModule } from './llm/models/llm-models.module';
import { TokenModule } from './llm/token/token.module';
import { DocScraperModule } from './doc-scraper/doc-scraper.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationsModule } from './notifications/notifications.module';
import { AiModule } from './ai/ai.module';
import { ChatCompletionModule } from './llm/chat-completion/chat-completion.module'; 
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        TELEGRAM_BOT_TOKEN: Joi.string().required(),
        MY_TELEGRAM_CHAT_ID: Joi.string().required(),
        FLOW_CLIENT_ID: Joi.string().required(),
        FLOW_CLIENT_SECRET: Joi.string().required(),
        FLOW_TENANT: Joi.string().required(),
        FLOW_AGENT: Joi.string().required(),
        FLOW_APP_TO_ACCESS: Joi.string().default('llm-api'),
        FRIGATE_URL: Joi.string().default('http://localhost:5000'),
        REDIS_HOST: Joi.string().default('localhost'),
        REDIS_PORT: Joi.number().default(6379),
      }),
    }),

    TelegramModule,

    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('FLOW_CLIENT_SECRET')!,
        signOptions: { expiresIn: '1h' },
        verifyOptions: {
          ignoreNotBefore: true,
        },
      }),
      inject: [ConfigService],
    }),

    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST')!,
          port: configService.get<number>('REDIS_PORT')!,
        },
      }),
      inject: [ConfigService],
    }),

    EventEmitterModule.forRoot(),
    PrismaModule,
    TokenModule,
    LlmModelsModule,
    DocScraperModule,
    WhatsappModule,
    NotificationsModule,
    AiModule,
    ChatCompletionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}