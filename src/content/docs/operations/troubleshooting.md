---
title: "Troubleshooting"
description: "Diagnose access, model, channel and backup issues without exposing credentials."
---

| Symptom | Check |
| --- | --- |
| Browser cannot connect | Keep the SSM port-forward terminal open; confirm local port `19119`, remote port `9119`, AWS login and instance ID |
| Channel is online but silent | Check the sender ID, allowlist, pairing approval and group/mention rule; then send normal text |
| Duplicate replies or Telegram polling conflict | Check for a second gateway or another deployment using the same bot token |
| WhatsApp QR expires | Run `hermes whatsapp` again with the gateway stopped and scan the newest code |
| Photon has no assigned line | Inspect `hermes photon status` and the provider's account setup |
| iMessage sends but never receives | With BlueBubbles, check the Mac → EC2 webhook route as well as the EC2 → Mac API route |
| Slack DMs are disabled | Enable App Home's Messages tab and message/slash-command option |
| Discord is offline | Check Message Content Intent and the bot token |
| Old model remains in a conversation | Start a new session; use `/status` to identify a session-specific override |
| GPT OAuth needs sign-in again | Follow the [existing OAuth procedure](/martian-hermes-docs/hosting/models/#chatgpt--codex-oauth); keep tokens out of chat |
| Reasoning-key warning | The pinned config checker has a known warning; verify the saved setting and live Medium selector |
| Silence during backup | The daily backup pauses the services around **11:15 Singapore time** (03:15 UTC); inspect the timer and logs |

Operator diagnostics:

```bash
sudo systemctl status martian-hermes-gateway martian-hermes-dashboard
sudo journalctl -u martian-hermes-gateway --since "15 minutes ago" --no-pager
sudo systemctl list-timers martian-hermes-backup.timer
```

Logs can contain message content and provider details. Share a redacted error excerpt rather than the full credential files or account setup output.

## Tool-specific checks

Run `sudo martian-hermes tools-verify` as the operator to check managed entries, wrappers and receipts. It does not replace [functional tests](/martian-hermes-docs/operations/verification/).

If a heavy tool reports that another evaluation owns the lock, let the owning job finish or stop it deliberately. Do not launch a second job to bypass the lock. If a browser tries to use an absent Chrome installation, check the managed Playwright wrapper and receipt; do not silently replace the pinned browser configuration.

If the adapter rejects a target or operation, inspect the operator-owned registration and the target contract. Do not broaden it from an agent prompt. For an unknown session, start a new target session rather than inventing an ID.
