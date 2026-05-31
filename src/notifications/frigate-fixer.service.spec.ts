import { Test, TestingModule } from '@nestjs/testing';
import { FrigateFixerService } from './frigate-fixer.service';
import { TelegramService } from '../telegram/telegram.service';
import * as childProcess from 'child_process';
import type { ChildProcess } from 'child_process';
import { EventEmitter } from 'events';
import type { Readable } from 'stream';

jest.mock('child_process');

const mockTelegramService = { sendMessage: jest.fn() };

describe('FrigateFixerService', () => {
  let service: FrigateFixerService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FrigateFixerService,
        { provide: TelegramService, useValue: mockTelegramService },
      ],
    }).compile();
    service = module.get<FrigateFixerService>(FrigateFixerService);
  });

  function makeMockProcess(): ChildProcess {
    const mockProc = new EventEmitter() as unknown as ChildProcess;
    mockProc.stdout = new EventEmitter() as unknown as Readable;
    mockProc.stderr = new EventEmitter() as unknown as Readable;
    return mockProc;
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should resolve success with stdout when claude exits 0', async () => {
    const mockProc = makeMockProcess();
    jest.spyOn(childProcess, 'spawn').mockReturnValue(mockProc);

    const promise = service.runFrigateFix();
    mockProc.stdout!.emit('data', 'Fix applied successfully');
    mockProc.emit('close', 0);

    const result = await promise;
    expect(result.success).toBe(true);
    expect(result.reason).toBe('success');
    expect(result.output).toContain('Fix applied successfully');
  });

  it('should resolve failure with stderr when claude exits non-zero', async () => {
    const mockProc = makeMockProcess();
    jest.spyOn(childProcess, 'spawn').mockReturnValue(mockProc);

    const promise = service.runFrigateFix();
    mockProc.stderr!.emit('data', 'command not found: claude');
    mockProc.emit('close', 127);

    const result = await promise;
    expect(result.success).toBe(false);
    expect(result.reason).toBe('error');
    expect(result.output).toContain('command not found: claude');
  });

  it('should set reason to budget_exceeded when output mentions budget', async () => {
    const mockProc = makeMockProcess();
    jest.spyOn(childProcess, 'spawn').mockReturnValue(mockProc);

    const promise = service.runFrigateFix();
    mockProc.stderr!.emit('data', 'Error: budget limit of $0.50 exceeded');
    mockProc.emit('close', 1);

    const result = await promise;
    expect(result.success).toBe(false);
    expect(result.reason).toBe('budget_exceeded');
  });

  it('should resolve failure when spawn emits an error', async () => {
    const mockProc = makeMockProcess();
    jest.spyOn(childProcess, 'spawn').mockReturnValue(mockProc);

    const promise = service.runFrigateFix();
    mockProc.emit('error', new Error('ENOENT: claude not found'));

    const result = await promise;
    expect(result.success).toBe(false);
    expect(result.reason).toBe('error');
    expect(result.output).toContain('ENOENT');
  });

  it('should resolve with reason timeout when process is killed after timeout', async () => {
    const mockProc = makeMockProcess();
    mockProc.kill = jest.fn();
    jest.spyOn(childProcess, 'spawn').mockReturnValue(mockProc);
    jest.useFakeTimers();

    const promise = service.runFrigateFix();
    jest.advanceTimersByTime(5 * 60 * 1000 + 1);
    const result = await promise;

    expect(result.success).toBe(false);
    expect(result.reason).toBe('timeout');
    jest.useRealTimers();
  });

  it('should truncate output longer than 3000 characters', async () => {
    const mockProc = makeMockProcess();
    jest.spyOn(childProcess, 'spawn').mockReturnValue(mockProc);

    const promise = service.runFrigateFix();
    mockProc.stdout!.emit('data', 'x'.repeat(4000));
    mockProc.emit('close', 0);

    const result = await promise;
    expect(result.output.length).toBeLessThanOrEqual(3000);
  });

  it('should pass --max-budget-usd flag to claude spawn', async () => {
    const spawnSpy = jest.spyOn(childProcess, 'spawn').mockReturnValue(makeMockProcess());

    const promise = service.runFrigateFix();
    const mockProc = spawnSpy.mock.results[0].value as ChildProcess;
    mockProc.emit('close', 0);
    await promise;

    const spawnArgs = spawnSpy.mock.calls[0][1] as string[];
    expect(spawnArgs).toContain('--max-budget-usd');
    const budgetIndex = spawnArgs.indexOf('--max-budget-usd');
    expect(parseFloat(spawnArgs[budgetIndex + 1])).toBeGreaterThan(0);
  });

  it('should skip and return cooldown reason when called again within cooldown window', async () => {
    const mockProc = makeMockProcess();
    jest.spyOn(childProcess, 'spawn').mockReturnValue(mockProc);

    // First call — should proceed
    const firstPromise = service.runFrigateFix();
    mockProc.emit('close', 0);
    await firstPromise;

    // Second call within cooldown — should be blocked without spawning
    const secondResult = await service.runFrigateFix();
    expect(secondResult.success).toBe(false);
    expect(secondResult.reason).toBe('cooldown');
    expect(childProcess.spawn).toHaveBeenCalledTimes(1);
  });
});
