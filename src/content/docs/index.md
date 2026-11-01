---
title: "Martian Hermes"
description: "Host and use Hermes for authorized AI-agent red teaming."
---

Martian Hermes is a dedicated Hermes installation for AI-agent red teaming. It combines a persistent agent, terminal tools, browser automation, two MCP servers, a small reviewed attack library and recovery procedures on AWS EC2.

## Start here

1. [Open browser chat or a terminal](/martian-hermes-docs/get-started/access/).
2. [Run a first assessment against the synthetic lab](/martian-hermes-docs/get-started/first-assessment/).
3. [Give Hermes a goal](/martian-hermes-docs/get-started/goals-and-sessions/).
4. [Connect a messaging app](/martian-hermes-docs/messaging/setup/) when browser access works.

To host another instance, follow [AWS deployment](/martian-hermes-docs/hosting/deploy/) and rehearse [backup recovery](/martian-hermes-docs/hosting/backups/) before relying on it.

## What is included

| Layer | Included | Read more |
| --- | --- | --- |
| Agent | Pinned Hermes, persistent sessions, goals and native delegation | [Goals and sessions](/martian-hermes-docs/get-started/goals-and-sessions/) |
| Hosting | AWS CDK, EC2, retained encrypted data, SSM access and backups | [Architecture](/martian-hermes-docs/hosting/architecture/) |
| Tools | 15 upstream components, with 21 executable entry points | [Tool catalog](/martian-hermes-docs/tools/catalog/) |
| MCP | A filtered browser server and the Martian target/evidence adapter | [MCP servers](/martian-hermes-docs/mcp/servers/) |
| Attack library | Six local recipes and 40 pinned Martian skills | [Recipes](/martian-hermes-docs/attack-library/recipes/) |
| Test targets | Hardened and deliberately vulnerable synthetic adapters | [First assessment](/martian-hermes-docs/get-started/first-assessment/) |

## Understand the boundaries

Hermes is the orchestrator here. Aegra, OpenCode, DeepSeek Harness, ARTEX and PentAGI are not additional runtime dependencies. Model providers supply inference; they do not create independent workers.

The reference host has 2 burstable vCPUs and 4 GiB RAM. Native subagents share its tools, credentials and operating-system boundary. It is a personal operator environment, not a distributed customer-isolated pentesting fleet.

The two lab targets are deterministic simulations. Their results establish adapter and evidence behavior; they do not measure vulnerability rates in real AI models. Registering a real target requires an operator-approved [adapter contract](/martian-hermes-docs/mcp/target-adapters/).

## About this documentation

This is a static documentation website, not the Hermes dashboard. It has no agent credentials, deployment outputs, live control connection or customer evidence. Commands use placeholders for infrastructure identifiers.

The reference configuration was documented on **1 November 2026** with Hermes **v0.22.5**. The existing hosted profile uses **GPT-6.1 Sol / medium reasoning through ChatGPT/Codex OAuth**; a fresh infrastructure deployment starts with **DeepSeek V3.2 through Bedrock IAM**. These are separate provider choices, not automatic failover. See [models](/martian-hermes-docs/hosting/models/).

The private deployment repository remains the source of truth for runtime code, exact pins and operator records. This public site is a sanitized operator guide. See [verification scope](/martian-hermes-docs/operations/verification/) before interpreting any test result.
