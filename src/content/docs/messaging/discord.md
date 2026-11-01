---
title: "Discord"
description: "Set up a bot, intent and allowed users."
---

1. Create an application/bot in the [Discord Developer Portal](https://discord.com/developers/applications).
2. Enable **Message Content Intent** and retain the bot token privately.
3. During the [common setup](/martian-hermes-docs/messaging/setup/#add-a-channel), run `hermes gateway setup` and select **Discord**.
4. Use the invitation flow and set permitted numeric user IDs in `DISCORD_ALLOWED_USERS`.
5. Restart and test by DM or by mentioning the bot in a permitted channel.

Grant message/file permissions as needed; Administrator is unnecessary. The default server-channel behavior expects a mention.

[Discord reference](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/user-guide/messaging/discord.md)
