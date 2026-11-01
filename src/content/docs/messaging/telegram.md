---
title: "Telegram"
description: "Create a bot and allow your numeric user ID."
---

1. Create a bot through [BotFather](https://t.me/BotFather) using `/newbot`.
2. Follow the [common setup](/martian-hermes-docs/messaging/setup/#add-a-channel).
3. As `hermes`, run `hermes gateway setup` and select **Telegram**.
4. Enter the bot token and your **numeric Telegram user ID**.
5. Check `TELEGRAM_ALLOWED_USERS`, then restart the gateway.
6. Open the bot, tap **Start** and send the common test message.

Leave webhook mode unset to use outbound polling. Your username and the bot's ID are not your sender ID. `/start` alone may not produce an agent reply.

[Telegram reference](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/user-guide/messaging/telegram.md)
