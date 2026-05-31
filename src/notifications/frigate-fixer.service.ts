import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { spawn } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { TelegramService } from '../telegram/telegram.service';

export type FrigateFixReason = 'success' | 'budget_exceeded' | 'timeout' | 'cooldown' | 'error';

export interface FrigateFixResult {
  success: boolean;
  reason: FrigateFixReason;
  output: string;
}

// Message formatters are defined here because FrigateFixReason is owned by this service.
// The controller and startup hook both use this map to avoid duplicating message strings.
export const FRIGATE_FIX_TELEGRAM_MESSAGES: Record<FrigateFixReason, (output: string) => string> = {
  success:         (output) => `✅ Frigate corrigido:\n${output}`,
  budget_exceeded: (output) => `💸 Claude atingiu o limite de orçamento ($2.00) sem concluir o diagnóstico. Verifique manualmente.\n${output}`,
  timeout:         (output) => `⏱️ O diagnóstico do Claude excedeu 5 minutos e foi interrompido. Verifique manualmente.\n${output}`,
  cooldown:        (output) => `🔁 Nova tentativa de fix ignorada — cooldown ativo (10 min entre tentativas).\n${output}`,
  error:           (output) => `❌ Não foi possível corrigir automaticamente. Verifique manualmente.\n${output}`,
};

const FIX_TIMEOUT_MS = 5 * 60 * 1000;
const OUTPUT_MAX_CHARS = 3000;
const MAX_BUDGET_USD = 2.00;
// Minimum time between fix attempts to prevent re-trigger loops
// (e.g. Uptime Kuma re-firing while Frigate restarts mid-fix).
const COOLDOWN_MS = 10 * 60 * 1000;

// Persisted to this volume-mounted path so the cooldown survives container restarts.
// Without persistence, a crash-and-restart loop could trigger a new paid Claude run
// on every boot.
const COOLDOWN_FILE_PATH = '/app/scraped_docs/frigate-fix-cooldown.json';

const FRIGATE_HEALTH_URL = 'https://cams.kajiyama.com.br';
const HEALTH_CHECK_TIMEOUT_MS = 5000;

@Injectable()
export class FrigateFixerService implements OnApplicationBootstrap {
  private readonly logger = new Logger(FrigateFixerService.name);
  private lastFixAttemptAt: number | null = null;

  constructor(private readonly telegramService: TelegramService) {}

  async onApplicationBootstrap(): Promise<void> {
    this.loadCooldownFromFile();

    const frigateIsDown = await this.isFrigateDown();
    if (!frigateIsDown) return;

    this.logger.log({ msg: 'Frigate still down on startup — triggering auto-fix' });

    // Fire-and-forget: onApplicationBootstrap is awaited by NestJS before the app
    // starts listening, and the fix can take up to 5 minutes. We must not block here.
    this.runStartupFix().catch((error: Error) => {
      this.logger.error({ msg: 'Startup auto-fix unhandled error', error: error.message });
    });
  }

  runFrigateFix(): Promise<FrigateFixResult> {
    const now = Date.now();

    if (this.lastFixAttemptAt !== null && now - this.lastFixAttemptAt < COOLDOWN_MS) {
      const secondsRemaining = Math.ceil((COOLDOWN_MS - (now - this.lastFixAttemptAt)) / 1000);
      this.logger.warn({ msg: 'Fix skipped — cooldown active', secondsRemaining });
      return Promise.resolve({
        success: false,
        reason: 'cooldown',
        output: `Fix skipped: a fix attempt was already made ${Math.floor((now - this.lastFixAttemptAt) / 1000)}s ago. Cooldown: ${secondsRemaining}s remaining.`,
      });
    }

    this.lastFixAttemptAt = now;
    this.saveCooldownToFile();

    return new Promise((resolve) => {
      this.logger.log({ msg: 'Spawning claude to run fix-frigate skill', maxBudgetUsd: MAX_BUDGET_USD });

      const claudeProcess = spawn(
        'claude',
        ['--print', '--max-budget-usd', String(MAX_BUDGET_USD), '/fix-frigate'],
        { env: { ...process.env }, stdio: ['ignore', 'pipe', 'pipe'] },
      );

      let stdout = '';
      let stderr = '';

      const timeoutHandle = setTimeout(() => {
        claudeProcess.kill();
        resolve({ success: false, reason: 'timeout', output: 'Timed out after 5 minutes.' });
      }, FIX_TIMEOUT_MS);

      claudeProcess.stdout.on('data', (data: Buffer | string) => {
        stdout += data.toString();
      });

      claudeProcess.stderr.on('data', (data: Buffer | string) => {
        stderr += data.toString();
      });

      claudeProcess.on('close', (code: number) => {
        clearTimeout(timeoutHandle);
        if (code === 0) {
          resolve({ success: true, reason: 'success', output: stdout.slice(0, OUTPUT_MAX_CHARS) });
        } else {
          // Prefer stderr for diagnostics; fall back to stdout because some CLI tools
          // (including claude --print) write error details there on non-zero exit.
          const errorOutput = stderr || stdout || 'No output captured.';
          const isBudgetExceeded = errorOutput.toLowerCase().includes('budget');
          resolve({
            success: false,
            reason: isBudgetExceeded ? 'budget_exceeded' : 'error',
            output: errorOutput.slice(0, OUTPUT_MAX_CHARS),
          });
        }
      });

      claudeProcess.on('error', (error: Error) => {
        clearTimeout(timeoutHandle);
        resolve({ success: false, reason: 'error', output: error.message });
      });
    });
  }

  private async runStartupFix(): Promise<void> {
    await this.telegramService.sendMessage(
      '🔴 Frigate offline detectado no startup da API. Iniciando diagnóstico automático...',
    );
    const result = await this.runFrigateFix();
    const message = FRIGATE_FIX_TELEGRAM_MESSAGES[result.reason](result.output);
    await this.telegramService.sendMessage(message);
  }

  private async isFrigateDown(): Promise<boolean> {
    try {
      const response = await fetch(FRIGATE_HEALTH_URL, {
        signal: AbortSignal.timeout(HEALTH_CHECK_TIMEOUT_MS),
      });
      const isDown = response.status >= 400;
      this.logger.log({ msg: 'Startup Frigate health check', status: response.status, isDown });
      return isDown;
    } catch (error: unknown) {
      // TCP-level failure (no route, NAT hairpin, etc.) means we can't confirm Frigate
      // is actually down. Skip to avoid a paid Claude run on ambiguous network state.
      this.logger.warn({ msg: 'Startup health check unreachable — skipping fix', error: String(error) });
      return false;
    }
  }

  private loadCooldownFromFile(): void {
    try {
      const fileContents = readFileSync(COOLDOWN_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileContents) as { lastFixAttemptAt?: unknown };
      if (typeof parsed.lastFixAttemptAt === 'number') {
        this.lastFixAttemptAt = parsed.lastFixAttemptAt;
        this.logger.log({ msg: 'Cooldown restored from file', lastFixAttemptAt: this.lastFixAttemptAt });
      }
    } catch {
      // File absent on first run — no cooldown to restore, which is correct.
    }
  }

  private saveCooldownToFile(): void {
    try {
      writeFileSync(COOLDOWN_FILE_PATH, JSON.stringify({ lastFixAttemptAt: this.lastFixAttemptAt }));
    } catch (error: unknown) {
      this.logger.error({ msg: 'Failed to persist cooldown to file', error: String(error) });
    }
  }
}
