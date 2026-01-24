import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegramService } from './telegram.service';
import { PrismaModule } from '../prisma/prisma.module'; // Importar PrismaModule

@Module({
  imports: [
    PrismaModule, //
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_BOT_TOKEN')!,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [TelegramService],
})
export class TelegramModule {}