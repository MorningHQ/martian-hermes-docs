---
title: "Test record"
description: "See what the functional suite checked and how to repeat it."
---

The recorded **30 October 2026** run passed **18/18 checks** against local fixtures. These are integration checks, not attack-success scores against customer AI agents.

<figure class="doc-visual screenshot">
<a href="/martian-hermes-docs/media/screenshots/tool-checks.jpg" target="_blank" rel="noopener" aria-label="Open screenshot: Recorded test summary lists eighteen passing checks across the installed tools"><img src="/martian-hermes-docs/media/screenshots/tool-checks.jpg" alt="Recorded test summary lists eighteen passing checks across the installed tools" width="1265" height="1472" loading="lazy" decoding="async" /></a>
<figcaption>Recorded EC2 output displayed in a viewer afterward, 30 October 2026. <a class="visual-open" href="/martian-hermes-docs/media/screenshots/tool-checks.jpg" target="_blank" rel="noopener" aria-label="Open full-size screenshot (opens in a new tab)">Open full size <span aria-hidden="true">↗</span></a></figcaption>
</figure>

## Covered

Browser navigation/screenshots, proxy capture/replay, AI runner HTTP requests, MCP discovery/calls, scanner fixtures, private loopback callbacks and all 12 Martian adapter operations. Real Hermes conversations also exercised model, terminal and MCP calls.

Paid analyzers, real customer adapters and an external callback collector still need configuration and qualification. The model-switch backup was not separately restore-rehearsed during that switch task.

## Repeat the adapter smoke test

As `hermes`:

```bash
/srv/hermes/redteam/current/venvs/martian/bin/python   /opt/martian-hermes/scripts/smoke_redteam.py --installed
```

The broader suite is `scripts/qualify_tools.py`; use the deployment runbook's supervised, loopback-restricted systemd job. Reports go under `workspace/redteam-evidence/`. Use `--only NAME,NAME` to rerun selected failures.

Finish with [a test through Hermes chat](/martian-hermes-docs/get-started/first-assessment/).
