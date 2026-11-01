---
title: "Connect a messaging app"
description: "Use one service, explicit sender allowlists and a real round-trip test."
---

Begin with browser chat, then connect one messaging channel and verify it before adding another. The reference host had no WhatsApp, Photon, BlueBubbles, Telegram, Discord or Slack channel credentials configured at the 1 November 2026 documentation check. These recipes describe setup, not a claim that personal accounts are already paired.

| Interface | What you need | Fit for this EC2 host |
| --- | --- | --- |
| [Browser](/martian-hermes-docs/get-started/access/) | AWS access and a private SSM tunnel | Ready to use; start here |
| [Terminal](/martian-hermes-docs/get-started/access/#operator-terminal) | An AWS SSM shell | Ready to use; also handles account setup |
| [Telegram](/martian-hermes-docs/messaging/telegram/) | A Telegram bot token and your user ID | Simple first mobile channel; outbound polling |
| [WhatsApp](/martian-hermes-docs/messaging/whatsapp/) | A WhatsApp account and phone pairing | Built-in Linked Device bridge; no public webhook |
| [iMessage through Photon](/martian-hermes-docs/messaging/imessage/#option-a-photon-hosted-relay) | A Photon account and an iMessage-capable number | Hosted relay; no Mac or public webhook needed |
| [iMessage through BlueBubbles](/martian-hermes-docs/messaging/imessage/#option-b-bluebubbles-and-your-own-mac) | An always-on Mac and private connectivity in both directions | Additional relay/network setup required |
| [Discord](/martian-hermes-docs/messaging/discord/) | A Discord application and bot | Outbound Gateway connection |
| [Slack](/martian-hermes-docs/messaging/slack/) | A Slack app with Socket Mode | Outbound connection; no public webhook |

Messaging apps connect to the same Hermes installation and tool library. Each conversation normally has its own session history; opening WhatsApp does not automatically resume your browser conversation. Files and longer-lived memory can be shared through the same Hermes home. This personal operator host does not provide isolation between different customers.

## Add a channel

The host already uses the custom system service **`martian-hermes-gateway`**. Use it for service control throughout this guide. Upstream examples for `hermes gateway install`, `hermes gateway start` and a user service named `hermes-gateway` do not manage our custom unit.

1. Open an SSM shell. As the operator, back up and pause the gateway before pairing:

   ```bash
   sudo /usr/local/sbin/martian-hermes backup --kind upgrade
   sudo systemctl stop martian-hermes-gateway
   sudo -iu hermes
   ```

   Backup temporarily pauses the dashboard and gateway while archiving data; they return when backup finishes. Allow current work to finish before this maintenance step.

2. Follow one channel recipe below. Use its wizard to save credentials. If additional access settings are needed, edit the existing `$HERMES_HOME/.env` with your preferred terminal editor. Replace sample IDs and phone numbers with your own. Do not paste tokens into an agent chat.

3. Leave the `hermes` shell and start the existing service:

   ```bash
   exit
   sudo systemctl start martian-hermes-gateway
   sudo systemctl is-active martian-hermes-gateway
   sudo journalctl -u martian-hermes-gateway --since "5 minutes ago" --no-pager
   ```

4. Send a plain-text test from your phone or chat app: `Reply exactly: Martian Hermes channel test successful`. Then ask it to call `list_targets`. Confirm both the reply and the actual tool result.

5. Once the connection works, take another operator backup using the command in step 1. Keep credential files and pairing directories private.

If setup fails, return to the operator shell and start `martian-hermes-gateway` again. Do not install a second gateway to troubleshoot the first. [Upstream gateway setup](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/user-guide/messaging/index.md).

## Control access and remove a connection

Only authorize people who should be able to operate this EC2 agent and its tools. Use the channel's sender allowlist; do not enable `ALLOW_ALL_USERS` for a personal operator bot. Group membership alone should not grant access.

Some channels offer DM pairing instead of preconfigured IDs. Review requests as the `hermes` user:

```bash
hermes pairing list
hermes pairing approve photon CODE_FROM_YOUR_OWN_TEST_MESSAGE
```

Replace `photon` with the platform being paired, such as `bluebubbles`. Approve only the sender you intended. To remove someone, remove their allowlist entry **and** revoke any pairing approval:

```bash
hermes pairing revoke photon USER_IDENTIFIER
```

To stop messaging immediately, use the operator shell:

```bash
sudo systemctl stop martian-hermes-gateway
```

For a permanent app disconnection, disable its saved platform configuration and remove/revoke its provider credentials. WhatsApp also offers unlinking through the phone's Linked Devices settings. Restart the gateway after updating the remaining configuration. [Hermes access and pairing](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/user-guide/security.md).
