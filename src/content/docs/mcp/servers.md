---
title: "MCP tools"
description: "Use the browser server and the Martian target adapter."
---

Hermes connects to two local MCP servers. Both run on the EC2 controller.

## playwright_redteam

Drives one headless Chromium context:

| Action | Tools |
| --- | --- |
| Open/read | `browser_navigate`, `browser_snapshot` |
| Interact | `browser_click`, `browser_type`, `browser_fill_form`, `browser_press_key` |
| Capture/finish | `browser_take_screenshot`, `browser_close` |

Close the browser when finished. Use a fresh context for each assessment.

## martian_redteam

| Action | Tools |
| --- | --- |
| Target/session | `list_targets`, `start_session`, `send_turn`, `reset_session` |
| Fixtures | `seed_document`, `set_tool_response` |
| Evidence | `get_trace`, `diff_state`, `check_canary`, `record_finding` |
| Local cases | `search_cases`, `get_case` |

## Test the connection

```text
Load redteam-tools. Call list_targets, then search_cases with query "tool output".
```

You should get two synthetic targets and a local recipe. Continue with [your first test](/martian-hermes-docs/get-started/first-assessment/).

<details>
<summary>Arguments and configuration</summary>

`start_session` takes `target_id`; session operations take `session_id`. `send_turn` also takes `message`; fixture tools take `content`; `record_finding` takes `category` and `claim`. `search_cases` takes `query`; `get_case` takes `case_id`.

The managed entries live in `$HERMES_HOME/config.yaml`. The installer preserves unrelated settings and rejects conflicts. `tools-verify` checks them.

Only operators [register targets](/martian-hermes-docs/mcp/target-adapters/). Case lookup reads six local recipes, not a live Wiki. MCP filters restrict exposed tools; they are not a sandbox or network firewall.

</details>
