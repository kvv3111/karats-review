/* Apply existing content translations while parsing, before the first paint.
   Runtime language changes remain owned by KLang/site.js. */
(() => {
  'use strict';
  const supported = ['es', 'ca', 'en', 'ru'];
  let stored = null;
  try { stored = localStorage.getItem('karats.language'); } catch (_) {}
  const requested = new URL(location.href).searchParams.get('lang');
  const back = performance.getEntriesByType('navigation')[0]?.type === 'back_forward';
  // Prod (karatsauto.es): the language is the path, /ca/ /en/ /ru/ (es = root). Marked by <meta name="karats-paths">.
  const paths = !!document.querySelector('meta[name="karats-paths"]');
  const pathOf = p => (p.match(/^\/(ca|en|ru)(?=\/|$)/) || [])[1] || 'es';
  const href = (l, u = location.href) => {
    const x = new URL(u, location.href);
    const rest = x.pathname.replace(/^\/(ca|en|ru)(?=\/|$)/, '') || '/';
    x.pathname = (l === 'es' ? '' : '/' + l) + (rest.startsWith('/') ? rest : '/' + rest);
    x.searchParams.delete('lang');
    return x.href;
  };
  window.KPaths = { on: paths, of: pathOf, href };
  let selected = (back && supported.includes(stored) ? stored : supported.includes(requested) ? requested : stored);
  if (paths) {
    const here = pathOf(location.pathname);
    // old ?lang= links and a remembered language on the Spanish root lead to the language's own address
    const want = supported.includes(requested) ? requested : (here === 'es' && !back && supported.includes(stored) ? stored : here);
    if (want !== here) { location.replace(href(want)); }
    selected = here;
    try { localStorage.setItem('karats.language', here); } catch (_) {}
  }
  const lang = supported.includes(selected) ? selected : 'es';
  window.KInitialLanguage = lang;
  document.documentElement.lang = lang;
  function translate(node) {
    if (node.nodeType !== 1) return;
    const value = node.getAttribute('data-t-' + lang);
    if (value !== null && node.textContent !== value) node.textContent = value;
    if (node.hasAttribute('data-lang')) node.hidden = node.getAttribute('data-lang') !== lang;
    node.querySelectorAll('[data-t-es],[data-lang]').forEach(el => {
      const text = el.getAttribute('data-t-' + lang);
      if (text !== null && el.textContent !== text) el.textContent = text;
      if (el.hasAttribute('data-lang')) el.hidden = el.getAttribute('data-lang') !== lang;
    });
  }
  const observer = new MutationObserver(records => {
    for (const record of records) {
      if (record.target.nodeType === 1 && record.target.hasAttribute('data-t-es')) translate(record.target);
      record.addedNodes.forEach(translate);
    }
  });
  observer.observe(document.documentElement, {subtree:true, childList:true});
  document.addEventListener('DOMContentLoaded', () => observer.disconnect(), {once:true});
})();
