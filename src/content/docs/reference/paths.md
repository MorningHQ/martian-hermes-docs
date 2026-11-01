---
title: "Paths and services"
description: "Find settings, work products and maintenance records."
---

`HERMES_HOME` is `/srv/hermes/home`, replacing `~/.hermes` in upstream examples.

| Path | Contents |
| --- | --- |
| `home/config.yaml` | Model, agent, channels and MCP |
| `home/.env`, `home/auth.json` | Credentials; private |
| `home/skills/martian/` | Managed skill catalog |
| `workspace/reports/` | Final reports |
| `workspace/redteam-evidence/` | Observations and session mappings |
| `redteam/current/` | Regenerable tool release |
| `redteam-lab/` | Synthetic state; snapshot recovery |
| `receipts/` | Install, maintenance and restore records |

Paths above are relative to **`/srv/hermes/`**. Operator target registration is `/etc/martian-redteam/targets.json`; the runtime asset is `/opt/martian-hermes/`.

## Services

| Unit | Purpose |
| --- | --- |
| `martian-hermes-gateway` | Hermes and messaging |
| `martian-hermes-dashboard` | Dashboard on loopback `9119` |
| `martian-redteam-lab` | Synthetic fixture/verifier over a Unix socket |
| `martian-hermes-backup.timer` | Daily archive schedule |
