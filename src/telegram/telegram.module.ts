import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { AiModule } from '../ai/ai.module';
import { TokenModule } from '../llm/token/token.module'; // Ensure TokenService is also available if needed

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
    AiModule, // Required for RegistryService
    TokenModule,
  ],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}