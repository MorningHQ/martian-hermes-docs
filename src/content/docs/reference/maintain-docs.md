---
title: "Maintain this documentation"
description: "Edit Markdown and publish a checked static build through GitHub Pages."
---

This repository uses **Astro Starlight**, the framework used by the linked BytePlus documentation. The site is static: no React application, database, analytics, login service or agent API is added.

## Local workflow

```bash
git clone https://github.com/MorningHQ/martian-hermes-docs.git
cd martian-hermes-docs
npm ci
npm run dev
```

Edit Markdown in `src/content/docs/`. Navigation is configured in `astro.config.mjs`; small branding changes live in `src/styles/custom.css`. Starlight supplies local Pagefind search, copy buttons, code highlighting, themes and mobile navigation.

```bash
npm run build
npm run check
npm run preview
```

The checker validates source pages, internal built links/anchors and accidental credential/infrastructure-identifier patterns. It cannot replace a human review for sensitive content or factual accuracy.

## Publish

GitHub Pages uses **GitHub Actions** as its source. Pull requests build and check without deploying. Approved commits pushed to `main` build, validate, upload a static artifact and deploy it using the scoped Pages OIDC permission. No AWS or model secret is needed.

The project base path is `/martian-hermes-docs`. Update both `site` and `base` if the hosting destination changes. Do not add an external search service or CMS for ordinary Markdown edits.

## Keep it accurate

The private deployment repository owns runtime code, tool locks, managed recipes and operator evidence. Documentation is reviewed with qualified releases; it is not synchronized from a live host. Keep these distinctions explicit:

- Installed vs configured vs functionally verified.
- Synthetic targets vs real AI agents.
- Local recipes vs the broader skill catalog vs a live Wiki integration.
- Native subagents vs independent isolated workers.
- Template Bedrock default vs the reference hosted OAuth profile.

Do not copy deployment outputs, credentials, live infrastructure IDs, customer targets, raw logs or authentication screenshots into this public repository. Use placeholders and keep operational evidence protected.

References: [reference site's package configuration](https://github.com/byteplus-sa/ComfyUI-BytePlus-ModelArk/blob/main/docs-site/package.json), [Starlight](https://starlight.astro.build/), [Astro GitHub Pages deployment](https://docs.astro.build/en/guides/deploy/github/).
