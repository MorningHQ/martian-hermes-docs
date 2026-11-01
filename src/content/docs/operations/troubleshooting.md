---
title: "Troubleshooting"
description: "Check the failing connection or service first."
---

| Symptom | Check |
| --- | --- |
| Browser will not connect | SSM terminal open; AWS sign-in; instance ID; local `19119` → remote `9119` |
| Channel online but silent | Sender ID, allowlist, pairing and mention rule |
| Duplicate replies / polling conflict | Second gateway or another host using the same bot token |
| WhatsApp QR expired | Stop gateway, run `hermes whatsapp` again and scan the newest code |
| Photon has no line | `hermes photon status` |
| BlueBubbles sends but never receives | Mac → EC2 webhook route, as well as EC2 → Mac API |
| Slack DMs disabled | App Home Messages tab and message permission |
| Discord offline | Bot token and Message Content Intent |
| Old model in chat | Start a new session; inspect `/status` |
| OAuth expired | [Repeat provider authentication](/martian-hermes-docs/hosting/models/#chatgpt--codex-oauth) |
| Heavy tool refuses to start | Another evaluation holds the advisory lock |
| Target / operation rejected | Operator registration and adapter contract |

## Operator diagnostics

```bash
sudo systemctl status martian-hermes-gateway martian-hermes-dashboard
sudo journalctl -u martian-hermes-gateway --since "15 minutes ago" --no-pager
sudo systemctl list-timers martian-hermes-backup.timer
sudo martian-hermes tools-verify
```

Daily backup briefly pauses services around **03:15 UTC / 11:15 Singapore**. For reasoning-setting warnings, see [models](/martian-hermes-docs/hosting/models/).

Share only a redacted error excerpt. Logs can contain messages and provider details; never share credential files.
