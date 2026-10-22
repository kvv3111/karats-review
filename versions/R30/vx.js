/* Ventajas: compare toggle, hotspots, reveal on scroll (r34) */
(() => {
  // CSS display:none on <animate> does not stop SVG SMIL timelines.
  const mapMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const syncMapMotion = () => document.querySelectorAll('.px-map svg').forEach(svg => {
    if (mapMotion.matches) { svg.pauseAnimations(); svg.setCurrentTime(0); }
    else svg.unpauseAnimations();
  });
  syncMapMotion(); mapMotion.addEventListener('change', syncMapMotion);
  const root = document.querySelector('main.prose'); if (!root || !document.querySelector('.vx')) return;
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tap = () => { try { navigator.vibrate && navigator.vibrate(8) } catch (e) {} };
  document.querySelectorAll('.vx-cmp').forEach(c => {
    const set = s => { c.dataset.side = s; c.querySelectorAll('.vx-tg button').forEach(b => { const on = b.dataset.side === s; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); }); };
    c.querySelectorAll('.vx-tg button').forEach(b => b.addEventListener('click', () => { if (c.dataset.side !== b.dataset.side) { set(b.dataset.side); tap(); } }));
    set('k');
  });
  document.querySelectorAll('.vx').forEach(sec => {
    const hs = [...sec.querySelectorAll('.vx-hs')], tips = [...sec.querySelectorAll('.vx-tip')]; if (!hs.length) return;
    const pick = i => { hs.forEach((h, k) => { h.classList.toggle('on', k === i); h.setAttribute('aria-pressed', k === i); }); tips.forEach((t, k) => t.classList.toggle('on', k === i)); };
    hs.forEach((h, i) => h.addEventListener('click', () => { if (!h.classList.contains('on')) { pick(i); tap(); } }));
  });

  // docs toggle (Cómo comprar)
  document.querySelectorAll('.px-docs').forEach(c => {
    const set = s => { c.dataset.side = s; c.querySelectorAll('.vx-tg button').forEach(b => { const on = b.dataset.side === s; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
      c.querySelectorAll('.px-chips').forEach(x => x.hidden = x.dataset.side !== s); };
    c.querySelectorAll('.vx-tg button').forEach(b => b.addEventListener('click', () => { if (c.dataset.side !== b.dataset.side) { set(b.dataset.side); tap(); } }));
    set('p');
  });
  // steps carousel dots
  document.querySelectorAll('.px-steps').forEach(sc => {
    const dots = [...sc.parentElement.querySelectorAll('.px-dots i')], cards = [...sc.children];
    const upd = () => { const mid = sc.scrollLeft + sc.clientWidth / 2; let best = 0, bd = 1e9;
      cards.forEach((c, i) => { const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid); if (d < bd) { bd = d; best = i; } });
      dots.forEach((d, i) => d.classList.toggle('on', i === best)); cards.forEach((c, i) => c.classList.toggle('dk', i === best)); };
    let raf = 0; sc.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(upd); }, { passive: true });
    dots.forEach((d, i) => d.addEventListener('click', () => sc.scrollTo({ left: cards[i].offsetLeft - (sc.clientWidth - cards[i].offsetWidth) / 2, behavior: RM ? 'auto' : 'smooth' })));
  });
  // count-up numbers when they come into view
  const nums = [...document.querySelectorAll('.px-num')];
  const run = el => { if (el.dataset.done) return; el.dataset.done = 1; const to = +el.dataset.to; if (RM || !(to > 1)) { el.textContent = to; return; }
    const t0 = performance.now(), dur = 900 + to * 6; const f = t => { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(to * e); if (k < 1) requestAnimationFrame(f); }; el.textContent = 0; requestAnimationFrame(f); };
  if ('IntersectionObserver' in window) { const no = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting && e.target.offsetParent) { run(e.target); no.unobserve(e.target); } }), { threshold: .6 }); nums.forEach(n => no.observe(n)); }
  else nums.forEach(run);
  const els = document.querySelectorAll('.vx-reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: .08 });
  const watch = () => els.forEach(e => { if (!e.classList.contains('in')) io.observe(e); });
  watch(); new MutationObserver(watch).observe(root, { subtree: true, attributes: true, attributeFilter: ['hidden'] });
})();
