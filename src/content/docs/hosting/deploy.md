---
title: "Deploy on AWS EC2"
description: "Deploy the pinned Hermes controller and verify the actual runtime."
---

The private deployment repository is `MorningHQ/martian-hermes-agent`. Obtain access from the project owner. Keep deployment code and live outputs private; this public docs repository contains no infrastructure credentials.

## Prerequisites

- An AWS account and operator credentials allowed to create the stack's EC2, IAM, EBS, S3, Systems Manager and AWS Backup resources.
- A compatible CDK bootstrap stack in the chosen account/region.
- Current Node.js, npm, AWS CLI and the Session Manager plugin on the deployment machine.
- Model access for the selected [provider](/martian-hermes-docs/hosting/models/).

The default region is `us-east-1`. First verify the intended identity and region; do not infer the active AWS account from a browser tab.

```bash
aws sts get-caller-identity
aws configure get region
git clone https://github.com/MorningHQ/martian-hermes-agent.git
cd martian-hermes-agent
npm ci
npm run check
npm run synth
npm run diff
```

Review the infrastructure diff, resource retention and expected cost. The deployment uses `CliCredentialsStackSynthesizer`: the operator's credentials publish assets and deploy the stack. The operator needs the declared resource permissions and narrowly scoped `iam:PassRole` access for the EC2 and AWS Backup service roles. Do not broaden a shared CDK role to work around a failed deployment.

## Deploy

```bash
npm run deploy
```

The reference stack creates a `t3a.medium` controller with 2 burstable vCPUs and 4 GiB RAM, a 24 GiB OS disk, an 80 GiB retained encrypted data disk, private backup storage and schedules. It creates no public inbound rule. Outputs are stored in the deployment checkout's ignored `.artifacts/outputs.json`.

## Wait for runtime readiness

CloudFormation completion does not mean the source installer or tool builds have finished. Connect through SSM and inspect:

```bash
sudo cat /var/lib/martian-hermes/bootstrap-status
sudo tail -n 60 /var/log/cloud-init-output.log
sudo systemctl status martian-hermes-gateway martian-hermes-dashboard martian-redteam-lab
sudo /usr/local/sbin/martian-hermes status
```

Check the approved Hermes commit, `/srv/hermes` mount, encrypted retained data disk, absence of ingress rules and loopback dashboard listener. Then verify an actual inference turn with a tool call, a successful backup/isolated restore rehearsal, and persistence after reboot. See [verification](/martian-hermes-docs/operations/verification/).

New hosts install pinned Martian skills and standalone tool runtimes during bootstrap. The first tool build can take longer than the base Hermes install. Existing-host asset updates do not automatically run maintenance; use the explicit [tool update procedure](/martian-hermes-docs/tools/operations/).

## Replacing an existing host

Before replacement, verify an off-host backup, stop the services, unmount `/srv/hermes` and stop the old instance. Preserve the retained data volume and its Availability Zone. Review attachment ordering before applying the change set. For a different AZ, restore a new encrypted volume from a recovery point rather than attempting cross-AZ attachment.

Never format an existing data volume. Termination protection and retention are intentional; deletion is a separate operator decision.

References: [AWS CDK bootstrap](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html), [AWS CLI installation](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html), [Session Manager plugin](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html), [official Hermes installation](https://hermes-agent.nousresearch.com/docs/getting-started/installation).
