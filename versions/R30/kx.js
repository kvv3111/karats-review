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

  // ---------- instant navigation ----------
  // Chrome/Edge: speculation rules prefetch same-site pages on hover / touch start. Safari: <link rel=prefetch> on first touch.
  const sameSite = a => a && a.href && a.origin === location.origin && !a.target && !a.hasAttribute('download') && /\.html$|\/$|^[^.]*$/.test(a.pathname.split('/').pop());
  try {
    if (HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules')) {
      const s = document.createElement('script'); s.type = 'speculationrules';
      s.textContent = JSON.stringify({ prefetch: [{ source: 'document', where: { selector_matches: 'a[href*=".html"], a[href="./"], a[href="/"]' }, eagerness: 'moderate' }] });
      document.head.appendChild(s);
    } else {
      const done = new Set();
      const pf = e => { const a = e.target.closest && e.target.closest('a[href]'); if (!sameSite(a)) return;
        const u = a.href.split('#')[0]; if (done.has(u) || u === location.href.split('#')[0]) return; done.add(u);
        const l = document.createElement('link'); l.rel = 'prefetch'; l.href = u; l.as = 'document'; document.head.appendChild(l); };
      addEventListener('touchstart', pf, { passive: true, capture: true });
      addEventListener('mouseover', pf, { passive: true, capture: true });
      addEventListener('focusin', pf, { capture: true });
    }
  } catch (e) {}
})();
