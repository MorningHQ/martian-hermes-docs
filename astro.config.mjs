import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://morninghq.github.io',
  base: '/martian-hermes-docs',
  trailingSlash: 'always',
  integrations: [starlight({
    title: 'Martian Hermes',
    description: 'Host, operate and extend the Martian Hermes AI red-teaming agent.',
    favicon: '/favicon.png',
    components: {
      SiteTitle: './src/components/SiteTitle.astro',
      PageTitle: './src/components/PageTitle.astro',
      ThemeProvider: './src/components/ThemeProvider.astro',
    },
    social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/MorningHQ/martian-hermes-docs' }],
    editLink: { baseUrl: 'https://github.com/MorningHQ/martian-hermes-docs/edit/main/' },
    customCss: ['./src/styles/custom.css'],
    expressiveCode: {
      themes: ['github-dark', 'github-light'],
      styleOverrides: {
        borderRadius: '8px',
        borderColor: 'var(--sl-color-hairline)',
        codeFontFamily: 'Inter Variable, Inter, sans-serif',
        uiFontFamily: 'Inter Variable, Inter, sans-serif',
        codeFontSize: '0.875rem',
        codeLineHeight: '1.8',
        codePaddingBlock: '1.25rem',
        codeBackground: '#0C0A09',
        codeForeground: '#F5F3F1',
        frames: {
          shadowColor: 'transparent',
          terminalTitlebarDotsOpacity: '0',
          terminalTitlebarBackground: '#0C0A09',
        },
      },
    },
    sidebar: [
      { label: 'Overview', slug: '' },
      { label: 'Get started', items: [
        { slug: 'get-started/access' },
        { slug: 'get-started/first-assessment' },
        { slug: 'get-started/goals-and-sessions' },
      ] },
      { label: 'Hosting', items: [
        { slug: 'hosting/architecture' }, { slug: 'hosting/deploy' },
        { slug: 'hosting/models' }, { slug: 'hosting/backups' },
        { slug: 'hosting/upgrades' }, { slug: 'hosting/cost' },
      ] },
      { label: 'Tools and MCP', items: [
        { slug: 'tools/catalog' }, { slug: 'tools/operations' },
        { slug: 'mcp/servers' }, { slug: 'mcp/target-adapters' },
      ] },
      { label: 'Attack library', items: [
        { slug: 'attack-library/recipes' }, { slug: 'attack-library/skills' },
        { slug: 'attack-library/evidence' },
      ] },
      { label: 'Connect apps', collapsed: true, items: [
        { slug: 'messaging/setup' }, { slug: 'messaging/whatsapp' },
        { slug: 'messaging/imessage' }, { slug: 'messaging/telegram' },
        { slug: 'messaging/discord' }, { slug: 'messaging/slack' },
      ] },
      { label: 'Operations', items: [
        { slug: 'operations/verification' }, { slug: 'operations/troubleshooting' },
      ] },
      { label: 'Reference', collapsed: true, items: [
        { slug: 'reference/commands' }, { slug: 'reference/paths' },
        { slug: 'reference/maintain-docs' },
      ] },
    ],
  })],
});
