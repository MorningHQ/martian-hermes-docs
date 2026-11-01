---
title: "Install and verify tools"
description: "Activate a pinned tool release and keep a rollback path."
---

New hosts install tools during bootstrap. For an existing host, transfer the reviewed runtime asset to `/opt/martian-hermes`, then run as the operator:

```bash
sudo martian-hermes tools-install --asset-root /opt/martian-hermes
sudo martian-hermes tools-verify
```

Preparation keeps Hermes running. Activation takes an S3 backup, briefly stops services, merges the two managed MCP entries and switches `current`. Conflicting local edits stop activation.

## Roll back a tool release

```bash
sudo martian-hermes tools-rollback
```

Requires a previous release. This switches tools and managed settings; it does not rewind session/workspace evidence.

## Verify through the agent

Run [the lab test](/martian-hermes-docs/get-started/first-assessment/) after activation. `tools-verify` checks receipts and hashes, not full runtime behavior. [Functional test record →](/martian-hermes-docs/operations/verification/)

<details>
<summary>Packaging and wrapper behavior</summary>

- `config/redteam-tools.json`: native versions and hashes.
- `tools/node/package-lock.json`: Node dependencies.
- `tools/python/`: isolated, hashed Python environments.
- `/srv/hermes/redteam/releases/`: root-owned releases; `current` selects one.
- `/srv/hermes/receipts/`: installed-content receipts.

Hermes's Python environment stays separate. Build jobs use the `martian-tools` identity; this does not isolate customer execution.

ZAP uses `-silent`. Promptfoo disables supported remote-generation fallbacks and telemetry, not all networking. Interactsh rejects public defaults and requires an explicit approved `-server`.

</details>

Keep reports and framework databases under the [backed-up workspace](/martian-hermes-docs/reference/paths/), not tool installation folders.
