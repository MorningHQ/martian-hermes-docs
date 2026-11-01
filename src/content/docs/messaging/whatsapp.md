---
title: "WhatsApp"
description: "Pair a Linked Device and restrict senders."
---

Follow the [common setup steps](/martian-hermes-docs/messaging/setup/#add-a-channel), then as `hermes`:

```bash
hermes whatsapp
```

1. Choose **bot** for a dedicated number, or **self-chat** for a trial.
2. On the phone, open **Settings → Linked Devices → Link a Device**.
3. Scan the terminal QR code.
4. Check the existing `$HERMES_HOME/.env`:

```dotenv
WHATSAPP_ENABLED=true
WHATSAPP_MODE=bot
WHATSAPP_ALLOWED_USERS=15551234567
WHATSAPP_GROUP_POLICY=disabled
```

Use your sender's country code and digits **without `+`**. For self-chat, set `WHATSAPP_MODE=self-chat` and message yourself. Restart and test using the common steps.

The Baileys Linked Device bridge is unofficial and can break or incur account restrictions. A dedicated number limits the impact. The Business Cloud API is a separate setup requiring Meta credentials and a public webhook.

[WhatsApp reference](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/user-guide/messaging/whatsapp.md)
