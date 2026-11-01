---
title: "Martian skills"
description: "Load a skill, inspect its prerequisites and update the content pin."
---

The deployment installs **40 skills and 207 supporting files** from `MorningHQ/martian-skills`.

## Use a skill

```text
List the Martian skills for prompt injection, then load the most relevant one.
```

Hermes discovers them under `skills/martian/` and reads them with `skill_view`. Instructions may need additional dependencies or shared references; loading a skill does not prove that its workflow runs.

<details>
<summary>All 40 installed skill IDs</summary>

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

</details>

## Install or verify

After transferring the reviewed runtime asset to EC2:

```bash
sudo martian-hermes skills-install --asset-root /opt/martian-hermes
sudo martian-hermes skills-verify
```

Installation backs up before replacement and rejects locally changed managed files. Keep edits in the canonical skills repository.

## Update the content pin

In the deployment checkout:

```bash
python3 scripts/package_skills.py --source ../martian-skills --revision FULL_REVIEWED_COMMIT
npm run check
npm run synth
npm run diff
```

Deploy/transfer the asset, run `skills-install`, then verify native discovery and loading. The lock is `config/martian-skills.json`; EC2 receives pinned files without GitHub credentials. Restoring an older backup restores its older catalog.

[Skills reference](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills)
