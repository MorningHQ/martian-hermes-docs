---
title: "Deploy on AWS"
description: "Deploy the private infrastructure template and check runtime readiness."
---

Get access to the private `MorningHQ/martian-hermes-agent` repository. You need Node.js, npm, AWS CLI, the Session Manager plugin and a [CDK-bootstrapped account/region](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html).

## Deploy

```bash
aws sts get-caller-identity
git clone https://github.com/MorningHQ/martian-hermes-agent.git
cd martian-hermes-agent
npm ci
npm run check
npm run synth
npm run diff
```

Review the account, region, cost and resource changes, then:

```bash
npm run deploy
```

Default region: `us-east-1`. The operator needs the stack's resource permissions and scoped `iam:PassRole` for the EC2 and Backup roles. Deployment uses the operator's CLI credentials.

## Wait for the host

Connect through SSM and run on EC2:

```bash
sudo cat /var/lib/martian-hermes/bootstrap-status
sudo systemctl status martian-hermes-gateway martian-hermes-dashboard martian-redteam-lab
sudo martian-hermes status
```

Tool installation can outlast CloudFormation deployment. If bootstrap fails, inspect `/var/log/cloud-init-output.log`.

Before using the host, check the approved code pin, `/srv/hermes` mount, encryption, no ingress and loopback dashboard. Then run [a real agent/tool test](/martian-hermes-docs/get-started/first-assessment/) and [a restore rehearsal](/martian-hermes-docs/hosting/backups/#restore-rehearsal).

<details>
<summary>Replacing an existing host</summary>

Verify an off-host backup, stop services, unmount `/srv/hermes` and stop the old instance. Preserve the data disk and its AZ. Review attachment ordering; never format the existing disk. For a different AZ, restore a new encrypted volume from a recovery point.

</details>
