# Frigate Auto-Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** When Uptime Kuma detects Frigate is offline, automatically invoke Claude CLI to run the fix-frigate skill and report results via Telegram.

**Architecture:** Uptime Kuma posts to a new `POST /notifications/frigate-down` endpoint in `my-agents-api`. The endpoint returns 202 immediately and asynchronously spawns `claude --print "/fix-frigate"`. A `FrigateFixerService` manages the child process with a 5-minute timeout. Results are sent to Telegram via the existing `TelegramService`.

**Tech Stack:** NestJS, child_process (Node stdlib), Jest, Claude CLI, Uptime Kuma webhook

---

### Task 1: Install Claude CLI on the homelab and set up the local fix-frigate skill

**Files:**
- Create: `~/.local/bin/claude` (copy from workstation)
- Create: `~/.claude/.credentials.json` (copy from workstation)
- Create: `~/.claude/skills/fix-frigate/SKILL.md` (homelab-local version, no SSH prefix)

- [ ] **Step 1: Copy Claude CLI binary to homelab**

```bash
scp ~/.local/bin/claude homelab:~/.local/bin/claude
ssh homelab "chmod +x ~/.local/bin/claude && claude --version"
```
Expected: `2.1.132 (Claude Code)`

- [ ] **Step 2: Copy Claude credentials to homelab**

```bash
ssh homelab "mkdir -p ~/.claude"
scp ~/.claude/.credentials.json homelab:~/.claude/.credentials.json
```

- [ ] **Step 3: Verify Claude authenticates on the homelab**

```bash
ssh homelab "claude --print 'say: ok'"
```
Expected: response containing "ok". If it prompts for login, run `claude` interactively once on the homelab to complete OAuth, then re-test.

- [ ] **Step 4: Create the homelab-local fix-frigate skill (no SSH prefix)**

```bash
ssh homelab "mkdir -p ~/.claude/skills/fix-frigate"
sed 's/ssh homelab "\(.*\)"/\1/g' ~/.claude/skills/fix-frigate/SKILL.md \
  | ssh homelab "cat > ~/.claude/skills/fix-frigate/SKILL.md"
```

- [ ] **Step 5: Verify the skill runs on the homelab**

```bash
ssh homelab "claude --print '/fix-frigate' 2>&1 | head -10"
```
Expected: Claude begins executing fix steps (docker ps output, etc.)

---

### Task 2: Create FrigateFixerService

**Files:**
- Create: `src/notifications/frigate-fixer.service.spec.ts`
- Create: `src/notifications/frigate-fixer.service.ts`

- [ ] **Step 1: Write the failing test**

Create `src/notifications/frigate-fixer.service.spec.ts`:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { FrigateFixerService } from './frigate-fixer.service';
import * as childProcess from 'child_process';
import { EventEmitter } from 'events';

jest.mock('child_process');

describe('FrigateFixerService', () => {
  let service: FrigateFixerService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [FrigateFixerService],
    }).compile();
    service = module.get<FrigateFixerService>(FrigateFixerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should resolve success with stdout when claude exits 0', async () => {
    const mockProc = new EventEmitter() as any;
    mockProc.stdout = new EventEmitter();
    mockProc.stderr = new EventEmitter();
    jest.spyOn(childProcess, 'spawn').mockReturnValue(mockProc);

    const promise = service.runFrigateFix();
    mockProc.stdout.emit('data', 'Fix applied successfully');
    mockProc.emit('close', 0);

    const result = await promise;
    expect(result.success).toBe(true);
    expect(result.output).toContain('Fix applied successfully');
  });

  it('should resolve failure with stderr when claude exits non-zero', async () => {
    const mockProc = new EventEmitter() as any;
    mockProc.stdout = new EventEmitter();
    mockProc.stderr = new EventEmitter();
    jest.spyOn(childProcess, 'spawn').mockReturnValue(mockProc);

    const promise = service.runFrigateFix();
    mockProc.stderr.emit('data', 'command not found: claude');
    mockProc.emit('close', 127);

    const result = await promise;
    expect(result.success).toBe(false);
    expect(result.output).toContain('command not found: claude');
  });

  it('should resolve failure when spawn emits an error', async () => {
    const mockProc = new EventEmitter() as any;
    mockProc.stdout = new EventEmitter();
    mockProc.stderr = new EventEmitter();
    jest.spyOn(childProcess, 'spawn').mockReturnValue(mockProc);

    const promise = service.runFrigateFix();
    mockProc.emit('error', new Error('ENOENT: claude not found'));

    const result = await promise;
    expect(result.success).toBe(false);
    expect(result.output).toContain('ENOENT');
  });

  it('should truncate output longer than 3000 characters', async () => {
    const mockProc = new EventEmitter() as any;
    mockProc.stdout = new EventEmitter();
    mockProc.stderr = new EventEmitter();
    jest.spyOn(childProcess, 'spawn').mockReturnValue(mockProc);

    const promise = service.runFrigateFix();
    mockProc.stdout.emit('data', 'x'.repeat(4000));
    mockProc.emit('close', 0);

    const result = await promise;
    expect(result.output.length).toBeLessThanOrEqual(3000);
  });
});
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
ssh homelab "cd ~/src/my-agents-api && npx jest src/notifications/frigate-fixer.service.spec.ts --no-coverage 2>&1 | tail -5"
```
Expected: `FAIL` — `Cannot find module './frigate-fixer.service'`

- [ ] **Step 3: Implement FrigateFixerService**

Create `src/notifications/frigate-fixer.service.ts`:

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { spawn } from 'child_process';

export interface FrigateFixResult {
  success: boolean;
  output: string;
}

const FIX_TIMEOUT_MS = 5 * 60 * 1000;
const OUTPUT_MAX_CHARS = 3000;

@Injectable()
export class FrigateFixerService {
  private readonly logger = new Logger(FrigateFixerService.name);

  runFrigateFix(): Promise<FrigateFixResult> {
    return new Promise((resolve) => {
      this.logger.log({ msg: 'Spawning claude to run fix-frigate skill' });

      const claudeProcess = spawn('claude', ['--print', '/fix-frigate'], {
        env: { ...process.env },
      });

      let stdout = '';
      let stderr = '';

      const timeoutHandle = setTimeout(() => {
        claudeProcess.kill();
        resolve({ success: false, output: 'Timed out after 5 minutes.' });
      }, FIX_TIMEOUT_MS);

      claudeProcess.stdout.on('data', (data: Buffer) => {
        stdout += data.toString();
      });

      claudeProcess.stderr.on('data', (data: Buffer) => {
        stderr += data.toString();
      });

      claudeProcess.on('close', (code: number) => {
        clearTimeout(timeoutHandle);
        if (code === 0) {
          resolve({ success: true, output: stdout.slice(0, OUTPUT_MAX_CHARS) });
        } else {
          const errorOutput = stderr || stdout || 'No output captured.';
          resolve({ success: false, output: errorOutput.slice(0, OUTPUT_MAX_CHARS) });
        }
      });

      claudeProcess.on('error', (error: Error) => {
        clearTimeout(timeoutHandle);
        resolve({ success: false, output: error.message });
      });
    });
  }
}
```

- [ ] **Step 4: Run tests and confirm they pass**

```bash
ssh homelab "cd ~/src/my-agents-api && npx jest src/notifications/frigate-fixer.service.spec.ts --no-coverage 2>&1 | tail -5"
```
Expected: `PASS` — 5 tests passing

- [ ] **Step 5: Commit**

```bash
git add src/notifications/frigate-fixer.service.ts src/notifications/frigate-fixer.service.spec.ts
git commit -m "feat: add FrigateFixerService with claude CLI spawner"
```

---

### Task 3: Add frigate-down endpoint to NotificationsController

**Files:**
- Modify: `src/notifications/notifications.controller.ts`
- Modify: `src/notifications/notifications.module.ts`

- [ ] **Step 1: Write the failing test**

Add to (or create) `src/notifications/notifications.controller.spec.ts`:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { TelegramService } from '../telegram/telegram.service';
import { WhatsappService } from '../whatsapp/whatsapp.service';
import { FrigateFixerService } from './frigate-fixer.service';
import { LocalNetworkGuard } from '../common/guards/local-network.guard';
import { ExecutionContext } from '@nestjs/common';

describe('NotificationsController - frigate-down', () => {
  let controller: NotificationsController;
  let telegramService: TelegramService;
  let frigateFixerService: FrigateFixerService;

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
    telegramService = module.get<TelegramService>(TelegramService);
    frigateFixerService = module.get<FrigateFixerService>(FrigateFixerService);
  });

  it('should return 202 status object immediately', async () => {
    mockFrigateFixerService.runFrigateFix.mockResolvedValue({ success: true, output: 'Fixed' });

    const result = await controller.handleFrigateDown();
    expect(result).toEqual({ status: 'Fix initiated' });
  });

  it('should send down alert and success message when fix succeeds', async () => {
    mockFrigateFixerService.runFrigateFix.mockResolvedValue({ success: true, output: 'All good' });

    await controller.handleFrigateDown();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(mockTelegramService.sendMessage).toHaveBeenCalledWith(
      expect.stringContaining('offline'),
    );
    expect(mockTelegramService.sendMessage).toHaveBeenCalledWith(
      expect.stringContaining('✅'),
    );
  });

  it('should send down alert and failure message when fix fails', async () => {
    mockFrigateFixerService.runFrigateFix.mockResolvedValue({ success: false, output: 'Error details' });

    await controller.handleFrigateDown();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(mockTelegramService.sendMessage).toHaveBeenCalledWith(
      expect.stringContaining('❌'),
    );
  });
});
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
ssh homelab "cd ~/src/my-agents-api && npx jest src/notifications/notifications.controller.spec.ts --no-coverage 2>&1 | tail -5"
```
Expected: `FAIL` — controller has no `handleFrigateDown` method yet

- [ ] **Step 3: Add the endpoint to NotificationsController**

In `src/notifications/notifications.controller.ts`, add `FrigateFixerService` to the constructor and the new method:

```typescript
import { Controller, Post, Body, UseGuards, Logger, HttpCode } from '@nestjs/common';
import { WhatsappService } from '../whatsapp/whatsapp.service';
import { TelegramService } from '../telegram/telegram.service';
import { FrigateFixerService } from './frigate-fixer.service';
import { LocalNetworkGuard } from '../common/guards/local-network.guard';

@Controller('notifications')
export class NotificationsController {
  private readonly logger = new Logger(NotificationsController.name);

  constructor(
    private readonly whatsappService: WhatsappService,
    private readonly telegramService: TelegramService,
    private readonly frigateFixerService: FrigateFixerService,
  ) {}

  @Post('doorbell')
  @UseGuards(LocalNetworkGuard)
  async notifyDoorbell(@Body('camera') cameraName: string) {
    const targetCamera = cameraName || 'cam_13';
    const results: string[] = [];

    try {
      await this.whatsappService.sendCameraSnapshotToSelf({
        cameraAlias: targetCamera,
        customTitle: 'Ding Dong! Campainha tocou!',
      });
      results.push('WhatsApp sent');
    } catch (error) {
      this.logger.error({ msg: 'Failed to send WhatsApp doorbell', error: error.message });
      results.push(`WhatsApp failed: ${error.message}`);
    }

    try {
      await this.telegramService.sendCameraSnapshot({ cameraName: targetCamera });
      results.push('Telegram sent');
    } catch (error) {
      this.logger.error({ msg: 'Failed to send Telegram doorbell', error: error.message });
      results.push(`Telegram failed: ${error.message}`);
    }

    return { status: 'Doorbell notification processed', camera: targetCamera, results };
  }

  @Post('frigate-down')
  @UseGuards(LocalNetworkGuard)
  @HttpCode(202)
  async handleFrigateDown() {
    this.runFrigateAutoFix().catch((error: Error) => {
      this.logger.error({ msg: 'Unhandled error in frigate auto-fix', error: error.message });
    });
    return { status: 'Fix initiated' };
  }

  private async runFrigateAutoFix() {
    await this.telegramService.sendMessage(
      '🔴 Frigate está offline. Iniciando diagnóstico automático...',
    );
    const result = await this.frigateFixerService.runFrigateFix();
    if (result.success) {
      await this.telegramService.sendMessage(`✅ Frigate corrigido:\n${result.output}`);
    } else {
      await this.telegramService.sendMessage(
        `❌ Não foi possível corrigir automaticamente. Verifique manualmente.\n${result.output}`,
      );
    }
  }
}
```

- [ ] **Step 4: Register FrigateFixerService in NotificationsModule**

In `src/notifications/notifications.module.ts`, add `FrigateFixerService` to providers:

```typescript
import { Module } from '@nestjs/common';
import { TelegramModule } from '../telegram/telegram.module';
import { WhatsappModule } from '../whatsapp/whatsapp.module';
import { DocScraperListener } from './listeners/doc-scraper.listener';
import { BullModule } from '@nestjs/bullmq';
import { QueueMonitorService } from './queue-monitor.service';
import { QueueMonitorController } from './queue-monitor.controller';
import { NotificationsController } from './notifications.controller';
import { FrigateFixerService } from './frigate-fixer.service';

@Module({
  imports: [
    TelegramModule,
    WhatsappModule,
    BullModule.registerQueue({ name: 'scrape-docs' }),
  ],
  controllers: [QueueMonitorController, NotificationsController],
  providers: [DocScraperListener, QueueMonitorService, FrigateFixerService],
  exports: [QueueMonitorService],
})
export class NotificationsModule {}
```

- [ ] **Step 5: Run tests and confirm they pass**

```bash
ssh homelab "cd ~/src/my-agents-api && npx jest src/notifications/notifications.controller.spec.ts --no-coverage 2>&1 | tail -5"
```
Expected: `PASS`

- [ ] **Step 6: Run full test suite to confirm no regressions**

```bash
ssh homelab "cd ~/src/my-agents-api && npx jest --no-coverage 2>&1 | tail -10"
```
Expected: all existing tests still pass

- [ ] **Step 7: Commit**

```bash
git add src/notifications/notifications.controller.ts src/notifications/notifications.controller.spec.ts src/notifications/notifications.module.ts
git commit -m "feat: add frigate-down webhook endpoint with auto-fix via claude CLI"
```

---

### Task 4: Build and deploy

- [ ] **Step 1: Build the Docker image**

```bash
ssh homelab "cd ~/src/my-agents-api && docker compose build api 2>&1 | tail -5"
```
Expected: `Successfully built ...`

- [ ] **Step 2: Restart the container**

```bash
ssh homelab "cd ~/src/my-agents-api && docker compose up -d --force-recreate api 2>&1 | tail -5"
```
Expected: `Container my-agents-api Started`

- [ ] **Step 3: Smoke test the new endpoint**

```bash
ssh homelab "curl -s -X POST http://localhost:3000/notifications/frigate-down -w '\nHTTP %{http_code}'"
```
Expected: `{"status":"Fix initiated"}` with `HTTP 202`

---

### Task 5: Configure Uptime Kuma webhook

- [ ] **Step 1: Open Uptime Kuma**

Navigate to `https://uptime.kajiyama.com.br` (or the local port if not exposed). Go to **Settings → Notifications → Add Notification**.

- [ ] **Step 2: Add a Webhook notification**

- Type: **Webhook**
- Friendly Name: `Frigate Auto-Fix`
- URL: `http://my-agents-api:3000/notifications/frigate-down`
- Method: POST
- Leave body empty (the endpoint ignores the body)
- Save

- [ ] **Step 3: Attach to the Frigate monitor**

Open the existing Frigate monitor → Edit → under **Notifications**, add `Frigate Auto-Fix`. Set it to trigger on **Down** only. Save.

- [ ] **Step 4: End-to-end smoke test**

Stop the Frigate container temporarily:
```bash
ssh homelab "docker stop frigate"
```
Wait ~30 seconds for Uptime Kuma to detect the outage. Confirm you receive the Telegram message `🔴 Frigate está offline. Iniciando diagnóstico automático...`

Then restore:
```bash
ssh homelab "docker start frigate"
```
