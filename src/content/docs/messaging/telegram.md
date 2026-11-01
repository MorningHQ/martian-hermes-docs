---
title: "Telegram"
description: "Connect Telegram to the existing Hermes gateway."
---

Follow the [common channel procedure](/martian-hermes-docs/messaging/setup/#add-a-channel) to back up, pause, configure and restart the existing service.

1. In Telegram, open the official [BotFather](https://t.me/BotFather), send `/newbot`, and create your bot. Save its token privately.
2. During the common setup procedure, run `hermes gateway setup` and select **Telegram**. Supply the token and your **numeric Telegram user ID**, not your username or the bot ID.
3. Confirm `TELEGRAM_ALLOWED_USERS` contains only your intended user IDs. Keep webhook mode unset so this host uses outbound polling.
4. Finish the common restart steps. Open your bot, tap **Start**, and send a normal test message; `/start` alone need not produce an agent reply.

The default polling route needs no public callback endpoint. [Telegram guide](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/user-guide/messaging/telegram.md).
