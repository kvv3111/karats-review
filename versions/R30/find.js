/* KARATS AUTO · "Te buscamos el coche": a short request form that opens WhatsApp with a ready
   message. Nothing is sent to or stored by this website: the text only leaves the visitor's
   phone when they press Send inside WhatsApp.
   Entry points are injected here: under the catalogue (#note) and under the contact buttons
   (.px-first) on Contacto, in the language of the surrounding block. Any [data-find] also opens it. */
(() => {
  'use strict';
  const WA = window.KARATS_WA || '34602520978';
  const L = {
    es: {
      cta_h: '¿No ves tu coche?', cta_p: 'Dinos qué buscas y lo encontramos para ti.', cta_b: 'Te buscamos el coche',
      h: 'Te buscamos el coche', sub: 'Rellena lo que sepas. Se abrirá WhatsApp con tu mensaje listo para enviar.',
      model: 'Marca y modelo', model_ph: 'Ej.: Toyota RAV4 híbrido', budget: 'Presupuesto máximo, €', budget_m: 'Presupuesto', budget_ph: 'Ej.: 25000',
      year: 'Año desde', km: 'Kilómetros hasta', fuel: 'Combustible', gear: 'Cambio', when: '¿Para cuándo?',
      name: 'Tu nombre', note: 'Algo más', note_ph: 'Color, equipamiento, uso…', any: 'Me da igual',
      fuels: ['Gasolina', 'Diésel', 'Híbrido', 'Eléctrico'], gears: ['Automático', 'Manual'],
      whens: ['Cuanto antes', 'En 1 mes', 'En 2-3 meses', 'Sin prisa'],
      send: 'Enviar por WhatsApp', close: 'Cerrar', privacy: 'Esta web no guarda nada: el texto solo se envía si lo mandas desde WhatsApp.',
      msg: 'Hola, me gustaría que me buscarais un coche.', sign: 'Mi nombre', y: 'desde', k: 'hasta', upto: 'hasta',
    },
    ca: {
      cta_h: 'No hi veus el teu cotxe?', cta_p: 'Digues-nos què busques i te’l trobem.', cta_b: 'Et busquem el cotxe',
      h: 'Et busquem el cotxe', sub: 'Omple el que sàpigues. S’obrirà WhatsApp amb el missatge a punt per enviar.',
      model: 'Marca i model', model_ph: 'Ex.: Toyota RAV4 híbrid', budget: 'Pressupost màxim, €', budget_m: 'Pressupost', budget_ph: 'Ex.: 25000',
      year: 'Any des de', km: 'Quilòmetres fins a', fuel: 'Combustible', gear: 'Canvi', when: 'Per a quan?',
      name: 'El teu nom', note: 'Alguna cosa més', note_ph: 'Color, equipament, ús…', any: 'M’és igual',
      fuels: ['Gasolina', 'Dièsel', 'Híbrid', 'Elèctric'], gears: ['Automàtic', 'Manual'],
      whens: ['Com més aviat millor', 'D’aquí a 1 mes', 'D’aquí a 2-3 mesos', 'Sense pressa'],
      send: 'Enviar per WhatsApp', close: 'Tancar', privacy: 'Aquest web no desa res: el text només s’envia si el mandes des de WhatsApp.',
      msg: 'Hola, m’agradaria que em busquéssiu un cotxe.', sign: 'Em dic', y: 'des de', k: 'fins a', upto: 'fins a',
    },
    en: {
      cta_h: 'Can’t see your car?', cta_p: 'Tell us what you want and we’ll find it for you.', cta_b: 'Find me a car',
      h: 'Find me a car', sub: 'Fill in what you know. WhatsApp will open with your message ready to send.',
      model: 'Make and model', model_ph: 'E.g. Toyota RAV4 hybrid', budget: 'Maximum budget, €', budget_m: 'Budget', budget_ph: 'E.g. 25000',
      year: 'Year from', km: 'Mileage up to', fuel: 'Fuel', gear: 'Gearbox', when: 'When do you need it?',
      name: 'Your name', note: 'Anything else', note_ph: 'Colour, equipment, use…', any: 'Any',
      fuels: ['Petrol', 'Diesel', 'Hybrid', 'Electric'], gears: ['Automatic', 'Manual'],
      whens: ['As soon as possible', 'Within a month', 'In 2-3 months', 'No rush'],
      send: 'Send via WhatsApp', close: 'Close', privacy: 'This website stores nothing: the text is only sent if you send it from WhatsApp.',
      msg: 'Hello, I’d like you to find a car for me.', sign: 'My name is', y: 'from', k: 'up to', upto: 'up to',
    },
    ru: {
      cta_h: 'Не нашли свою машину?', cta_p: 'Расскажите, что ищете, и мы её найдём.', cta_b: 'Подберите мне машину',
      h: 'Подберём машину', sub: 'Заполните, что знаете. Откроется WhatsApp с готовым сообщением.',
      model: 'Марка и модель', model_ph: 'Например: Toyota RAV4 гибрид', budget: 'Бюджет до, €', budget_m: 'Бюджет', budget_ph: 'Например: 25000',
      year: 'Год от', km: 'Пробег до', fuel: 'Топливо', gear: 'Коробка', when: 'Когда нужна?',
      name: 'Ваше имя', note: 'Что-то ещё', note_ph: 'Цвет, комплектация, для чего…', any: 'Неважно',
      fuels: ['Бензин', 'Дизель', 'Гибрид', 'Электро'], gears: ['Автомат', 'Механика'],
      whens: ['Как можно скорее', 'В течение месяца', 'Через 2-3 месяца', 'Не спешу'],
      send: 'Отправить в WhatsApp', close: 'Закрыть', privacy: 'Сайт ничего не сохраняет: текст уйдёт, только если вы отправите его в WhatsApp.',
      msg: 'Здравствуйте, хочу, чтобы вы подобрали мне машину.', sign: 'Меня зовут', y: 'от', k: 'до', upto: 'до',
    },
  };
  const lang = () => (window.KLang && L[KLang.language]) ? KLang.language : 'es';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const YEARS = [2024, 2022, 2020, 2018, 2015], KMS = [30000, 60000, 100000, 150000];
  const n = v => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  document.head.insertAdjacentHTML('beforeend', `<style>
  .kf-cta{margin:26px auto 8px;max-width:640px;padding:22px 22px 20px;border-radius:var(--r-l,22px);background:rgba(255,255,255,.55);border:1px solid var(--line,rgba(29,33,30,.1));text-align:center}
  .kf-cta h3{font-family:Jost,sans-serif;font-weight:500;font-size:22px;margin:0 0 4px}
  .kf-cta p{color:var(--soft,#6b716c);margin:0 0 14px;font-size:15px}
  #kfind{position:fixed;inset:0;z-index:75;display:flex;align-items:flex-end;justify-content:center;pointer-events:none}
  #kfind .kf-veil{position:absolute;inset:0;background:rgba(20,22,21,.28);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);opacity:0;transition:opacity .3s}
  #kfind .kf-box{position:relative;width:100%;max-width:520px;margin:8px;margin-bottom:calc(8px + env(safe-area-inset-bottom));max-height:calc(100dvh - 16px - env(safe-area-inset-top) - env(safe-area-inset-bottom));overflow-y:auto;overscroll-behavior:contain;
    border-radius:var(--r-xl,30px);background:rgba(247,245,240,.94);-webkit-backdrop-filter:blur(22px) saturate(160%);backdrop-filter:blur(22px) saturate(160%);
    box-shadow:0 30px 80px rgba(20,22,21,.28),inset 0 1px 0 rgba(255,255,255,.7);padding:22px 20px 18px;transform:translateY(110%);transition:transform .45s var(--spring,cubic-bezier(.3,1.35,.45,1))}
  #kfind.on{pointer-events:auto} #kfind.on .kf-veil{opacity:1} #kfind.on .kf-box{transform:none}
  @media (min-width:700px){#kfind{align-items:center} #kfind .kf-box{transform:translateY(24px) scale(.97);opacity:0;transition:transform .35s var(--ease,ease),opacity .25s} #kfind.on .kf-box{transform:none;opacity:1}}
  @media (prefers-reduced-motion:reduce){#kfind .kf-box,#kfind .kf-veil{transition:none}}
  #kfind .kf-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}
  #kfind h2{font-family:Jost,sans-serif;font-weight:500;font-size:26px;line-height:1.1;margin:0}
  #kfind .kf-sub{color:var(--soft,#6b716c);font-size:14px;margin:6px 0 14px}
  #kfind .kf-x{flex:none;width:38px;height:38px;border-radius:19px;border:0;background:rgba(29,33,30,.07);font-size:20px;line-height:38px;cursor:pointer;color:var(--ink,#1d211e)}
  #kfind label{display:block;margin:0 0 12px}
  #kfind label>span,#kfind .kf-l{display:block;font-size:13px;color:var(--soft,#6b716c);margin:0 0 5px}
  #kfind input,#kfind select,#kfind textarea{width:100%;box-sizing:border-box;font:inherit;font-size:16px;color:var(--ink,#1d211e);background:#fff;border:1px solid var(--line,rgba(29,33,30,.12));border-radius:14px;padding:12px 14px;-webkit-appearance:none;appearance:none}
  #kfind select{padding-right:40px;background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b716c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 14px center/18px 18px;cursor:pointer}
  #kfind textarea{min-height:70px;resize:vertical}
  #kfind input:focus,#kfind select:focus,#kfind textarea:focus{outline:2px solid var(--acc,#304c40);outline-offset:1px}
  #kfind .kf-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  #kfind .kf-chips{display:flex;flex-wrap:wrap;gap:7px;margin:0 0 12px}
  #kfind .kf-chips button{height:36px;padding:0 14px;border-radius:18px;border:1px solid var(--line,rgba(29,33,30,.12));background:#fff;font:inherit;font-size:14px;color:var(--ink,#1d211e);cursor:pointer}
  #kfind .kf-chips button[aria-pressed="true"]{background:var(--acc,#304c40);border-color:var(--acc,#304c40);color:#fff}
  #kfind .kf-send{width:100%;margin-top:4px}
  #kfind .kf-priv{font-size:12px;color:var(--faint,#9aa09a);text-align:center;margin:10px 0 0}
  body.kf-open{overflow:hidden}
  </style>`);

  function cta(where, l) {
    const t = L[l] || L.es;
    where.insertAdjacentHTML('afterend', `<section class="kf-cta"${l ? ` lang="${l}"` : ''} translate="no"><h3>${esc(t.cta_h)}</h3><p>${esc(t.cta_p)}</p>
      <button type="button" class="btn primary" data-find data-find-lang="${l}"><span>${esc(t.cta_b)}</span></button></section>`);
  }
  const note = document.getElementById('note');
  if (note && document.getElementById('grid')) cta(note, '');      // catalogue: one block, language follows the switch
  document.querySelectorAll('.px-first').forEach(s => cta(s, (s.closest('[lang]') || document.documentElement).lang || 'es'));
  const catalogueCta = note && note.nextElementSibling && note.nextElementSibling.classList.contains('kf-cta') ? note.nextElementSibling : null;
  function ctaText() {
    if (!catalogueCta) return; const t = L[lang()];
    catalogueCta.querySelector('h3').textContent = t.cta_h; catalogueCta.querySelector('p').textContent = t.cta_p;
    catalogueCta.querySelector('button span').textContent = t.cta_b;
  }
  ctaText(); addEventListener('karats:language', ctaText);

  let box = null, opener = null, state = {};
  function chips(key, items) {
    return `<div class="kf-chips" role="group" data-key="${key}">` + items.map((v, i) => `<button type="button" data-i="${i}" aria-pressed="false">${esc(v)}</button>`).join('') + '</div>';
  }
  function render(l) {
    const t = L[l];
    box.innerHTML = `<div class="kf-veil"></div><form class="kf-box" role="dialog" aria-modal="true" aria-labelledby="kfH" translate="no" novalidate>
      <div class="kf-head"><h2 id="kfH">${esc(t.h)}</h2><button type="button" class="kf-x" aria-label="${esc(t.close)}">×</button></div>
      <p class="kf-sub">${esc(t.sub)}</p>
      <label><span>${esc(t.model)}</span><input name="model" autocomplete="off" placeholder="${esc(t.model_ph)}"></label>
      <div class="kf-row"><label><span>${esc(t.budget)}</span><input name="budget" inputmode="numeric" placeholder="${esc(t.budget_ph)}"></label>
        <label><span>${esc(t.year)}</span><select name="year"><option value="">${esc(t.any)}</option>${YEARS.map(y => `<option>${y}</option>`).join('')}</select></label></div>
      <label><span>${esc(t.km)}</span><select name="km"><option value="">${esc(t.any)}</option>${KMS.map(k => `<option value="${k}">${n(k)} km</option>`).join('')}</select></label>
      <span class="kf-l">${esc(t.fuel)}</span>${chips('fuel', t.fuels)}
      <span class="kf-l">${esc(t.gear)}</span>${chips('gear', t.gears)}
      <span class="kf-l">${esc(t.when)}</span>${chips('when', t.whens)}
      <label><span>${esc(t.name)}</span><input name="name" autocomplete="given-name"></label>
      <label><span>${esc(t.note)}</span><textarea name="note" placeholder="${esc(t.note_ph)}"></textarea></label>
      <button type="submit" class="btn wa kf-send"><span>${esc(t.send)}</span></button>
      <p class="kf-priv">${esc(t.privacy)}</p></form>`;
    box.querySelector('.kf-veil').onclick = close;
    box.querySelector('.kf-x').onclick = close;
    box.querySelectorAll('.kf-chips').forEach(g => g.onclick = e => {
      const b = e.target.closest('button'); if (!b) return;
      const on = b.getAttribute('aria-pressed') !== 'true';
      if (g.dataset.key !== 'fuel') g.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', 'false'));
      b.setAttribute('aria-pressed', String(on));
    });
    box.querySelector('form').onsubmit = e => { e.preventDefault(); send(l); };
  }
  function message(l, f) {
    const t = L[l], v = k => (f.elements[k].value || '').trim(), out = [t.msg];
    const pick = k => [...f.querySelectorAll(`[data-key="${k}"] [aria-pressed="true"]`)].map(b => b.textContent);
    if (v('model')) out.push(`• ${t.model}: ${v('model')}`);
    const b = v('budget').replace(/[^\d]/g, ''); if (b) out.push(`• ${t.budget_m}: ${t.upto} ${n(b)} €`);
    if (v('year')) out.push(`• ${t.year}: ${v('year')}`);
    if (v('km')) out.push(`• ${t.km}: ${n(v('km'))} km`);
    const fu = pick('fuel'); if (fu.length) out.push(`• ${t.fuel}: ${fu.join(', ')}`);
    const g = pick('gear'); if (g.length) out.push(`• ${t.gear}: ${g[0]}`);
    const w = pick('when'); if (w.length) out.push(`• ${t.when.replace(/[¿?]/g, '')}: ${w[0]}`);
    if (v('note')) out.push(`• ${t.note}: ${v('note')}`);
    if (v('name')) out.push(`${t.sign} ${v('name')}.`);
    return out.join('\n');
  }
  function send(l) {
    const url = `https://wa.me/${WA}?text=` + encodeURIComponent(message(l, box.querySelector('form')));
    state.last = url;
    const w = window.open(url, '_blank', 'noopener');
    if (!w) location.href = url;
  }
  function open(l) {
    if (!box) { box = document.createElement('div'); box.id = 'kfind'; document.body.appendChild(box); }
    l = L[l] ? l : lang();
    opener = document.activeElement; render(l);
    requestAnimationFrame(() => { box.classList.add('on'); document.body.classList.add('kf-open'); box.querySelector('input').focus({ preventScroll: true }); });
    if (!(history.state && history.state.kfind)) history.pushState(Object.assign({}, history.state, { kfind: 1 }), '', location.href);
  }
  function hide() {
    if (!box || !box.classList.contains('on')) return;
    box.classList.remove('on'); document.body.classList.remove('kf-open');
    if (opener && opener.isConnected) opener.focus({ preventScroll: true });
  }
  function close() { if (history.state && history.state.kfind) history.back(); else hide(); }
  addEventListener('popstate', () => { if (!(history.state && history.state.kfind)) hide(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && box && box.classList.contains('on')) close(); });
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-find]'); if (!b) return;
    e.preventDefault(); open(b.dataset.findLang || lang());
  });
  window.KFind = { open, message: (l, f) => message(l, f), get last() { return state.last; } };
})();
