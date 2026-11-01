---
title: "Martian skills"
description: "Use pinned skill instructions while checking their actual runtime prerequisites."
---

The template installs **all 40 top-level skills** from [MorningHQ/martian-skills](https://github.com/MorningHQ/martian-skills), with all 207 tracked files inside their directories. This deliberately includes host workflow skills, beyond the 24-entry `runtime-catalog.json` used by the separate Aegra campaign runtime. It does not change that runtime catalog or its permissions.

`config/martian-skills.json` pins source commit `8b912fd85197714f481a14c6f7a9d09b7ab44663`, the deterministic archive checksum, skill IDs and every file checksum. Canonical editable content stays in martian-skills. The template tracks the content lock and packaging code, not a second editable content tree.

## Installed skill IDs

These 40 IDs come from the approved content lock. Load one with the native `skill_view` interface and check its prerequisites before execution.

- `agent-permission-and-approval-review`
- `agent-risk-taxonomy`
- `agentic-red-team-evaluation-plan`
- `ai-security-finding-normalizer`
- `ai-supply-chain-assurance`
- `assess-patch-risk`
- `attack-path-analysis`
- `beavertails-safety-evaluation`
- `deep-security-scan`
- `define-security-policy`
- `eu-ai-act-risk-mapping`
- `finding-discovery`
- `fix-finding`
- `martian-attack-constraint-defeat`
- `martian-attack-data-exfiltration`
- `martian-attack-guardrail-and-judge-evasion`
- `martian-attack-indirect-instruction-injection`
- `martian-attack-memory-and-context-poisoning`
- `martian-attack-privilege-escalation`
- `martian-attack-supply-chain-and-backdoor`
- `martian-attack-tool-and-action-abuse`
- `martian-security-board`
- `mitre-atlas-mapping`
- `nist-adversarial-ml-mapping`
- `nist-ai-rmf-assurance`
- `nvidia-aegis-safety-evaluation`
- `owasp-agentic-risk-mapping`
- `owasp-ai-red-team-methodology`
- `owasp-llm-risk-mapping`
- `owasp-mcp-risk-mapping`
- `owasp-ml-security-mapping`
- `propose-security-hardening`
- `security-diff-scan`
- `security-scan`
- `threat-model`
- `track-findings`
- `triage-finding`
- `validation`
- `verify-fix`
- `vulnerability-writeup`

## Build and install

`npm run check`, `npm run synth`, `npm run diff` and `npm run deploy` first package the approved Git objects as `assets/martian-skills.tar.gz`. By default the packager uses the sibling martian-skills checkout; if absent, it fetches the exact commit into a temporary directory using the operator's existing Git authentication. An existing checkout must contain that commit; fetch it first if necessary. Local edits are never packaged. The archive is ignored by Git but included in the CDK runtime asset. Synthesis refuses a missing or mismatched artifact.

The bootstrap installs the verified files as ordinary files under `/srv/hermes/home/skills/martian/`, retaining supporting paths and executable modes. Hermes discovers the nested category natively; existing bundled and user-created skills remain outside this managed namespace. No symlinks or GitHub token are installed. Hermes uses progressive discovery and `skill_view`, as described in its [official skills documentation](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills).

For an existing host, transfer the current reviewed runtime asset through SSM, then run:

```bash
sudo martian-hermes skills-install --asset-root /opt/martian-hermes
sudo martian-hermes skills-verify
```

Installation validates archive and file hashes before stopping services. It takes a complete off-host pre-change backup, swaps the category, and resumes previously running services. An unchanged installation is a no-op. An existing managed category must match its installed manifest; local edits, unexpected files or missing files stop replacement. Preserve intentional edits in the canonical repository before updating. This command does not modify disabled-skill settings; verification must additionally prove Hermes lists and loads every skill under the actual host configuration.

## Update the content pin

Review the source change in martian-skills, fetch it on the deployment machine, then explicitly update the lock:

```bash
python3 scripts/package_skills.py --source ../martian-skills --revision FULL_REVIEWED_COMMIT
npm run check
npm run synth
npm run diff
```

Deploy the changed asset/IAM reference, transfer it to the existing host, and invoke `skills-install`. Updating CloudFormation alone does not run the host command. Check native `skills_list(category='martian')` and `skill_view('martian/SKILL_ID')` for every pinned ID. The installed `.martian-release.json` records provenance alongside the content and survives application backup/import; `skills-verify` checks restored bytes.

## Prerequisites and limits

Availability is distinct from executability. This installs skill instructions and existing supporting files; it does not install every optional eval dependency, add external MCP connections, grant target authorization, or supply Codex-specific APIs. Several source-review skills reference shared upstream `../../references/` and `../../scripts/` material absent from martian-skills itself. Its imported triage evals and patch-risk validator also have documented missing shared schemas and upstream layout assumptions. These source-package limitations remain visible; do not report those workflows as qualified end-to-end Hermes operators. See the source [usage guide](https://github.com/MorningHQ/martian-skills/blob/8b912fd85197714f481a14c6f7a9d09b7ab44663/docs/usage.md).

Restoring a backup made before installation intentionally restores the earlier catalog. Reinstall the approved package afterward. Later application backups include the regular skill files and provenance manifest; EBS snapshots also cover the complete data disk.
