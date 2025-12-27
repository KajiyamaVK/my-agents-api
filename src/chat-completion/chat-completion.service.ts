import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatCompletionService {
  createChatCompletion() {
    return { message: 'Chat completion created' };
  }
}
