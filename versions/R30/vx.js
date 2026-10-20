/* Ventajas: compare toggle, hotspots, reveal on scroll (r34) */
(() => {
  const root = document.querySelector('main.prose'); if (!root || !document.querySelector('.vx')) return;
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
  const els = document.querySelectorAll('.vx-reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: .08 });
  const watch = () => els.forEach(e => { if (!e.classList.contains('in')) io.observe(e); });
  watch(); new MutationObserver(watch).observe(root, { subtree: true, attributes: true, attributeFilter: ['hidden'] });
})();
