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
      defaultProps: { wrap: true, frame: 'none' },
      styleOverrides: {
        borderRadius: '8px',
        borderColor: 'var(--sl-color-hairline)',
        codeFontFamily: 'Inter Variable, Inter, sans-serif',
        uiFontFamily: 'Inter Variable, Inter, sans-serif',
        codeFontSize: '0.8125rem',
        codeLineHeight: '1.65',
        codePaddingBlock: '0.875rem',
        codeBackground: '#0C0A09',
        codeForeground: '#F5F3F1',
        frames: {
          shadowColor: 'transparent',
          editorBackground: '#0C0A09',
          terminalBackground: '#0C0A09',
          terminalTitlebarDotsOpacity: '0',
          terminalTitlebarBackground: '#0C0A09',
          terminalTitlebarForeground: '#F5F3F1',
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
      { label: 'Hosting', collapsed: true, items: [
        { slug: 'hosting/architecture' }, { slug: 'hosting/deploy' },
        { slug: 'hosting/models' }, { slug: 'hosting/backups' },
        { slug: 'hosting/upgrades' }, { slug: 'hosting/cost' },
      ] },
      { label: 'Tools and MCP', collapsed: true, items: [
        { slug: 'tools/catalog' }, { slug: 'tools/operations' },
        { slug: 'mcp/servers' }, { slug: 'mcp/target-adapters' },
      ] },
      { label: 'Attack library', collapsed: true, items: [
        { slug: 'attack-library/recipes' }, { slug: 'attack-library/skills' },
        { slug: 'attack-library/evidence' },
      ] },
      { label: 'Connect apps', collapsed: true, items: [
        { slug: 'messaging/setup' }, { slug: 'messaging/whatsapp' },
        { slug: 'messaging/imessage' }, { slug: 'messaging/telegram' },
        { slug: 'messaging/discord' }, { slug: 'messaging/slack' },
      ] },
      { label: 'Operations', collapsed: true, items: [
        { slug: 'operations/verification' }, { slug: 'operations/troubleshooting' },
      ] },
      { label: 'Reference', collapsed: true, items: [
        { slug: 'reference/commands' }, { slug: 'reference/paths' },
        { slug: 'reference/maintain-docs' },
      ] },
    ],
  })],
});
