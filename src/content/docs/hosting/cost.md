---
title: "Capacity and cost"
description: "Read the dated estimate for the small EC2 controller."
---

**About $45.52/month for infrastructure**, using the 28 October 2026 estimate for `us-east-1`.

| Item | Estimate |
| --- | ---: |
| `t3a.medium` · 730 hours | $27.45 |
| 24 + 80 GiB gp3 disks | $8.32 |
| Public IPv4 | $3.65 |
| EBS recovery points allowance | $5.00 |
| S3 archives allowance | $1.00 |
| CloudWatch alarm | $0.10 |

Model/API usage, tax, transfer, backup growth and restore tests are extra. Allowances are not spending caps. Check current [AWS prices](https://aws.amazon.com/ec2/pricing/on-demand/) and tagged costs before budgeting.

## Capacity rules

- Run **one browser context and one heavy evaluation** at a time.
- Use remote models; the 4 GiB host is not sized for local large-model inference.
- Heavy wrappers share an advisory lock and reject overlapping jobs.
- Standard CPU credits avoid unlimited-credit surcharges; sustained load can throttle.

This budget covers one controller, not a continuously running distributed swarm.
