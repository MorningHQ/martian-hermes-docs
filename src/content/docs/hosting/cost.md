---
title: "Capacity and cost"
description: "Read the dated infrastructure estimate and single-host resource limits."
---

Region: US East (N. Virginia), `us-east-1`. Prices checked 2026-10-28. This is native EC2, replacing the earlier Lightsail example. Linux on-demand `t3a.medium` was queried through AWS Pricing at **$0.0376/hour**, or **$27.45 for 730 hours**. CPU credits are configured `standard` to avoid unlimited-credit surcharges; sustained load can throttle after credits are exhausted.

| Item | Monthly estimate / allowance |
| --- | ---: |
| EC2 t3a.medium, 2 vCPU / 4 GiB, 730 hours | $27.45 |
| gp3: 24 GiB OS + 80 GiB retained data at $0.08/GiB-month | $8.32 |
| One public IPv4 at $0.005/hour | $3.65 |
| EBS recovery points allowance, dependent on changed data | $5.00 |
| S3 application backups and small request volume allowance | $1.00 |
| One standard CloudWatch alarm | $0.10 |
| Estimated infrastructure subtotal | **$45.52** |

Allowances are not caps. Model/API charges, tax, internet transfer over the applicable account allowance, additional monitoring, backup growth, AWS Backup restore tests, temporary recovery volumes and CDK asset/bootstrap storage are separate or variable. The single-host architecture includes no NAT gateway, load balancer, managed database or Kubernetes cluster. Track actual tagged costs and disk growth; the ~$50 budget cannot guarantee arbitrary storage churn or continuous distributed workers.

Sources: [EC2 on-demand](https://aws.amazon.com/ec2/pricing/on-demand/), [EBS pricing](https://aws.amazon.com/ebs/pricing/), [public IPv4](https://aws.amazon.com/vpc/pricing/), [S3 pricing](https://aws.amazon.com/s3/pricing/), [AWS Backup pricing](https://aws.amazon.com/backup/pricing/).


## Capacity rules

Keep one browser context and one heavy evaluation job active at a time. Heavy wrappers share an advisory evaluation lock and fail promptly if another job holds it. This protects a small host from accidental overload; it does not enforce tenant isolation.

The estimates above were checked on the stated date, not refreshed by this documentation build. Consult current AWS prices and tagged actual costs before changing capacity or committing to a monthly budget.
