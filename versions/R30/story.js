/* «О нас»: запасной вариант для браузеров без scroll-driven animations (Safari < 26 и т.п.).
   Где они есть, всё делает CSS на compositor, здесь только ставится класс. */
(() => {
 'use strict';
 const root = document.documentElement;
 const rm = matchMedia('(prefers-reduced-motion: reduce)');
 const native = window.CSS && CSS.supports && CSS.supports('animation-timeline: view()');
 window.__story = () => ({native, js:root.classList.contains('story-js')});
 if (native || rm.matches || !('IntersectionObserver' in window)) return;
 root.classList.add('story-js');
 const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
 }), {rootMargin:'0px 0px -15% 0px', threshold:0});
 const watch = () => document.querySelectorAll('.story .rv:not(.in)').forEach(el => io.observe(el));
 watch();
 const cards = [...document.querySelectorAll('.sh-card')];
 let queued = false;
 function hero() {
  queued = false;
  const vh = innerHeight;
  cards.forEach(c => {
   if (!c.offsetParent) return;
   const r = c.parentNode.getBoundingClientRect();
   const p = Math.max(0, Math.min(1, (vh * 0.7 - r.top) / (vh * 0.6)));
   const s0 = parseFloat(getComputedStyle(c).getPropertyValue('--s0')) || 0.9;
   c.style.transform = `scale(${(s0 + (1 - s0) * p).toFixed(4)})`;
   c.firstElementChild.style.transform = `scale(${(1.12 - 0.12 * p).toFixed(4)})`;
  });
 }
 const req = () => { if (!queued) { queued = true; requestAnimationFrame(hero); } };
 addEventListener('scroll', req, {passive:true});
 addEventListener('resize', req);
 new MutationObserver(() => { watch(); req(); }).observe(document.querySelector('main') || document.body, {attributes:true, subtree:true, attributeFilter:['hidden']});
 hero();
})();
