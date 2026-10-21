<script>
  // A quiz gate: multiple choice, put-in-order, and find-it-on-the-map questions.
  // Map questions are delegated to the map via requestPick(question) → Promise<{ ok }>.
  let { quiz, lang, requestPick, endPick, onclose, onreplay, onsave } = $props();

  const UI = {
    en: { start: 'Start', next: 'Next', check: 'Check', reset: 'Start again', retry: 'Try again', close: 'Back to the map',
          story: 'Hear the story again', question: 'Question', of: 'of', clickMap: 'Click on the map…', tapOrder: 'Tap them in order:',
          correct: 'Correct!', wrong: 'Not this time.', here: 'Here it is:', score: 'Your score', rank: 'Your rank', right: 'The right order:' },
    ro: { start: 'Începe', next: 'Înainte', check: 'Verifică', reset: 'De la capăt', retry: 'Mai încearcă', close: 'Înapoi la hartă',
          story: 'Ascultă din nou povestea', question: 'Întrebarea', of: 'din', clickMap: 'Dă clic pe hartă…', tapOrder: 'Atinge-le în ordine:',
          correct: 'Corect!', wrong: 'De data asta, nu.', here: 'Uite unde este:', score: 'Scorul tău', rank: 'Gradul tău', right: 'Ordinea corectă:' },
  };
  let t = $derived(UI[lang]);

  let phase = $state('intro'); // intro | ask | answered | done
  let i = $state(0);
  let score = $state(0);
  let correct = $state(false);
  let opts = $state([]); // shuffled options / order items, each with n = correct index
  let picked = $state(null); // mc: chosen option n
  let order = $state([]); // order: items placed so far
  let q = $derived(quiz.questions[i]);
  let stars = $derived(score === 10 ? 3 : score >= 9 ? 2 : score >= quiz.pass ? 1 : 0);

  function shuffle(a) {
    const b = [...a];
    for (let j = b.length - 1; j > 0; j--) {
      const r = Math.floor(Math.random() * (j + 1));
      [b[j], b[r]] = [b[r], b[j]];
    }
    return b;
  }

  function start() {
    i = 0;
    score = 0;
    ask();
  }
  function ask() {
    phase = 'ask';
    picked = null;
    order = [];
    const cur = quiz.questions[i];
    if (cur.type === 'mc') opts = shuffle(cur.options.map((o, n) => ({ ...o, n })));
    if (cur.type === 'order') {
      let s;
      do s = shuffle(cur.items.map((o, n) => ({ ...o, n })));
      while (s.every((x, j) => x.n === j));
      opts = s;
    }
    if (cur.type === 'pick') {
      const asked = i;
      requestPick(cur).then((r) => { if (phase === 'ask' && i === asked) answer(r.ok); });
    }
  }
  function answer(ok) {
    correct = ok;
    if (ok) score++;
    phase = 'answered';
  }
  function choose(o) {
    if (phase !== 'ask') return;
    picked = o.n;
    answer(o.n === 0);
  }
  function place(o) {
    if (phase !== 'ask' || isPlaced(o)) return;
    order = [...order, o];
  }
  function unplace(o) {
    if (phase === 'ask') order = order.filter((x) => x.n !== o.n);
  }
  const isPlaced = (o) => order.some((x) => x.n === o.n);
  function checkOrder() {
    answer(order.every((x, j) => x.n === j));
  }
  function next() {
    endPick();
    if (i < quiz.questions.length - 1) {
      i++;
      ask();
    } else {
      phase = 'done';
      onsave?.({ score, stars, passed: score >= quiz.pass });
    }
  }
  function close() {
    endPick();
    onclose();
  }
  const line = (list) => list[lang][i % list[lang].length];
</script>

<article class="quiz" class:slim={q?.type === 'pick' && phase === 'ask'}>
  {#if phase === 'intro'}
    <div class="kicker">⚓ {quiz.title[lang]}</div>
    <p class="voice">{quiz.intro[lang]}</p>
    <div class="buttons">
      <button class="ghost" onclick={close}>{t.close}</button>
      <button onclick={start}>{t.start} ▶</button>
    </div>
  {:else if phase === 'done'}
    <div class="kicker">⚓ {quiz.title[lang]}</div>
    <div class="result">
      <div class="score">{t.score}: <b>{score} / {quiz.questions.length}</b></div>
      <div class="stars" aria-label="{stars} stars">
        {#each [1, 2, 3] as s}<span class:on={stars >= s}>★</span>{/each}
      </div>
      {#if score >= quiz.pass}
        <div class="rank">{t.rank}: <b>{quiz.rank[lang]}</b></div>
      {/if}
    </div>
    <p class="voice">{score >= quiz.pass ? quiz.done.pass[lang] : quiz.done.fail[lang]}</p>
    <div class="buttons">
      {#if score >= quiz.pass}
        <button class="ghost" onclick={start}>{t.retry}</button>
        <button onclick={close}>{t.close} ✓</button>
      {:else}
        <button class="ghost" onclick={onreplay}>{t.story}</button>
        <button onclick={start}>{t.retry} ▶</button>
      {/if}
    </div>
  {:else}
    <div class="kicker">{t.question} {i + 1} {t.of} {quiz.questions.length}
      <span class="dots">{#each quiz.questions as _, n}<i class:done={n < i} class:now={n === i}></i>{/each}</span>
    </div>
    <h2>{q.q[lang]}</h2>

    {#if q.type === 'mc'}
      <div class="options">
        {#each opts as o (o.n)}
          <button class="opt" class:right={phase === 'answered' && o.n === 0} class:wrong={phase === 'answered' && picked === o.n && o.n !== 0}
                  disabled={phase !== 'ask'} onclick={() => choose(o)}>{o[lang]}</button>
        {/each}
      </div>
    {:else if q.type === 'order'}
      {#if phase === 'ask'}
        <div class="hint">{t.tapOrder}</div>
        <div class="pool">
          {#each opts as o (o.n)}
            <button class="chip" class:used={isPlaced(o)} disabled={isPlaced(o)} onclick={() => place(o)}>{o[lang]}</button>
          {/each}
        </div>
      {/if}
      <ol class="slots">
        {#each (phase === 'answered' && !correct ? q.items.map((x, n) => ({ ...x, n })) : order) as o, j (o.n)}
          <li><button class="placed" class:right={phase === 'answered'} disabled={phase !== 'ask'} onclick={() => unplace(o)}>
            <span class="num">{j + 1}</span>{o[lang]}</button></li>
        {/each}
      </ol>
      {#if phase === 'answered' && !correct}<div class="hint">↑ {t.right}</div>{/if}
      {#if phase === 'ask'}
        <div class="buttons">
          <button class="ghost" onclick={() => (order = [])} disabled={!order.length}>{t.reset}</button>
          <button onclick={checkOrder} disabled={order.length < opts.length}>{t.check} ✓</button>
        </div>
      {/if}
    {:else if q.type === 'pick' && phase === 'ask'}
      <div class="hint pulse-text">👆 {t.clickMap}</div>
    {/if}

    {#if phase === 'answered'}
      <div class="feedback" class:ok={correct}>
        <b>{correct ? t.correct : t.wrong}</b>
        <span class="voice">{correct ? line(quiz.cheers) : line(quiz.oops)}</span>
        {#if q.type === 'pick' && !correct}<span>{t.here} <b>{q.answer[lang]}</b></span>{/if}
        <p>{q.explain[lang]}</p>
      </div>
      <div class="buttons">
        <span></span>
        <button onclick={next}>{i < quiz.questions.length - 1 ? `${t.next} ▶` : `${t.score} ★`}</button>
      </div>
    {/if}
  {/if}
</article>

<style>
  .quiz {
    position: absolute; right: 24px; top: 72px; width: min(460px, calc(100vw - 48px)); max-height: calc(100vh - 110px); overflow: auto;
    padding: 18px 22px; background: #f1e3be; border: 2px solid #5c4630; outline: 1px solid #5c4630; outline-offset: 4px;
    box-shadow: 0 10px 30px rgba(60, 35, 10, 0.4); border-radius: 3px; animation: unroll 0.35s ease-out; box-sizing: border-box;
  }
  .quiz.slim { width: min(380px, calc(100vw - 48px)); }
  .kicker { font-size: 14px; font-style: italic; color: #7a5636; display: flex; justify-content: space-between; align-items: center; gap: 10px; }
  .dots { display: inline-flex; gap: 4px; }
  .dots i { width: 8px; height: 8px; border-radius: 50%; border: 1px solid #7a5636; }
  .dots i.done { background: #7a5636; }
  .dots i.now { background: #c98a2b; border-color: #8b4a12; }
  h2 { font-family: 'IM Fell English', Georgia, serif; font-weight: normal; font-size: 22px; line-height: 1.3; color: #6e2a17; margin: 8px 0 12px; }
  .voice { font-style: italic; font-size: 18px; line-height: 1.45; }
  p { font-size: 17px; line-height: 1.45; margin: 8px 0; }
  .options { display: flex; flex-direction: column; gap: 8px; }
  button { font-family: 'IM Fell English', Georgia, serif; font-size: 16px; color: #3e2414; cursor: pointer; background: #efe0b9;
    border: 1.5px solid #5c4630; border-radius: 4px; padding: 6px 12px; box-shadow: 0 2px 6px rgba(60, 35, 10, 0.25); }
  button:hover:not(:disabled) { background: #f7ecd0; }
  button:disabled { cursor: default; }
  .opt { text-align: left; font-size: 17px; padding: 9px 14px; }
  .opt:disabled:not(.right):not(.wrong) { opacity: 0.55; }
  .right { background: #d9e6bf !important; border-color: #4f7a2a !important; }
  .wrong { background: #f0c9b8 !important; border-color: #9a3a22 !important; }
  .hint { font-style: italic; color: #6a5038; margin: 6px 0; font-size: 16px; }
  .pool { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }
  .chip { font-size: 15px; }
  .chip.used { opacity: 0.3; }
  .slots { list-style: none; padding: 0; margin: 6px 0; display: flex; flex-direction: column; gap: 5px; min-height: 10px; }
  .placed { width: 100%; text-align: left; display: flex; gap: 10px; align-items: center; font-size: 16px; }
  .num { display: inline-grid; place-items: center; width: 22px; height: 22px; border-radius: 50%; background: #6e2a17; color: #f1e3be; font-size: 13px; flex: none; }
  .feedback { margin-top: 12px; padding: 10px 12px; border-left: 4px solid #9a3a22; background: rgba(154, 58, 34, 0.08); display: flex; flex-direction: column; gap: 3px; }
  .feedback.ok { border-color: #4f7a2a; background: rgba(79, 122, 42, 0.1); }
  .feedback b { font-family: 'Cinzel', serif; }
  .feedback .voice { font-size: 16px; }
  .buttons { display: flex; justify-content: space-between; margin-top: 12px; }
  .ghost { background: transparent; box-shadow: none; }
  .result { text-align: center; margin: 10px 0; }
  .score { font-size: 18px; }
  .stars { font-size: 40px; letter-spacing: 6px; color: #d8c9a3; }
  .stars .on { color: #d39a1e; text-shadow: 0 0 8px rgba(255, 200, 70, 0.7); }
  .rank { font-size: 18px; }
  .rank b { font-family: 'Cinzel', serif; color: #6e2a17; }
  .pulse-text { animation: breathe 1.4s infinite alternate; }
  @keyframes breathe { from { opacity: 0.55; } to { opacity: 1; } }
  @keyframes unroll { from { transform: scaleY(0.6); opacity: 0; } to { transform: none; opacity: 1; } }
  @media (prefers-reduced-motion: reduce) { .quiz, .pulse-text { animation: none; } }
</style>
