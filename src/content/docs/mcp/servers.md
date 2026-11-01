---
title: "The two MCP servers"
description: "Understand browser tools and the 12-operation Martian adapter."
---

MCP lets Hermes discover named tools with structured arguments and results. The managed installation adds exactly two local stdio server entries. Their processes run on the controller; MCP itself is not a sandbox.

## playwright_redteam

This server starts an isolated headless Chromium context with eight selected tools:

```text
browser_navigate
browser_snapshot
browser_click
browser_type
browser_fill_form
browser_press_key
browser_take_screenshot
browser_close
```

Use it to interact with an approved UI and capture observable behavior. Close the browser after the workflow. A fresh browser context separates browsing state but does not supply customer OS or network isolation.

## martian_redteam

This server wraps registered target sessions, controlled fixtures, observations and read-only cases.

| Tool | Arguments | Purpose |
| --- | --- | --- |
| `list_targets` | none | List operator-registered target IDs |
| `start_session` | `target_id` (default `lab-hardened`) | Open a session and retain its target mapping |
| `send_turn` | `session_id`, `message` | Send one target turn and record its returned result |
| `reset_session` | `session_id` | Close/reset the target session while preserving captured evidence |
| `seed_document` | `session_id`, `content` | Seed an explicitly supported document fixture |
| `set_tool_response` | `session_id`, `content` | Set an explicitly supported tool-output fixture |
| `get_trace` | `session_id` | Read target-provided trace observations |
| `diff_state` | `session_id` | Compare state through the target's verifier contract |
| `check_canary` | `session_id` | Check the protected synthetic canary or a qualified target equivalent |
| `record_finding` | `session_id`, `category`, `claim` | Request validation; a claim does not set confirmed status |
| `search_cases` | `query` (default empty) | Search the local six-recipe library |
| `get_case` | `case_id` | Retrieve one reviewed local recipe |

The adapter does not register targets and has no Wiki admin credential. Local case lookup is not a live connection to Martian Wiki.

## Test the connection

In Hermes chat:

```text
Load redteam-tools. Call martian_redteam.list_targets, then search_cases with query "tool output".
Show the actual results and explain which targets are synthetic.
```

For a complete round trip, use [the first assessment](/martian-hermes-docs/get-started/first-assessment/). For new targets, implement [the target contract](/martian-hermes-docs/mcp/target-adapters/) and qualify its verifier before relying on its findings.

## Configuration ownership

Hermes stores MCP configuration in `$HERMES_HOME/config.yaml`. The managed installer merges only its two owned entries and refuses to overwrite conflicting local edits. Preserve unrelated settings; use `tools-verify` to compare the entries and wrappers with their receipt.

Tool filters restrict which capabilities are exposed. They do not enforce target authorization or contain malicious stdio code. Review unfamiliar packages in a disposable worker before adding them to a credential-bearing controller.

Reference: [Hermes MCP configuration](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/user-guide/features/mcp.md).
