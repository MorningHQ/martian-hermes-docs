---
title: "Connect an app"
description: "Pair one channel and verify a reply and tool call."
---

Start with one app. At the 1 November documentation check, no personal messaging accounts were paired.

| App | You need |
| --- | --- |
| [Telegram](/martian-hermes-docs/messaging/telegram/) | Bot token + numeric user ID |
| [WhatsApp](/martian-hermes-docs/messaging/whatsapp/) | Linked Device pairing; preferably a dedicated number |
| [iMessage](/martian-hermes-docs/messaging/imessage/) | Photon relay or an always-on Mac with BlueBubbles |
| [Discord](/martian-hermes-docs/messaging/discord/) | Bot + Message Content Intent |
| [Slack](/martian-hermes-docs/messaging/slack/) | Bot token + Socket Mode app token |

## Add a channel

In an [operator shell](/martian-hermes-docs/get-started/access/#operator-terminal):

```bash
sudo martian-hermes backup --kind upgrade
sudo systemctl stop martian-hermes-gateway
sudo -iu hermes
```

1. Follow the app's recipe. Save credentials with its wizard, never in agent chat.
2. Restrict the sender allowlist to your own IDs. Edit the existing `$HERMES_HOME/.env` only as needed.
3. Return to the operator shell and restart:

```bash
exit
sudo systemctl start martian-hermes-gateway
sudo systemctl is-active martian-hermes-gateway
```

Send **“Reply exactly: channel test successful”**, then ask for `list_targets`. Check the reply and actual tool result. Back up again after pairing.

Use the existing `martian-hermes-gateway` service; do not install a second gateway. If setup fails, start that service again. Backups briefly pause the dashboard/gateway.

## Control access and remove a connection

Remove the sender from its allowlist and revoke any pairing approval:

```bash
hermes pairing list
hermes pairing revoke photon USER_IDENTIFIER
```

Use the appropriate platform name. To disconnect the app, disable its saved configuration and revoke its provider credentials; WhatsApp also offers **Linked Devices → Unlink**. Stop the gateway for immediate shutdown.

Each conversation normally has separate history. Files remain on the same host.
