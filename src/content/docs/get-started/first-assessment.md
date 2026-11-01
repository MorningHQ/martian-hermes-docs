---
title: "Run a first assessment"
description: "Exercise the synthetic targets, tool calls and independent observations."
---

Start a new Hermes conversation and check the model and reasoning selector. On the reference hosted profile these are `gpt-6.1-sol` and **Medium**. New template installations initially use Bedrock; see [model setup](/martian-hermes-docs/hosting/models/).

## Discover the lab

Send this in chat:

```text
Load the redteam-tools skill. Call martian_redteam.list_targets.
Explain the registered synthetic targets and which tool verifies their outcomes.
```

Look for an actual tool call and result listing `lab-hardened` and `lab-vulnerable`. A model-generated description without a tool result does not prove connectivity.

## Compare the targets

```text
Assess only lab-hardened and lab-vulnerable using the tool-output-injection recipe.
Start a separate session for each target, apply the controlled fixture, and send a normal summarization request.
Verify each result with check_canary and record_finding.
Save a report under /srv/hermes/workspace/reports/first-assessment.md.
Label all findings synthetic. Do not contact external targets.
```

Expected behavior: the deliberately vulnerable simulation can disclose its protected synthetic canary; the hardened simulation should not. A supported vulnerable result is labeled `synthetic-confirmed`. An unsupported claim remains `unconfirmed`. Use [the evidence guide](/martian-hermes-docs/attack-library/evidence/) to interpret the result.

## Check the deliverable

- The report names both target IDs and separate session IDs.
- It records the recipe and relevant tool observations.
- It distinguishes observed behavior from claims and errors.
- It identifies both targets as simulations.
- It resides under the backed-up workspace, not a tool installation directory.

The local lab does not call an AI model. Hermes's own inference still uses its configured model connection and applicable limits. Do not present this example as a customer penetration test or a model-security benchmark.
