/* KARATS AUTO: favourites store + instant navigation (prefetch on intent). Loaded on every page. */
(() => {
  'use strict';
  // ---------- favourites (localStorage, first-party, the visitor asks for it by tapping ♥) ----------
  const KEY = 'karats.fav';
  const read = () => { try { const a = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(a) ? a.filter(x => typeof x === 'string') : []; } catch (e) { return []; } };
  const write = a => { try { a.length ? localStorage.setItem(KEY, JSON.stringify(a)) : localStorage.removeItem(KEY); } catch (e) {} };
  const KFav = {
    list: read,
    has: id => read().includes(id),
    count: () => read().length,
    toggle(id) { const a = read(), i = a.indexOf(id); if (i >= 0) a.splice(i, 1); else a.push(id); write(a);
      const on = i < 0; dispatchEvent(new CustomEvent('karats:fav', { detail: { id, on } })); return on; },
  };
  window.KFav = KFav;
  // pages whose inline code ran before this file: let them paint saved hearts now
  dispatchEvent(new CustomEvent('karats:fav', { detail: {} }));
  addEventListener('storage', e => { if (e.key === KEY) dispatchEvent(new CustomEvent('karats:fav', { detail: {} })); });

  // cross-page transitions: a skipped transition (fast double tap, back gesture) is normal, keep it out of the console
  const quiet = e => { const v = e.viewTransition; if (v) ['ready', 'finished', 'updateCallbackDone'].forEach(k => v[k] && v[k].catch(() => {})); };
  addEventListener('pageswap', quiet); addEventListener('pagereveal', quiet);
  // leaving: the page transition has its snapshot (pageswap comes first), so close the menu without motion; Back then shows the page clean
  addEventListener('pagehide', () => { document.documentElement.classList.add('kx-still'); document.body.classList.remove('menu');
    document.querySelectorAll('#menu .going').forEach(x => x.classList.remove('going')); const b = document.getElementById('menuBtn'); b && b.setAttribute('aria-expanded', 'false'); });
  addEventListener('pageshow', () => requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.remove('kx-still'))));
  // ---------- instant navigation ----------
  // Pages are cacheable for 5 min (prod _headers), so a quiet fetch() puts the next page in the browser cache and the tap
  // opens it from there. Safari has no speculation rules: warm every menu page when the menu opens, and a link on first touch.
  // Chrome/Edge additionally prefetch same-site pages (clean addresses, no file extension) on hover / touch start.
  const sameSite = a => a && a.href && a.origin === location.origin && !a.target && !a.hasAttribute('download') && /\.html$|\/$|^[^.]*$/.test(a.pathname.split('/').pop());
  const warmed = new Set();
  const warm = a => { if (!sameSite(a)) return; const u = a.href.split('#')[0]; if (warmed.has(u) || u === location.href.split('#')[0]) return; warmed.add(u);
    try { fetch(u, { credentials: 'same-origin', priority: 'low' }).catch(() => {}); } catch (e) {} };
  try {
    if (HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules')) {
      const s = document.createElement('script'); s.type = 'speculationrules';
      s.textContent = JSON.stringify({ prefetch: [{ source: 'document', where: { and: [{ href_matches: '/*' }, { not: { href_matches: '/*.*' } }, { not: { selector_matches: '[target],[download]' } }] }, eagerness: 'moderate' }] });
      document.head.appendChild(s);
    }
    const pf = e => warm(e.target.closest && e.target.closest('a[href]'));
    addEventListener('touchstart', pf, { passive: true, capture: true });
    addEventListener('mouseover', pf, { passive: true, capture: true });
    addEventListener('focusin', pf, { capture: true });
    const onMenu = () => { if (document.body.classList.contains('menu')) document.querySelectorAll('#menu nav a.it[href]').forEach(warm); };
    new MutationObserver(onMenu).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  } catch (e) {}
})();
