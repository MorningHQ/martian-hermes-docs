---
title: "WhatsApp"
description: "Connect WhatsApp to the existing Hermes gateway."
---

Follow the [common channel procedure](/martian-hermes-docs/messaging/setup/#add-a-channel) to back up, pause, configure and restart the existing service.

Choose **a dedicated bot number** for regular use, or **self-chat** for a personal trial. The built-in Baileys bridge links a WhatsApp Web-style device. It is an unofficial integration and can break after protocol changes or incur account restrictions; the dedicated number keeps that risk away from your main account.

During step 2 of the common procedure, run:

```bash
node --version
npm --version
hermes whatsapp
```

Choose `bot` or `self-chat`. Let the wizard prepare bridge dependencies. On the phone with the account being linked, open **WhatsApp → Settings → Linked Devices → Link a Device**, then scan the terminal QR code. Widen the terminal if the QR is hard to read.

Check these entries in the existing `$HERMES_HOME/.env`:

```dotenv
WHATSAPP_ENABLED=true
WHATSAPP_MODE=bot
WHATSAPP_ALLOWED_USERS=15551234567
WHATSAPP_GROUP_POLICY=disabled
```

Replace the phone number with your permitted sender's number: country code and digits, **without `+`, spaces or punctuation**. For self-chat, use `WHATSAPP_MODE=self-chat`. Keep groups disabled initially.

Finish the common restart/test steps. In bot mode, message the linked bot account from your permitted account. In self-chat mode, open **Message yourself**. Pairing data lives under `$HERMES_HOME/platforms/whatsapp/session`; an unlinked session needs `hermes whatsapp` pairing again. [WhatsApp setup](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/user-guide/messaging/whatsapp.md), [environment settings](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/reference/environment-variables.md).

**WhatsApp Business Cloud API is a separate option.** Its Meta account setup and public HTTPS webhook are additional infrastructure work; they are not configured by this guide on our host with no inbound access. [Cloud API guide](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/user-guide/messaging/whatsapp-cloud.md).
