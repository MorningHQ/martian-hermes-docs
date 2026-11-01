---
title: "AWS architecture"
description: "Understand the single-host deployment, data paths and isolation limits."
---

```text
Operator -- AWS SSM --> EC2 controller
                         |-- Hermes gateway --> model provider
                         |-- private dashboard (loopback)
                         |-- native CLI tools and two MCP servers
                         |       |-- Chromium browser
                         |       |-- synthetic lab (Unix socket)
                         |       `-- operator-registered HTTPS targets
                         `-- retained encrypted EBS data
                                  |-- application/workspace archives --> S3
                                  `-- volume recovery points --> AWS Backup
```

`/srv/hermes` is an independent encrypted EBS volume with CloudFormation retention. `home/` is `HERMES_HOME` (configuration, sessions, skills, memory and Kanban); `workspace/` holds work products; `install/` contains regenerable upstream code and PM tools. Services require the mount and refuse to fall back to the OS disk. Root owns maintenance configuration and receipts. Hermes runs without sudo and cannot provision or terminate AWS infrastructure through its instance role.

The live default profile uses `openai-codex` / `gpt-6.1-sol`, with medium reasoning, after the operator's browser OAuth authorization on 30 October 2026. The infrastructure template retains Bedrock IAM as its first-run default; this is a manual provider choice, not automatic failover. Existing profiles/configuration survive bootstrap. See [provider setup](/martian-hermes-docs/hosting/models/#chatgpt--codex-oauth) for the credential and validation boundaries.

One public subnet supplies outbound internet without a NAT gateway. All inbound security-group rules are absent; SSM and model requests originate from the instance. Public IPv4 is billed but does not expose the dashboard. IMDSv2 is required. Native local terminal tools share the host's OS boundary: do not admit untrusted customer workloads or supply unrelated credentials.

CDK assets contain deployment code, non-secret templates and the generated immutable Martian skills package. The [skills runbook](/martian-hermes-docs/attack-library/skills/) defines the content lock, isolated category and explicit existing-host update command. Model credentials, live Hermes homes, runtime outputs and backup archives must not be committed. The instance can read/write only its backup object prefixes and read its specific CDK asset; it cannot delete backup objects/versions. S3 retention and AWS Backup provide separate recovery mechanisms, not high availability. Loss of the single host requires restore/re-attachment.

The [managed tool installer](/martian-hermes-docs/tools/operations/) builds candidate runtimes separately from Hermes, verifies native artifact hashes and locked package dependencies, backs up before activation, and owns two MCP entries plus one tool skill. Tools remain on demand; the small synthetic lab is the only additional persistent service. Its Unix socket exposes test fixtures and independent synthetic outcome checks without adding network ingress. Registered customer targets and isolated customer workers require their own admission and verification contracts.

Based on the official [Linux installation](https://hermes-agent.nousresearch.com/docs/getting-started/installation), [gateway supervision](https://hermes-agent.nousresearch.com/docs/user-guide/messaging), [Bedrock integration](https://hermes-agent.nousresearch.com/docs/guides/aws-bedrock), and [AWS CDK guide](https://docs.aws.amazon.com/cdk/v2/guide/home.html). The community CloudFormation sample linked by Hermes is not treated as an AWS-authored deployment standard.
