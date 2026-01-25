// src/telegram/telegram.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TelegramService } from './telegram.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AgentOrchestratorService } from '../ai/services/agent-orchestrator.service';
import { TokenService } from '../llm/token/token.service';
import { RegistryService } from '../registry/registry.service';
import { getBotToken } from 'nestjs-telegraf';
import { Context } from 'telegraf';

// Mock do Contexto do Telegraf
const mockContext = (chatId: string, text: string = '') => ({
  chat: { id: chatId },
  reply: jest.fn(),
  message: { text },
  match: [null, '12345'], // Mock para regex match (userId)
  answerCbQuery: jest.fn(),
  editMessageText: jest.fn(),
  telegram: {
    sendMessage: jest.fn(),
  },
} as unknown as Context);

describe('TelegramService', () => {
  let service: TelegramService;
  let prisma: PrismaService;
  let bot: any;

  const mockPrisma = {
    contact: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockAgentOrchestrator = {
    chat: jest.fn(),
  };

  const mockTokenService = {
    createToken: jest.fn().mockResolvedValue({ access_token: 'mock_token' }),
  };

  const mockRegistryService = {
    resolveCamera: jest.fn(),
  };

  const mockBot = {
    telegram: {
      setMyCommands: jest.fn(),
      sendMessage: jest.fn(),
      sendPhoto: jest.fn(),
    },
  };

  const mockConfig = {
    get: jest.fn((key) => {
      if (key === 'MY_TELEGRAM_CHAT_ID') return '999'; // Admin ID
      if (key === 'FRIGATE_URL') return 'http://frigate';
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TelegramService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: AgentOrchestratorService, useValue: mockAgentOrchestrator },
        { provide: TokenService, useValue: mockTokenService },
        { provide: RegistryService, useValue: mockRegistryService },
        { provide: ConfigService, useValue: mockConfig },
        { provide: getBotToken(), useValue: mockBot },
      ],
    }).compile();

    service = module.get<TelegramService>(TelegramService);
    prisma = module.get<PrismaService>(PrismaService);
    bot = module.get(getBotToken());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onStart', () => {
    it('should recognize admin', async () => {
      const ctx = mockContext('999'); // ID do Admin
      await service.onStart(ctx);
      expect(ctx.reply).toHaveBeenCalledWith(expect.stringContaining('Admin reconhecido'));
    });

    it('should creates normal user greeting', async () => {
      const ctx = mockContext('123'); // User comum
      await service.onStart(ctx);
      expect(ctx.reply).toHaveBeenCalledWith(expect.stringContaining('Seu Chat ID: 123'));
      expect(ctx.reply).not.toHaveBeenCalledWith(expect.stringContaining('Admin reconhecido'));
    });
  });

  describe('onMessage (Registration Flow)', () => {
    it('should create a new contact if not exists', async () => {
      mockPrisma.contact.findUnique.mockResolvedValue(null);
      mockPrisma.contact.create.mockResolvedValue({
        id: 1,
        telegramChatId: '123',
        onboardingStep: 'AWAITING_NAME',
        isApproved: false,
      });

      const ctx = mockContext('123', 'Oi');
      await service.onMessage('Oi', ctx);

      expect(mockPrisma.contact.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          telegramChatId: '123',
          whatsappId: null, // Verificando mudança do schema
          onboardingStep: 'AWAITING_NAME',
        }),
      });
      expect(ctx.reply).toHaveBeenCalledWith('Olá! Qual o seu nome?');
    });

    it('should handle onboarding name step', async () => {
      mockPrisma.contact.findUnique.mockResolvedValue({
        id: 1,
        telegramChatId: '123',
        onboardingStep: 'AWAITING_NAME',
        isApproved: false,
      });

      const ctx = mockContext('123', 'John Doe');
      await service.onMessage('John Doe', ctx);

      expect(mockPrisma.contact.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { alias: 'John Doe', onboardingStep: 'AWAITING_AGE' },
      });
      expect(ctx.reply).toHaveBeenCalledWith('Qual sua idade?');
    });
  });

  describe('Admin Approval Flow', () => {
    it('should initiate pre-approval and ask for description', async () => {
      const ctx = mockContext('999'); // Admin
      (ctx as any).match = [null, '123']; // User ID to approve

      await service.onPreApprove(ctx);

      // Verifica se o estado foi salvo (acessando propriedade privada via cast ou inferência de comportamento)
      expect(ctx.reply).toHaveBeenCalledWith(
        expect.stringContaining('Digite uma descrição'),
        expect.anything()
      );
    });

    it('should finalize approval with description when Admin replies', async () => {
      // 1. Setup State
      const ctxPre = mockContext('999');
      (ctxPre as any).match = [null, '123'];
      await service.onPreApprove(ctxPre); // Seta o estado interno

      // 2. Admin envia a descrição
      const ctxDesc = mockContext('999', 'Amigo do trabalho');
      
      // Mock para o update final
      mockPrisma.contact.update.mockResolvedValue({});

      await service.onMessage('Amigo do trabalho', ctxDesc);

      expect(mockPrisma.contact.update).toHaveBeenCalledWith({
        where: { telegramChatId: '123' },
        data: { 
          isApproved: true, 
          onboardingStep: 'NONE', 
          description: 'Amigo do trabalho' 
        },
      });
      expect(ctxDesc.reply).toHaveBeenCalledWith(expect.stringContaining('aprovado com sucesso'));
    });
  });
});