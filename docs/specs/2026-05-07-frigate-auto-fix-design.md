# Frigate Auto-Fix via Claude CLI — Design Spec

**Date:** 2026-05-07
**Status:** Approved

## Problem

Uptime Kuma already detects when Frigate goes offline and sends a Telegram alert. The fix process
(documented in the `fix-frigate` skill) requires manual intervention. This design automates that
response: when Uptime Kuma detects Frigate is down, Claude runs the fix-frigate skill automatically
and reports back via Telegram.

## Architecture

```
Uptime Kuma (monitor: Frigate)
  └─ Webhook: POST http://my-agents-api:3000/notifications/frigate-down
       └─ NotificationsController
            ├─ Telegram: "🔴 Frigate offline — iniciando diagnóstico..."
            ├─ spawn: claude --print "/fix-frigate"  (5-min timeout)
            ├─ success → Telegram: "✅ Frigate corrigido:\n[output]"
            └─ failure → Telegram: "❌ Não foi possível corrigir. Verifique manualmente.\n[error]"
```

## Components

### 1. Claude CLI on the homelab

- Copy the Claude binary from the workstation to the homelab (`~/.local/bin/claude`)
- Copy credentials from workstation (`~/.claude/.credentials.json`) to homelab
- Install a homelab-local version of the `fix-frigate` skill at `~/.claude/skills/fix-frigate/`
  - Identical to the workstation skill, but all `ssh homelab "..."` wrappers removed — commands
    run directly since Claude is already on the homelab

### 2. `POST /notifications/frigate-down` endpoint

**File:** `src/notifications/notifications.controller.ts` (new method on existing controller)

- Guard: `LocalNetworkGuard` (already used by `doorbell` endpoint)
- Returns `202 Accepted` immediately — Uptime Kuma must not block waiting for Claude to finish
- Runs the fix asynchronously:
  1. Send "down" Telegram message
  2. `spawn('claude', ['--print', '/fix-frigate'])` with 5-minute timeout
  3. On exit code 0 → send success Telegram with trimmed stdout (max ~3000 chars to fit Telegram limit)
  4. On non-zero exit or timeout → send failure Telegram with stderr/timeout message

### 3. Uptime Kuma webhook

- Notification type: **Webhook** (POST, no auth)
- URL: `http://my-agents-api:3000/notifications/frigate-down`
- Trigger: **Down** event only
- Recovery notifications remain unchanged (Uptime Kuma → Telegram directly)

## Telegram Message Flow

| Event | Message |
|---|---|
| Frigate goes down | `🔴 Frigate está offline. Iniciando diagnóstico automático...` |
| Claude fix succeeds | `✅ Frigate corrigido:\n[Claude output, trimmed to 3000 chars]` |
| Claude fix fails or times out | `❌ Não foi possível corrigir automaticamente. Verifique manualmente.\n[error detail]` |

## Error Handling

- **Claude not found on PATH:** endpoint catches `ENOENT` spawn error → sends failure Telegram
- **5-minute timeout:** process killed, sends timeout failure message
- **Uptime Kuma retry:** endpoint always returns 202 so Uptime Kuma does not retry on timeout

## Out of Scope

- Approval gate before running (fully automatic by design)
- Scheduling / rate-limiting repeated fix attempts
- Storing fix history in the database
