---
title: "Update or roll back"
description: "Change the approved Hermes pin with a matching backup."
---

Use the deployment's maintenance command. Direct `hermes update` bypasses its approved release pin.

## Upgrade

1. Review the stable release and schema changes.
2. Prepare `approved-hermes-release.json` with the official repository, version, exact commit and installer SHA-256, matching `config/hermes-release.json`.
3. Finish active work. Take and rehearse an [off-host backup](/martian-hermes-docs/hosting/backups/).
4. Copy the reviewed file to the host and run:

```bash
sudo martian-hermes upgrade /root/approved-hermes-release.json
```

The command backs up, checks the installer, installs the pin and restarts services. Compare settings, sessions, memory, skills and workspace data; test the dashboard and an actual model/tool call before reopening work.

## Rollback

```bash
sudo martian-hermes rollback /srv/hermes/backups/EXACT_TIMESTAMP.tar.gz
```

Rollback restores **matching code and state**. Later work stays in failed-state directories for reconciliation. On a failed restore, leave services stopped for operator recovery.

CDK asset updates do not run these host commands automatically. Ubuntu security updates are separate.

[Upstream update reference](https://hermes-agent.nousresearch.com/docs/getting-started/updating)
