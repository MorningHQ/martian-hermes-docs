---
title: "Paths and services"
description: "Locate configuration, backed-up work products and regenerable tool installations."
---

The deployment sets `HERMES_HOME=/srv/hermes/home`. Upstream examples referring to `~/.hermes` use this configured location on EC2.

| Path | Purpose |
| --- | --- |
| `/srv/hermes/home/config.yaml` | Model, agent and platform configuration; managed MCP entries |
| `/srv/hermes/home/.env` | Credentials, allowlists and environment settings; secret |
| `/srv/hermes/home/auth.json` | Hermes-owned OAuth credentials; secret |
| `/srv/hermes/home/skills/martian/` | Pinned 40-skill catalog |
| `/srv/hermes/workspace/` | Backed-up work products |
| `/srv/hermes/workspace/redteam-evidence/` | Adapter observations, session mappings and test evidence |
| `/srv/hermes/workspace/reports/` | Suggested final-report location |
| `/srv/hermes/redteam/current/` | Active standalone tool release; regenerable |
| `/srv/hermes/redteam-lab/` | Synthetic lab state; covered by EBS snapshots |
| `/etc/martian-redteam/targets.json` | Operator-managed targets; separate recovery required |
| `/srv/hermes/receipts/` | Maintenance, installed-content and restore receipts |
| `/opt/martian-hermes/` | Reviewed deployment runtime asset |
| `/run/martian-redteam/lab.sock` | Synthetic lab Unix socket |

## Services

| Unit | Responsibility |
| --- | --- |
| `martian-hermes-gateway` | Existing Hermes gateway and messaging supervisor |
| `martian-hermes-dashboard` | Dashboard on `127.0.0.1:9119` |
| `martian-redteam-lab` | Separate synthetic fixture/verifier process |
| `martian-hermes-backup.timer` | Daily application/workspace backup schedule |

Keep credentials out of chat, screenshots and repositories. Keep reports out of installation/cache directories. A path on EC2 is not automatically a path on the operator's Mac.
