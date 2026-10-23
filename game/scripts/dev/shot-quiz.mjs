// Dev helper: plays quiz 1 end to end (one deliberate mistake), which unlocks the second journey,
// then quiz 2 and quiz 3 the same way, taking screenshots along the way.
// Usage: node shot-quiz.mjs <outDir> [url]
import { chromium } from '@playwright/test';
import { quiz1 } from '../../src/data/quiz1.js';
import { quiz2 } from '../../src/data/quiz2.js';
import { quiz3 } from '../../src/data/quiz3.js';
const [out, url = 'http://localhost:4322/way-across-the-sea/'] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on('pageerror', (e) => errs.push(e.message));
await p.goto(url); await p.waitForTimeout(1500);
await p.evaluate(() => localStorage.clear());
await p.reload(); await p.waitForTimeout(1200);

// picks: question index → city id to click; wrong: index of an mc question answered wrongly
async function play(quiz, n, picks, wrong) {
  await p.hover(".menu-btn"); await p.click(`.menu >> text=${quiz.title.en}`); await p.waitForTimeout(600);
  await p.screenshot({ path: `${out}/q${n}-0-intro.png` });
  await p.click('.quiz button:has-text("Start")');
  for (const [i, q] of quiz.questions.entries()) {
    await p.waitForTimeout(500);
    if (q.type === 'mc') {
      const answer = i === wrong ? q.options[2].en : q.options[0].en;
      await p.click(`.quiz .opt:text-is(${JSON.stringify(answer)})`);
    } else if (q.type === 'order') {
      for (const it of q.items) await p.click(`.quiz .chip:text-is(${JSON.stringify(it.en)})`);
      await p.click('.quiz button:has-text("Check")');
    } else {
      await p.waitForTimeout(1800); // zoom
      await p.screenshot({ path: `${out}/q${n}-${i + 1}-pick-ask.png` });
      const box = await p.locator(`g.city[data-id="${picks[i]}"] circle`).first().boundingBox();
      await p.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    }
    await p.waitForTimeout(400);
    await p.screenshot({ path: `${out}/q${n}-${i + 1}-answered.png` });
    await p.click('.quiz .buttons button:last-child');
  }
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${out}/q${n}-done.png` });
  await p.click('.quiz button:has-text("Back to the map")'); await p.waitForTimeout(1500);
  await p.screenshot({ path: `${out}/q${n}-after.png` });
}
await play(quiz1, 1, { 2: 'capernaum', 6: 'salamis' }, 4);
await play(quiz2, 2, { 4: 'philippi' }, 5);
await play(quiz3, 3, { 0: 'ephesus' }, 6);
console.log('progress:', await p.evaluate(() => localStorage.getItem('waysea.progress')));
console.log('errors:', errs);
await b.close();
