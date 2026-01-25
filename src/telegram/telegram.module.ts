// src/telegram/telegram.module.ts
import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { AiModule } from '../ai/ai.module';
import { TokenModule } from '../llm/token/token.module';
import { RegistryModule } from '../registry/registry.module'; // UPDATED IMPORT

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_BOT_TOKEN')!,
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
    AiModule,
    TokenModule,
    RegistryModule, // Added
  ],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}