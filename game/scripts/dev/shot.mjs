// Dev helper: screenshots of the map (overview, zoomed, and a journey step).
import { chromium } from '@playwright/test';
const out = process.argv[2];
const url = 'http://localhost:4391/way-across-the-sea/';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on('pageerror', (e) => errs.push(e.message));
p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
await p.goto(url); await p.waitForTimeout(1500);
await p.screenshot({ path: `${out}/1-overview.png` });
await p.click('.play'); await p.waitForTimeout(2200);
await p.screenshot({ path: `${out}/2-journey-start.png` });
for (let i = 0; i < 5; i++) { await p.click('.card .buttons button:last-child'); await p.waitForSelector('.card', { timeout: 15000 }); await p.waitForTimeout(600); }
await p.screenshot({ path: `${out}/3-journey-step6.png` });
for (let i = 0; i < 10; i++) { await p.click('.card .buttons button:last-child'); await p.waitForSelector('.card', { timeout: 15000 }); await p.waitForTimeout(300); }
await p.screenshot({ path: `${out}/4-journey-end.png` });
console.log('errors:', errs);
await b.close();
