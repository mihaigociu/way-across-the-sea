// Dev helper: screenshots of selected introduction steps. Usage: node shot-intro.mjs <outDir> [url]
import { chromium } from '@playwright/test';
const [out, url = 'http://localhost:4322/way-across-the-sea/'] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on('pageerror', (e) => errs.push(e.message));
await p.goto(url); await p.waitForTimeout(1200);
await p.click('.start .play:first-child');
const want = new Set([2, 3, 4, 6, 10, 11]);
for (let i = 1; i <= 11; i++) {
  await p.waitForTimeout(2600);
  if (want.has(i)) await p.screenshot({ path: `${out}/intro-${i}.png` });
  if (i < 11) await p.click('.card .buttons button:last-child');
}
console.log('errors:', errs);
await b.close();
