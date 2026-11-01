---
title: "Model providers"
description: "Choose Bedrock IAM or an authenticated ChatGPT/Codex provider without mixing their credentials."
---

The agent harness and its model provider are separate. Hermes owns planning, tools, sessions and goals. Bedrock or the authenticated Codex provider supplies inference.

| Configuration | Purpose |
| --- | --- |
| Fresh template: DeepSeek V3.2 through Bedrock IAM | Uses the EC2 role; no model API key is stored |
| Reference hosted profile: GPT-6.1 Sol, medium reasoning, ChatGPT/Codex OAuth | Uses Hermes-owned OAuth credentials after account-owner authorization |

The template preserves an existing profile. Changing infrastructure does not automatically switch providers or migrate every existing session. No automatic provider failover is configured.

## Bedrock IAM

Check that the deployed role permits the specific configured Bedrock model and that the account/region has access. Use the exact model identifier in the deployment configuration. Verify a real inference request and tool call; permission to list models alone is insufficient.

Reference: [Hermes Bedrock integration](https://hermes-agent.nousresearch.com/docs/guides/aws-bedrock).

## ChatGPT / Codex OAuth


The template's first-run model uses Bedrock IAM. The hosted default profile was switched to `openai-codex` / `gpt-6.1-sol`, with medium reasoning, on 30 October 2026 after an actual authenticated model/tool test. Bootstrap preserves this existing configuration; fresh hosts still start with the checked-in Bedrock default.

Back up before changing providers. As the `hermes` user, run `hermes auth add openai-codex --no-browser` and complete the displayed device-code login. If the account disables device-code login, use `hermes auth add openai-codex --browser --no-browser`; this flow requires forwarding the fixed callback port `1455` through SSM to local port `1455`, in addition to the dashboard tunnel. The account owner completes OpenAI authorization in their browser. No inbound security-group rule or Codex CLI installation is needed.

Choose the authenticated provider/model through `hermes model` or the dashboard Models page. The saved `model.provider` / `model.default` apply to new sessions; existing sessions retain their recorded model. Hermes owns its OAuth credential store under `HERMES_HOME`, separately from the operator's Codex credentials. Treat it as a secret, keep it out of source/evidence exports and include it only in protected recovery backups. Validate a completed inference turn with actual tools: appearing in a model catalog alone does not establish account entitlement. OAuth usage remains subject to the account's applicable access and limits. [Hermes provider authentication](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/integrations/providers.md), [OpenAI authentication](https://learn.chatgpt.com/docs/auth).

The pinned Hermes picker has an older curated Codex catalog. After authenticating the provider, an exact newer model can be configured with `hermes config set model.default gpt-6.1-sol` and `hermes config set agent.reasoning_effort medium`; qualify the actual inference before relying on it. [GPT-6.1 Sol and supported reasoning efforts](https://developers.openai.com/api/docs/models/gpt-6.1-sol).

At this pin, the config setter prints an unrecognized-key warning for the documented `agent.reasoning_effort` key while saving it successfully. The installed reasoning selector reads that key, and the live chat reports **Medium**. This schema-warning inconsistency remains an upstream follow-up; retain runtime/UI verification when changing reasoning settings.



## External evaluation frameworks

Hermes's primary model connection does not configure Promptfoo, PyRIT or garak. Each evaluation profile needs its own target, generator, scorer and authentication settings. An OAuth sign-in to Hermes is not a general API key for other tools. Model inference and judging may incur charges or consume account limits.
