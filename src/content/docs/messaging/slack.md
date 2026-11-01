---
title: "Slack"
description: "Connect Slack to the existing Hermes gateway."
---

Follow the [common channel procedure](/martian-hermes-docs/messaging/setup/#add-a-channel) to back up, pause, configure and restart the existing service.

1. During the common procedure, generate a manifest as `hermes`:

   ```bash
   hermes slack manifest --agent-view --write
   ```

2. At [Slack app management](https://api.slack.com/apps), create an app from that manifest. Review its scopes, event subscriptions and Socket Mode configuration before installing it to your workspace.
3. Obtain the **bot token** and a **Socket Mode app-level token** with `connections:write`. In App Home, enable the Messages tab and permission to send messages/slash commands.
4. Run `hermes gateway setup`, choose **Slack**, and supply both tokens and your permitted Slack Member IDs. Check `SLACK_ALLOWED_USERS`.
5. Finish the restart/test steps. Invite the app to the selected channel or send it a DM.

Socket Mode avoids a public webhook. If Slack intercepts a slash command or the workspace uses an older command manifest, use `/hermes status` or `/hermes goal status` as the compatible command wrapper. [Slack setup and command handling](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/user-guide/messaging/slack.md).
