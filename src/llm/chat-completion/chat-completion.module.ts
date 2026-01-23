import { Module } from '@nestjs/common';
import { ChatCompletionService } from './chat-completion.service';

@Module({
  providers: [ChatCompletionService],
  exports: [ChatCompletionService],
})
export class ChatCompletionModule {}
