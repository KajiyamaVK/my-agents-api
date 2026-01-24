import { getBotToken } from 'nestjs-telegraf';

const mockTelegraf = {
  telegram: {
    sendMessage: jest.fn().mockResolvedValue({}),
    sendPhoto: jest.fn().mockResolvedValue({}),
  },
  // These are the missing methods causing the "bot.use" error
  use: jest.fn().mockReturnThis(),
  on: jest.fn().mockReturnThis(),
  command: jest.fn().mockReturnThis(),
  start: jest.fn().mockReturnThis(),
  help: jest.fn().mockReturnThis(),
  launch: jest.fn().mockResolvedValue({}),
  stop: jest.fn().mockResolvedValue({}),
};

// This helps us override the provider in E2E tests
export const TelegramMockProvider = {
  provide: getBotToken(),
  useValue: mockTelegraf,
};