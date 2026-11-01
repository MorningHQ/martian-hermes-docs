---
title: "Register a target adapter"
description: "Implement an explicit HTTPS contract and qualify fixture and verifier behavior."
---

Only an operator can register targets in `/etc/martian-redteam/targets.json`. The agent has no target-registration tool. Keep the existing synthetic entries when adding a new target.

## HTTP contract

A remote target uses HTTPS and implements `POST BASE_URL/v1/OPERATION` with JSON arguments. The adapter follows no automatic redirects, limits returned JSON to 1 MiB and applies request timeouts. If the customer's API differs, build an explicit adapter instead of pointing the registration at an arbitrary chat-completions URL.

An illustrative entry inside the `targets` map:

```json
{
  "approved-agent": {
    "description": "Operator-approved non-production agent adapter",
    "transport": "https",
    "base_url": "https://agent.example.test/",
    "bearer_env": "APPROVED_AGENT_TOKEN",
    "operations": ["start_session", "send_turn", "reset_session", "get_trace"]
  }
}
```

`agent.example.test` is a placeholder. Use a reviewed endpoint and a narrowly scoped credential supplied through the server's environment. The bearer token does not belong in the JSON file, repository, prompts or evidence exports. Configure the gateway service environment deliberately, restart during an operator maintenance window, and confirm that the server can read the variable without printing it.

For session-based calls the adapter forwards `session_id` with the operation-specific JSON. `start_session` must return a `session_id` that identifies the new target session. The deployed Python implementation in `runtime/redteam/server.py` is the contract source of truth; qualify exact request and response schemas with the customer adapter.

## Start with the minimum operations

Expose only the actions authorized for that target. Add `seed_document` and `set_tool_response` only when the customer supplies intentionally controlled fixtures. Add `diff_state`, `check_canary` and `record_finding` only when the corresponding verifier has a trustworthy, documented meaning.

The synthetic lab's supported categories are `canary_disclosure` and `unauthorized_action`. A real customer adapter is not automatically compatible with those semantics. A target-written `confirmed` flag is not independent evidence.

## Qualify before use

1. Establish the permitted target, identity, operations, rate limits and expected invariants.
2. Test session creation, normal traffic, reset and errors against the approved endpoint.
3. Verify unknown targets and unlisted operations fail.
4. Exercise fixture changes and independent expected outcomes, including negative controls.
5. Verify evidence redaction, persistence, cancellation and target-specific recovery.

This registration allowlist governs this adapter, not every direct shell or browser network call. It is not a signed multi-tenant admission system or an egress firewall. Use independently isolated workers before admitting untrusted customer workloads.
