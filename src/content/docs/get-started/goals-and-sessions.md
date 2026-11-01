---
title: "Goals and sessions"
description: "Use persistent goals, session commands and bounded native delegation."
---

Give a concrete objective, permitted targets, expected output and completion condition. For example:

```text
Assess only lab-hardened and lab-vulnerable using the tool-output injection recipe. Verify the observed effects through the Martian evidence tools. Save a clearly labeled synthetic report under /srv/hermes/workspace/reports/. Finish when both targets have an evidence-backed result. Do not contact external targets.
```

Other starting requests:

- “Show the installed Martian skills relevant to prompt injection.”
- “Search the local case library for tool-output injection and explain the recipe.”
- “Review this uploaded agent specification and propose an authorized test plan.”

Store deliverables under **`/srv/hermes/workspace`**, which is included in application backups. Hermes runs on EC2; it cannot automatically see files on your Mac or phone. Supply the files through the interface you are using.

The installed evaluation frameworks can need their own target, generator and grading configuration. Hermes's ChatGPT OAuth connection does not automatically configure Promptfoo, PyRIT or garak as API clients. The local Martian test adapters are ready for the synthetic examples above.

### Commands to remember

Type these inside a Hermes conversation:

| Command | Purpose |
| --- | --- |
| `/help` | Show the commands available on that interface |
| `/status` | Inspect the current session, model and recent activity |
| `/new` | Start a fresh conversation |
| `/model` | Inspect or select an already configured model/provider |
| `/reasoning medium` | Select medium reasoning for the conversation |
| `/stop` | Interrupt the running agent and its background processes |
| `/goal status` | Inspect a standing goal |
| `/goal pause` / `/goal resume` | Pause or continue its automatic loop |
| `/goal clear` | Remove the standing goal |
| `/kanban list` | Inspect the persistent task board |

An approval prompt needs a deliberate decision. Read the proposed action before approving it. Messaging does not remove the agent's existing approval requirements. [Hermes command reference](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/reference/slash-commands.md).

### Give it a persistent goal

```text
/goal Test both registered synthetic lab targets for tool-output injection, verify each observed result, and save a synthetic Markdown report under /srv/hermes/workspace/reports/. Complete when both targets have a supported result. Use no external targets.
```

Hermes continues across turns and judges whether the goal is complete. Its default continuation budget is **20 turns**, after which it pauses for `/goal resume`. Permissions, provider limits and failures can also stop progress. After a restart, reopen the session, inspect `/goal status`, and resume deliberately if needed.

The shared `/goal` handler supports browser/CLI and messaging. A persistent task board is also available through `/kanban`; that does not turn the single EC2 host into a distributed worker fleet. [Persistent goals](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/user-guide/features/goals.md), [Kanban](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/user-guide/features/kanban.md).

## Subagents and a swarm

Hermes can delegate to native child agents. On this deployment those agents run on the same EC2 host, inherit available tools and credentials, and normally share a working directory. That helps divide work but does not isolate customers or untrusted programs.

A distributed swarm needs independent worker runtimes and sandboxes, scoped credentials, durable job ownership, budgets, cancellation and external evidence validation. None of that is created by adding a model CLI or increasing the number of child agents. Keep the [single-host limits](/martian-hermes-docs/hosting/architecture/) in mind.
