import { Module, forwardRef } from '@nestjs/common';
import { ChatCompletionService } from './chat-completion.service';
import { AiModule } from '../../ai/ai.module';
import { ChatCompletionController } from './chat-completion.controller';

@Module({
  imports: [forwardRef(() => AiModule)],
  controllers: [ChatCompletionController],
  providers: [ChatCompletionService],
  exports: [ChatCompletionService],
})
export class ChatCompletionModule {}