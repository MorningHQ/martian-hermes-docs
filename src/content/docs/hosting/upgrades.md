---
title: "Updates and rollback"
description: "Upgrade the approved pin with off-host backups and matching-state recovery."
---

The deployment follows the official source installer with an explicit `--commit` and separate `HERMES_HOME`. The normal upstream `hermes update` follows a channel, so running it directly bypasses this repository's approved pin. There is no unattended application update job. Ubuntu security maintenance is separate from Hermes upgrades.

1. Check the latest **stable** official GitHub release; resolve its annotated tag to the exact commit. Inspect release notes and schema/PM changes.
2. Create a candidate JSON in the same format as `config/hermes-release.json`: stable version, exact 40-character commit, SHA-256 of `scripts/install.sh` fetched from that commit, and official repository URL. Review and check in the new pin through the authorized Git workflow.
3. Schedule a maintenance window; settle active goals/tasks and freeze new admission. Take and rehearse an off-host backup. Preserve pre-upgrade sessions, memory, skills, Kanban and workspace sentinels for comparison.
4. Copy the reviewed candidate to the host through the operator's SSM channel and run:

   ```bash
   sudo martian-hermes upgrade /root/approved-hermes-release.json
   ```

5. The command pauses services, requires a complete S3 backup, verifies the installer hash, invokes the official installer with the approved commit, verifies the installed checkout and configuration, restarts and checks services. Check the actual dashboard/API and real model/tool behavior before reopening admission. Keep the change unaccepted if any check is missing.
6. On install/config/service failure, the tool reinstalls the prior pin against a fresh home and imports the matching pre-upgrade archive. The failed home/workspace are preserved. If restoration itself fails, leave services stopped for operator recovery; never claim a successful rollback from a partial restore.

For an operator-requested rollback to an already verified local bundle:

```bash
sudo martian-hermes rollback /srv/hermes/backups/EXACT_TIMESTAMP.tar.gz
```

This deliberately restores both code and state to the same recovery point. Work created after that point is retained in the failed-state directories for reconciliation, not silently merged into an older schema. After recovery verify the version, SQLite integrity, sentinels, services and model behavior. Review retained failed data before any cleanup.

The upstream updater's pre-update snapshot is best-effort and can skip files; the wrapper requires its own successful complete off-host backup before changing source. No system can promise compatibility with every future release. Sources: [official updating/rollback guidance](https://hermes-agent.nousresearch.com/docs/getting-started/updating), [installer commit pin and separate state](https://hermes-agent.nousresearch.com/docs/getting-started/installation), [backup/import behavior](https://hermes-agent.nousresearch.com/docs/reference/cli-commands).
