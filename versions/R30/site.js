/* KARATS AUTO shared layer: cookie consent (LSSI art. 22.2 / AEPD guide 2024), language blocks, footer.
   Nothing non-essential is loaded before consent. Today the site uses only exempt storage
   (language chosen by the visitor + this consent record). Future analytics/marketing tags must be added as
   <script type="text/plain" data-consent="analytics|marketing" data-src="..."> and run only after "accept". */
(() => {
  'use strict';
  const KEY = 'karats.consent', VERSION = 2, MAX_AGE = 365 * 864e5;   // ask again after 12 months
  // No optional vendors are active. Adding one requires new disclosures and a new consent version.
  const AVAILABLE = Object.freeze({ analytics: false, marketing: false });
  const lang = () => (window.KLang && KLang.language) || 'es';
  const T = {
    es: { title: 'Cookies', text: 'Solo guardamos el idioma que eliges, tus favoritos, los últimos filtros del catálogo y la decisión de este panel. No hay cookies de análisis ni de publicidad. Aceptar no autoriza nuevos usos. Puedes cambiar tu elección en «Configurar cookies».',
          more: 'Política de cookies', accept: 'Aceptar', reject: 'Rechazar', config: 'Configurar',
          prefs: 'Configurar cookies', save: 'Guardar selección', acceptAll: 'Aceptar todas', rejectAll: 'Rechazar todas', close: 'Cerrar',
          nec: 'Necesarias', necD: 'Idioma, favoritos que guardas con ♥, últimos filtros del catálogo y tu elección en este panel. No se usan para seguirte ni mostrar publicidad.',
          ana: 'Análisis', anaD: 'Estadísticas de visitas para mejorar la web. Ahora mismo no usamos ninguna herramienta de este tipo.',
          mkt: 'Publicidad', mktD: 'Medir anuncios y mostrar publicidad relevante. Ahora mismo no usamos ninguna.',
          always: 'Siempre activas', saved: 'Preferencias guardadas' },
    en: { title: 'Cookies', text: 'We only store your chosen language, saved favourites, your last catalogue filters and the choice in this panel. There are no analytics or advertising cookies. Accepting does not permit new uses. You can change your choice in “Cookie settings”.',
          more: 'Cookie policy', accept: 'Accept', reject: 'Reject', config: 'Settings',
          prefs: 'Cookie settings', save: 'Save choice', acceptAll: 'Accept all', rejectAll: 'Reject all', close: 'Close',
          nec: 'Necessary', necD: 'Your language, cars saved with ♥, your last catalogue filters and your choice in this panel. Not used to track you or show ads.',
          ana: 'Analytics', anaD: 'Visit statistics to improve the site. We do not use any such tool at the moment.',
          mkt: 'Advertising', mktD: 'Ad measurement and relevant ads. We do not use any at the moment.',
          always: 'Always on', saved: 'Preferences saved' },
    ca: { title: 'Cookies', text: 'Només desem l’idioma que tries, els preferits, els últims filtres del catàleg i la decisió d’aquest panell. No hi ha cookies d’anàlisi ni de publicitat. Acceptar no autoritza usos nous. Pots canviar l’elecció a «Configurar les cookies».',
          more: 'Política de cookies', accept: 'Acceptar', reject: 'Rebutjar', config: 'Configurar',
          prefs: 'Configurar les cookies', save: 'Desar la selecció', acceptAll: 'Acceptar-les totes', rejectAll: 'Rebutjar-les totes', close: 'Tancar',
          nec: 'Necessàries', necD: 'Idioma, preferits que deses amb ♥, últims filtres del catàleg i la teva elecció en aquest panell. No es fan servir per seguir-te ni mostrar publicitat.',
          ana: 'Anàlisi', anaD: 'Estadístiques de visites per millorar el web. Ara mateix no fem servir cap eina d’aquest tipus.',
          mkt: 'Publicitat', mktD: 'Mesurar anuncis i mostrar publicitat rellevant. Ara mateix no en fem servir cap.',
          always: 'Sempre actives', saved: 'Preferències desades' },
    ru: { title: 'Cookies', text: 'Сохраняем выбранный язык, избранное, последние фильтры каталога и решение в этой панели. Аналитических и рекламных cookies нет. Нажатие «Принять» не разрешает новые способы использования. Изменить выбор можно в «Настройках cookies».',
          more: 'Политика cookies', accept: 'Принять', reject: 'Отклонить', config: 'Настроить',
          prefs: 'Настройки cookies', save: 'Сохранить выбор', acceptAll: 'Принять все', rejectAll: 'Отклонить все', close: 'Закрыть',
          nec: 'Необходимые', necD: 'Язык, машины, сохранённые через ♥, последние фильтры каталога и выбор в этой панели. Не используются для отслеживания или рекламы.',
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
    state = { v: VERSION, ts: Date.now(), necessary: true, analytics: !!analytics && AVAILABLE.analytics, marketing: !!marketing && AVAILABLE.marketing };
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {}
    activate(); dispatchEvent(new CustomEvent('karats:consent', { detail: state }));
  }
  // consent-gated scripts: inert until their category is accepted
  function activate() {
    if (!state) return;
    document.querySelectorAll('script[type="text/plain"][data-consent]').forEach(s => {
      if (!AVAILABLE[s.dataset.consent] || !state[s.dataset.consent] || s.dataset.done) return;
      s.dataset.done = '1'; const n = document.createElement('script');
      if (s.dataset.src) n.src = s.dataset.src; else n.textContent = s.textContent;
      document.head.appendChild(n);
    });
  }

  const css = `
  #kc-bar{position:fixed;z-index:70;left:10px;right:10px;bottom:calc(10px + env(safe-area-inset-bottom));max-width:560px;margin:0 auto;padding:16px 16px 14px;border-radius:24px;--lg-tint:.70;
    transform:translateY(130%);opacity:0;visibility:hidden;pointer-events:none;transition:transform .6s var(--spring,ease),opacity .3s,visibility 0s .6s;font-size:14px;line-height:1.45;color:var(--ink,#1d211e)}
  #kc-bar.on{transform:none;opacity:1;visibility:visible;pointer-events:auto;transition-delay:0s}
  #kc-bar>*{position:relative;z-index:1}
  #kc-bar b{font-family:Jost,sans-serif;font-weight:500;font-size:17px;display:block;margin-bottom:4px}
  #kc-bar a{color:var(--acc,#304c40)}
  .kc-row{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}
  .kc-row .btn{flex:1 1 0;height:44px;padding:0 14px;font-size:14px;min-width:96px}
  .kc-link{display:block;margin:10px auto 0;border:0;background:none;color:var(--acc,#304c40);font:inherit;font-weight:600;text-decoration:underline;cursor:pointer;padding:4px 8px}
  .kc-eq{background:var(--ink,#1d211e);color:#fff;box-shadow:0 8px 20px rgba(20,22,20,.18)}
  .kc-sec{background:rgba(255,255,255,.55);box-shadow:inset 0 0 0 .8px rgba(29,33,30,.16)}
  #kc-dlg{position:fixed;z-index:80;inset:0;display:flex;opacity:0;visibility:hidden;pointer-events:none;transition:opacity .18s ease,visibility 0s .18s;align-items:flex-end;justify-content:center;padding:10px;background:rgba(20,22,20,.28);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}
  #kc-dlg.on{opacity:1;visibility:visible;pointer-events:auto;transition-delay:0s}
  #kc-box{width:100%;max-width:560px;max-height:calc(100dvh - 20px);overflow:auto;border-radius:26px;padding:20px 18px 16px;--lg-tint:.80;color:var(--ink,#1d211e);font-size:14px;line-height:1.45;margin-bottom:env(safe-area-inset-bottom)}
  #kc-box>*{position:relative;z-index:1}
  #kc-box h2{font-family:Jost,sans-serif;font-weight:500;font-size:22px;margin:0 0 10px}
  .kc-cat{display:flex;gap:12px;align-items:flex-start;padding:12px 0;border-top:1px solid rgba(29,33,30,.10)}
  .kc-cat div{flex:1} .kc-cat b{display:block;font-weight:600} .kc-cat small{color:var(--soft,#6b716c);font-size:13px;display:block;margin-top:2px}
  .kc-sw{position:relative;flex:none;width:48px;height:28px;border-radius:14px;border:0;background:rgba(29,33,30,.18);cursor:pointer;transition:background .2s}
  .kc-sw::after{content:"";position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:11px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:transform .3s var(--spring,ease)}
  .kc-sw[aria-checked="true"]{background:var(--acc,#304c40)} .kc-sw[aria-checked="true"]::after{transform:translateX(20px)}
  .kc-sw:disabled{opacity:.55;cursor:default}
  #kc-box .kc-x{position:absolute!important;top:12px;right:12px;z-index:2}
  @media (min-width:700px){#kc-dlg{align-items:center}}
  @media (prefers-reduced-motion:reduce){
    #kc-bar{transform:none!important;transition:none!important}
    #kc-dlg,.kc-sw,.kc-sw::after{transition:none!important}
  }
  `;
  let bar, dlg, lastFocus, prefsFocusTimer;
  function build() {
    if (bar) return;
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    bar = document.createElement('div'); bar.id = 'kc-bar'; bar.className = 'lg'; bar.setAttribute('role', 'dialog'); bar.setAttribute('aria-live', 'polite'); bar.setAttribute('translate', 'no');
    dlg = document.createElement('div'); dlg.id = 'kc-dlg'; dlg.inert = true; dlg.setAttribute('translate', 'no');
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
        <div class="kc-cat"><div><b>${t('ana')}</b><small>${t('anaD')}</small></div>${sw('analytics', draft.analytics, !AVAILABLE.analytics)}</div>
        <div class="kc-cat"><div><b>${t('mkt')}</b><small>${t('mktD')}</small></div>${sw('marketing', draft.marketing, !AVAILABLE.marketing)}</div>
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
    build(); if (!dlg.contains(document.activeElement)) lastFocus = document.activeElement;
    clearTimeout(prefsFocusTimer);
    draft = { analytics: !!(state && state.analytics), marketing: !!(state && state.marketing) };
    renderPrefs(); dlg.inert = false;
    // Commit the hidden presentation on first build before starting its fade.
    void dlg.offsetWidth; dlg.classList.add('on');
    prefsFocusTimer = setTimeout(() => { if (!dlg.classList.contains('on')) return; const f = dlg.querySelector('.kc-sw:not(:disabled),.kc-x'); f && f.focus({ preventScroll: true }); }, 30);
  }
  function closePrefs() {
    if (!dlg || !dlg.classList.contains('on')) return;
    clearTimeout(prefsFocusTimer); dlg.inert = true; dlg.classList.remove('on'); if (!state) showBar();
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
    if (window.KLang) document.querySelectorAll('a[href]:not([href^="#"]):not([hreflang])').forEach(a => {   // keep ?lang on internal links; language switch links keep their own (incl. translate=no blocks)
      const h = a.getAttribute('href'); if (/^[\w-]+\.html/.test(h) || a.href.startsWith(location.origin)) a.href = KLang.url(h);
    });
    if (bar && bar.classList.contains('on')) renderBar();
    if (dlg && dlg.classList.contains('on')) renderPrefs();
    footer();
  }

  // ---------- shared footer: <footer data-footer></footer> ----------
  const NAV = [
    ['index.html', 'Showroom', 'Showroom', 'Шоурум', 'Showroom'], ['catalogo.html', 'Coches', 'Cars', 'Автомобили', 'Cotxes'],
    ['nosotros.html', 'Sobre nosotros', 'About us', 'О нас', 'Qui som'], ['ventajas.html', 'Ventajas', 'Benefits', 'Преимущества', 'Avantatges'],
    ['comprar.html', 'Cómo comprar', 'How to buy', 'Как купить', 'Com comprar'], ['contacto.html', 'Contacto', 'Contact', 'Контакты', 'Contacte']
  ];
  const LEGAL = [
    ['aviso-legal.html', 'Aviso legal', 'Legal notice', 'Правовая информация', 'Avís legal'], ['privacidad.html', 'Privacidad', 'Privacy', 'Конфиденциальность', 'Privadesa'],
    ['cookies.html', 'Política de cookies', 'Cookie policy', 'Политика cookies', 'Política de cookies']
  ];
  const FT = {
    es: { note: 'Catálogo de demostración. Coches, imágenes y precios de ejemplo; no están a la venta.', buy: 'Comprar', co: 'KARATS AUTO', visit: 'Domicilio social', legal: 'Legal',
          route: 'Cómo llegar', wa: 'WhatsApp', soonW: 'WhatsApp · número pendiente', copy: 'Todos los derechos reservados.', fav: 'Favoritos' },
    en: { note: 'Demo catalogue. The cars, images and prices are examples, not vehicles offered for sale.', buy: 'Buy', co: 'KARATS AUTO', visit: 'Registered office', legal: 'Legal',
          route: 'Get directions', wa: 'WhatsApp', soonW: 'WhatsApp · number coming soon', copy: 'All rights reserved.', fav: 'Favourites' },
    ru: { note: 'Демонстрационный каталог. Автомобили, изображения и цены приведены для примера. Эти машины не продаются.', buy: 'Покупка', co: 'KARATS AUTO', visit: 'Юридический адрес', legal: 'Правовая информация',
          route: 'Как добраться', wa: 'WhatsApp', soonW: 'WhatsApp · номер скоро появится', copy: 'Все права защищены.', fav: 'Избранное' },
    ca: { note: 'Catàleg de demostració. Cotxes, imatges i preus d’exemple; no estan a la venda.', buy: 'Comprar', co: 'KARATS AUTO', visit: 'Domicili social', legal: 'Legal',
          route: 'Com arribar-hi', wa: 'WhatsApp', soonW: 'WhatsApp · número pendent', copy: 'Tots els drets reservats.', fav: 'Preferits' },
  };
  const MAPS = 'https://www.google.com/maps/search/?api=1&query=Carrer+de+Floridablanca+68,+08015+Barcelona';
  function footer() {
    const L = lang(), i = { es: 1, en: 2, ru: 3, ca: 4 }[L] || 1, q = L !== 'es' ? '?lang=' + L : '', f0 = FT[L] || FT.es;
    const a = n => `<a href="${n[0]}${q}">${n[i]}</a>`;
    const col = (id, h, body) => `<div class="kf-col"><button type="button" class="kf-h" aria-expanded="false" aria-controls="kf-${id}">${h}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></button><div class="kf-list" id="kf-${id}"><div>${body}</div></div></div>`;
    const here = location.pathname.split('/').pop() || 'index.html';
    const lq = c => { const u = new URLSearchParams(location.search); u.set('lang', c); return '?' + u.toString(); };
    const langs = [['es', 'ES'], ['ca', 'CA'], ['en', 'EN'], ['ru', 'RU']].map(([c, n]) => `<a href="${here}${lq(c)}" hreflang="${c}" lang="${c}"${c === L ? ' aria-current="true"' : ''}>${n}</a>`).join('');
    document.querySelectorAll('[data-footer]').forEach(f => {
      f.setAttribute('translate', 'no'); f.classList.add('kfoot');
      f.innerHTML = `<div class="kf-in"><p class="kf-note">${f0.note}</p>
        <div class="kf-cols">
          ${col('buy', f0.buy, [NAV[0], NAV[1], NAV[4]].map(a).join(''))}
          ${col('co', f0.co, [NAV[2], NAV[3], NAV[5]].map(a).join(''))}
          ${col('visit', f0.visit, `<span>C/ Floridablanca 68</span><span>08015 Barcelona</span><a href="${MAPS}" target="_blank" rel="noopener noreferrer">${f0.route} ↗</a><a href="tel:+34602520978">+34 602 520 978</a><a href="https://wa.me/34602520978" target="_blank" rel="noopener">${f0.wa} ↗</a><a href="mailto:info@karatsauto.es">info@karatsauto.es</a>`)}
          ${col('legal', f0.legal, LEGAL.map(a).join('') + `<button type="button" data-cookies>${t('prefs')}</button>`)}
        </div>
        <div class="kf-bottom"><p>Copyright © ${new Date().getFullYear()} KARATS AUTO, S.L. ${f0.copy} · NIF B05735238</p><nav class="kf-lang" aria-label="Idioma">${langs}</nav></div></div>`;
      f.querySelectorAll('.kf-h').forEach(b => b.addEventListener('click', () => { const o = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', o); b.parentElement.classList.toggle('open', o); }));
      f.querySelectorAll('[data-soon-msg]').forEach(b => b.addEventListener('click', () => toast(b.dataset.soonMsg)));
    });
  }
  const footCss = `.kfoot{margin-top:48px;background:#e8e4dc;color:#6e716c;font-size:12px;line-height:1.35}
    .kf-in{max-width:980px;margin:0 auto;padding:18px 22px calc(22px + env(safe-area-inset-bottom))}
    .kf-note{padding-bottom:14px;border-bottom:.6px solid rgba(29,33,30,.14);font-size:12px;color:#7a7e78}
    .kf-cols{display:grid;grid-template-columns:1fr}
    .kf-col{border-bottom:.6px solid rgba(29,33,30,.14)}
    .kf-h{all:unset;box-sizing:border-box;display:flex;width:100%;justify-content:space-between;align-items:center;padding:12px 0;font-weight:600;font-size:12.5px;color:#1d211e;cursor:pointer;-webkit-tap-highlight-color:transparent}
    .kf-h svg{width:15px;height:15px;color:#7a7e78;transition:transform .45s cubic-bezier(.3,1.35,.45,1)}
    .kf-col.open .kf-h svg{transform:rotate(180deg)}
    .kf-list{display:grid;grid-template-rows:0fr;overflow:hidden;transition:grid-template-rows .45s cubic-bezier(.22,.8,.25,1)}
    .kf-col.open .kf-list{grid-template-rows:1fr}
    .kf-list>div{min-height:0;overflow:hidden}
    .kf-list a,.kf-list button,.kf-list span{display:block;color:#5e625d;text-decoration:none;background:none;border:0;padding:6px 0 6px 12px;font:inherit;font-size:12.5px;text-align:left;cursor:pointer}
    .kf-col.open .kf-list>div{padding-bottom:10px}
    .kf-list span{cursor:default}
    @media (hover:hover){.kf-list a:hover,.kf-list button:hover{color:#1d211e;text-decoration:underline}}
    .kf-bottom{display:flex;flex-direction:column;gap:10px;padding-top:14px}
    .kf-bottom p{font-size:12px;color:#7a7e78}
    .kf-lang{display:flex;gap:4px}
    .kf-lang a{color:#5e625d;text-decoration:none;font-weight:600;font-size:12px;padding:6px 9px;border-radius:12px}
    .kf-lang a[aria-current]{background:rgba(29,33,30,.08);color:#1d211e}
    @media (min-width:760px){.kf-cols{grid-template-columns:repeat(4,1fr);gap:24px;padding:20px 0 6px;border-bottom:.6px solid rgba(29,33,30,.14)}
      .kf-col{border:0}.kf-h{padding:0 0 8px;cursor:default;pointer-events:none}.kf-h svg{display:none}
      .kf-list{display:block;overflow:visible}.kf-list>div{overflow:visible}.kf-list a,.kf-list button,.kf-list span{padding:4px 0}.kf-col.open .kf-list>div{padding-bottom:0}
      .kf-bottom{flex-direction:row;justify-content:space-between;align-items:center}}
    @media (prefers-reduced-motion:reduce){.kf-list,.kf-h svg{transition:none}}`;

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
