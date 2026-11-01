---
title: "Backups and recovery"
description: "Understand archive scope, EBS snapshots and isolated restore rehearsals."
---

The root-owned systemd timer runs daily around 03:15 UTC, including missed runs after reboot. It locks maintenance, pauses gateway/dashboard, invokes official `hermes backup -o ... --keep 0`, checks the zip CRCs and exit status, archives the workspace, records SHA-256 hashes and the exact code pin, and uploads the bundle to S3 using a checksum and server-side encryption. Services resume even if an ordinary backup fails. Sunday runs also create a weekly copy.

S3 retains daily objects for 35 days, weekly objects and pre-upgrade objects for 90 days; object versioning protects earlier values from overwrite. There are no instance-role delete permissions. Three complete local bundles are retained. Backups contain secrets such as `.env`/`auth.json` if configured: never download them to Git or print their contents. CloudWatch's missing-backup alarm has no external notification destination until one is explicitly configured.

AWS Backup independently retains daily data-volume recovery points for 7 days and weekly points for 35 days. These are crash-consistent full-volume snapshots, not a substitute for application-consistent archives. No cross-region copy or multi-AZ failover is included in the budget.

## Restore rehearsal

```bash
sudo martian-hermes backup --kind daily
sudo martian-hermes verify-restore daily/EXACT_KEY.tar.gz
```

`verify-restore` downloads the off-host S3 object, verifies payload hashes and zip CRCs, uses official `hermes import --force` in a separate temporary `HERMES_HOME`, runs `PRAGMA integrity_check` on every restored SQLite database and extracts the workspace in isolation. It never imports over the live home. Retain the receipt in `/srv/hermes/receipts/latest-restore-test.json` and repeat monthly and before upgrades.

## Recovery

For application recovery, recover the exact original release pin from `manifest.json`, stop all Hermes processes, install that matching release against a fresh home, then use official `hermes import home.zip --force`; restore `workspace.tar.gz` to the data volume. Do not run old source against a newer schema. For whole-disk recovery, create a replacement EBS volume from the selected AWS Backup point and attach it in the same AZ to a stopped/clean host; verify filesystem, services, code version, model access and evidence before reopening work.

The regular files in `home/skills/martian/`, including its `.martian-release.json`, are part of the official archive. After importing, run `sudo martian-hermes skills-verify` to check all managed content; restoring an older backup restores its older skills catalog. The official archive intentionally excludes code, downloaded tools, caches, SQLite sidecars, browser credential profiles, checkpoints, and symlinks. Store authoritative work products under the workspace or supported Hermes data paths. Browser credentials must be reauthenticated after application-only recovery. Any writes after the chosen recovery point are outside that backup: freeze admission during upgrade/rollback windows and preserve failed state before recovery.

The workspace archive needs free staging space on the data volume. Safe extraction refuses links that escape the restore destination; keep externally linked dependencies regenerable and exercise the restore test after changing workspace layout. Failed-state directories are retained for reconciliation and require operator review before cleanup.

Sources: [official backup/import reference](https://hermes-agent.nousresearch.com/docs/reference/cli-commands), [backup scope](https://hermes-agent.nousresearch.com/docs/reference/faq), [AWS Backup EBS guidance](https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html).


## Tool and target recovery gaps

Tool environments under `/srv/hermes/redteam` are regenerable from approved locks. Put authoritative reports and framework databases under the backed-up workspace. Browser profiles are excluded from application archives and need reauthentication.

Synthetic lab state under `/srv/hermes/redteam-lab` is covered by data-volume snapshots, not the application-only archive. Operator target registration under `/etc/martian-redteam` needs its own protected recovery procedure. Do not assume a customer adapter or Mac messaging relay is recovered by restoring Hermes home.
