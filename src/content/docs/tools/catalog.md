---
title: "Pick a tool"
description: "Choose a tool for the test you are running."
---

Use the [Martian MCP adapter](/martian-hermes-docs/mcp/servers/) for the lab walkthrough. Add these tools when the task needs them.

| Task | Installed tool |
| --- | --- |
| Drive an agent UI | [Playwright CLI](https://github.com/microsoft/playwright-cli) or [Playwright MCP](https://github.com/microsoft/playwright-mcp), with Chromium |
| Capture/replay HTTP traffic | [mitmproxy](https://github.com/mitmproxy/mitmproxy): `mitmproxy`, `mitmdump`, `mitmweb` |
| Run curated AI regression cases | [Promptfoo core](https://github.com/promptfoo/promptfoo) |
| Build adaptive Python campaigns | [PyRIT](https://github.com/microsoft/PyRIT) (`pyrit` wraps `pyrit_scan`) |
| Probe model responses | [garak](https://github.com/NVIDIA/garak) |
| Inspect MCP schemas and calls | [MCP Inspector](https://github.com/modelcontextprotocol/inspector) |
| Review MCP packages / skills | [Cisco MCP Scanner](https://github.com/cisco-ai-defense/mcp-scanner) / [Skill Scanner](https://github.com/cisco-ai-defense/skill-scanner) |
| Check scoped web/API services | [Nuclei](https://github.com/projectdiscovery/nuclei), [ffuf](https://github.com/ffuf/ffuf), [ZAP](https://github.com/zaproxy/zaproxy) |
| Inspect supplied source/images | [Gitleaks](https://github.com/gitleaks/gitleaks), [Trivy](https://github.com/aquasecurity/trivy) |
| Observe callbacks | [Interactsh](https://github.com/projectdiscovery/interactsh) client/server; private collector required |

**15 upstream components, 21 executable entry points.** Choose one browser interface per workflow. See [install and verify](/martian-hermes-docs/tools/operations/) for maintenance.

## What needs separate setup

Evaluation targets, generators and graders need credentials/configuration. Hermes's model connection is not inherited automatically. Interactsh's external collector and domain are not deployed.

## Cost and license

Local open-source features have no required software-license fee. Top-level licenses are MIT/Apache-2.0, with an Apache/MIT transition in Inspector; dependencies and templates need separate review. Inference, AWS and optional vendor services can cost money.

Promptfoo remote-only plugins and paid Cisco analyzers are outside local coverage. Nmap, Metasploit, SQLmap, ARTEX, PentAGI and broad Kali bundles are not in this installation.
