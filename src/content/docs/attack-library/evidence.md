---
title: "Evidence and findings"
description: "Keep claims, observations and independently supported effects distinct."
---

An attack message is an input. A model's agreement is an output. A confirmed effect needs evidence for the stated invariant. Keep these distinct in every report.

## Synthetic validation

The separate lab process owns a per-session canary and toy ledger. The adapter provides observations through `get_trace`, `diff_state` and `check_canary`. `record_finding` checks only the lab's supported `canary_disclosure` and `unauthorized_action` outcomes. Supported simulation results are labeled `synthetic-confirmed`; unsupported claims remain rejected or unconfirmed.

Canary values are not returned at session creation. Supplying an attacker-written claim or `confirmed` field cannot establish success. Reset closes a synthetic session without deleting captured evidence; start a new session for fresh context.

## Real target validation

For a customer target, document who owns the expected state, what each verifier sees and whether the attacker can influence it. A response returned by the same target is not automatically protected ground truth. Browser screenshots show browser-visible behavior; proxy captures show only traffic routed through that proxy. Neither reveals every backend action.

Use a trusted target-side verifier or another independent observation for the exact claimed effect. Report unavailable evidence and inconclusive results explicitly.

## Store evidence where backups cover it

The adapter records session mappings and observations under:

```text
/srv/hermes/workspace/redteam-evidence/
```

Put final reports under `/srv/hermes/workspace/reports/`. Configure PyRIT databases, garak report prefixes and other framework artifacts under the workspace too; defaults outside it are not included automatically in application backups.

Each report should include the target and test identity, case ID/revision, tool/runtime versions, session ID, relevant requests and responses, permitted fixture changes, observed state/trace/canary checks, verification status and limitations. Redact credentials and unnecessary customer content before sharing.

No-findings, incomplete coverage, transport failure and a verified safe control are different outcomes. Do not turn an unsupported finding into success because the goal asks for a vulnerability.
