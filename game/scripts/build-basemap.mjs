// Builds src/data/basemap.json: projected, clipped and simplified SVG paths
// for land, lakes and rivers, from Natural Earth data in scripts/raw/.
import fs from 'node:fs';
import { projection } from '../src/lib/projection.js';

const raw = (f) => JSON.parse(fs.readFileSync(new URL(`./raw/${f}`, import.meta.url)));

// Collect projected rings/lines through the projection stream (handles clipping).
function collect(geojson) {
  const rings = [];
  let cur = null;
  const sink = {
    point(x, y) { cur.push([x, y]); },
    lineStart() { cur = []; },
    lineEnd() { if (cur.length > 1) rings.push(cur); cur = null; },
    polygonStart() {}, polygonEnd() {}, sphere() {},
  };
  const stream = projection.stream(sink);
  for (const f of geojson.features ?? [geojson]) {
    if (!f.geometry) continue;
    streamGeometry(f.geometry, stream);
  }
  return rings;
}
function streamGeometry(g, s) {
  const line = (coords, closed) => {
    s.lineStart();
    const n = closed ? coords.length - 1 : coords.length;
    for (let i = 0; i < n; i++) s.point(coords[i][0], coords[i][1]);
    s.lineEnd();
  };
  const poly = (rings) => { s.polygonStart(); rings.forEach((r) => line(r, true)); s.polygonEnd(); };
  switch (g.type) {
    case 'Polygon': poly(g.coordinates); break;
    case 'MultiPolygon': g.coordinates.forEach(poly); break;
    case 'LineString': line(g.coordinates, false); break;
    case 'MultiLineString': g.coordinates.forEach((c) => line(c, false)); break;
  }
}

// Douglas–Peucker in pixel space.
function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [ax, ay] = pts[a], [bx, by] = pts[b];
    const dx = bx - ax, dy = by - ay, len2 = dx * dx + dy * dy || 1e-9;
    let maxD = 0, idx = -1;
    for (let i = a + 1; i < b; i++) {
      const [px, py] = pts[i];
      let t = ((px - ax) * dx + (py - ay) * dy) / len2;
      t = Math.max(0, Math.min(1, t));
      const ex = ax + t * dx - px, ey = ay + t * dy - py;
      const d = ex * ex + ey * ey;
      if (d > maxD) { maxD = d; idx = i; }
    }
    if (maxD > tol * tol) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}
const area = (r) => {
  let s = 0;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) s += (r[j][0] + r[i][0]) * (r[j][1] - r[i][1]);
  return Math.abs(s / 2);
};
const r1 = (v) => Math.round(v * 10) / 10;
const toPath = (rings, closed) =>
  rings.map((r) => 'M' + r.map(([x, y]) => `${r1(x)},${r1(y)}`).join('L') + (closed ? 'Z' : '')).join('');

const TOL = 0.25;
const land = collect(raw('ne_10m_land.geojson'))
  .map((r) => simplify(r, TOL))
  .filter((r) => r.length > 3 && area(r) > 1.5);

const lakes = collect(raw('ne_50m_lakes.geojson'))
  .map((r) => simplify(r, TOL))
  .filter((r) => r.length > 3 && area(r) > 4);

const riverData = raw('ne_50m_rivers_lake_centerlines.geojson');
riverData.features = riverData.features.filter(
  (f) => f.geometry && !/canal|csatorna/i.test(f.properties.name ?? '') && f.properties.scalerank <= 6,
);
const rivers = collect(riverData).map((r) => simplify(r, TOL)).filter((r) => r.length > 1);

const out = { land: toPath(land, true), lakes: toPath(lakes, true), rivers: toPath(rivers, false) };
fs.writeFileSync(new URL('../src/data/basemap.json', import.meta.url), JSON.stringify(out));
console.log(Object.fromEntries(Object.entries(out).map(([k, v]) => [k, `${(v.length / 1024).toFixed(0)} KB`])));
