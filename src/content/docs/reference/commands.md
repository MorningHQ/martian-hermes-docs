---
title: "Commands"
description: "Conversation commands and operator maintenance at a glance."
---

## In a Hermes conversation

| Command | Use |
| --- | --- |
| `/help` | Available commands |
| `/status` | Session, model and recent activity |
| `/new` | Fresh conversation |
| `/model` | Model/provider selection |
| `/reasoning medium` | Medium reasoning |
| `/stop` | Interrupt current work |
| `/goal status` | Standing goal |
| `/goal pause` / `/goal resume` | Control continuation |
| `/goal clear` | Remove goal |
| `/kanban list` | Persistent task board |

## In the EC2 operator shell

```bash
sudo martian-hermes status
sudo martian-hermes backup --kind daily
sudo martian-hermes verify-restore daily/EXACT_KEY.tar.gz
sudo martian-hermes skills-verify
sudo martian-hermes tools-verify
```

For changes, follow [tool maintenance](/martian-hermes-docs/tools/operations/) or [updates/rollback](/martian-hermes-docs/hosting/upgrades/). The custom service is `martian-hermes-gateway`.

## As the hermes user

```bash
sudo -iu hermes
hermes chat
hermes model
hermes gateway setup
hermes pairing list
```

Run account setup outside an active agent chat. Read approval prompts before accepting actions.
