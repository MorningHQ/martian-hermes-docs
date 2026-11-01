import { renderMermaidSVG } from 'beautiful-mermaid';
import { createHash } from 'node:crypto';
import interFont from '@fontsource-variable/inter/files/inter-latin-standard-normal.woff2?inline';
import architecture from './architecture.mmd?raw';
import architectureMobile from './architecture-mobile.mmd?raw';
import assessment from './assessment.mmd?raw';
import backups from './backups.mmd?raw';
import connect from './connect.mmd?raw';
import imessage from './imessage.mmd?raw';

const definitions = {
  architecture: { source: architecture, mobileSource: architectureMobile, title: 'How hosted Hermes fits together', description: 'One EC2 controller contains Hermes, local tools, the synthetic lab and encrypted storage. The model provider and approved HTTPS targets are remote. Native subagents share this controller.' },
  assessment: { source: assessment, title: 'From recipe to evidence', description: 'Choose a recipe, prepare a session, send a turn and verify the observed lab effect. Save evidence with either synthetic-confirmed or unconfirmed status.' },
  backups: { source: backups, title: 'Two independent recovery paths', description: 'S3 retains application archives for 35 or 90 days. AWS Backup retains data-volume snapshots for 7 or 35 days. Rehearse recovery separately from live state.' },
  connect: { source: connect, title: 'Private access through SSM', description: 'Browser port 19119 connects through an authenticated AWS SSM tunnel to the EC2 dashboard on loopback port 9119. Keep the operator terminal open.' },
  imessage: { source: imessage, title: 'Choose one iMessage route', description: 'Photon uses a hosted relay and an outbound EC2 connection. BlueBubbles requires an always-on Mac and private API and webhook connections in both directions.' },
} as const;

export type DiagramId = keyof typeof definitions;
export const diagramIds = Object.keys(definitions) as DiagramId[];

// Color supports the labels: orange agent, blue tools, violet provider/decision,
// green target/evidence, amber storage, and slate access.
const classes = `
classDef access fill:#f1f5f9,stroke:#cbd5e1,color:#334155
classDef agent fill:#fff0e6,stroke:#f4ad83,color:#9a3412
classDef tool fill:#edf5ff,stroke:#a6c8f4,color:#1e40af
classDef external fill:#f4efff,stroke:#c7b5ed,color:#5b21b6
classDef target fill:#ecf9f2,stroke:#9bd2b3,color:#166534
classDef storage fill:#fff8e8,stroke:#e7c57b,color:#854d0e
`;

export function diagramSource(id: DiagramId, mobile = false): string {
  const definition = definitions[id];
  const body = mobile && 'mobileSource' in definition ? definition.mobileSource : definition.source;
  const layout = mobile ? body.replace(/^flowchart LR/m, 'flowchart TB').replace(/direction LR/g, 'direction TB') : body;
  return `${layout.trim()}\n${classes}`;
}

const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const cache = new Map<string, { svg: string; width: number; height: number; title: string; description: string; version: string }>();

export function diagramImage(id: DiagramId, mobile = false) {
  const key = `${id}${mobile ? '-mobile' : ''}`;
  const cached = cache.get(key);
  if (cached) return cached;
  const definition = definitions[id];
  let svg = renderMermaidSVG(diagramSource(id, mobile), {
    bg: '#fafafa', fg: '#292524', line: '#a8a29e', accent: '#777169',
    muted: '#57534e', surface: '#ffffff', border: '#d6d3d1',
    font: 'Inter', padding: 24, nodeSpacing: 28, layerSpacing: id === 'assessment' ? 28 : 44, componentSpacing: 32,
  });
  const dimensions = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  if (!dimensions) throw new Error(`Missing SVG dimensions: ${id}`);
  // Standalone SVGs carry their own local font, including when opened full size.
  svg = svg.replace(/^[ \t]*@import[^\n]*\n?/gm, '');
  svg = svg.replace('<svg ', '<svg role="img" aria-labelledby="diagram-title diagram-description" ');
  svg = svg.replace(/(<svg\b[^>]*>)/, `$1\n<title id="diagram-title">${escape(definition.title)}</title>\n<desc id="diagram-description">${escape(definition.description)}</desc>\n<style>@font-face{font-family:Inter;font-style:normal;font-weight:100 900;src:url("${interFont}") format("woff2")}</style>`);
  const version = createHash('sha256').update(svg).digest('hex').slice(0, 12);
  const image = { svg, width: Number(dimensions[1]), height: Number(dimensions[2]), title: definition.title, description: definition.description, version };
  cache.set(key, image);
  return image;
}
