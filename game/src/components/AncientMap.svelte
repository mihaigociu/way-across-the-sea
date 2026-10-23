<script>
  import { onMount, tick } from 'svelte';
  import { select } from 'd3-selection';
  import { zoom, zoomIdentity } from 'd3-zoom';
  import 'd3-transition';
  import { easeCubicInOut } from 'd3-ease';
  import { line, curveCatmullRom } from 'd3-shape';
  import { geoDistance } from 'd3-geo';
  import basemap from '../data/basemap.json';
  import { WIDTH as W, HEIGHT as H, project, projection } from '../lib/projection.js';
  import {
    cities, seaLanes, empire, regions, seas, mountains, details, paulFirstJourney, litAtStart,
  } from '../data/world.js';
  import { paulSecondJourney } from '../data/journey2.js';
  import { paulThirdJourney } from '../data/journey3.js';
  import { paulVoyageToRome } from '../data/journey4.js';
  import { intro } from '../data/intro.js';
  import { quiz1 } from '../data/quiz1.js';
  import { quiz2 } from '../data/quiz2.js';
  import { quiz3 } from '../data/quiz3.js';
  import { quiz4 } from '../data/quiz4.js';
  import Quiz from './Quiz.svelte';

  // ---------- static geometry (projected once) ----------
  const city = Object.fromEntries(cities.map((c) => [c.id, { ...c, xy: project(c.at) }]));
  const cityList = Object.values(city);
  const smooth = line().curve(curveCatmullRom.alpha(0.5));
  const polyPath = (ring) => 'M' + ring.map((p) => project(p).map((v) => v.toFixed(1)).join(',')).join('L') + 'Z';
  const empirePath = empire.map(polyPath).join('');
  const lanes = seaLanes.map((l) => ({ ...l, d: smooth(l.pts.map(project)) }));

  // Little hill glyphs spaced along each mountain polyline, with a deterministic jitter.
  const hills = [];
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (const range of mountains) {
    const pts = range.map(project);
    for (let i = 0; i < pts.length - 1; i++) {
      const [ax, ay] = pts[i], [bx, by] = pts[i + 1];
      const len = Math.hypot(bx - ax, by - ay);
      for (let s = 0; s < len; s += 11) {
        const t = s / len;
        hills.push({ x: ax + (bx - ax) * t + (rand() - 0.5) * 6, y: ay + (by - ay) * t + (rand() - 0.5) * 6, s: 0.75 + rand() * 0.5 });
      }
    }
  }
  hills.sort((a, b) => a.y - b.y);

  // Scale bar: 500 Roman miles (1 mille passuum ≈ 1.48 km).
  const kmPerDegLon = 111.32 * Math.cos((28.4 * Math.PI) / 180);
  const sbA = project([12, 28.4]);
  const sbB = project([12 + (500 * 1.48) / kmPerDegLon, 28.4]);
  const scaleBarLen = Math.hypot(sbB[0] - sbA[0], sbB[1] - sbA[1]);
  const compass = project([-8.4, 48.3]);

  // ---------- UI state ----------
  let lang = $state('en');
  const T = {
    en: { play: "Paul's First Journey", next: 'Next', back: 'Back', exit: 'Close', reset: 'Whole map', chapters: 'Chapters', nextUp: 'Next', allDone: 'All chapters done ★', locked: 'Pass the quiz before it to unlock', note: 'What historians say', lamps: 'Christian communities', lanes: 'Sea lanes', empire: 'Roman Empire (c. AD 46)', step: 'Stop', of: 'of', modern: 'Today', finish: 'Finish' },
    ro: { play: 'Prima călătorie a lui Pavel', next: 'Înainte', back: 'Înapoi', exit: 'Închide', reset: 'Toată harta', chapters: 'Capitole', nextUp: 'Urmează', allDone: 'Toate capitolele, gata ★', locked: 'Treci testul de dinainte ca să deblochezi', note: 'Ce spun istoricii', lamps: 'Comunități creștine', lanes: 'Rute pe mare', empire: 'Imperiul Roman (cca. 46 d.Hr.)', step: 'Oprirea', of: 'din', modern: 'Astăzi', finish: 'Gata' },
  };
  let t = $derived(T[lang]);

  let k = $state(1);
  let zt = { x: 0, y: 0, k: 1 }; // current zoom transform
  let tf = $state('translate(0,0) scale(1)');
  let svgEl, zoomer;
  let hover = $state(null); // {c, x, y}
  let lit = $state(new Set(litAtStart));
  let newlyLit = $state(new Set());
  let year = $state(null); // {en, ro} shown in the cartouche; null = AD 46

  // ---------- introduction ("the story so far") ----------
  let story = $state(null); // { step }
  let arrows = $state([]); // [{ d, head, end, label, style, i }]
  const xy = (p) => (typeof p === 'string' ? city[p].xy : project(p));

  // A gently bent arrow from a to b, with the head computed from the end tangent.
  function makeArrow(a, b, bend = 0.16) {
    const [ax, ay] = a, [bx, by] = b;
    const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1;
    const cx = (ax + bx) / 2 - dy * bend, cy = (ay + by) / 2 + dx * bend;
    const tx = bx - cx, ty = by - cy, tl = Math.hypot(tx, ty) || 1;
    return { d: `M${ax},${ay} Q${cx},${cy} ${bx},${by}`, end: [bx, by], angle: (Math.atan2(ty / tl, tx / tl) * 180) / Math.PI, len };
  }

  function storyGo(i) {
    const s = intro.steps[i];
    story = { step: i };
    year = s.year;
    newlyLit = new Set(s.light ?? []);
    lit = new Set([...intro.steps.slice(0, i + 1).flatMap((x) => x.light ?? [])]);
    arrows = (s.arrows ?? []).map((a, n) => ({
      ...makeArrow(xy(a.from ?? 'hierosolyma'), xy(a.to)), label: a.label, style: a.style ?? 'spread', anchor: a.anchor, n,
    }));
    if (s.focus === 'all') resetView();
    else zoomTo(s.focus.map(xy), 1600);
  }
  function startStory() {
    quizOpen = false;
    journey = null;
    traveller = null;
    drawn = [];
    storyGo(0);
  }
  function endStory() {
    story = null;
    arrows = [];
    year = null;
    lit = new Set(litAtStart);
    newlyLit = new Set();
  }
  function storyToJourney() {
    endStory();
    startJourney(paulFirstJourney);
  }

  // Labels shrink more slowly than the map grows, so they stay readable.
  let labelScale = $derived(1 / Math.pow(k, 0.8));
  let iconScale = $derived(1.45 / Math.pow(k, 0.6));
  let hillScale = $derived(1 / Math.pow(k, 0.65));
  let areaScale = $derived(1 / Math.pow(k, 0.7));

  // ---------- ships ----------
  // Each lane is sampled into points once mounted; ships move along them and back.
  let laneSamples = [];
  let ships = $state([]);

  function samplePath(d, step = 1.5) {
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', d);
    const hidden = document.getElementById('measure');
    hidden.appendChild(p);
    const L = p.getTotalLength();
    const pts = [];
    for (let s = 0; s <= L; s += step) {
      const q = p.getPointAtLength(s);
      pts.push([q.x, q.y]);
    }
    const end = p.getPointAtLength(L);
    pts.push([end.x, end.y]);
    p.remove();
    return { pts, L };
  }
  const at = (sample, f) => {
    const i = Math.max(0, Math.min(sample.pts.length - 1, Math.round(f * (sample.pts.length - 1))));
    return sample.pts[i];
  };

  // ---------- journeys ----------
  const journeys = [paulFirstJourney, paulSecondJourney, paulThirdJourney, paulVoyageToRome];
  let J = $state.raw(paulFirstJourney);
  let journey = $state(null); // { step, phase: 'moving'|'card', f, lamp, chosen }
  let legSamples = [];
  let drawn = $state([]); // [{mode, pts}] completed + current partial legs
  let traveller = $state(null); // {x, y, mode, flip}
  // ?all in the URL opens every chapter (for leaders and testing).
  let unlockAll = $state(false);
  const unlocked = (j) => unlockAll || !j.requires || progress[j.requires]?.passed;

  // Sampled once per journey; a "stay" leg (another page at the same place) has no path.
  function buildLegs() {
    legSamples = J.legs.map((leg, i) => {
      if (i === 0 || leg.stay) return null;
      const from = city[J.legs[i - 1].to].xy;
      const to = city[leg.to].xy;
      const pts = [from, ...(leg.via ?? []).map(project), to];
      return { mode: leg.mode, ...samplePath(smooth(pts)) };
    });
  }
  // The communities already burning when a journey starts: those of the journeys before it.
  const litBefore = (j) => [...litAtStart, ...journeys.slice(0, journeys.indexOf(j)).flatMap((x) => x.lamps)];
  const legArrows = (leg) =>
    (leg.arrows ?? []).map((a, n) => ({ ...makeArrow(xy(a.from ?? leg.to), xy(a.to)), label: a.label, style: a.style ?? 'spread', anchor: a.anchor, n }));
  const focusLeg = (leg) => leg.focus && zoomTo(leg.focus.map(xy), 1600);

  function startJourney(j = J) {
    quizOpen = false;
    story = null;
    J = j;
    buildLegs();
    year = J.legs[0].year ?? J.years;
    lit = new Set(litBefore(J));
    newlyLit = new Set();
    drawn = [];
    arrows = legArrows(J.legs[0]);
    journey = { step: 0, phase: 'card', f: 1, lamp: false, chosen: null };
    const [x, y] = city[J.legs[0].to].xy;
    traveller = { x, y, mode: 'land', flip: false };
    if (J.legs[0].focus) focusLeg(J.legs[0]);
    else zoomTo(J.legs.map((l) => city[l.to].xy), 1800);
  }
  function nextStep() {
    if (!journey) return;
    if (journey.step >= J.legs.length - 1) return endJourney();
    const step = journey.step + 1, leg = J.legs[step];
    arrows = [];
    if (leg.year) year = leg.year;
    focusLeg(leg);
    journey = { step, phase: 'moving', f: 0, lamp: false, chosen: null };
    if (!legSamples[step]) arrive();
  }
  function endJourney() {
    journey = null;
    traveller = null;
    arrows = []; // the route and the lamps stay on the map until something else starts
    resetView();
  }
  function arrive() {
    const leg = J.legs[journey.step];
    const fresh = [...(leg.dark ? [] : [leg.to]), ...(leg.light ?? [])].filter((id) => J.lamps.includes(id) && !lit.has(id));
    const lamp = fresh.length > 0;
    if (lamp) {
      lit = new Set([...lit, ...fresh]);
      newlyLit = new Set([...newlyLit, ...fresh]);
    }
    arrows = legArrows(leg);
    journey = { ...journey, phase: 'card', f: 1, lamp };
  }
  // After a choice, scroll the card down to the reply and the Next button (long cards scroll).
  function choose(n) {
    if (!journey) return;
    journey = { ...journey, chosen: n };
    tick().then(() => document.querySelector('.card .buttons')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
  }

  // Open a journey straight at a given stop (after a page refresh): lamps, route and year as if travelled.
  function resumeJourney(j, step) {
    startJourney(j);
    step = Math.min(step, J.legs.length - 1);
    if (step <= 0) return;
    const legs = J.legs.slice(0, step + 1);
    lit = new Set([...litBefore(J), ...legs.flatMap((l) => [...(l.dark ? [] : [l.to]), ...(l.light ?? [])]).filter((id) => J.lamps.includes(id))]);
    drawn = legSamples.slice(1, step + 1).filter(Boolean).map((l) => ({ mode: l.mode, pts: l.pts }));
    year = legs.findLast((l) => l.year)?.year ?? J.years;
    arrows = legArrows(J.legs[step]);
    journey = { step, phase: 'card', f: 1, lamp: false, chosen: null };
    const f = legs.findLast((l) => l.focus);
    if (f) focusLeg(f);
  }

  // ---------- the chapters menu: opens on hover (mouse) or tap (touch) ----------
  let menuOpen = $state(false);
  let menuPointer = 'mouse';
  let menuTimer;
  function openMenu() {
    clearTimeout(menuTimer);
    menuOpen = true;
  }
  const closeMenuSoon = () => (menuTimer = setTimeout(() => (menuOpen = false), 300));
  // Shown on the closed menu: the journey whose quiz hasn't been passed yet.
  let nextUp = $derived(journeys.find((j) => j.quiz && !progress[j.quiz]?.passed));

  // ---------- where the player is, and the language (kept across a page refresh) ----------
  const PLACE_KEY = 'waysea.place';
  let ready = $state(false); // don't overwrite the saved place before it has been restored
  $effect(() => {
    const place = journey ? { journey: J.id, step: journey.step } : story ? { story: story.step } : null;
    const l = lang;
    if (!ready) return;
    try {
      localStorage.setItem('waysea.lang', l);
      if (place) localStorage.setItem(PLACE_KEY, JSON.stringify(place));
      else localStorage.removeItem(PLACE_KEY);
    } catch {}
  });
  function restorePlace() {
    let place = null;
    try {
      place = JSON.parse(localStorage.getItem(PLACE_KEY) ?? 'null');
      if (localStorage.getItem('waysea.lang') === 'ro') lang = 'ro';
    } catch {}
    if (Number.isInteger(place?.story)) storyGo(Math.min(place.story, intro.steps.length - 1));
    else if (Number.isInteger(place?.step)) {
      const j = journeys.find((x) => x.id === place.journey);
      if (j && unlocked(j)) resumeJourney(j, place.step);
    }
    ready = true;
  }

  // ---------- quiz ----------
  const PROGRESS_KEY = 'waysea.progress';
  const quizzes = { quiz1, quiz2, quiz3, quiz4 };
  let quizOpen = $state(false);
  let Q = $state.raw(quiz1); // the open quiz
  // The highest rank earned so far, shown in the cartouche.
  let topRank = $derived([quiz4, quiz3, quiz2, quiz1].find((q) => progress[q.id]?.passed));
  let progress = $state({});
  let picking = $state(false); // a map question is waiting for a click: names are hidden
  let pickMark = $state(null); // { click: [x, y], target: [x, y], r, ok }
  let pickResolve = null;
  let pickQ = null;

  function loadProgress() {
    try { progress = JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '{}'); } catch { progress = {}; }
  }
  function saveQuiz(r) {
    const best = progress[Q.id];
    if (!best || r.score > best.score) {
      progress = { ...progress, [Q.id]: r };
      try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)); } catch {}
    }
  }
  function openQuiz(q = Q) {
    Q = q;
    endStory();
    journey = null;
    traveller = null;
    drawn = [];
    lit = new Set(litAtStart);
    arrows = [];
    quizOpen = true;
    resetView();
  }
  // "Hear the story again" after a failed quiz: the introduction, or the journey the quiz is about.
  function replayFor(q) {
    closeQuiz();
    if (q.replay === 'intro') startStory();
    else startJourney(journeys.find((j) => j.id === q.replay));
  }
  function closeQuiz() {
    quizOpen = false;
    endPick();
    resetView();
  }
  function requestPick(q) {
    zoomTo(q.focus.map(xy), 1400);
    picking = true;
    hover = null;
    pickMark = null;
    pickQ = q;
    return new Promise((res) => (pickResolve = res));
  }
  function endPick() {
    picking = false;
    pickMark = null;
    pickResolve = null;
    pickQ = null;
  }
  function onMapClick(e) {
    menuOpen = false;
    if (!picking || !pickResolve) return;
    // screen → SVG viewBox → map coordinates (undo the zoom) → lon/lat
    const pt = svgEl.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const v = pt.matrixTransform(svgEl.getScreenCTM().inverse());
    const m = [(v.x - zt.x) / zt.k, (v.y - zt.y) / zt.k];
    const km = geoDistance(projection.invert(m), pickQ.at) * 6371;
    const ok = km <= pickQ.radiusKm;
    const target = project(pickQ.at);
    const edge = project([pickQ.at[0] + pickQ.radiusKm / (111.32 * Math.cos((pickQ.at[1] * Math.PI) / 180)), pickQ.at[1]]);
    pickMark = { click: m, target, r: Math.hypot(edge[0] - target[0], edge[1] - target[1]), ok };
    picking = false;
    const res = pickResolve;
    pickResolve = null;
    res({ ok, km });
  }

  // ---------- zoom ----------
  function zoomTo(points, duration = 1200) {
    const xs = points.map((p) => p[0]), ys = points.map((p) => p[1]);
    const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    const kk = Math.min(8, 0.62 / Math.max((x1 - x0) / W, (y1 - y0) / H));
    // Shift the focus a little left/up, leaving room for the story card on the right.
    const cx = (x0 + x1) / 2 + (W * 0.16) / kk, cy = (y0 + y1) / 2 + (H * 0.04) / kk;
    // Keep the map covering the whole view (programmatic transforms skip d3-zoom's own constraint).
    const tx = Math.min(0, Math.max(W - kk * W, W / 2 - kk * cx));
    const ty = Math.min(0, Math.max(H - kk * H, H / 2 - kk * cy));
    select(svgEl).transition().duration(duration).ease(easeCubicInOut)
      .call(zoomer.transform, zoomIdentity.translate(tx, ty).scale(kk));
  }
  function resetView() {
    select(svgEl).transition().duration(1200).ease(easeCubicInOut).call(zoomer.transform, zoomIdentity);
  }
  const zoomBy = (f) => select(svgEl).transition().duration(400).call(zoomer.scaleBy, f);

  onMount(() => {
    zoomer = zoom()
      .scaleExtent([1, 12])
      .translateExtent([[0, 0], [W, H]])
      .on('zoom', (e) => {
        k = e.transform.k;
        zt = e.transform;
        tf = `translate(${e.transform.x},${e.transform.y}) scale(${e.transform.k})`;
      });
    select(svgEl).call(zoomer).on('dblclick.zoom', null);

    // Deep link: ?at=lon,lat,zoom opens the map zoomed in on a place.
    const at0 = new URLSearchParams(location.search).get('at')?.split(',').map(Number);
    if (at0?.length === 3 && at0.every(Number.isFinite)) {
      const [x, y] = project([at0[0], at0[1]]);
      const kk = Math.max(1, Math.min(12, at0[2]));
      const tx = Math.min(0, Math.max(W - kk * W, W / 2 - kk * x));
      const ty = Math.min(0, Math.max(H - kk * H, H / 2 - kk * y));
      select(svgEl).call(zoomer.transform, zoomIdentity.translate(tx, ty).scale(kk));
    }

    loadProgress();
    unlockAll = new URLSearchParams(location.search).has('all');
    laneSamples = lanes.map((l) => samplePath(l.d));
    ships = Array.from({ length: 14 }, (_, i) => {
      const lane = i % lanes.length;
      return { lane, f: rand(), dir: rand() > 0.5 ? 1 : -1, speed: 9 + rand() * 7, wait: 0, x: 0, y: 0, flip: false, bob: rand() * 6 };
    });
    restorePlace();

    let last = performance.now();
    let raf;
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      // Ships: constant speed in map pixels, short rest in port at each end.
      ships = ships.map((s) => {
        const smp = laneSamples[s.lane];
        let { f, dir, wait } = s;
        if (wait > 0) wait -= dt;
        else {
          f += (dir * s.speed * dt) / smp.L;
          if (f >= 1 || f <= 0) { f = Math.max(0, Math.min(1, f)); dir = -dir; wait = 2 + rand() * 3; }
        }
        const [x, y] = at(smp, f);
        const [nx] = at(smp, Math.max(0, Math.min(1, f + dir * 0.01)));
        const flip = Math.abs(nx - x) > 0.01 ? nx < x : s.flip;
        return { ...s, f, dir, wait, x, y, flip, bob: s.bob + dt };
      });
      // Journey: draw the current leg at a steady on-screen speed.
      if (journey && journey.phase === 'moving') {
        const smp = legSamples[journey.step];
        const f = Math.min(1, journey.f + (150 / k) * dt / Math.max(smp.L, 1));
        const n = Math.max(2, Math.round(f * (smp.pts.length - 1)) + 1);
        const done = legSamples.slice(1, journey.step).filter(Boolean).map((l) => ({ mode: l.mode, pts: l.pts }));
        drawn = [...done, { mode: smp.mode, pts: smp.pts.slice(0, n) }];
        const [x, y] = smp.pts[n - 1];
        const [px] = smp.pts[Math.max(0, n - 3)];
        traveller = { x, y, mode: smp.mode, flip: x < px };
        journey = { ...journey, f };
        if (f >= 1) arrive();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  });

  // Label placement next to the city marker: right (default), left, below, below-left.
  const labelPos = (c) => {
    const dx = c.tier === 1 ? 10 : 6;
    switch (c.lab) {
      case 'l': return { x: -dx, y: -4, 'text-anchor': 'end' };
      case 'b': return { x: 0, y: 15, 'text-anchor': 'middle' };
      case 'bl': return { x: -4, y: 13, 'text-anchor': 'end' };
      default: return { x: dx, y: -5 };
    }
  };
  const ptsAttr = (pts) => pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const showLabel = (c) =>
    c.tier <= 2 || k >= 2.2 || (journey && J.legs.some((l) => l.to === c.id || l.light?.includes(c.id)));
  let leg = $derived(journey ? J.legs[journey.step] : null);
  let legCity = $derived(leg ? city[leg.to] : null);
</script>

<div class="frame">
  <svg bind:this={svgEl} viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid meet" role="img" class:picking
       onclick={onMapClick}
       aria-label="Map of the Mediterranean world in the time of the Roman Empire">
    <defs>
      <!-- slightly wobbly, hand-inked coastline -->
      <filter id="rough" x="-2%" y="-2%" width="104%" height="104%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" />
      </filter>
      <filter id="glow" x="-200%" y="-200%" width="500%" height="500%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
      <pattern id="waves" width="46" height="26" patternUnits="userSpaceOnUse" patternTransform="scale({1 / k})">
        <path d="M4 8 q3 -3 6 0 t6 0" fill="none" stroke="#56747c" stroke-width="0.7" opacity="0.5" />
        <path d="M27 21 q3 -3 6 0 t6 0" fill="none" stroke="#56747c" stroke-width="0.7" opacity="0.4" />
      </pattern>
      <clipPath id="landClip"><path d={basemap.land} /></clipPath>
      <radialGradient id="flame" cx="50%" cy="60%" r="50%">
        <stop offset="0%" stop-color="#fff6c8" />
        <stop offset="45%" stop-color="#ffc846" />
        <stop offset="100%" stop-color="#e2611b" stop-opacity="0" />
      </radialGradient>
      <symbol id="ship" viewBox="-16 -18 32 26" overflow="visible">
        <path d="M-15 3 q2 -1.5 4 0 M-17 6 q2 -1.5 4 0" stroke="#4c6a72" stroke-width="0.7" fill="none" opacity="0.7" />
        <path d="M-11 0 Q-9 5 0 5 Q9 5 12 -1 L8 0 Z" fill="#6b4a2b" stroke="#3e2a17" stroke-width="0.5" />
        <path d="M12 -1 L16 -6" stroke="#3e2a17" stroke-width="0.8" />
        <path d="M14 -5 l2 3 l-3 0 z" fill="#efe3c6" stroke="#6b4a2b" stroke-width="0.4" />
        <line x1="0" y1="0" x2="0" y2="-15" stroke="#3e2a17" stroke-width="1" />
        <path d="M-7 -13.5 Q0 -12 7 -13.5 Q8.5 -8 7 -3 Q0 -1.5 -7 -3 Q-5.5 -8 -7 -13.5 Z" fill="#f3e7c8" stroke="#6b4a2b" stroke-width="0.6" />
        <path d="M-2 -12 L-2 -3 M2 -12 L2 -3" stroke="#b8442c" stroke-width="0.7" opacity="0.8" />
        <path d="M-10 0 L-12 5" stroke="#3e2a17" stroke-width="0.9" />
      </symbol>
      <symbol id="lamp" viewBox="-12 -16 24 22" overflow="visible">
        <path d="M-9 1 Q-9 -4 0 -4 Q8 -4 10 -1 L12 -2 L12 0 Q8 4 0 4 Q-9 4 -9 1 Z" fill="#b36a3a" stroke="#5a3218" stroke-width="0.7" />
        <path d="M-9 0 q-3 -1 -3 -4 q2 0 3 2" fill="none" stroke="#5a3218" stroke-width="0.9" />
        <circle cx="-2" cy="-1" r="1.3" fill="#5a3218" />
      </symbol>
    </defs>

    <rect width={W} height={H} fill="#c3cdb2" />

    <g transform={tf}>
      <rect width={W} height={H} fill="url(#waves)" />

      <!-- concentric ink lines around the coasts, an old-map convention -->
      <g fill="none" stroke="#4f6f78" stroke-linejoin="round">
        <path d={basemap.land} stroke-width="15" opacity="0.07" vector-effect="non-scaling-stroke" />
        <path d={basemap.land} stroke-width="9" opacity="0.1" vector-effect="non-scaling-stroke" />
        <path d={basemap.land} stroke-width="4.5" opacity="0.18" vector-effect="non-scaling-stroke" />
      </g>

      <g filter="url(#rough)">
        <path d={basemap.land} fill="#ecdcb3" stroke="#5c4630" stroke-width="1.1" vector-effect="non-scaling-stroke" />
        <g clip-path="url(#landClip)">
          <path d={empirePath} fill="#b4552e" fill-opacity="0.14" stroke="#9a3a22" stroke-width="1.6"
                stroke-dasharray="7 4" vector-effect="non-scaling-stroke" />
        </g>
        <path d={basemap.lakes} fill="#c3cdb2" stroke="#5c4630" stroke-width="0.7" vector-effect="non-scaling-stroke" />
        <path d={basemap.rivers} fill="none" stroke="#5e8288" stroke-width="1" opacity="0.8" vector-effect="non-scaling-stroke" />
      </g>

      <!-- mountains -->
      <g fill="#dcc79b" stroke="#7b5d3c" stroke-width="0.8" stroke-linejoin="round">
        {#each hills as h}
          <g transform="translate({h.x},{h.y}) scale({h.s * hillScale})">
            <path d="M-6 2 L-1 -6 L1.5 -3 L3 -5 L7 2 Z" vector-effect="non-scaling-stroke" />
            <path d="M-1 -6 L0.5 2" fill="none" opacity="0.5" vector-effect="non-scaling-stroke" />
          </g>
        {/each}
      </g>

      <!-- region & sea names -->
      {#each regions as r}
        {@const p = project(r.at)}
        <text class="region" class:outside={r.outside} transform="translate({p[0]},{p[1]}) rotate({r.rot ?? 0})"
              font-size={22 * r.size * areaScale} opacity={k >= 4 ? 0 : k > 2.5 ? 0.35 : 1}>{r.la}</text>
      {/each}
      {#each seas as s}
        {@const p = project(s.at)}
        <text class="sea" transform="translate({p[0]},{p[1]}) rotate({s.rot})" font-size={20 * s.size * areaScale}
              opacity={k > 2.5 ? 0.4 : 1}>{s.la}</text>
      {/each}

      <!-- small names: Holy Land waters, regions and mountains; the great rivers -->
      {#each details as d}
        {@const p = project(d.at)}
        {@const glyph = d.kind === 'mount' || d.kind === 'town'}
        <g class="detail {d.kind}" transform="translate({p[0]},{p[1]}) scale({labelScale})" opacity={k >= d.minK && !picking ? 1 : 0}>
          {#if d.kind === 'mount'}
            <path d="M-5 3 L0 -5 L5 3 Z" fill="#cdb284" stroke="#6b4c2e" stroke-width="0.9" />
          {:else if d.kind === 'town'}
            <circle r="2.2" fill="#3e2a1a" />
          {/if}
          <text transform="rotate({d.rot ?? 0})" x={glyph ? (d.anchor === 'end' ? -7 : 7) : 0} y={glyph ? 4 : 0}
                text-anchor={d.anchor ?? (glyph ? 'start' : 'middle')}>{d.la ?? d.name[lang]}</text>
        </g>
      {/each}

      <!-- sea lanes -->
      <g fill="none" stroke="#5d7178" stroke-width="1" stroke-dasharray="1 5" stroke-linecap="round" opacity="0.7">
        {#each lanes as l}<path d={l.d} vector-effect="non-scaling-stroke" />{/each}
      </g>

      <!-- introduction arrows -->
      {#each arrows as a ((story ? 's' + story.step : 'j' + journey?.step) + '-' + a.n)}
        <g class="arrow {a.style}" style="--delay:{a.n * 0.12}s">
          <path d={a.d} pathLength="1" stroke-width={2.2 / k} />
          <path class="head" transform="translate({a.end[0]},{a.end[1]}) rotate({a.angle}) scale({1 / Math.pow(k, 0.85)})"
                d="M0 0 L-9 -4.5 L-7 0 L-9 4.5 Z" />
          {#if a.label?.[lang]}
            <text class="arrow-l" transform="translate({a.end[0]},{a.end[1]}) scale({labelScale})"
                  x={a.anchor === 'end' ? -6 : 6} y="15" text-anchor={a.anchor === 'end' ? 'end' : 'start'}>{a.label[lang]}</text>
          {/if}
        </g>
      {/each}

      <!-- journey route -->
      {#each drawn as d}
        <polyline points={ptsAttr(d.pts)} class="route" class:sea={d.mode === 'sea'} vector-effect="non-scaling-stroke" />
      {/each}

      <!-- ships -->
      {#each ships as s}
        <use href="#ship" width="32" height="26" x="-16" y="-18"
             transform="translate({s.x},{s.y + Math.sin(s.bob * 2) * 0.4}) scale({iconScale * (s.flip ? -1 : 1)},{iconScale}) rotate({Math.sin(s.bob * 1.7) * 3})" />
      {/each}

      <!-- cities -->
      {#each cityList as c (c.id)}
        <g class="city" data-id={c.id} transform="translate({c.xy[0]},{c.xy[1]}) scale({labelScale})" role="button" tabindex="-1"
           onpointerenter={(e) => (hover = picking ? null : { c, x: e.clientX, y: e.clientY })}
           onpointermove={(e) => (hover = picking ? null : { c, x: e.clientX, y: e.clientY })}
           onpointerleave={() => (hover = null)}>
          {#if lit.has(c.id)}
            <circle r="13" fill="url(#flame)" class="halo" class:new={newlyLit.has(c.id)} />
          {/if}
          {#if c.tier === 1}
            <path d="M-7 3 L-7 -4 L-5 -4 L-5 -6 L-3 -6 L-3 -4 L-1 -4 L-1 -8 L1 -8 L1 -4 L3 -4 L3 -6 L5 -6 L5 -4 L7 -4 L7 3 Z"
                  fill="#8a3a22" stroke="#3e2414" stroke-width="0.8" />
          {:else if c.tier === 2}
            <circle r="4.2" fill="#ecdcb3" stroke="#3e2414" stroke-width="1.2" />
            <circle r="1.8" fill="#8a3a22" />
          {:else}
            <circle r="2.4" fill="#3e2414" />
          {/if}
          <circle r="11" fill="transparent" />
          {#if showLabel(c) && !picking}
            <text class="label" class:big={c.tier === 1} class:small={c.tier === 3} {...labelPos(c)}>{c.la}</text>
          {/if}
          {#if lit.has(c.id)}
            <use href="#lamp" width="24" height="22" x="-12" y="-16" transform="translate(0,{c.tier === 1 ? 15 : 12}) scale(0.7)" />
            <ellipse cx="9" cy={c.tier === 1 ? 9.6 : 6.6} rx="2.2" ry="3.6" fill="url(#flame)" class="flame" />
          {/if}
        </g>
      {/each}

      <!-- quiz: where the answer is, and where the player clicked -->
      {#if pickMark}
        <g class="pick">
          <circle cx={pickMark.target[0]} cy={pickMark.target[1]} r={Math.max(pickMark.r, 9 / k)} class="target" stroke-width={2.5 / k} />
          <g transform="translate({pickMark.click[0]},{pickMark.click[1]}) scale({iconScale})">
            <path d={pickMark.ok ? 'M-6 0 L-2 5 L7 -6' : 'M-5 -5 L5 5 M5 -5 L-5 5'} class="mark" class:ok={pickMark.ok} />
          </g>
        </g>
      {/if}

      <!-- traveller -->
      {#if traveller && journey?.phase === 'moving'}
        {#if traveller.mode === 'sea'}
          <use href="#ship" width="32" height="26" x="-16" y="-18"
               transform="translate({traveller.x},{traveller.y}) scale({iconScale * 1.5 * (traveller.flip ? -1 : 1)},{iconScale * 1.5})" />
        {:else}
          <g transform="translate({traveller.x},{traveller.y}) scale({iconScale})">
            <circle r="5" fill="#8b1e1e" stroke="#f6ecd2" stroke-width="1.5" />
            <circle r="9" fill="none" stroke="#8b1e1e" stroke-width="1" opacity="0.5" class="pulse" />
          </g>
        {/if}
      {/if}

      <!-- compass rose & scale -->
      <g transform="translate({compass[0]},{compass[1]})" class="compass">
        <circle r="44" fill="none" stroke="#5c4630" stroke-width="0.8" />
        <circle r="38" fill="none" stroke="#5c4630" stroke-width="0.5" />
        {#each [0, 45, 90, 135, 180, 225, 270, 315] as a, i}
          <path transform="rotate({a})" d={i % 2 ? 'M0 -26 L4 0 L0 4 L-4 0 Z' : 'M0 -42 L6 0 L0 6 L-6 0 Z'}
                fill={i % 2 ? '#b98e5e' : '#8a3a22'} stroke="#3e2414" stroke-width="0.6" />
        {/each}
        <text y="-49" class="compass-l">SEPTENTRIO</text>
        <text y="60" class="compass-l">MERIDIES</text>
      </g>
      <g transform="translate({sbA[0]},{sbA[1]})">
        <rect width={scaleBarLen} height="5" fill="#ecdcb3" stroke="#3e2414" stroke-width="0.8" />
        <rect width={scaleBarLen / 2} height="5" fill="#3e2414" />
        <text y="-6" class="scale-l">D MILIA PASSVVM · 500 Roman miles</text>
      </g>
    </g>
    <g id="measure" visibility="hidden"></g>
  </svg>

  <!-- paper texture & vignette over everything -->
  <div class="paper" aria-hidden="true"></div>

  <header class="cartouche">
    <h1>The Way Across the Sea</h1>
    {#if topRank}<div class="rank">⚓ {topRank.rank[lang]} {'★'.repeat(progress[topRank.id].stars)}</div>{/if}
    <p>{lang === 'en' ? 'The Mediterranean world, ' : 'Lumea mediteraneeană, '}{year ? year[lang] : lang === 'en' ? 'c. AD 46' : 'cca. 46 d.Hr.'}</p>
  </header>

  <nav class="controls">
    <button onclick={() => (lang = lang === 'en' ? 'ro' : 'en')} title="Language / Limba">{lang === 'en' ? 'RO' : 'EN'}</button>
    <button onclick={() => zoomBy(1.6)} aria-label="Zoom in">+</button>
    <button onclick={() => zoomBy(1 / 1.6)} aria-label="Zoom out">−</button>
    <button onclick={resetView}>{t.reset}</button>
  </nav>

  {#if !journey && !story && !quizOpen}
    <div class="start" onpointerenter={(e) => e.pointerType === 'mouse' && openMenu()}
         onpointerleave={(e) => e.pointerType === 'mouse' && closeMenuSoon()}>
      <button class="play menu-btn" class:open={menuOpen} aria-expanded={menuOpen}
              onpointerdown={(e) => (menuPointer = e.pointerType)}
              onclick={() => (menuPointer === 'mouse' ? openMenu() : (menuOpen = !menuOpen))}>
        <span class="icon">☰</span>
        <span><b>{t.chapters}</b><small>{nextUp ? `${t.nextUp}: ${nextUp.title[lang]}` : t.allDone}</small></span>
        <span class="caret">▾</span>
      </button>
      {#if menuOpen}
      <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
      <div class="menu" onclick={() => (menuOpen = false)}>
      <button class="play" onclick={startStory}>
        <span class="icon">📜</span>
        <span><b>{intro.title[lang]}</b><small>{intro.years[lang]}</small></span>
      </button>
      {#each journeys as j}
        {@const open = unlocked(j)}
        <button class="play" class:locked={!open} disabled={!open} onclick={() => startJourney(j)}>
          <span class="icon">{open ? '▶' : '🔒'}</span>
          <span><b>{j.title[lang]}</b>
            <small>{#if open}{j.years[lang]} · {lang === 'en' ? 'Acts' : 'Fapte'} {j.acts}{:else}{t.locked}{/if}</small></span>
        </button>
        {#if j.quiz && open}
          {@const q = quizzes[j.quiz]}
          {@const p = progress[q.id]}
          <button class="play" onclick={() => openQuiz(q)}>
            <span class="icon">⚓</span>
            <span><b>{q.title[lang]}</b>
              <small>{#if p}{'★'.repeat(p.stars)}{'☆'.repeat(3 - p.stars)} · {p.score}/{q.questions.length}{:else}{q.subtitle[lang]}{/if}</small></span>
          </button>
        {/if}
      {/each}
      </div>
      {/if}
    </div>
  {/if}

  {#if quizOpen}
    {#key Q.id}
      <Quiz quiz={Q} {lang} {requestPick} {endPick} onclose={closeQuiz} onsave={saveQuiz} onreplay={() => replayFor(Q)} />
    {/key}
  {/if}

  {#if story}
    {@const s = intro.steps[story.step]}
    {#key story.step}
      <article class="card" class:tradition={s.tradition} class:left={s.card === 'left'}>
        <div class="step">{intro.title[lang]} · {story.step + 1} {t.of} {intro.steps.length}</div>
        <h2>{s.place[lang]}</h2>
        <div class="sub">{s.year[lang]}{s.tradition ? (lang === 'en' ? ' · from the family logbook' : ' · din jurnalul familiei') : ''}</div>
        {#if s.light?.length}
          <div class="lit">🪔 {s.light.length === 1
            ? (lang === 'en' ? 'A lamp is lit!' : 'Se aprinde o candelă!')
            : (lang === 'en' ? 'New lamps are lit!' : 'Se aprind candele noi!')}</div>
        {/if}
        <p class:narrator={s.narrator}>{s[lang]}</p>
        {#if s.note}
          <details class="note"><summary>📜 {t.note}</summary>{s.note[lang]}</details>
        {/if}
        <div class="buttons">
          {#if story.step > 0}
            <button class="ghost" onclick={() => storyGo(story.step - 1)}>◀ {t.back}</button>
          {:else}
            <button class="ghost" onclick={endStory}>{t.exit}</button>
          {/if}
          {#if story.step < intro.steps.length - 1}
            <button onclick={() => storyGo(story.step + 1)}>{t.next} ▶</button>
          {:else}
            <button onclick={storyToJourney}>{paulFirstJourney.title[lang]} ▶</button>
          {/if}
        </div>
      </article>
    {/key}
  {/if}

  <aside class="legend">
    <div><span class="sw empire"></span>{t.empire}</div>
    <div><span class="sw lane"></span>{t.lanes}</div>
    <div><span class="sw lamp"></span>{t.lamps}: {lit.size}</div>
  </aside>

  {#if journey && journey.phase === 'card' && legCity}
    {#key J.id + journey.step}
    <article class="card">
      <div class="step">{J.title[lang]} · {t.step} {journey.step + 1} {t.of} {J.legs.length}</div>
      <h2>{legCity.la}</h2>
      <div class="sub">{legCity[lang]} · {t.modern}: {legCity.modern}</div>
      {#if leg.title}<h3>{leg.title[lang]}</h3>{/if}
      {#if journey.lamp}
        <div class="lit">🪔 {lang === 'en' ? 'A lamp is lit!' : 'Se aprinde o candelă!'}</div>
      {/if}
      <p>{leg[lang]}</p>
      {#if leg.choice}
        <div class="choice">
          <div class="q">{leg.choice.q[lang]}</div>
          {#each leg.choice.options as o, n}
            <button class="opt" class:picked={journey.chosen === n} disabled={journey.chosen !== null} onclick={() => choose(n)}>{o[lang]}</button>
          {/each}
          {#if journey.chosen !== null}
            <p class="reply"><i>{leg.choice.options[journey.chosen].reply[lang]}</i> {leg.choice.after[lang]}</p>
          {/if}
        </div>
      {/if}
      {#if leg.note}
        <details class="note"><summary>📜 {t.note}</summary>{leg.note[lang]}</details>
      {/if}
      <div class="buttons">
        {#if journey.step < J.legs.length - 1}
          <button class="ghost" onclick={endJourney}>{t.exit}</button>
          <button onclick={nextStep} disabled={leg.choice && journey.chosen === null}>{t.next} ▶</button>
        {:else}
          <button class="ghost" onclick={endJourney}>{t.finish} ✓</button>
          {#if J.quiz}
            <button onclick={() => { endJourney(); openQuiz(quizzes[J.quiz]); }}>⚓ {lang === 'en' ? 'Take the quiz' : 'Fă testul'} ▶</button>
          {/if}
        {/if}
      </div>
    </article>
    {/key}
  {/if}

  {#if hover}
    <div class="tip" style="left:{hover.x + 14}px; top:{hover.y + 14}px">
      <b>{hover.c.la}</b>
      <span>{hover.c[lang]}{hover.c.port ? ' ⚓' : ''}</span>
      <small>{t.modern}: {hover.c.modern}</small>
    </div>
  {/if}
</div>

<style>
  .frame { position: fixed; inset: 0; background: #b7c1a6; overflow: hidden; font-family: 'IM Fell English', Georgia, serif; color: #3e2414; }
  svg { width: 100%; height: 100%; display: block; cursor: grab; touch-action: none; }
  svg:active { cursor: grabbing; }
  .paper {
    position: absolute; inset: 0; pointer-events: none; mix-blend-mode: multiply;
    background:
      radial-gradient(ellipse at center, rgba(255, 248, 225, 0) 55%, rgba(110, 72, 30, 0.38) 100%),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.45 0 0 0 0 0.32 0 0 0 0 0.18 0 0 0 0.22 0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .region { font-family: 'Cinzel', serif; fill: #7a5636; fill-opacity: 0.55; letter-spacing: 0.4em; text-anchor: middle; pointer-events: none; transition: opacity 0.4s; }
  .region.outside { fill: #8c7a64; fill-opacity: 0.45; font-style: italic; }
  .sea { font-style: italic; fill: #3f5f69; fill-opacity: 0.75; letter-spacing: 0.3em; text-anchor: middle; pointer-events: none; transition: opacity 0.4s; }
  .detail { pointer-events: none; transition: opacity 0.5s; }
  .detail text { paint-order: stroke; stroke-linejoin: round; }
  .detail.water text { font-style: italic; font-size: 12px; fill: #2f5560; stroke: #c3cdb2; stroke-width: 3px; letter-spacing: 0.08em; }
  .detail.river text { font-style: italic; font-size: 12px; fill: #3e6670; stroke: #ecdcb3; stroke-width: 3px; letter-spacing: 0.12em; }
  .detail.region text { font-family: 'Cinzel', serif; font-size: 12px; fill: #7a5636; fill-opacity: 0.8; letter-spacing: 0.3em; }
  .detail.town text { font-size: 11px; fill: #3e2a1a; stroke: #ecdcb3; stroke-width: 3px; }
  .detail.mount text { font-size: 11px; font-style: italic; fill: #5c4630; stroke: #ecdcb3; stroke-width: 3px; }
  .label { font-size: 13px; fill: #2f1b0e; paint-order: stroke; stroke: #ecdcb3; stroke-width: 3px; stroke-linejoin: round; pointer-events: none; }
  .label.big { font-family: 'Cinzel', serif; font-weight: 600; font-size: 15px; }
  .label.small { font-size: 11px; }
  .city { cursor: pointer; outline: none; }
  .halo { opacity: 0.8; }
  .halo.new { animation: kindle 1.6s ease-out; }
  .flame { animation: flicker 1.3s infinite alternate ease-in-out; transform-box: fill-box; transform-origin: 50% 100%; }
  .route { fill: none; stroke: #8b1e1e; stroke-width: 2.6; stroke-dasharray: 0.5 5; stroke-linecap: round; stroke-linejoin: round; }
  .route.sea { stroke-width: 2; stroke-dasharray: 8 5; stroke-linecap: butt; }
  .pulse { animation: pulse 1.2s infinite; transform-box: fill-box; transform-origin: center; }
  .compass-l, .scale-l { font-family: 'Cinzel', serif; font-size: 9px; fill: #5c4630; text-anchor: middle; letter-spacing: 0.15em; }
  .scale-l { text-anchor: start; }
  @keyframes flicker { from { transform: scale(1, 1); opacity: 0.85; } to { transform: scale(0.85, 1.15); opacity: 1; } }
  @keyframes kindle { 0% { r: 0; opacity: 1; } 40% { r: 40; opacity: 1; } 100% { r: 13; opacity: 0.8; } }
  @keyframes pulse { from { transform: scale(0.6); opacity: 0.9; } to { transform: scale(1.6); opacity: 0; } }

  .cartouche {
    position: absolute; left: 20px; bottom: 20px; padding: 14px 26px 12px; text-align: center;
    background: #efe0b9; border: 2px solid #5c4630; outline: 1px solid #5c4630; outline-offset: 4px;
    box-shadow: 0 6px 18px rgba(60, 35, 10, 0.35); border-radius: 3px;
  }
  .cartouche h1 { font-family: 'Cinzel', serif; font-size: 26px; margin: 0; letter-spacing: 0.08em; color: #6e2a17; }
  .cartouche p { margin: 2px 0 0; font-style: italic; font-size: 15px; }
  .controls { position: absolute; top: 16px; right: 16px; display: flex; gap: 6px; }
  button {
    font-family: 'IM Fell English', Georgia, serif; font-size: 16px; color: #3e2414; cursor: pointer;
    background: #efe0b9; border: 1.5px solid #5c4630; border-radius: 4px; padding: 6px 12px;
    box-shadow: 0 2px 6px rgba(60, 35, 10, 0.3);
  }
  button:hover { background: #f7ecd0; }
  .controls button { min-width: 38px; }
  .start { position: absolute; top: 16px; left: 16px; display: flex; flex-direction: column; align-items: flex-start; gap: 8px; }
  .menu { align-self: stretch; display: flex; flex-direction: column; gap: 8px; animation: drop 0.18s ease-out; transform-origin: top; }
  .menu-btn .caret { margin-left: auto; padding-left: 10px; font-size: 14px; transition: transform 0.2s; }
  .menu-btn.open .caret { transform: rotate(180deg); }
  .menu-btn .icon { font-size: 20px; }
  @keyframes drop { from { transform: scaleY(0.7) translateY(-8px); opacity: 0; } to { transform: none; opacity: 1; } }
  .play { display: flex; align-items: center; gap: 12px; padding: 10px 18px; text-align: left; }
  .play .icon { font-size: 22px; color: #8b1e1e; }
  .play b { display: block; font-family: 'Cinzel', serif; font-size: 17px; }
  .play small { font-style: italic; font-size: 13px; }
  .legend { position: absolute; right: 16px; bottom: 20px; background: rgba(239, 224, 185, 0.92); border: 1px solid #5c4630; border-radius: 3px; padding: 8px 12px; font-size: 14px; line-height: 1.6; }
  .sw { display: inline-block; width: 22px; height: 10px; margin-right: 8px; vertical-align: middle; }
  .sw.empire { background: rgba(180, 85, 46, 0.25); border: 1.5px dashed #9a3a22; }
  .sw.lane { border-top: 2px dotted #5d7178; height: 0; }
  .sw.lamp { width: 12px; height: 12px; border-radius: 50%; background: radial-gradient(#fff6c8, #ffc846 50%, transparent 72%); margin: 0 13px 0 5px; }
  .card {
    position: absolute; right: 24px; top: 72px; width: min(440px, calc(100vw - 48px)); padding: 20px 26px;
    background: #f1e3be; border: 2px solid #5c4630; outline: 1px solid #5c4630; outline-offset: 4px;
    box-shadow: 0 10px 30px rgba(60, 35, 10, 0.4); border-radius: 3px; animation: unroll 0.35s ease-out;
  }
  .card .step { font-size: 14px; font-style: italic; color: #7a5636; }
  .card h2 { font-family: 'Cinzel', serif; margin: 2px 0 0; font-size: 27px; color: #6e2a17; }
  .card .sub { font-size: 15.5px; font-style: italic; color: #6a5038; }
  .card p { font-size: 20.5px; line-height: 1.45; margin: 12px 0 14px; }
  .card .lit { margin-top: 8px; font-size: 17px; color: #8b4a12; }
  .card .buttons { display: flex; justify-content: space-between; }
  .card .buttons button { font-size: 18px; padding: 7px 14px; }
  .card .ghost { background: transparent; box-shadow: none; }
  .card p.narrator { font-style: italic; }
  svg.picking { cursor: crosshair; }
  .pick .target { fill: rgba(79, 122, 42, 0.18); stroke: #4f7a2a; stroke-dasharray: 4 3; }
  .pick .mark { fill: none; stroke: #9a3a22; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
  .pick .mark.ok { stroke: #3f6d1f; }
  .cartouche .rank { font-size: 14px; color: #8b4a12; margin-top: 2px; }
  .card.left { right: auto; left: 24px; }
  .card { max-height: calc(100vh - 110px); overflow: auto; box-sizing: border-box; z-index: 2; } /* above the legend */
  .card h3 { font-family: 'IM Fell English', Georgia, serif; font-style: italic; font-weight: normal; font-size: 23px; color: #6e2a17; margin: 10px 0 0; }
  .card h3 + .lit, .card h3 + p { margin-top: 6px; }
  .choice { border-top: 1px solid rgba(92, 70, 48, 0.4); padding-top: 10px; margin-bottom: 12px; display: flex; flex-direction: column; gap: 7px; }
  .choice .q { font-style: italic; font-size: 19.5px; color: #6e2a17; }
  .choice .opt { text-align: left; font-size: 18.5px; padding: 8px 14px; }
  .choice .opt:disabled { cursor: default; opacity: 0.5; }
  .choice .opt.picked { opacity: 1; background: #e6d29f; border-color: #8b4a12; }
  .choice p.reply { margin: 6px 0 0; }
  .note { font-size: 17px; line-height: 1.4; color: #4e3a26; background: rgba(92, 70, 48, 0.07); border-left: 3px solid #b39466; padding: 6px 10px; margin-bottom: 14px; }
  .note summary { cursor: pointer; font-style: italic; color: #7a5636; }
  .note[open] summary { margin-bottom: 4px; }
  .play.locked { opacity: 0.6; cursor: default; }
  .play.locked:hover { background: #efe0b9; }
  .card button:disabled { opacity: 0.45; cursor: default; }
  .arrow.blocked path { stroke: #6f6252; stroke-dasharray: 0.03 0.025; stroke-dashoffset: 0; opacity: 0; animation: appear 0.8s ease-out var(--delay) forwards; }
  .arrow.blocked .head { fill: #6f6252; }
  .arrow.blocked .arrow-l { fill: #4f4436; }
  .arrow.link path { stroke: #8b6a3a; stroke-dasharray: 0.02 0.015; stroke-dashoffset: 0; opacity: 0; animation: appear 0.8s ease-out var(--delay) forwards; }
  .arrow.link .head { fill: #8b6a3a; }
  .arrow.link .arrow-l { fill: #6b4a22; }
  .card.tradition { border-style: dashed; }
  .arrow path { fill: none; stroke: #8b1e1e; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw 1.1s ease-out var(--delay) forwards; }
  .arrow .head { fill: #8b1e1e; stroke: none; opacity: 0; animation: appear 0.3s ease-out calc(var(--delay) + 1s) forwards; }
  .arrow.tradition path { stroke: #5b3a8a; stroke-dasharray: 0.012 0.02; stroke-dashoffset: 0; opacity: 0; animation: appear 0.8s ease-out var(--delay) forwards; }
  .arrow.tradition .head { fill: #5b3a8a; }
  .arrow-l { font-size: 15px; font-weight: bold; font-style: italic; fill: #6e2a17; paint-order: stroke; stroke: #ecdcb3; stroke-width: 3px; opacity: 0; animation: appear 0.4s ease-out calc(var(--delay) + 0.9s) forwards; pointer-events: none; }
  .arrow.tradition .arrow-l { fill: #4a2d73; }
  @keyframes draw { to { stroke-dashoffset: 0; } }
  @keyframes appear { to { opacity: 1; } }
  .tip { position: fixed; pointer-events: none; background: #f6ebcd; border: 1px solid #5c4630; border-radius: 3px; padding: 6px 10px; box-shadow: 0 3px 10px rgba(60, 35, 10, 0.3); display: flex; flex-direction: column; font-size: 14px; }
  .tip b { font-family: 'Cinzel', serif; font-size: 15px; }
  .tip small { font-style: italic; color: #6a5038; }
  @keyframes unroll { from { transform: scaleY(0.6); opacity: 0; } to { transform: none; opacity: 1; } }
  @media (prefers-reduced-motion: reduce) { .flame, .pulse, .halo.new, .card, .menu { animation: none; } .arrow path, .arrow .head, .arrow-l { animation-duration: 0.01s; animation-delay: 0s; } }
</style>
