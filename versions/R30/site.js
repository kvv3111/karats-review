/* KARATS AUTO shared layer: cookie consent (LSSI art. 22.2 / AEPD guide 2024), language blocks, footer.
   Nothing non-essential is loaded before consent. Today the site uses only exempt storage
   (language chosen by the visitor + this consent record). Future analytics/marketing tags must be added as
   <script type="text/plain" data-consent="analytics|marketing" data-src="..."> and run only after "accept". */
(() => {
  'use strict';
  const KEY = 'karats.consent', VERSION = 1, MAX_AGE = 365 * 864e5;   // ask again after 12 months
  const lang = () => (window.KLang && KLang.language) || 'es';
  const T = {
    es: { title: 'Cookies', text: 'Usamos solo lo necesario para que la web funcione y recuerde tu idioma. Las cookies de análisis o publicidad solo se activan si las aceptas. Puedes cambiar tu elección cuando quieras en «Configurar cookies», en el menú o al pie de cada página.',
          more: 'Política de cookies', accept: 'Aceptar', reject: 'Rechazar', config: 'Configurar',
          prefs: 'Configurar cookies', save: 'Guardar selección', acceptAll: 'Aceptar todas', rejectAll: 'Rechazar todas', close: 'Cerrar',
          nec: 'Necesarias', necD: 'Idioma elegido y tu decisión sobre cookies. Sin ellas la web no recuerda tus ajustes. Siempre activas.',
          ana: 'Análisis', anaD: 'Estadísticas de visitas para mejorar la web. Ahora mismo no usamos ninguna herramienta de este tipo.',
          mkt: 'Publicidad', mktD: 'Medir anuncios y mostrar publicidad relevante. Ahora mismo no usamos ninguna.',
          always: 'Siempre activas', saved: 'Preferencias guardadas' },
    en: { title: 'Cookies', text: 'We only use what the site needs to work and to remember your language. Analytics or advertising cookies are switched on only if you accept them. You can change your choice at any time under “Cookie settings”, in the menu or at the bottom of every page.',
          more: 'Cookie policy', accept: 'Accept', reject: 'Reject', config: 'Settings',
          prefs: 'Cookie settings', save: 'Save choice', acceptAll: 'Accept all', rejectAll: 'Reject all', close: 'Close',
          nec: 'Necessary', necD: 'Your chosen language and your cookie decision. Without them the site cannot remember your settings. Always on.',
          ana: 'Analytics', anaD: 'Visit statistics to improve the site. We do not use any such tool at the moment.',
          mkt: 'Advertising', mktD: 'Ad measurement and relevant ads. We do not use any at the moment.',
          always: 'Always on', saved: 'Preferences saved' },
    ru: { title: 'Cookies', text: 'Мы используем только то, без чего сайт не работает и не помнит выбранный язык. Аналитика и реклама включаются, только если вы согласитесь. Изменить решение можно в любой момент: «Настройки cookies» в меню или внизу каждой страницы.',
          more: 'Политика cookies', accept: 'Принять', reject: 'Отклонить', config: 'Настроить',
          prefs: 'Настройки cookies', save: 'Сохранить выбор', acceptAll: 'Принять все', rejectAll: 'Отклонить все', close: 'Закрыть',
          nec: 'Необходимые', necD: 'Выбранный язык и ваше решение по cookies. Без них сайт не запомнит настройки. Включены всегда.',
          ana: 'Аналитика', anaD: 'Статистика посещений, чтобы улучшать сайт. Сейчас таких инструментов у нас нет.',
          mkt: 'Реклама', mktD: 'Измерение рекламы и показ релевантных объявлений. Сейчас не используем.',
          always: 'Всегда включены', saved: 'Настройки сохранены' }
  };
  const t = k => (T[lang()] || T.es)[k];

  function read() {
    try {
      const c = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (!c || c.v !== VERSION || !(Date.now() - c.ts < MAX_AGE)) return null;
      return c;
    } catch (_) { return null; }
  }
  let state = read();
  function write(analytics, marketing) {
    state = { v: VERSION, ts: Date.now(), necessary: true, analytics: !!analytics, marketing: !!marketing };
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {}
    activate(); dispatchEvent(new CustomEvent('karats:consent', { detail: state }));
  }
  // consent-gated scripts: inert until their category is accepted
  function activate() {
    if (!state) return;
    document.querySelectorAll('script[type="text/plain"][data-consent]').forEach(s => {
      if (!state[s.dataset.consent] || s.dataset.done) return;
      s.dataset.done = '1'; const n = document.createElement('script');
      if (s.dataset.src) n.src = s.dataset.src; else n.textContent = s.textContent;
      document.head.appendChild(n);
    });
  }

  const css = `
  #kc-bar{position:fixed;z-index:70;left:10px;right:10px;bottom:calc(10px + env(safe-area-inset-bottom));max-width:560px;margin:0 auto;padding:16px 16px 14px;border-radius:24px;--lg-tint:.70;
    transform:translateY(130%);opacity:0;transition:transform .6s var(--spring,ease),opacity .3s;font-size:14px;line-height:1.45;color:var(--ink,#1d211e)}
  #kc-bar.on{transform:none;opacity:1}
  #kc-bar>*{position:relative;z-index:1}
  #kc-bar b{font-family:Jost,sans-serif;font-weight:500;font-size:17px;display:block;margin-bottom:4px}
  #kc-bar a{color:var(--acc,#304c40)}
  .kc-row{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}
  .kc-row .btn{flex:1 1 0;height:44px;padding:0 14px;font-size:14px;min-width:96px}
  .kc-link{display:block;margin:10px auto 0;border:0;background:none;color:var(--acc,#304c40);font:inherit;font-weight:600;text-decoration:underline;cursor:pointer;padding:4px 8px}
  .kc-eq{background:var(--ink,#1d211e);color:#fff;box-shadow:0 8px 20px rgba(20,22,20,.18)}
  .kc-sec{background:rgba(255,255,255,.55);box-shadow:inset 0 0 0 .8px rgba(29,33,30,.16)}
  #kc-dlg{position:fixed;z-index:80;inset:0;display:none;align-items:flex-end;justify-content:center;padding:10px;background:rgba(20,22,20,.28);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}
  #kc-dlg.on{display:flex}
  #kc-box{width:100%;max-width:560px;max-height:calc(100dvh - 20px);overflow:auto;border-radius:26px;padding:20px 18px 16px;--lg-tint:.80;color:var(--ink,#1d211e);font-size:14px;line-height:1.45;margin-bottom:env(safe-area-inset-bottom)}
  #kc-box>*{position:relative;z-index:1}
  #kc-box h2{font-family:Jost,sans-serif;font-weight:500;font-size:22px;margin:0 0 10px}
  .kc-cat{display:flex;gap:12px;align-items:flex-start;padding:12px 0;border-top:1px solid rgba(29,33,30,.10)}
  .kc-cat div{flex:1} .kc-cat b{display:block;font-weight:600} .kc-cat small{color:var(--soft,#6b716c);font-size:13px;display:block;margin-top:2px}
  .kc-sw{position:relative;flex:none;width:48px;height:28px;border-radius:14px;border:0;background:rgba(29,33,30,.18);cursor:pointer;transition:background .2s}
  .kc-sw::after{content:"";position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:11px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:transform .3s var(--spring,ease)}
  .kc-sw[aria-checked="true"]{background:var(--acc,#304c40)} .kc-sw[aria-checked="true"]::after{transform:translateX(20px)}
  .kc-sw:disabled{opacity:.55;cursor:default}
  .kc-x{position:absolute!important;top:12px;right:12px}
  @media (min-width:700px){#kc-dlg{align-items:center}}
  `;
  let bar, dlg, lastFocus;
  function build() {
    if (bar) return;
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    bar = document.createElement('div'); bar.id = 'kc-bar'; bar.className = 'lg'; bar.setAttribute('role', 'dialog'); bar.setAttribute('aria-live', 'polite'); bar.setAttribute('translate', 'no');
    dlg = document.createElement('div'); dlg.id = 'kc-dlg'; dlg.setAttribute('translate', 'no');
    document.body.append(bar, dlg);
    dlg.addEventListener('click', e => { if (e.target === dlg) closePrefs(); });
    addEventListener('keydown', e => { if (e.key === 'Escape' && dlg.classList.contains('on')) { e.stopPropagation(); closePrefs(); } }, true);
  }
  const policy = () => 'cookies.html' + (lang() !== 'es' ? '?lang=' + lang() : '');
  function renderBar() {
    bar.setAttribute('aria-label', t('title'));
    bar.innerHTML = `<b>${t('title')}</b><div>${t('text')} <a href="${policy()}">${t('more')}</a></div>
      <div class="kc-row"><button type="button" class="btn kc-eq" data-k="reject">${t('reject')}</button>
      <button type="button" class="btn kc-eq" data-k="accept">${t('accept')}</button></div>
      <button type="button" class="kc-link" data-k="config">${t('config')}</button>`;
    bar.querySelector('[data-k=reject]').onclick = () => { write(false, false); hideBar(); };
    bar.querySelector('[data-k=accept]').onclick = () => { write(true, true); hideBar(); };
    bar.querySelector('[data-k=config]').onclick = () => openPrefs();
  }
  function showBar() { build(); renderBar(); requestAnimationFrame(() => requestAnimationFrame(() => bar.classList.add('on'))); }
  function hideBar() { if (bar) bar.classList.remove('on'); }
  let draft = { analytics: false, marketing: false };
  function renderPrefs() {
    const sw = (k, on, dis) => `<button type="button" class="kc-sw" role="switch" aria-checked="${on}" ${dis ? 'disabled' : ''} data-k="${k}" aria-label="${t(k === 'necessary' ? 'nec' : k === 'analytics' ? 'ana' : 'mkt')}"></button>`;
    dlg.innerHTML = `<div id="kc-box" class="lg" role="dialog" aria-modal="true" aria-labelledby="kc-h">
      <button type="button" class="gbtn lg kc-x" aria-label="${t('close')}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      <h2 id="kc-h">${t('prefs')}</h2><p style="color:var(--soft,#6b716c)">${t('text')} <a href="${policy()}" style="color:var(--acc,#304c40)">${t('more')}</a></p>
      <div style="margin-top:12px">
        <div class="kc-cat"><div><b>${t('nec')}</b><small>${t('necD')}</small></div>${sw('necessary', true, true)}</div>
        <div class="kc-cat"><div><b>${t('ana')}</b><small>${t('anaD')}</small></div>${sw('analytics', draft.analytics)}</div>
        <div class="kc-cat"><div><b>${t('mkt')}</b><small>${t('mktD')}</small></div>${sw('marketing', draft.marketing)}</div>
      </div>
      <div class="kc-row"><button type="button" class="btn kc-eq" data-a="rejectAll">${t('rejectAll')}</button><button type="button" class="btn kc-eq" data-a="acceptAll">${t('acceptAll')}</button></div>
      <div class="kc-row" style="margin-top:8px"><button type="button" class="btn kc-sec" data-a="save">${t('save')}</button></div></div>`;
    dlg.querySelectorAll('.kc-sw:not(:disabled)').forEach(b => b.onclick = () => { draft[b.dataset.k] = !draft[b.dataset.k]; b.setAttribute('aria-checked', draft[b.dataset.k]); });
    dlg.querySelector('.kc-x').onclick = closePrefs;
    dlg.querySelector('[data-a=rejectAll]').onclick = () => done(false, false);
    dlg.querySelector('[data-a=acceptAll]').onclick = () => done(true, true);
    dlg.querySelector('[data-a=save]').onclick = () => done(draft.analytics, draft.marketing);
    const box = dlg.querySelector('#kc-box');
    box.addEventListener('keydown', e => {                            // keep Tab inside the dialog
      if (e.key !== 'Tab') return; const f = [...box.querySelectorAll('button:not(:disabled),a[href]')]; if (!f.length) return;
      const i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    });
  }
  function done(a, m) { write(a, m); closePrefs(); hideBar(); toast(t('saved')); }
  function openPrefs() {
    build(); lastFocus = document.activeElement;
    draft = { analytics: !!(state && state.analytics), marketing: !!(state && state.marketing) };
    renderPrefs(); dlg.classList.add('on');
    setTimeout(() => { const f = dlg.querySelector('.kc-sw:not(:disabled)'); f && f.focus({ preventScroll: true }); }, 30);
  }
  function closePrefs() {
    if (!dlg || !dlg.classList.contains('on')) return;
    dlg.classList.remove('on'); if (!state) showBar();
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  function toast(msg) {
    let el = document.getElementById('toast');
    if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast lg'; el.innerHTML = '<span></span>'; document.body.appendChild(el); }
    el.setAttribute('translate', 'no'); el.querySelector('span').textContent = msg; el.classList.add('on');
    clearTimeout(toast.h); toast.h = setTimeout(() => el.classList.remove('on'), 1900);
  }

  // ---------- language blocks on content pages: <div data-lang="es">…</div> ----------
  function langBlocks() {
    const l = lang();
    document.querySelectorAll('[data-lang]').forEach(el => { el.hidden = el.dataset.lang !== l; });
    const ttl = document.documentElement.dataset['title' + l[0].toUpperCase() + l[1]]; if (ttl) document.title = ttl;
    document.querySelectorAll('[data-t-es]').forEach(el => { const v = el.dataset['t' + l[0].toUpperCase() + l[1]]; if (v != null) el.textContent = v; });
    if (window.KLang) document.querySelectorAll('a[href]:not([href^="#"])').forEach(a => {   // keep ?lang on internal links (incl. translate=no blocks)
      const h = a.getAttribute('href'); if (/^[\w-]+\.html/.test(h) || a.href.startsWith(location.origin)) a.href = KLang.url(h);
    });
    if (bar && bar.classList.contains('on')) renderBar();
    if (dlg && dlg.classList.contains('on')) renderPrefs();
    footer();
  }

  // ---------- shared footer: <footer data-footer></footer> ----------
  const NAV = [
    ['index.html', 'Showroom', 'Showroom', 'Шоурум'], ['catalogo.html', 'Coches', 'Cars', 'Автомобили'],
    ['nosotros.html', 'Sobre nosotros', 'About us', 'О нас'], ['ventajas.html', 'Ventajas', 'Benefits', 'Преимущества'],
    ['comprar.html', 'Cómo comprar', 'How to buy', 'Как купить'], ['contacto.html', 'Contacto', 'Contact', 'Контакты']
  ];
  const LEGAL = [
    ['aviso-legal.html', 'Aviso legal', 'Legal notice', 'Правовая информация'], ['privacidad.html', 'Privacidad', 'Privacy', 'Конфиденциальность'],
    ['cookies.html', 'Política de cookies', 'Cookie policy', 'Политика cookies']
  ];
  function footer() {
    const i = ['es', 'en', 'ru'].indexOf(lang()) + 1, q = lang() !== 'es' ? '?lang=' + lang() : '';
    document.querySelectorAll('[data-footer]').forEach(f => {
      f.setAttribute('translate', 'no'); f.classList.add('kfoot');
      f.innerHTML = `<nav class="kf-nav">${NAV.map(n => `<a href="${n[0]}${q}">${n[i]}</a>`).join('')}</nav>
        <nav class="kf-legal">${LEGAL.map(n => `<a href="${n[0]}${q}">${n[i]}</a>`).join('')}<button type="button" data-cookies>${t('prefs')}</button></nav>
        <p>KARATS AUTO, S.L. · NIF B05735238 · C/ Floridablanca 68, 08015 Barcelona</p>`;
    });
  }
  const footCss = `.kfoot{max-width:1080px;margin:40px auto 0;padding:22px 16px calc(28px + env(safe-area-inset-bottom));border-top:1px solid var(--line,rgba(29,33,30,.1));font-size:13.5px;color:var(--soft,#6b716c)}
    .kfoot nav{display:flex;flex-wrap:wrap;gap:6px 18px;margin-bottom:10px}.kfoot a,.kfoot button{color:inherit;text-decoration:none;background:none;border:0;padding:4px 0;cursor:pointer;font:inherit}
    .kfoot .kf-nav a{color:var(--ink,#1d211e);font-weight:600}.kfoot a:hover,.kfoot button:hover{text-decoration:underline}.kfoot p{font-size:12.5px;color:var(--faint,#9aa09a);margin-top:6px}`;

  document.addEventListener('click', e => { const b = e.target.closest('[data-cookies]'); if (b) { e.preventDefault(); openPrefs(); } });
  function tableLabels() {                                 // phones show tables as cards: each cell carries its column name
    document.querySelectorAll('.prose table').forEach(tb => {
      const head = [...tb.querySelectorAll('tr:first-child th')].map(th => th.textContent.trim());
      tb.querySelectorAll('tr').forEach(tr => [...tr.children].forEach((td, i) => { if (td.tagName === 'TD' && head[i]) td.dataset.label = head[i]; }));
    });
  }
  function init() {
    tableLabels();
    const st = document.createElement('style'); st.textContent = footCss; document.head.appendChild(st);
    langBlocks(); activate();
    if (!state) showBar();
  }
  addEventListener('karats:language', langBlocks);
  window.KConsent = { get: () => state, open: openPrefs, reset() { try { localStorage.removeItem(KEY); } catch (_) {} state = null; showBar(); } };
  window.KToast = toast;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
