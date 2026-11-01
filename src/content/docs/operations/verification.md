---
title: "Verification scope"
description: "Read the documented qualification and repeat the checks after changes."
---

This page summarizes the private deployment's recorded tests. It is a dated record, not a live health dashboard or a new execution of the suite by this website.

## Recorded qualification

The 30 October 2026 tool record reports **18/18 functional checks passed**, covering 15 upstream components, supporting runtimes and the Martian adapter. Tests used loopback-only fixtures under the `hermes` identity with bounded resources and no external target/collector access.

| Area | Recorded functional evidence |
| --- | --- |
| Browser MCP / CLI | Real Chromium navigation, content, snapshot, screenshot, page-title retrieval and close |
| mitmproxy / mitmweb | Proxied HTTP request, saved flow/replay and local UI |
| Promptfoo | Passing HTTP-target regression assertion |
| MCP Inspector | Tool discovery and an actual case-search call |
| Cisco scanners | Offline detection in controlled MCP and skill fixtures |
| PyRIT / garak | Actual configured HTTP/REST target requests |
| Nuclei / ffuf | Local template matching and scoped path discovery |
| ZAP | Headless API, crawl, observed requests and clean shutdown |
| Gitleaks / Trivy | Detection of manufactured secret fixtures; raw fixture files removed |
| Interactsh | Private loopback registration, callback and polling round trip |
| Martian adapter | All 12 tools, target distinction, canary/state verification, unsupported-claim rejection and reset |

An actual Hermes conversation separately exercised native skills, MCP invocation, terminal access and saved output. The later GPT-6.1 Sol / medium profile was also qualified with authenticated model/tool behavior. The original hosting record includes S3 download/import, SQLite integrity checks, EBS restore, rollback and reboot persistence.

These records do not prove detection quality against real AI agents, paid analyzer operation, customer API compatibility or an internet-facing callback collector. The latest model-switch backup was not separately restore-rehearsed during that switch task. Retest changed paths before relying on them.

## Repeat the adapter smoke test

As `hermes`, use the installed adapter interpreter:

```bash
/srv/hermes/redteam/current/venvs/martian/bin/python   /opt/martian-hermes/scripts/smoke_redteam.py --installed
```

The broader `scripts/qualify_tools.py` suite creates controlled local fixtures, writes per-tool logs and a JSON report under workspace evidence, and cleans up its daemons. Use the deployment runbook's supervised, loopback-restricted systemd configuration when repeating it. Its `--only NAME,NAME` option reruns selected failed checks.

## Verify through Hermes too

Run [the first assessment](/martian-hermes-docs/get-started/first-assessment/) after installation or provider changes. Inspect actual tool results and persisted reports, rather than only version strings, tool schemas or a successful service health check.

Keep raw logs, account identifiers and authentication screenshots in protected operator storage. This public site intentionally contains no live deployment identifiers or raw test artifacts.
