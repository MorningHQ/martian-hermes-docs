---
title: "Install and maintain tools"
description: "Use the managed standalone releases without changing Hermes Python dependencies."
---

The template installs standalone, pinned tools without modifying Hermes's Python environment. The root-owned manifest is `config/redteam-tools.json`; Node dependencies use `tools/node/package-lock.json`, and each Python tool uses its own hashed Linux/Python 3.13 dependency lock under `tools/python/`. Native artifacts are checked against upstream SHA-256 digests. The optional GPU-capable garak stack is pinned to a Linux CPU-only PyTorch wheel; no local model is downloaded.

All catalog components are included: Playwright CLI and MCP, Chromium, mitmproxy, Promptfoo core, MCP Inspector, Cisco MCP Scanner, Cisco Skill Scanner, PyRIT, garak, Nuclei, ffuf, ZAP, Gitleaks CLI, Trivy, and Interactsh client/server. Node.js and uv are separately pinned supporting runtimes. The [catalog](/martian-hermes-docs/tools/catalog/) records purposes and top-level licenses. ZAP runs with its documented `-silent` option to suppress unsolicited vendor requests, including update checks; this also prevents offline shutdown delays observed during qualification. Paid inference and optional vendor services are not enabled by installation.

## Install, verify and recover

New hosts run `tools-install` from bootstrap. CDK asset updates alone do not execute maintenance on an existing host. After deploying the reviewed asset and updating `/opt/martian-hermes` and the maintenance script, use SSM:

```bash
sudo martian-hermes tools-install --asset-root /opt/martian-hermes
sudo martian-hermes tools-verify
sudo martian-hermes tools-rollback
```

The installer builds a candidate under `/srv/hermes/redteam/releases/RELEASE_ID`, with isolated Python environments and a locked Node installation. Package build hooks run as the non-login `martian-tools` user in a systemd job with read-only system paths, no Hermes home access, bounded memory and denied EC2 metadata access. This is build containment, not a customer execution sandbox.

Hermes continues running during candidate preparation. Activation stops the gateway/dashboard briefly, requires a complete S3 backup, preserves existing settings, merges only two owned MCP entries, updates the managed tool skill and switches a `current` symlink. Managed entry/skill conflicts fail rather than silently overwriting edits. Candidate build failure leaves the current configuration untouched; activation failure restores the old configuration, skill and symlink. Keep the prior release for rollback. `tools-rollback` requires an existing previous managed release and backs up before switching; it does not roll back sessions or workspace evidence.

Receipts under `/srv/hermes/receipts/` record input and critical-content hashes, wrapper checksums and the managed MCP entries. `tools-verify` checks those records and configuration. It does not replace real CLI, browser, model and target smoke tests. The SSM helper explicitly runs Bash; AWS's default shell does not accept `pipefail`.


## Capacity and evidence


Reports, observations and session mappings go under `/srv/hermes/workspace/redteam-evidence`, included in workspace backups. A non-secret rebuild receipt is also stored in Hermes home. Tool runtimes are regenerable; do not put authoritative customer evidence in their installation folders. Framework defaults outside Hermes home/workspace are not in the application archive: explicitly put PyRIT databases and garak report prefixes under the workspace for real campaigns, and qualify that campaign configuration before use. Browser login profiles require reauthentication after application-only recovery.

Synthetic lab state under `/srv/hermes/redteam-lab` and operator target configuration under `/etc/martian-redteam` are not part of the existing application-only archive. The lab data is covered by data-volume EBS snapshots; preserve/export operator target configuration separately for a host replacement. These initial targets contain no customer credentials or production state. Customer adapter recovery requires a tested target-specific procedure before admission.

Interactsh client/server binaries are installed, but an externally reachable private collector and domain are not provisioned. The client wrapper rejects its public defaults and requires an explicit operator-approved `-server` endpoint (help/version remain available). The no-ingress host and private dashboard are retained. Do not send assessment data to the default public collector. Local shell tools and native children still share one control host; use separate disposable workers before admitting untrusted workloads.
