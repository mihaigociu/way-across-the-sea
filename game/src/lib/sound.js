// All the game's sounds, made in the browser with the Web Audio API: no audio files, nothing to license.
// Nothing plays before the player's first click or key (browsers require it), and the 🔊 button turns it all off.
//   ambience(kind) — the background: 'harbour' | 'sea' | 'storm' | 'land' | 'quiet'
//   play(name)     — a short sound: 'page' | 'pick' | 'lamp' | 'bell' | 'right' | 'wrong' | 'rank'
//   theme()        — the Seikilos song on a lyre, once; stopTheme() fades it out

const KEY = 'waysea.sound';
let ctx = null, master, waves, wind, windFilter, lfoWaves, themeBus;
let on = true, wanted = 'harbour';
const plucks = new Map(); // frequency → AudioBuffer

export function soundOn() {
  try { on = localStorage.getItem(KEY) !== 'off'; } catch {}
  return on;
}
export function setSoundOn(v) {
  on = v;
  try { localStorage.setItem(KEY, v ? 'on' : 'off'); } catch {}
  if (v) start();
  if (ctx) master.gain.setTargetAtTime(v ? 0.8 : 0, ctx.currentTime, 0.15);
}

// Call on the first click or key press.
export function start() {
  if (!on) return;
  if (ctx) { ctx.resume(); return; }
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 0.8;
  master.connect(ctx.destination);
  themeBus = ctx.createGain();
  themeBus.connect(master);

  // The sea: soft pink noise through a low-pass filter, swelling slowly like waves.
  const noise = ctx.createBufferSource();
  noise.buffer = pinkNoise(6);
  noise.loop = true;
  const low = ctx.createBiquadFilter();
  low.type = 'lowpass'; low.frequency.value = 420;
  waves = ctx.createGain(); waves.gain.value = 0;
  const swell = ctx.createGain(); swell.gain.value = 0.5;
  lfoWaves = ctx.createOscillator(); lfoWaves.frequency.value = 0.12;
  const depth = ctx.createGain(); depth.gain.value = 0.45;
  lfoWaves.connect(depth).connect(swell.gain);
  noise.connect(low).connect(swell).connect(waves).connect(master);

  // The wind: the same noise through a band-pass filter that wanders up and down.
  windFilter = ctx.createBiquadFilter();
  windFilter.type = 'bandpass'; windFilter.frequency.value = 700; windFilter.Q.value = 1.4;
  const lfoWind = ctx.createOscillator(); lfoWind.frequency.value = 0.07;
  const sweep = ctx.createGain(); sweep.gain.value = 380;
  lfoWind.connect(sweep).connect(windFilter.frequency);
  wind = ctx.createGain(); wind.gain.value = 0;
  noise.connect(windFilter).connect(wind).connect(master);

  noise.start(); lfoWaves.start(); lfoWind.start();
  ambience(wanted);
}

// Levels measured offline: the sea sits well under the lyre, the storm is the loudest thing in the game.
const AMBIENCE = {
  harbour: { waves: 0.2, wind: 0.03, swell: 0.12 },
  sea: { waves: 0.32, wind: 0.1, swell: 0.16 },
  storm: { waves: 0.8, wind: 0.6, swell: 0.3 },
  land: { waves: 0.05, wind: 0.08, swell: 0.1 },
  quiet: { waves: 0.05, wind: 0, swell: 0.1 },
};
export function ambience(kind) {
  wanted = kind;
  if (!ctx) return;
  const a = AMBIENCE[kind] ?? AMBIENCE.harbour, t = ctx.currentTime;
  waves.gain.setTargetAtTime(a.waves, t, 1.2);
  wind.gain.setTargetAtTime(a.wind, t, 1.2);
  lfoWaves.frequency.setTargetAtTime(a.swell, t, 2);
}

export function play(name) {
  if (!ctx || !on) return;
  const t = ctx.currentTime + 0.01;
  if (name === 'page') rustle(t);
  else if (name === 'lamp') { bell(t, 1318.5, 0.05, 2.2); bell(t + 0.12, 1975.5, 0.035, 2.4); }
  else if (name === 'bell') { bell(t, 523.25, 0.06, 3); bell(t + 0.9, 523.25, 0.045, 3); }
  else if (name === 'pick') pluck(t, 523.25, 0.14);
  else if (name === 'right') { pluck(t, 440, 0.22); pluck(t + 0.13, 659.25, 0.22); }
  else if (name === 'wrong') pluck(t, 293.66, 0.18);
  else if (name === 'rank') [440, 554.37, 659.25, 880].forEach((f, i) => pluck(t + i * 0.16, f, 0.24));
}

// The Epitaph of Seikilos (1st century AD), the oldest complete song that survives, with its music.
// Transcription after Pöhlmann & West (two sharps); [note, length in eighths]. "While you live, shine…"
const SEIKILOS = [
  ['A4', 1], ['E5', 2], ['E5', 3],
  ['C#5', 1], ['D5', 1], ['E5', 1], ['D5', 3],
  ['C#5', 2], ['D5', 1], ['E5', 1], ['D5', 1], ['C#5', 1],
  ['B4', 1], ['A4', 2], ['B4', 1], ['G4', 2],
  ['A4', 1], ['C#5', 1], ['E5', 1], ['D5', 1], ['C#5', 1], ['D5', 1],
  ['C#5', 1], ['A4', 2], ['B4', 1], ['G4', 2],
  ['A4', 1], ['C#5', 1], ['B4', 1], ['D5', 1], ['E5', 1], ['C#5', 1],
  ['A4', 1], ['A4', 2], ['A4', 1], ['F#4', 1], ['E4', 4],
];
const SEMI = { C: -9, 'C#': -8, D: -7, 'D#': -6, E: -5, F: -4, 'F#': -3, G: -2, 'G#': -1, A: 0, 'A#': 1, B: 2 };
const freq = (n) => 440 * 2 ** ((SEMI[n.slice(0, -1)] + 12 * (+n.slice(-1) - 4)) / 12);

export function theme() {
  if (!ctx || !on) return;
  stopTheme(true);
  themeBus = ctx.createGain();
  themeBus.connect(master);
  let t = ctx.currentTime + 0.6;
  const eighth = 0.44;
  for (const [n, d] of SEIKILOS) {
    pluck(t, freq(n), 0.2, themeBus);
    pluck(t, freq(n) / 2, 0.06, themeBus); // a quiet lower string, for warmth
    t += d * eighth;
  }
}
export function stopTheme(now = false) {
  if (!ctx || !themeBus) return;
  const bus = themeBus;
  bus.gain.setTargetAtTime(0, ctx.currentTime, now ? 0.02 : 0.6);
  setTimeout(() => bus.disconnect(), now ? 100 : 3000);
  themeBus = null;
}

// ---------- the instruments ----------

// A plucked string (Karplus–Strong), rendered once per pitch and cached: it sounds like a lyre.
function pluck(t, f, vol, out = master) {
  let buf = plucks.get(f);
  if (!buf) {
    const sr = ctx.sampleRate, len = Math.floor(sr * 2.4), p = Math.round(sr / f);
    buf = ctx.createBuffer(1, len, sr);
    const d = buf.getChannelData(0), ring = new Float32Array(p);
    for (let i = 0; i < p; i++) ring[i] = Math.random() * 2 - 1;
    for (let i = 0, j = 0; i < len; i++, j = (j + 1) % p) {
      const next = ring[(j + 1) % p];
      d[i] = ring[j];
      ring[j] = 0.996 * 0.5 * (ring[j] + next);
    }
    plucks.set(f, buf);
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const soft = ctx.createBiquadFilter();
  soft.type = 'lowpass'; soft.frequency.value = 2600;
  const g = ctx.createGain(); g.gain.value = vol;
  src.connect(soft).connect(g).connect(out ?? master);
  src.start(t);
}

// A small bell: a few inharmonic partials that fade slowly.
function bell(t, f, vol, decay) {
  for (const [ratio, amp] of [[1, 1], [2.76, 0.35], [5.4, 0.12]]) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.value = f * ratio;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol * amp, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + decay / ratio);
    o.connect(g).connect(master);
    o.start(t); o.stop(t + decay);
  }
}

// Turning a page: a short brush of high noise.
function rustle(t) {
  const src = ctx.createBufferSource();
  src.buffer = pinkNoise(0.3);
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass'; bp.Q.value = 0.9;
  bp.frequency.setValueAtTime(1800, t);
  bp.frequency.linearRampToValueAtTime(3600, t + 0.2);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.6, t + 0.04);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.24);
  src.connect(bp).connect(g).connect(master);
  src.start(t);
}

// Pink noise (Paul Kellet's filter): softer than white noise, like the sea.
function pinkNoise(seconds) {
  const len = Math.floor(ctx.sampleRate * seconds), buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.969 * b2 + w * 0.153852;
    b3 = 0.8665 * b3 + w * 0.3104856; b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898;
    d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
    b6 = w * 0.115926;
  }
  // Blend the end into the start and cut it off, so there is no click where the loop repeats.
  const fade = Math.min(2000, len >> 2);
  for (let i = 0; i < fade; i++) { const k = i / fade; d[i] = d[i] * k + d[len - fade + i] * (1 - k); }
  const out = ctx.createBuffer(1, len - fade, ctx.sampleRate);
  out.copyToChannel(d.subarray(0, len - fade), 0);
  return out;
}
