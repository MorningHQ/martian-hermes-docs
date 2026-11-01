---
title: "Open the agent"
description: "Start the private SSM tunnel, then open browser chat."
---

You need AWS access, the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and the [Session Manager plugin](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html).

## Open browser chat

1. On your Mac, replace `INSTANCE_ID` and run:

```bash
aws ssm start-session   --region us-east-1   --target INSTANCE_ID   --document-name AWS-StartPortForwardingSession   --parameters '{"portNumber":["9119"],"localPortNumber":["19119"]}'
```

2. Leave that terminal open.
3. Open **[localhost:19119/chat?profile=default](http://127.0.0.1:19119/chat?profile=default)** and choose **New chat**.

<figure class="doc-visual diagram">
<a href="/martian-hermes-docs/media/diagrams/connect.svg" target="_blank" rel="noopener" aria-label="Open full-size diagram"><img src="/martian-hermes-docs/media/diagrams/connect.svg" alt="Browser port 19119 connects through SSM to the EC2 dashboard on port 9119." loading="lazy" decoding="async" width="1000" height="245" /></a>
<figcaption>The tunnel provides private access; the dashboard stays on EC2 loopback.</figcaption>
</figure>

<details>
<summary>Find the instance ID or refresh AWS sign-in</summary>

```bash
aws login
aws cloudformation describe-stacks   --stack-name MartianHermesAgent --region us-east-1   --query "Stacks[0].Outputs[?OutputKey=='InstanceId'].OutputValue | [0]"   --output text
```

If port `19119` is busy, change `localPortNumber` and use that port in your browser.

</details>

## Operator terminal

On your Mac:

```bash
aws ssm start-session --region us-east-1 --target INSTANCE_ID
```

Then on EC2:

```bash
sudo -iu hermes
hermes chat
```

`/quit` returns to the shell. Your files live under `/srv/hermes/workspace` on EC2.

**Next: [Run your first test →](/martian-hermes-docs/get-started/first-assessment/)**
