import { Module } from '@nestjs/common';
import { ChatCompletionController } from './chat-completion.controller';
import { ChatCompletionService } from './chat-completion.service';

@Module({
  controllers: [ChatCompletionController],
  providers: [ChatCompletionService],
  exports: [ChatCompletionService],
})
export class ChatCompletionModule {}
