---
title: "iMessage"
description: "Choose a hosted relay or your own Mac."
---

<figure class="doc-visual diagram">
<a href="/martian-hermes-docs/media/diagrams/imessage.svg" target="_blank" rel="noopener" aria-label="Open full-size diagram"><img src="/martian-hermes-docs/media/diagrams/imessage.svg" alt="Photon uses a hosted relay; BlueBubbles needs a Mac and private connections in both directions." loading="lazy" decoding="async" width="1050" height="405" /></a>
<figcaption>Enable one route for a conversation to avoid duplicate handling.</figcaption>
</figure>

## Option A: Photon hosted relay

During the [common setup](/martian-hermes-docs/messaging/setup/#add-a-channel), run as `hermes`, using your number:

```bash
hermes photon setup --phone +15551234567 --no-browser
```

Open the displayed authorization link on your Mac. Finish sign-in and note the assigned iMessage line. Check the existing `.env`:

```dotenv
PHOTON_ALLOWED_USERS=+15551234567
PHOTON_REQUIRE_MENTION=true
```

Restart the gateway, then text the assigned line from your allowed number. Diagnose with `hermes photon status`. Use **E.164 numbers with `+`** and begin with text; the pinned plugin has attachment limitations.

Photon handles the relayed messages and has separate account terms/quotas. [Photon reference](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/user-guide/messaging/photon.md)

## Option B: BlueBubbles and your own Mac

1. Install [BlueBubbles Server](https://bluebubbles.app/) on an always-on Mac signed into Messages.
2. Confirm ordinary iMessage send/receive works.
3. Arrange private EC2 ↔ Mac networking: API to Mac on `1234`; webhook to EC2 on `8645`.
4. Run `hermes gateway setup`, select **BlueBubbles (iMessage)** and enter the Mac API URL/password.
5. Check `.env`, restart and test an inbound message and reply:

```dotenv
BLUEBUBBLES_SERVER_URL=http://MAC_PRIVATE_IP:1234
BLUEBUBBLES_WEBHOOK_HOST=EC2_PRIVATE_REACHABLE_IP
BLUEBUBBLES_WEBHOOK_PORT=8645
BLUEBUBBLES_ALLOWED_USERS=+15551234567
```

Replace both address placeholders. This private network is not provisioned by the template; the browser SSM tunnel does not supply it. A loopback-only webhook cannot receive Mac events. Back up the Mac relay separately.

[BlueBubbles reference](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/user-guide/messaging/bluebubbles.md)
