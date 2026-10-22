/* KARATS · interactive blocks (copy v3): «¿Lo comprarías?» game, ITP calculator, 3-tap finder.
   Every language block carries its own instance + texts (JSON in <script type=application/json>); this file only wires behaviour. */
(() => {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cfg = el => { try { return JSON.parse(el.querySelector(':scope > script[type="application/json"]').textContent); } catch (e) { return null; } };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const L = el => (el.closest('[data-lang]') || document.documentElement).getAttribute('data-lang') || document.documentElement.lang || 'es';
  const money = (n, l) => l === 'en' ? '€' + Math.round(n).toLocaleString('en-GB') : Math.round(n).toLocaleString('es-ES', { useGrouping: 'always' }).replace(/[.,]/g, '\u00a0').replace(/\s/g, '\u00a0') + '\u00a0€';
  const U = h => (window.KLang && KLang.url) ? KLang.url(h) : h;
  const tick = () => { try { navigator.vibrate && navigator.vibrate(8); } catch (e) {} };
  const WA = t => `https://wa.me/${window.KARATS_WA || '34602520978'}?text=` + encodeURIComponent(t);

  // ------------------------------------------------------------ game
  document.querySelectorAll('.pg-game').forEach(root => {
    const C = cfg(root); if (!C) return; const T = C.t, N = C.lots.length;
    const box = root.querySelector('.pg-play'); let i = 0, score = 0, marks = [];
    const dots = () => '<div class="pg-dots" aria-hidden="true">' + C.lots.map((_, k) => `<i class="${marks[k] === true ? 'on' : marks[k] === false ? 'on bad' : ''}"></i>`).join('') + '</div>';
    function lot() {
      const x = C.lots[i];
      box.innerHTML = dots() + `<div class="pg-stage"><div class="pg-card">
        <div class="pg-face pg-front"><span class="pg-k">${esc(T.lot.replace('{i}', i + 1).replace('{n}', N))}</span>
          <div class="pg-car">${esc(x.car)}</div><div class="pg-facts">${x.facts.map(f => `<span>${esc(f)}</span>`).join('')}</div>
          <span class="pg-say">${esc(T.say)}</span><p class="pg-quote">${esc(x.quote)}</p>
          <div class="pg-btns"><button type="button" class="btn primary" data-a="buy"><span>${esc(T.buy)}</span></button><button type="button" class="btn glass" data-a="pass"><span>${esc(T.pass)}</span></button></div></div>
        <div class="pg-face pg-back" aria-hidden="true"></div></div></div>`;
      box.querySelectorAll('[data-a]').forEach(b => b.onclick = () => choose(b.dataset.a === 'buy'));
    }
    function choose(buy) {
      tick(); const x = C.lots[i], right = buy === x.good; if (right) score++; marks[i] = right;
      const back = box.querySelector('.pg-back'), front = box.querySelector('.pg-front');
      const say = right ? T.right : (buy ? T.fooled : T.missed);
      back.innerHTML = `<span class="pg-k">${esc(T.truthK)}</span><div class="pg-verdict ${right ? 'ok' : 'no'}"><b>${right ? '✓' : '✕'}</b><span>${esc(say)}</span></div>
        <p class="pg-truth">${x.truth}</p>${x.link ? `<p style="margin:0 0 14px"><a class="pg-link" href="${esc(U(x.link.href))}">${esc(x.link.text)}</a></p>` : ''}
        <div class="pg-btns"><button type="button" class="btn ${i + 1 < N ? 'glass' : 'primary'}" data-a="next"><span>${esc(i + 1 < N ? T.next : T.result)}</span></button></div>`;
      back.setAttribute('aria-hidden', 'false'); front.setAttribute('aria-hidden', 'true'); front.inert = true;
      box.querySelector('.pg-card').classList.add('flip');
      box.querySelector('.pg-dots').outerHTML = dots();
      const nb = back.querySelector('[data-a="next"]'); nb.onclick = () => { i++; i < N ? lot() : end(); box.querySelector('button') && box.querySelector('button').focus({ preventScroll: true }); };
      setTimeout(() => nb.focus({ preventScroll: true }), RM ? 0 : 450);
      root.querySelector('.pg-live').textContent = say;
    }
    function end() {
      box.innerHTML = dots() + `<div class="pg-end"><span class="pg-k">${esc(T.scoreK)}</span><div class="pg-big">${esc(T.score.replace('{n}', score).replace('{t}', N))}</div>
        <p>${esc(score === N ? T.end3 : T.endX)}</p><a class="btn primary" href="${esc(U(C.ctaHref))}"><span>${esc(T.cta)}</span></a>
        <button type="button" class="pg-again">${esc(T.again)}</button></div>`;
      box.querySelector('.pg-again').onclick = () => { i = 0; score = 0; marks = []; lot(); };
    }
    lot();
  });

  // ------------------------------------------------------------ ITP calculator
  document.querySelectorAll('.pg-calc').forEach(root => {
    const C = cfg(root); if (!C) return; const l = L(root);
    const r = root.querySelector('.pg-range'), out = root.querySelector('[data-o="price"]'), itp = root.querySelector('[data-o="itp"]'), save = root.querySelector('[data-o="save"]');
    let shown = null, raf = 0;
    const draw = v => { itp.textContent = money(v, l); save.textContent = money(v, l); };
    function animate(to) {
      cancelAnimationFrame(raf); const from = shown == null ? to : shown, t0 = performance.now(), d = RM ? 0 : 420;
      const step = t => { const k = d ? Math.min(1, (t - t0) / d) : 1, e = 1 - Math.pow(1 - k, 3); shown = from + (to - from) * e; draw(Math.round(shown / 5) * 5); if (k < 1) raf = requestAnimationFrame(step); else { shown = to; draw(to); } };
      raf = requestAnimationFrame(step);
    }
    function set(v, fromPick) {
      v = Math.max(+r.min, Math.min(+r.max, v)); r.value = v;
      r.style.setProperty('--p', ((v - r.min) / (r.max - r.min) * 100) + '%');
      out.textContent = money(v, l); animate(Math.round(v * C.rate));
      if (!fromPick) root.querySelectorAll('.pg-pick button').forEach(b => { b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); });
    }
    r.addEventListener('input', () => set(+r.value));
    root.querySelectorAll('.pg-pick button').forEach(b => b.addEventListener('click', () => {
      tick(); root.querySelectorAll('.pg-pick button').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
      set(+b.dataset.p, true);
    }));
    const first = root.querySelector('.pg-pick button.on'); set(first ? +first.dataset.p : +r.value, !!first);
  });

  // ------------------------------------------------------------ 3-tap finder
  document.querySelectorAll('.pg-quiz').forEach(root => {
    const C = cfg(root); if (!C || !window.KARATS_CARS) return; const T = C.t, l = L(root), CARS = KARATS_CARS;
    const box = root.querySelector('.pg-play'), cnt = root.querySelector('.pg-count'), strip = root.querySelector('.pg-cars');
    const F = {
      b: { b20: c => c.price <= 20000, b30: c => c.price > 20000 && c.price <= 30000, b30p: c => c.price > 30000 },
      f: { gas: c => /gasolina/i.test(c.fuel), hyb: c => /h[íi]brido|mhev/i.test(c.fuel), die: c => /di[ée]sel/i.test(c.fuel), ele: c => /el[ée]ctrico/i.test(c.fuel) },
      g: { auto: c => !/manual/i.test(c.gear), man: c => /manual/i.test(c.gear) },
    };
    const keys = ['b', 'f', 'g']; let ans = {}, step = 0;
    const match = () => CARS.filter(c => keys.every(k => !ans[k] || ans[k] === 'any' || F[k][ans[k]](c)));
    strip.innerHTML = CARS.map(c => `<i style="background-image:url('c/${c.id}_s.webp')" title="${esc(c.brand + ' ' + c.model)}"></i>`).join('');
    function count() {
      const m = match(), n = m.length;
      cnt.innerHTML = n === 0 ? esc(T.c0) : n === 1 ? esc(T.c1).replace('1', '<b>1</b>') : esc(T.cn).replace('{n}', `<b>${n}</b>`);
      [...strip.children].forEach((el, k) => el.classList.toggle('off', !m.includes(CARS[k])));
    }
    const label = (k) => { const q = T.q[keys.indexOf(k)]; const o = q.opts.find(o => o[1] === ans[k]); return o ? o[0] : ''; };
    function ask() {
      const q = T.q[step];
      box.innerHTML = `<div class="pg-q"><span class="pg-k">${esc(T.step.replace('{i}', step + 1).replace('{n}', keys.length))}</span><h3>${esc(q.h)}</h3>
        <div class="pg-opts" role="group" aria-label="${esc(q.h)}">${q.opts.map(([t, v]) => `<button type="button" data-v="${v}" aria-pressed="${ans[keys[step]] === v}" class="${ans[keys[step]] === v ? 'on' : ''}">${esc(t)}</button>`).join('')}</div>
        ${step ? `<button type="button" class="pg-back-q">‹ ${esc(T.back)}</button>` : ''}</div>`;
      box.querySelectorAll('.pg-opts button').forEach(b => b.onclick = () => {
        tick(); ans[keys[step]] = b.dataset.v; box.querySelectorAll('.pg-opts button').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
        count(); setTimeout(() => { step++; step < keys.length ? ask() : result(); }, RM ? 0 : 260);
      });
      const bk = box.querySelector('.pg-back-q'); if (bk) bk.onclick = () => { delete ans[keys[step]]; step--; delete ans[keys[step]]; count(); ask(); };
    }
    function result() {
      const m = match(), sum = keys.map(k => label(k)).join(' · ');
      const names = m.map(c => `${c.brand} ${c.model} ${c.year}`).join(', ');
      const waText = (m.length ? T.waHit.replace('{car}', names) : T.waNone).replace('{sum}', sum);
      box.innerHTML = `<div class="pg-res"><span class="pg-k">${esc(sum)}</span>` + (m.length
        ? `<h3>${esc(m.length === 1 ? T.r1 : T.rn)}</h3><div class="pg-hits">${m.map(c => `<a class="pg-hit" href="${esc(U('index.html?detalle=1#' + (CARS.indexOf(c) + 1)))}"><img src="c/${c.id}_s.webp" alt="" loading="lazy" decoding="async"><div><b>${esc(c.brand + ' ' + c.model)}</b><span>${c.year} · ${esc(money(c.price, l))}</span></div></a>`).join('')}</div>`
        : `<h3>${esc(T.r0)}</h3><p class="pg-none">${esc(T.none)}</p>`)
        + `<a class="btn wa" href="${esc(WA(waText))}" target="_blank" rel="noopener" data-contact="wa"><span>${esc(m.length ? T.waBtn : T.waBtnNone)}</span></a><button type="button" class="pg-again">${esc(T.again)}</button></div>`;
      box.querySelector('.pg-again').onclick = () => { ans = {}; step = 0; count(); ask(); };
    }
    count(); ask();
  });
})();
