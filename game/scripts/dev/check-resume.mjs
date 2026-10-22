// Dev helper: checks that a refresh brings the player back to the same journey stop / story step.
import { chromium } from '@playwright/test';
const url = 'http://localhost:4322/way-across-the-sea/?all';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on('pageerror', (e) => errs.push(e.message));
const card = () => p.$eval('.card .step', (e) => e.textContent).catch(() => '(no card)');
await p.goto(url); await p.waitForTimeout(1000);
await p.click('.start .play:nth-child(4)'); // second journey
for (let i = 0; i < 13; i++) {
  await p.waitForSelector('.card', { timeout: 20000 }); await p.waitForTimeout(150);
  if (await p.$('.choice .opt')) await p.click('.choice .opt');
  await p.click('.card .buttons button:last-child');
}
await p.waitForSelector('.card', { timeout: 20000 });
console.log('before refresh:', await card());
await p.reload(); await p.waitForTimeout(2500);
console.log('after refresh: ', await card(), '| lamps:', await p.$eval('.legend div:last-child', (e) => e.textContent));
await p.screenshot({ path: process.argv[2] });
await p.click('.card .buttons button.ghost'); await p.waitForTimeout(300);
await p.reload(); await p.waitForTimeout(1500);
console.log('after Close + refresh:', await card());
await p.click('.start .play:nth-child(1)'); await p.waitForTimeout(500);
await p.click('.card .buttons button:last-child'); await p.waitForTimeout(500);
await p.click('.card .buttons button:last-child'); await p.waitForTimeout(500);
await p.reload(); await p.waitForTimeout(1500);
console.log('story after refresh:', await card());
await p.click('.controls button:first-child'); await p.reload(); await p.waitForTimeout(1200);
console.log('language after refresh:', await p.$eval('.controls button:first-child', (e) => (e.textContent === 'EN' ? 'ro' : 'en')));
console.log('errors:', errs);
await b.close();
