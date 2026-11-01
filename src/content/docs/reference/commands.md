---
title: "Command reference"
description: "Distinguish conversation commands from operator maintenance commands."
---

Type these inside a Hermes conversation:

| Command | Purpose |
| --- | --- |
| `/help` | Show the commands available on that interface |
| `/status` | Inspect the current session, model and recent activity |
| `/new` | Start a fresh conversation |
| `/model` | Inspect or select an already configured model/provider |
| `/reasoning medium` | Select medium reasoning for the conversation |
| `/stop` | Interrupt the running agent and its background processes |
| `/goal status` | Inspect a standing goal |
| `/goal pause` / `/goal resume` | Pause or continue its automatic loop |
| `/goal clear` | Remove the standing goal |
| `/kanban list` | Inspect the persistent task board |

An approval prompt needs a deliberate decision. Read the proposed action before approving it. Messaging does not remove the agent's existing approval requirements. [Hermes command reference](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/reference/slash-commands.md).



## Operator commands on EC2

Run maintenance as the operator through SSM, outside an active agent chat:

```bash
sudo martian-hermes status
sudo martian-hermes backup --kind daily
sudo martian-hermes verify-restore daily/EXACT_KEY.tar.gz
sudo martian-hermes skills-verify
sudo martian-hermes tools-verify
sudo systemctl status martian-hermes-gateway martian-hermes-dashboard martian-redteam-lab
```

Updates are deliberate maintenance operations:

```bash
sudo martian-hermes tools-install --asset-root /opt/martian-hermes
sudo martian-hermes tools-rollback
sudo martian-hermes upgrade /root/approved-hermes-release.json
sudo martian-hermes rollback /srv/hermes/backups/EXACT_TIMESTAMP.tar.gz
```

Replace placeholders with reviewed candidates and existing backup objects. Read [tool maintenance](/martian-hermes-docs/tools/operations/), [updates](/martian-hermes-docs/hosting/upgrades/) and [recovery](/martian-hermes-docs/hosting/backups/) before running changes. `tools-rollback` switches the tool release; full `rollback` restores matching Hermes code and state.

## Commands as the hermes user

```bash
sudo -iu hermes
hermes chat
hermes model
hermes gateway setup
hermes pairing list
```

The deployment uses the custom system service `martian-hermes-gateway`. Do not install or start a second default Hermes gateway to manage it.
