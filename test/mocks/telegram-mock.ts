import { getBotToken } from 'nestjs-telegraf';

// This mock replaces the real Telegraf instance
export const mockTelegraf = {
  telegram: {
    sendMessage: jest.fn().mockResolvedValue({}),
    sendPhoto: jest.fn().mockResolvedValue({}),
  },
  launch: jest.fn().mockResolvedValue({}),
  stop: jest.fn().mockResolvedValue({}),
};

// This helps us override the provider in E2E tests
export const TelegramMockProvider = {
  provide: getBotToken(),
  useValue: mockTelegraf,
};