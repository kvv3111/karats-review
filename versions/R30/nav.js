/* KARATS AUTO content pages: header B (round back, page title on scroll, menu) + the showroom's glass menu.
   Loaded after i18n.js and site.js. Skipped inside the embedded gallery / details views of coche.html. */
(() => {
  'use strict';
  const q = new URLSearchParams(location.search);
  if (q.get('galleryOverlay') === '1' || q.get('detailOverlay') === '1' || document.body.classList.contains('gallery-embedded')) return;
  const bar = document.querySelector('.ptop, .topbar'); if (!bar) return;
  const $ = s => document.querySelector(s), B = document.body;
  const url = h => window.KLang ? KLang.url(h) : h;
  const tr = s => window.KLang ? KLang.translate(s) : s;

  // ---- menu (same markup as the hall) ----
  document.body.insertAdjacentHTML('beforeend', '<div id="veil"></div>' + "<div id=\"menu\" class=\"lg\" role=\"dialog\" aria-label=\"Men\u00fa\" aria-modal=\"true\">\n  <nav>\n    <a class=\"it\" data-sec=\"01\" href=\"catalogo.html\"><span class=\"n\">01</span><span class=\"t\"><b>Coches</b><small>Ver el cat\u00e1logo</small></span><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\"><path d=\"M9 5l7 7-7 7\"/></svg></a>\n    <a class=\"it\" data-sec=\"02\" href=\"nosotros.html\"><span class=\"n\">02</span><span class=\"t\"><b>Sobre nosotros</b><small>Qui\u00e9nes somos y c\u00f3mo trabajamos</small></span><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\"><path d=\"M9 5l7 7-7 7\"/></svg></a>\n    <a class=\"it\" data-sec=\"03\" href=\"ventajas.html\"><span class=\"n\">03</span><span class=\"t\"><b>Ventajas</b><small>Garant\u00eda, revisi\u00f3n, entrega</small></span><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\"><path d=\"M9 5l7 7-7 7\"/></svg></a>\n    <a class=\"it\" data-sec=\"04\" href=\"comprar.html\"><span class=\"n\">04</span><span class=\"t\"><b>C\u00f3mo comprar</b><small>De la reserva a las llaves en 4 pasos</small></span><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\"><path d=\"M9 5l7 7-7 7\"/></svg></a>\n    <a class=\"it\" data-sec=\"05\" href=\"contacto.html\"><span class=\"n\">05</span><span class=\"t\"><b>Contacto</b><small>Barcelona \u00b7 escr\u00edbenos cuando quieras</small></span><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\"><path d=\"M9 5l7 7-7 7\"/></svg></a>\n  </nav>\n  <div class=\"foot\">\n    <div class=\"seg\" id=\"lang\"><span class=\"knob lg\"></span><button class=\"on\">ES</button><button>CA</button><button>EN</button><button>RU</button></div>\n    <div class=\"acts\">\n      <a class=\"gbtn lg\" href=\"tel:+34602520978\" data-contact=\"call\" aria-label=\"Llamar\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2\"/></svg></a>\n      <a class=\"gbtn wa\" href=\"https://wa.me/34602520978\" target=\"_blank\" rel=\"noopener\" data-contact=\"wa\" aria-label=\"WhatsApp\"><svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 001.8-1.2 2.2 2.2 0 00.1-1.2c0-.1-.2-.2-.5-.3z\"/></svg></a>\n    </div>\n  </div>\n  <div class=\"mlegal\"><a href=\"aviso-legal.html\">Aviso legal</a><a href=\"privacidad.html\">Privacidad</a><a href=\"cookies.html\">Pol\u00edtica de cookies</a><button type=\"button\" data-cookies>Configurar cookies</button></div>\n</div>\n");
  const menu = $('#menu'), btn = $('#menuBtn'), page = (location.pathname.split('/').pop() || 'index.html');
  menu.querySelectorAll('nav .it').forEach((a, k) => {
    a.style.setProperty('--i', k);   // stagger lives in motion.css
    const h = a.getAttribute('href').replace(/\.html$/, ''), here = page.replace(/\.html$/, '');   // prod has clean addresses
    if (h === here || (here === 'coche' && h === 'catalogo')) a.setAttribute('aria-current', 'page');
  });
  let opener = null;
  function setOpen(on) {
    if (on === B.classList.contains('menu')) return;
    B.classList.toggle('menu', on); btn.setAttribute('aria-expanded', String(on));
    btn.setAttribute('aria-label', tr(on ? 'Cerrar' : 'Menú'));
    if (on) { opener = document.activeElement; setTimeout(() => { const f = menu.querySelector('.it'); f && f.focus({ preventScroll: true }); }, 60); }
    else if (opener && opener.focus) opener.focus({ preventScroll: true });
  }
  btn.addEventListener('click', () => setOpen(!B.classList.contains('menu')));
  $('#veil').addEventListener('click', () => setOpen(false));
  addEventListener('keydown', e => { if (e.key === 'Escape' && B.classList.contains('menu')) { e.preventDefault(); setOpen(false); } });
  addEventListener('pageshow', () => setOpen(false));
  menu.querySelectorAll('[data-cookies]').forEach(b => b.addEventListener('click', () => setOpen(false)));
  // a menu link: the menu closes on the tap while the next page loads
  menu.querySelectorAll('a[href]').forEach(a => a.addEventListener('click', e => { if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.shiftKey || e.button || a.target) return;
    if (/^https?:/.test(a.href) && new URL(a.href).origin === location.origin) { B.classList.remove('menu'); btn.setAttribute('aria-expanded', 'false'); } }));

  // languages: the same segmented switch as in the hall
  const LANGS = ['es', 'ca', 'en', 'ru'];
  const segSync = () => {
    const l = (window.KLang && KLang.language) || 'es';
    menu.querySelectorAll('#lang button').forEach((b, i) => { b.classList.toggle('on', LANGS[i] === l); b.setAttribute('aria-pressed', String(LANGS[i] === l)); });
    const k = menu.querySelector('#lang .knob'); if (k) k.style.transform = `translateX(${LANGS.indexOf(l) * 46}px)`;
    menu.querySelectorAll('a[href]').forEach(a => { const h = a.getAttribute('href'); if (/^[\w-]+\.html/.test(h)) a.href = url(h.split('?')[0]); });
  };
  menu.querySelectorAll('#lang button').forEach((b, i) => b.addEventListener('click', () => window.KLang && KLang.set(LANGS[i])));
  addEventListener('karats:language', () => { segSync(); syncTitle(); });

  // call / WhatsApp: numbers are not out yet
  const toast = document.createElement('div'); toast.className = 'ntoast lg'; toast.setAttribute('role', 'status'); toast.textContent = ' '; document.body.appendChild(toast);
  menu.querySelectorAll('[data-soon]').forEach(b => b.addEventListener('click', () => {
    toast.textContent = tr(b.dataset.soon === 'wa' ? 'WhatsApp · número pendiente' : 'Teléfono · número pendiente');
    toast.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => toast.classList.remove('on'), 1800);
  }));

  // ---- back: to the showroom; if we came from it, go back in history (it keeps the car you were on) ----
  const back = bar.querySelector('.pback');
  if (back && !back.id) {
    back.href = url('index.html');
    back.addEventListener('click', e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
      let fromHall = false;
      try { const r = new URL(document.referrer); fromHall = r.origin === location.origin && r.pathname.replace(/[^/]*$/, '') === location.pathname.replace(/[^/]*$/, '') && /\/(index\.html)?$/.test(r.pathname); } catch (_) {}
      if (fromHall && history.length > 1) { e.preventDefault(); history.back(); }
    });
  }

  // ---- title in the bar once the page heading has scrolled away (like iOS large titles) ----
  const src = $('[data-bar]') || $('main h1, .phead h1, h1#title, h1'), title = bar.querySelector('.ptitle');
  function syncTitle() { if (src && title) requestAnimationFrame(() => { title.textContent = src.textContent.trim(); }); }
  if (src && title) {
    syncTitle();
    new MutationObserver(syncTitle).observe(src, { childList: true, characterData: true, subtree: true });
    const io = new IntersectionObserver(([e]) => B.classList.toggle('ptitle-on', !e.isIntersecting && e.boundingClientRect.top < 80),
                                        { rootMargin: '-64px 0px 0px 0px', threshold: 0 });
    io.observe(src);
  }
  segSync();
})();
