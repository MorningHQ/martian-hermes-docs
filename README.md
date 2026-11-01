# Martian Hermes documentation

Static operator documentation built with Astro Starlight and published by GitHub Actions to GitHub Pages. No backend, database, analytics or agent credentials.

```sh
npm ci
npm run dev
npm run build
npm run check
```

Edit Markdown under `src/content/docs/`. The build includes Starlight's local Pagefind search, syntax highlighting, copy buttons, light/dark themes and mobile navigation. Deployment uses the `/martian-hermes-docs` base path.

Branding follows `martian-security-website/DESIGN.md`: paper surfaces, warm ink, Inter throughout and rust reserved for the supplied logo and focus. The mark and outlined wordmark come from that repository's existing brand artwork. Inter is served locally from a pinned Fontsource package; its OFL license is included under `public/brand/`. Starlight still owns search, navigation, themes and code copying; the small title/theme wrappers preserve those built-in behaviors.

Keep pages task-focused: a short introduction, steps/commands, then a result. Link to reference material instead of repeating it. Use native `<details>` for long lists. Screenshots under `public/media/screenshots/` are unmodified captures from the 30 October 2026 qualification; captions distinguish actual Hermes screens from recorded-output viewers. Static SVG diagrams under `public/media/diagrams/` require no client rendering library.

This repository contains sanitized documentation only. The private `MorningHQ/martian-hermes-agent` repository owns AWS CDK, runtime code and runbooks. Changes to its runtime do not automatically update these docs; review documentation with each qualified release.

Do not add credentials, deployment outputs, live instance/volume IDs, backup objects, private endpoints, customer data, account identifiers, or authentication screenshots. Hosting documentation does not expose or control the private EC2 agent.

In GitHub Settings → Pages, select **GitHub Actions** as the source. Pushes to `main` build, check and deploy; pull requests build and check without publishing. See `src/content/docs/reference/maintain-docs.md` for the publishing workflow.
