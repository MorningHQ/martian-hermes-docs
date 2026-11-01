---
title: "Open browser chat or a terminal"
description: "Connect privately to the EC2 dashboard and operator shell through SSM."
---

Use AWS Systems Manager to reach the agent. The dashboard remains on EC2 loopback; publishing these docs does not make it publicly accessible.

Replace `INSTANCE_ID` in the examples with the current stack output. The deployment operator must provide AWS access to the intended account and region.

### On your Mac

You need the AWS CLI and AWS Session Manager plugin. Check:

```bash
aws --version
session-manager-plugin --version
aws sts get-caller-identity
```

Use the AWS profile that has access to the Martian Hermes stack. If authentication has expired, run `aws login` and finish AWS sign-in in your browser. See the official [AWS CLI installation](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and [Session Manager plugin setup](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html) if either command is missing.

In a terminal, open the private dashboard tunnel:

```bash
aws ssm start-session \
  --region us-east-1 \
  --target INSTANCE_ID \
  --document-name AWS-StartPortForwardingSession \
  --parameters '{"portNumber":["9119"],"localPortNumber":["19119"]}'
```

Keep that terminal running. Open **[http://127.0.0.1:19119/chat?profile=default](http://127.0.0.1:19119/chat?profile=default)** in your browser.

The instance ID above is the current host. After a host replacement, retrieve the current ID:

```bash
aws cloudformation describe-stacks \
  --stack-name MartianHermesAgent \
  --region us-east-1 \
  --query "Stacks[0].Outputs[?OutputKey=='InstanceId'].OutputValue | [0]" \
  --output text
```

Replace the old `--target` value with that output. If local port `19119` is occupied, choose another `localPortNumber` and use the matching browser URL. The remote port stays `9119`.

### Your first conversation

Choose **Chat → New chat**. Confirm that the model is `gpt-6.1-sol` and the reasoning selector says **Medium**. Existing sessions can retain an earlier model; start a new chat for the current default.

Send:

```text
Load the redteam-tools skill. Use the Martian MCP list_targets tool and tell me which synthetic targets are registered. Explain what each target represents.
```

Expected target IDs are `lab-hardened` and `lab-vulnerable`. Both are deterministic test simulations. A tool call followed by the target list proves more than an answer that merely describes the tools.

Useful dashboard sections:

| Section | Use it for |
| --- | --- |
| Chat / Sessions | Start work and reopen previous conversations |
| Files | Find and retrieve saved work products |
| Models | Inspect the default model and provider |
| Skills | Browse the installed instructions and workflows |
| MCP | Inspect the two configured tool servers |
| Channels | Inspect messaging connections |
| Logs | Diagnose failures; keep credential-bearing output private |

## Operator terminal

In a **second terminal on your Mac**, start an SSM shell:

```bash
aws ssm start-session \
  --region us-east-1 \
  --target INSTANCE_ID
```

The commands below run **on EC2**, not on your Mac:

```bash
sudo -iu hermes
echo "$HERMES_HOME"
hermes chat
```

The home should be `/srv/hermes/home`. Inside `hermes chat`, `/quit` returns to the shell. Run account setup commands from that shell, outside an active chat.

The service and shell use these persistent locations:

| Path | Contents |
| --- | --- |
| `/srv/hermes/home/config.yaml` | Agent, model and platform settings |
| `/srv/hermes/home/.env` | Messaging credentials and allowlists |
| `/srv/hermes/home/auth.json` | OAuth credentials and authentication metadata |
| `/srv/hermes/workspace` | Reports, scripts and other work products |

Upstream documentation calls the home `~/.hermes`; on this deployment, **`HERMES_HOME` redirects it to `/srv/hermes/home`**. Set up channels as the `hermes` user so the gateway can read the resulting files. Keep existing model settings and unrelated environment entries when editing.
