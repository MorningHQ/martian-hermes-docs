---
title: "Tool catalog"
description: "Know what is installed, what it does and which services need separate configuration."
---

The managed profile contains **15 upstream components** and **21 executable entry points**, plus supporting Node.js and uv runtimes. MCP is an interface for selected capabilities; most tools run through Hermes's terminal.

## Installed components

| Component | Interface | Use in AI-agent red teaming |
| --- | --- | --- |
| [Playwright CLI + Chromium](https://github.com/microsoft/playwright-cli) | `playwright-cli` | Operate approved agent UIs and capture browser evidence |
| [Playwright MCP](https://github.com/microsoft/playwright-mcp) | Filtered `playwright_redteam` server | Structured browser navigation and interactions |
| [mitmproxy](https://github.com/mitmproxy/mitmproxy) | `mitmproxy`, `mitmdump`, `mitmweb` | Inspect, save and replay traffic deliberately routed through the proxy |
| [Promptfoo core](https://github.com/promptfoo/promptfoo) | `promptfoo` | Curated regression cases and assertions against configured targets |
| [MCP Inspector](https://github.com/modelcontextprotocol/inspector) | `mcp-inspector` | Discover schemas and debug adapter calls |
| [Cisco MCP Scanner](https://github.com/cisco-ai-defense/mcp-scanner) | `mcp-scanner` | Local rule-based review of MCP metadata and packages |
| [Cisco Skill Scanner](https://github.com/cisco-ai-defense/skill-scanner) | `skill-scanner` | Review skill packages for suspicious content and code |
| [PyRIT](https://github.com/microsoft/PyRIT) | `pyrit` → upstream `pyrit_scan` | Compose adaptive campaigns, targets and scorers |
| [garak](https://github.com/NVIDIA/garak) | `garak` | Probe model responses using configured generators |
| [Nuclei](https://github.com/projectdiscovery/nuclei) | `nuclei` | Selected checks against surrounding authorized web/API services |
| [ffuf](https://github.com/ffuf/ffuf) | `ffuf` | Scoped path, parameter and input discovery |
| [ZAP](https://github.com/zaproxy/zaproxy) | `zap` | On-demand web/API crawling and security scanning |
| [Gitleaks](https://github.com/gitleaks/gitleaks) | `gitleaks` | Find secret-like material in supplied source and artifacts |
| [Trivy](https://github.com/aquasecurity/trivy) | `trivy` | Inspect supplied files, images, dependencies and configuration |
| [Interactsh](https://github.com/projectdiscovery/interactsh) | `interactsh-client`, `interactsh-server` | Correlate synthetic callbacks through an explicitly configured private collector |

The [Martian MCP adapter](/martian-hermes-docs/mcp/servers/) is maintained in the deployment repository and is additional to this upstream catalog.

## What “free” means

These components have no required software-license fee for the documented local open-source features. Top-level licenses are MIT or Apache-2.0, with an Apache/MIT transition in MCP Inspector. This is not a dependency-license audit. Review the licenses for the exact pinned versions and any templates or plugins you redistribute.

EC2, storage, network traffic, inference, model-based grading, callback infrastructure and optional vendor services can cost money. Promptfoo cloud/remote-only features and paid Cisco analyzers are not enabled merely by installation.

## Pick tools for the work

- Begin with the Martian adapter and one browser interface for controlled agent tests.
- Use Promptfoo for repeatable curated assertions; add PyRIT or garak when their campaign/probe model fits the task.
- Use Inspector and the Cisco scanners for MCP/skill review. Findings still need triage and reproduction.
- Use Nuclei, ffuf and ZAP only when the engagement includes the surrounding application surface.
- Keep the private callback collector separate from the no-ingress controller. Installed binaries do not mean that collector is deployed.

Choose either browser CLI or MCP for a workflow. The 4 GiB host is not sized for many concurrent browsers or local large-model inference.

## Important behavior

The Promptfoo wrapper disables supported hosted generation fallbacks and telemetry; it is not a blanket network block. External evaluation frameworks need explicit provider configuration. ZAP uses `-silent` to suppress unsolicited update/vendor requests. Interactsh rejects public defaults and requires an operator-approved `-server` endpoint, apart from help/version requests.

Nmap, Metasploit, SQLmap, broad Kali bundles, ARTEX and PentAGI are **not installed by this profile**. Their appearance in earlier research is not an installation claim.

See [tool operations](/martian-hermes-docs/tools/operations/) for pins, installation, verification and rollback; [verification](/martian-hermes-docs/operations/verification/) for what the functional suite actually exercises.
