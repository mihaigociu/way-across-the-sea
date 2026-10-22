// Dev helper: plays Paul's second journey (unlocked with ?all) and screenshots every card.
// Usage: node scripts/dev/shot-journey2.mjs <outDir> [en|ro]
import { chromium } from '@playwright/test';
const [out, lang = 'en'] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on('pageerror', (e) => errs.push(e.message));
p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
await p.goto('http://localhost:4322/way-across-the-sea/?all');
await p.waitForTimeout(1200);
if (lang === 'ro') await p.click('.controls button:first-child');
await p.screenshot({ path: `${out}/00-menu.png` });
await p.hover('.menu-btn'); await p.click('.menu .play:nth-child(4)');
for (let i = 1; ; i++) {
  await p.waitForSelector('.card', { timeout: 20000 });
  await p.waitForTimeout(1700);
  const opt = await p.$('.choice .opt');
  if (opt) { await p.click(`.choice .opt:nth-of-type(${i % 2 ? 1 : 2})`); await p.waitForTimeout(300); }
  const note = await p.$('.note summary');
  if (note && !process.env.NONOTE) await note.click();
  await p.screenshot({ path: `${out}/${String(i).padStart(2, '0')}.png` });
  const labels = await p.$$eval('.card .buttons button', (bs) => bs.map((x) => x.textContent).join(' '));
  if (/Finish|Gata/.test(labels)) break;
  await p.click('.card .buttons button:last-child');
}
console.log('errors:', errs);
await b.close();
