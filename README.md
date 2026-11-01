# Martian Hermes documentation

Static operator documentation built with Astro Starlight and published by GitHub Actions to GitHub Pages. No backend, database, analytics or agent credentials.

```sh
npm ci
npm run dev
npm run build
npm run check
```

Edit Markdown or MDX under `src/content/docs/`. The build includes Starlight's local Pagefind search, syntax highlighting, copy buttons, light/dark themes and mobile navigation. Deployment uses the `/martian-hermes-docs` base path.

Branding follows `martian-security-website/DESIGN.md`: paper surfaces, warm ink, Inter throughout and rust reserved for the supplied logo and focus. The mark and outlined wordmark come from that repository's existing brand artwork. Inter is served locally from a pinned Fontsource package; its OFL license is included under `public/brand/`. Starlight still owns search, navigation, themes and code copying; the small title/theme wrappers preserve those built-in behaviors.

The compact layout uses a 56px header, 34px page titles, 14.5px body text and a 704px reading column. Keep navigation and section spacing restrained; mobile search and menu controls retain 44px targets.

Code blocks use [Expressive Code's native word wrapping](https://expressive-code.com/key-features/word-wrap/), retaining the original text when copied. Keep long shell commands on readable continuation lines. Diagrams scroll inside a keyboard-focusable region; captions and full-size links stay outside that region. Preserve Starlight's heading padding, which reserves space for section-link icons.

Keep pages task-focused: a short introduction, steps/commands, then a result. Link to reference material instead of repeating it. Use native `<details>` for long lists. Screenshots under `public/media/screenshots/` are unmodified captures from the 30 October 2026 qualification; captions distinguish actual Hermes screens from recorded-output viewers.

Mermaid definitions live in `src/diagrams/*.mmd`, with one shared palette in `src/diagrams/index.ts`. The `Diagram.astro` component selects horizontal or vertical SVG layouts for desktop and mobile. [Beautiful Mermaid](https://github.com/lukilabs/beautiful-mermaid) runs only during the Astro build; static endpoints produce SVGs and downloadable Mermaid sources at `/media/diagrams/`. Fonts are embedded locally, with no external font requests or diagram JavaScript in the browser. Edit the source, then build and check the site normally.

This repository contains sanitized documentation only. The private `MorningHQ/martian-hermes-agent` repository owns AWS CDK, runtime code and runbooks. Changes to its runtime do not automatically update these docs; review documentation with each qualified release.

Do not add credentials, deployment outputs, live instance/volume IDs, backup objects, private endpoints, customer data, account identifiers, or authentication screenshots. Hosting documentation does not expose or control the private EC2 agent.

In GitHub Settings → Pages, select **GitHub Actions** as the source. Pushes to `main` build, check and deploy; pull requests build and check without publishing. See `src/content/docs/reference/maintain-docs.md` for the publishing workflow.
