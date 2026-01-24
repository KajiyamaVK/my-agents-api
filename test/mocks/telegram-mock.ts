import { getBotToken } from 'nestjs-telegraf';

const mockTelegraf = {
  telegram: {
    sendMessage: jest.fn().mockResolvedValue({}),
    sendPhoto: jest.fn().mockResolvedValue({}),
  },
  // Essential: satisfies nestjs-telegraf's internal listener discovery
  use: jest.fn().mockReturnThis(),
  on: jest.fn().mockReturnThis(),
  command: jest.fn().mockReturnThis(),
  start: jest.fn().mockReturnThis(),
  help: jest.fn().mockReturnThis(),
  // Lifecycle methods
  launch: jest.fn().mockResolvedValue({}),
  stop: jest.fn().mockResolvedValue({}),
};

// This helps us override the provider in E2E tests
export const TelegramMockProvider = {
  provide: getBotToken(),
  useValue: mockTelegraf,
};