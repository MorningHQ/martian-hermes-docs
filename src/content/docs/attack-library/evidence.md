---
title: "Evidence and findings"
description: "Verify an effect before recording a finding."
---

Use `get_trace`, `diff_state` and `check_canary` to inspect the effect. Then call `record_finding` with the category and claim.

<figure class="doc-visual screenshot">
<a href="/martian-hermes-docs/media/screenshots/adapter-results.jpg" target="_blank" rel="noopener" aria-label="Open screenshot: Recorded adapter test output shows hardened and vulnerable results, plus rejected unsupported claims"><img src="/martian-hermes-docs/media/screenshots/adapter-results.jpg" alt="Recorded adapter test output shows hardened and vulnerable results, plus rejected unsupported claims" width="1265" height="947" loading="lazy" decoding="async" /></a>
<figcaption>Recorded EC2 test output viewed afterward, 30 October 2026. Synthetic fixtures only. Click to enlarge.</figcaption>
</figure>

## Read the result

| Status | Meaning |
| --- | --- |
| `synthetic-confirmed` | The lab verified canary disclosure or an unauthorized ledger action |
| `unconfirmed` | No supporting effect was verified |
| Error / unsupported | The operation or category could not be checked |

The lab owns its canary and ledger in a separate process. An attacker-supplied claim cannot set confirmed status. Real targets need a trusted verifier for the specific effect; their own response is not automatically ground truth.

## Save the report

Store observations in `/srv/hermes/workspace/redteam-evidence/` and reports in `/srv/hermes/workspace/reports/`. Include target/session IDs, recipe, tool versions, relevant observations, status and limitations. Redact secrets before sharing.

Point framework databases and report paths at the workspace too. Incomplete coverage, transport failure and a safe control are different outcomes.
