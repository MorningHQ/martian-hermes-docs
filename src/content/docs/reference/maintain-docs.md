---
title: "Maintain the docs"
description: "Edit Markdown, check the build and publish through GitHub Actions."
---

```bash
git clone https://github.com/MorningHQ/martian-hermes-docs.git
cd martian-hermes-docs
npm ci
npm run dev
```

Edit Markdown or MDX pages in `src/content/docs/`. Navigation lives in `astro.config.mjs`; branding in `src/styles/custom.css`. The site uses [Astro Starlight](https://starlight.astro.build/).

Edit diagrams in `src/diagrams/*.mmd`. The shared palette and build renderer generate desktop/mobile SVGs automatically. Each diagram offers its full-size image and Mermaid source.

## Before publishing

```bash
npm run build
npm run check
npm run preview
```

Check links, screenshots and mobile layout. Pull requests build/check; approved pushes to `main` deploy to GitHub Pages. No AWS or model secret is needed. Keep the `/martian-hermes-docs` base path when linking local pages or assets.

## Writing rules

- One page, one task. Lead with the action or command.
- Show a screenshot or diagram when it saves explanation.
- Date screenshots and label recorded output honestly.
- Put long reference lists in disclosures; link rather than repeat.
- Keep synthetic results distinct from customer findings.

The private deployment repository owns runtime code and exact pins. Review these docs with each qualified release. Do not publish credentials, live infrastructure IDs, raw customer logs or authentication screens.
