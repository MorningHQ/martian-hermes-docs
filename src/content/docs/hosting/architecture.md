---
title: "AWS architecture"
description: "See the controller, tools, targets and storage in one diagram."
---

<figure class="doc-visual diagram">
<a href="/martian-hermes-docs/media/diagrams/architecture.svg" target="_blank" rel="noopener" aria-label="Open full-size diagram"><img src="/martian-hermes-docs/media/diagrams/architecture.svg" alt="One EC2 controller runs Hermes and local tools, calls a remote model and reaches the synthetic lab or approved HTTPS adapters." loading="lazy" decoding="async" width="1100" height="590" /></a>
<figcaption>Native subagents and shell tools share the controller.</figcaption>
</figure>

| Part | Setup |
| --- | --- |
| Controller | `t3a.medium` · 2 burstable vCPU · 4 GiB RAM |
| Access | SSM; no inbound security-group rules |
| Dashboard | `127.0.0.1:9119` |
| Storage | 24 GiB OS disk + retained encrypted 80 GiB data disk |
| Recovery | [S3 archives and AWS Backup snapshots](/martian-hermes-docs/hosting/backups/) |
| Model | [Bedrock IAM or ChatGPT/Codex OAuth](/martian-hermes-docs/hosting/models/) |

Hermes runs without sudo. Maintenance owns installs, backups and target registration. Aegra is not a runtime dependency.

One host is not a customer-isolated fleet. Use separate disposable workers for untrusted workloads. There is no multi-AZ failover; host loss requires recovery.

The public subnet provides outbound access without a NAT gateway. Public IPv4 is billed; SSM and model connections originate from EC2. IMDSv2 is required.
