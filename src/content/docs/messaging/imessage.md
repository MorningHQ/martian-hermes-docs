---
title: "iMessage"
description: "Connect iMessage to the existing Hermes gateway."
---

Follow the [common channel procedure](/martian-hermes-docs/messaging/setup/#add-a-channel) to back up, pause, configure and restart the existing service.

### Option A: Photon hosted relay

Use this route if you want to keep Hermes on EC2 without operating a Mac relay. You text an **assigned Photon iMessage line**, which forwards the conversation to Hermes. Photon is an additional provider that handles the messages; its account access, quotas and pricing are separate from AWS and the model connection.

During the common setup procedure, run this as `hermes`, replacing the sample with your iMessage-capable number:

```bash
hermes photon setup --phone +15551234567 --no-browser
```

Open the displayed Photon authorization link on your Mac and approve the device sign-in. The wizard provisions its project, saves credentials, registers your number, prepares the Node sidecar and prints the line to text.

Add or check these access settings in the existing `$HERMES_HOME/.env`:

```dotenv
PHOTON_ALLOWED_USERS=+15551234567
PHOTON_REQUIRE_MENTION=true
```

Photon uses **E.164 numbers with `+`**. Finish the common restart/test steps, then send the first iMessage from that permitted number to the assigned line. For shared lines, initiate the conversation from your phone before expecting notifications. Diagnose with:

```bash
hermes photon status
```

The gateway supervises its sidecar over loopback; the sidecar opens an outbound stream to Photon. The pinned plugin has inbound-attachment limitations, so start with text. Check current service terms at [Photon](https://photon.codes/) before depending on its allowance. [Hermes Photon instructions](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/user-guide/messaging/photon.md), [plugin details](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/plugins/platforms/photon/README.md).

### Option B: BlueBubbles and your own Mac

This route uses Messages on an **always-on Mac signed in to the Apple account you want to use**. Install [BlueBubbles Server](https://bluebubbles.app/) and grant its required macOS permissions. Confirm the Mac can send and receive an ordinary iMessage first. An `imsg` command installed on the EC2 Linux host cannot supply Messages.app.

An operator must first arrange an authenticated private network between the Mac and EC2, with both directions working:

| Direction | Required connection |
| --- | --- |
| Hermes → Mac | BlueBubbles REST API, usually port `1234` |
| Mac → Hermes | BlueBubbles webhook listener, usually port `8645` |

The browser's SSM tunnel on `19119` does not provide either route. A Mac's ordinary home-network address is not reachable from EC2 automatically. This private network is **not provisioned on the current host**; keep it an operator setup task rather than opening a public webhook port.

Once private routing exists, run `hermes gateway setup` as `hermes` and select **BlueBubbles (iMessage)**. Enter the Mac's reachable API URL and BlueBubbles password. Configure these entries in the existing `$HERMES_HOME/.env`:

```dotenv
BLUEBUBBLES_SERVER_URL=http://MAC_PRIVATE_IP:1234
BLUEBUBBLES_WEBHOOK_HOST=EC2_PRIVATE_REACHABLE_IP
BLUEBUBBLES_WEBHOOK_PORT=8645
BLUEBUBBLES_ALLOWED_USERS=+15551234567
```

Replace both address placeholders with actual private interface addresses. Restrict network access to the two peers and keep the password private. A webhook bound only to EC2's `127.0.0.1` cannot receive the Mac's events. Finish the common restart/test steps. Hermes registers the webhook; verify a real inbound message and reply. [BlueBubbles adapter setup and callback directions](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/user-guide/messaging/bluebubbles.md).

Enable only one iMessage bridge for the same conversation to avoid duplicate handling. Mac relay data has its own backup requirements outside EC2's backups.
