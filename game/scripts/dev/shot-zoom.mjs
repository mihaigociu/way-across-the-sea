// Dev helper: screenshot a zoomed-in view. Usage: node shot-zoom.mjs <out.png> <lon> <lat> <k>
import { chromium } from '@playwright/test';
const [out, lon, lat, k] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = []; p.on('pageerror', (e) => errs.push(e.message));
await p.goto(`http://localhost:4322/way-across-the-sea/?at=${lon},${lat},${k}`); await p.waitForTimeout(2500);
await p.screenshot({ path: out }); console.log('errors:', errs); await b.close();
