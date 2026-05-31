import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { TelegramService } from '../telegram/telegram.service';
import { WhatsappService } from '../whatsapp/whatsapp.service';
import { FrigateFixerService } from './frigate-fixer.service';
import { LocalNetworkGuard } from '../common/guards/local-network.guard';
import { ExecutionContext } from '@nestjs/common';

describe('NotificationsController - frigate-down', () => {
  let controller: NotificationsController;

  const mockTelegramService = { sendMessage: jest.fn() };
  const mockWhatsappService = { sendCameraSnapshotToSelf: jest.fn() };
  const mockFrigateFixerService = { runFrigateFix: jest.fn() };
  const mockGuard = { canActivate: (_ctx: ExecutionContext) => true };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [
        { provide: TelegramService, useValue: mockTelegramService },
        { provide: WhatsappService, useValue: mockWhatsappService },
        { provide: FrigateFixerService, useValue: mockFrigateFixerService },
      ],
    })
      .overrideGuard(LocalNetworkGuard)
      .useValue(mockGuard)
      .compile();

    controller = module.get<NotificationsController>(NotificationsController);
  });

  it('should return 202 status object immediately', async () => {
    mockFrigateFixerService.runFrigateFix.mockResolvedValue({ success: true, reason: 'success', output: 'Fixed' });

    const result = await controller.handleFrigateDown();
    expect(result).toEqual({ status: 'Fix initiated' });
  });

  it('should send down alert and success message when fix succeeds', async () => {
    mockFrigateFixerService.runFrigateFix.mockResolvedValue({ success: true, reason: 'success', output: 'All good' });

    await controller.handleFrigateDown();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(mockTelegramService.sendMessage).toHaveBeenCalledWith(expect.stringContaining('offline'));
    expect(mockTelegramService.sendMessage).toHaveBeenCalledWith(expect.stringContaining('✅'));
  });

  it('should send budget exceeded message when Claude hits the cost limit', async () => {
    mockFrigateFixerService.runFrigateFix.mockResolvedValue({ success: false, reason: 'budget_exceeded', output: 'budget limit exceeded' });

    await controller.handleFrigateDown();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(mockTelegramService.sendMessage).toHaveBeenCalledWith(expect.stringContaining('💸'));
  });

  it('should send timeout message when Claude runs too long', async () => {
    mockFrigateFixerService.runFrigateFix.mockResolvedValue({ success: false, reason: 'timeout', output: 'Timed out after 5 minutes.' });

    await controller.handleFrigateDown();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(mockTelegramService.sendMessage).toHaveBeenCalledWith(expect.stringContaining('⏱️'));
  });

  it('should send cooldown message when fix is skipped', async () => {
    mockFrigateFixerService.runFrigateFix.mockResolvedValue({ success: false, reason: 'cooldown', output: 'Cooldown: 500s remaining.' });

    await controller.handleFrigateDown();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(mockTelegramService.sendMessage).toHaveBeenCalledWith(expect.stringContaining('🔁'));
  });

  it('should send generic failure message on error', async () => {
    mockFrigateFixerService.runFrigateFix.mockResolvedValue({ success: false, reason: 'error', output: 'ENOENT: claude not found' });

    await controller.handleFrigateDown();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(mockTelegramService.sendMessage).toHaveBeenCalledWith(expect.stringContaining('❌'));
  });
});
