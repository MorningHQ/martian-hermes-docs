---
title: "Slack"
description: "Install a Socket Mode app and test a message."
---

During the [common setup](/martian-hermes-docs/messaging/setup/#add-a-channel), run as `hermes`:

```bash
hermes slack manifest --agent-view --write
```

1. Create an app from the manifest at [Slack app management](https://api.slack.com/apps). Review scopes before installing.
2. Obtain the bot token and a Socket Mode app token with `connections:write`.
3. Enable App Home's **Messages tab** and message/slash-command permission.
4. Run `hermes gateway setup`, select **Slack** and enter tokens plus permitted Member IDs.
5. Check `SLACK_ALLOWED_USERS`, restart and send a DM or invite the bot to a channel.

Socket Mode needs no public webhook. If Slack intercepts slash commands, use `/hermes status` or `/hermes goal status`.

[Slack reference](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/user-guide/messaging/slack.md)
