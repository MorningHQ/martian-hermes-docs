---
title: "Choose a model"
description: "Set the provider, model and reasoning level."
---

| Setup | Provider |
| --- | --- |
| Fresh template | DeepSeek V3.2 through Bedrock, using the EC2 role |
| Hosted profile documented on 1 Nov 2026 | GPT-6.1 Sol · medium · ChatGPT/Codex OAuth |

Change the provider with `hermes model` or **Models → Change**. Start a new chat afterward; existing sessions can retain their earlier model.

<figure class="doc-visual screenshot">
<a href="/martian-hermes-docs/media/screenshots/hermes-models.jpg" target="_blank" rel="noopener" aria-label="Open screenshot: Hermes Models page showing openai-codex and gpt-6.1-sol as the main model"><img src="/martian-hermes-docs/media/screenshots/hermes-models.jpg" alt="Hermes Models page showing openai-codex and gpt-6.1-sol as the main model" width="1422" height="800" loading="lazy" decoding="async" /></a>
<figcaption>Actual saved settings, 30 October 2026. History includes earlier models. <a class="visual-open" href="/martian-hermes-docs/media/screenshots/hermes-models.jpg" target="_blank" rel="noopener" aria-label="Open full-size screenshot (opens in a new tab)">Open full size <span aria-hidden="true">↗</span></a></figcaption>
</figure>

## Bedrock IAM

Give the EC2 role access to the configured model in the chosen region. Verify an inference turn with a tool call. [Bedrock setup](https://hermes-agent.nousresearch.com/docs/guides/aws-bedrock)

## ChatGPT / Codex OAuth

Back up first. As `hermes`:

```bash
hermes auth add openai-codex --no-browser
hermes config set model.default gpt-6.1-sol
hermes config set agent.reasoning_effort medium
```

The account owner completes sign-in. Hermes stores its own credentials in `HERMES_HOME`; do not copy the operator's Codex credentials or paste tokens into chat.

<details>
<summary>Device login fails, or the reasoning setting warns</summary>

Use `hermes auth add openai-codex --browser --no-browser` for browser OAuth. Forward callback port **1455 → 1455** through SSM as well as the dashboard port, then open the displayed authorization link.

The pinned config checker warns about `agent.reasoning_effort` while saving it. Confirm **Medium** in a new chat and test an actual inference turn. A listed model does not prove account access or remaining quota.

</details>

Promptfoo, PyRIT and garak need their own provider settings. Hermes OAuth does not configure them. [Hermes provider reference](https://github.com/NousResearch/hermes-agent/blob/v0.22.5/website/docs/integrations/providers.md)
