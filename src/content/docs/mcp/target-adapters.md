---
title: "Register a target"
description: "Add an operator-approved HTTPS adapter."
---

Edit the `targets` map in `/etc/martian-redteam/targets.json` as the operator. Keep the synthetic entries.

## HTTP contract

```json
{
  "approved-agent": {
    "description": "Approved test adapter",
    "transport": "https",
    "base_url": "https://agent.example.test/",
    "bearer_env": "APPROVED_AGENT_TOKEN",
    "operations": ["start_session", "send_turn", "reset_session", "get_trace"]
  }
}
```

The adapter calls `POST BASE_URL/v1/OPERATION` with JSON. `start_session` returns a `session_id`; later calls send it. The server follows no automatic redirects and limits returned JSON to 1 MiB. A different customer API needs a matching adapter.

Set the bearer token in the gateway service environment, not the registration file or chat. `agent.example.test` is a placeholder.

## Qualify before use

1. Confirm target, identity, operations and rate limits.
2. Test normal traffic, session creation, reset and errors.
3. Check unknown targets and unlisted operations are rejected.
4. Verify fixtures and outcome checks against known controls.
5. Check evidence redaction and target-specific recovery.

Add fixture/verifier operations only when the target implements them deliberately. A target-written `confirmed` flag is not independent evidence. Registration restricts this adapter; direct shell/browser traffic needs its own scope controls.
