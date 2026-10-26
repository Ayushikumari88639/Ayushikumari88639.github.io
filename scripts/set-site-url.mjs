// Post-build step: write the public site URL into canonical / Open Graph tags.
//
//   SITE_URL=https://ayushikumari88639.github.io/ npm run build
//
// The GitHub Pages workflow sets SITE_URL automatically. If it is not set,
// the URL-dependent tags are removed rather than shipped with a placeholder.
import { readFileSync, writeFileSync } from 'node:fs';

const file = new URL('../dist/index.html', import.meta.url);
let html = readFileSync(file, 'utf8');
const raw = (process.env.SITE_URL || '').trim();

if (raw) {
  const url = raw.endsWith('/') ? raw : `${raw}/`;
  html = html.replaceAll('__SITE_URL__', url);
  console.log(`[site-url] canonical + og tags set to ${url}`);
} else {
  html = html
    .split('\n')
    .filter((line) => !line.includes('__SITE_URL__') && !line.includes('filled in at build time'))
    .join('\n');
  console.log('[site-url] SITE_URL not set — canonical and og:url/og:image tags omitted.');
}

writeFileSync(file, html);
