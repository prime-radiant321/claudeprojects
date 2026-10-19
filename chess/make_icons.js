// Renders the app icons into site/icons with Playwright (development only).
// Usage: node make_icons.js   (needs the playwright package and a Chromium browser)
const path = require('path');
const fs = require('fs');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');

const site = path.join(__dirname, 'site');
const out = path.join(site, 'icons');
fs.mkdirSync(out, { recursive: true });

// size, rounded corners (false = full bleed for maskable), glyph scale
const ICONS = [
  ['icon-32.png', 32, true, 0.78],
  ['apple-touch-icon.png', 180, false, 0.66],
  ['icon-192.png', 192, true, 0.7],
  ['icon-512.png', 512, true, 0.7],
  ['icon-maskable-512.png', 512, false, 0.52],
];

const page = (size, rounded, scale) => `<!doctype html><html><head>
<link rel="stylesheet" href="file://${site}/fonts.css">
<style>
  html, body { margin: 0; background: transparent; }
  .icon { width: ${size}px; height: ${size}px; position: relative; overflow: hidden;
    border-radius: ${rounded ? Math.round(size * 0.22) : 0}px;
    background:
      conic-gradient(#33694C 0 25%, #2B5A41 0 50%, #33694C 0 75%, #2B5A41 0) 0 0 / ${size / 2}px ${size / 2}px; }
  .g { position: absolute; inset: 0; display: grid; place-items: center;
    font-family: 'Noto Sans Symbols 2', sans-serif; font-size: ${size * scale}px; line-height: 1; }
  .g i { grid-area: 1 / 1; font-style: normal; }
  .f { color: #F3EFDC; }
  .o { color: #1C2A21; }
</style></head><body>
<div class="icon"><div class="g" style="filter: drop-shadow(0 ${size * 0.02}px ${size * 0.03}px rgba(0,0,0,.35))"><i class="f">♚︎</i><i class="o">♔︎</i></div></div>
</body></html>`;

(async () => {
  const browser = await chromium.launch();
  for (const [name, size, rounded, scale] of ICONS) {
    const p = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
    await p.setContent(page(size, rounded, scale));
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(200);
    await p.locator('.icon').screenshot({ path: path.join(out, name), omitBackground: true });
    await p.close();
    console.log('wrote icons/' + name);
  }
  await browser.close();
})();
