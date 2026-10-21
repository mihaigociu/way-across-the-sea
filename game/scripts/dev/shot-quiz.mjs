// Dev helper: plays quiz 1 end to end (one deliberate mistake) and takes screenshots.
// Usage: node shot-quiz.mjs <outDir> [url]
import { chromium } from '@playwright/test';
import { quiz1 } from '../../src/data/quiz1.js';
const [out, url = 'http://localhost:4322/way-across-the-sea/'] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on('pageerror', (e) => errs.push(e.message));
await p.goto(url); await p.waitForTimeout(1500);
await p.evaluate(() => localStorage.clear());
await p.click('text=Quiz: The first journey'); await p.waitForTimeout(600);
await p.screenshot({ path: `${out}/quiz-0-intro.png` });
await p.click('.quiz button:has-text("Start")');
const pickCity = { 2: 'capernaum', 6: 'salamis' };
for (const [i, q] of quiz1.questions.entries()) {
  await p.waitForTimeout(500);
  if (q.type === 'mc') {
    const answer = i === 4 ? q.options[2].en : q.options[0].en; // question 5: answer wrong on purpose
    await p.click(`.quiz .opt:text-is("${answer}")`);
  } else if (q.type === 'order') {
    for (const [n, it] of q.items.entries()) {
      await p.click(`.quiz .chip:text-is(${JSON.stringify(it.en)})`);
      if (i === 1 && n === 2) await p.screenshot({ path: `${out}/quiz-${i + 1}-ordering.png` });
    }
    await p.click('.quiz button:has-text("Check")');
  } else {
    await p.waitForTimeout(1800); // zoom
    if (i === 2) await p.screenshot({ path: `${out}/quiz-${i + 1}-pick-ask.png` });
    const box = await p.locator(`g.city[data-id="${pickCity[i]}"] circle`).first().boundingBox();
    await p.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  }
  await p.waitForTimeout(400);
  if ([0, 2, 4, 6].includes(i)) await p.screenshot({ path: `${out}/quiz-${i + 1}-answered.png` });
  await p.click('.quiz .buttons button:last-child');
}
await p.waitForTimeout(800);
await p.screenshot({ path: `${out}/quiz-done.png` });
await p.click('.quiz button:has-text("Back to the map")'); await p.waitForTimeout(1500);
await p.screenshot({ path: `${out}/quiz-after.png` });
console.log('progress:', await p.evaluate(() => localStorage.getItem('waysea.progress')));
console.log('errors:', errs);
await b.close();
