---
title: "Discord"
description: "Connect Discord to the existing Hermes gateway."
---

Follow the [common channel procedure](/martian-hermes-docs/messaging/setup/#add-a-channel) to back up, pause, configure and restart the existing service.

1. Create an application and bot in the [Discord Developer Portal](https://discord.com/developers/applications). Copy its bot token privately and enable **Message Content Intent**.
2. During the common procedure, run `hermes gateway setup` and select **Discord**. Use its invitation flow to add the bot to your server and configure the permitted owner/user IDs.
3. Check `DISCORD_ALLOWED_USERS`. Invite with the permissions needed for messages and files; Administrator access is unnecessary.
4. Finish the restart/test steps. DM the bot or mention it in a permitted server channel. The default channel behavior expects a mention.

Use numeric user IDs to keep the access rule clear. Thread, channel and user conversations can have distinct histories. [Discord guide](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/user-guide/messaging/discord.md).
