---
title: "Backups and recovery"
description: "Run a backup, rehearse a restore and know what is covered."
---

<figure class="doc-visual diagram">
<div class="diagram-scroll" tabindex="0" role="region" aria-label="Diagram — scroll horizontally to explore">
<a href="/martian-hermes-docs/media/diagrams/backups.svg" target="_blank" rel="noopener" aria-label="Open full-size diagram"><img src="/martian-hermes-docs/media/diagrams/backups.svg" alt="S3 keeps application archives; AWS Backup keeps separate data-volume snapshots." loading="lazy" decoding="async" width="1050" height="430" /></a>
</div>
<figcaption>Daily application backup runs around 03:15 UTC and briefly pauses the gateway/dashboard. <a class="visual-open" href="/martian-hermes-docs/media/diagrams/backups.svg" target="_blank" rel="noopener" aria-label="Open full-size diagram (opens in a new tab)">Open full size <span aria-hidden="true">↗</span></a></figcaption>
</figure>

## Restore rehearsal

On EC2 as the operator:

```bash
sudo martian-hermes backup --kind daily
sudo martian-hermes verify-restore daily/EXACT_KEY.tar.gz
```

Use the exact uploaded object key. Verification downloads the archive, checks hashes/CRCs, imports into a temporary home and checks restored SQLite databases. It leaves the live home untouched. Repeat monthly and before upgrades.

## What is covered

| Data | Recovery path |
| --- | --- |
| Hermes home, settings, sessions and skills | Application archive |
| Workspace reports and evidence | Workspace archive |
| Synthetic lab state | Data-volume snapshot |
| Tool runtimes | Rebuild from approved locks |
| Browser logins | Reauthenticate after application restore |
| Target registration and Mac relay | Separate protected backup required |

Backups contain credentials. Keep them out of Git and public evidence. S3 is versioned; the instance role cannot delete backup objects. Three local bundles are retained. Snapshots are crash-consistent; no cross-region copy or external backup-failure notification is configured.

## Recovery

- **Application:** stop Hermes, install the archive's exact code pin against a fresh home, import `home.zip`, then restore `workspace.tar.gz`.
- **Whole disk:** restore an encrypted EBS volume in the required AZ, attach to a clean/stopped host and verify before admitting work.

Check version, SQLite integrity, skills, services and a model/tool call. Preserve failed state and reconcile work after the recovery point. Never run older code against a newer schema.

[AWS Backup reference](https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html)
