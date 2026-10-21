# The Way Across the Sea: map prototype

An ancient-style interactive map of the Mediterranean world (c. AD 46), with sea lanes, sailing ships, the Roman Empire's borders, Christian communities shown as lamps, an introduction, **"The story so far"** (AD 30–46, told by Grandfather Eli), and playable **Paul's First Journey** (Acts 13–14) with its quiz, and **Paul's Second Journey** (Acts 15–18, unlocked by passing the quiz), in English and Romanian.

See `../PLAN.md` for the full game plan.

## Run

```sh
npm install
npm run dev        # http://localhost:4321/way-across-the-sea/
npm run build      # static site in dist/ (for GitHub Pages)
```

Deep link to a zoomed-in view: `?at=lon,lat,zoom`, e.g. `?at=35.4,32.3,9` for the Holy Land.
Add `?all` to open every chapter without passing the quizzes (for group leaders and testing).

## How it's built

| File | What it does |
|---|---|
| `src/lib/projection.js` | The single map projection (conic conformal, 1600×1000), shared by the build script and the browser |
| `scripts/build-basemap.mjs` | Turns Natural Earth data (`scripts/raw/`, not committed) into projected, simplified SVG paths in `src/data/basemap.json`. Run it with `npm run build:map` |
| `src/data/intro.js` | The introduction's steps: text (EN/RO), map focus, lamps, arrows |
| `src/data/journey2.js` | Paul's second journey: stops, extra pages, choices, side arrows and "What historians say" notes (EN/RO) |
| `src/data/quiz2.js` | Quiz gate 2, on the second journey |
| `src/data/quiz1.js` | Quiz gate 1: questions (EN/RO), answers, explanations, the children's feedback lines |
| `src/components/Quiz.svelte` | The quiz player (multiple choice, ordering, map questions) |
| `src/data/world.js` | Historical data: cities, sea lanes, the empire's extent (c. AD 46), regions, seas, mountains, and the journey (bilingual) |
| `src/components/AncientMap.svelte` | The map: pan/zoom (d3-zoom), the parchment look, ships, lamps, the journey player |
| `scripts/dev/shot*.mjs` | Dev helpers that take Playwright screenshots of a running dev server; `shot-quiz.mjs` plays the whole quiz |

To rebuild the base map, download the files into `scripts/raw/` from https://github.com/nvkelso/natural-earth-vector/tree/master/geojson: `ne_10m_land`, `ne_50m_lakes`, `ne_50m_rivers_lake_centerlines`.

## Data & credits
- Coastlines, rivers and lakes: [Natural Earth](https://www.naturalearthdata.com/) (public domain). These are *modern* coastlines; some ancient ones differed (Ephesus and Miletus were on the sea).
- City coordinates are approximate and need checking against [Pleiades](https://pleiades.stoa.org/). The empire border is hand-simplified.
- Fonts: Cinzel and IM Fell English (SIL Open Font License).
