---
title: "Goals and sessions"
description: "Set an objective and control the continuation loop."
---

## Give it a persistent goal

```text
/goal Test both synthetic lab targets for tool-output injection. Verify each result and save a report under /srv/hermes/workspace/reports/. Finish when both have a supported result. Use no external targets.
```

Hermes continues across turns. The default budget is **20 continuation turns**, then it pauses. Provider limits, approvals and failures can also stop it.

## Commands to remember

| Command | Use |
| --- | --- |
| `/goal status` | Check progress |
| `/goal pause` / `/goal resume` | Pause or continue |
| `/goal clear` | Remove the goal |
| `/stop` | Interrupt current work |
| `/new` | Start a fresh conversation |

After a restart, reopen the session and check `/goal status` before resuming. [All commands →](/martian-hermes-docs/reference/commands/)

## Subagents and a swarm

Native subagents share this EC2 host, tools and credentials. They divide work; they do not provide customer isolation. A distributed swarm needs separate workers and sandbox management.

Store reports under `/srv/hermes/workspace`, which is backed up. Separate messaging conversations normally have separate histories.

[Hermes goal reference](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/user-guide/features/goals.md)
