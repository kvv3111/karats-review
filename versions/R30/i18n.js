/* R30 ES/EN/RU. Source data stays Spanish; translations never alter car values or media.
   Observe text and accessibility labels only, NOT per-frame style/class/video changes. */
(() => {
  'use strict';
  const LANGS = ['es', 'en', 'ru'], KEY = 'karats.language';
  const rows = [
    ['Ver coche','View car','Смотреть авто'],
    ['desliza · scroll · flechas','swipe · scroll · arrows','свайп · скролл · стрелки'],
    ['Modelos 3D:','3D models:','3D-модели:'],
    ['créditos (CC BY)','credits (CC BY)','авторы (CC BY)'],
    ['Menú','Menu','Меню'],['Anterior','Previous','Назад'],['Siguiente','Next','Вперёд'],
    ['Recorrer coches','Browse cars','Выбор автомобиля'],['Showroom KARATS AUTO','KARATS AUTO showroom','Шоурум KARATS AUTO'],
    ['Coches','Cars','Автомобили'],['5 en el showroom · ver todos','5 in the showroom · view all','5 авто в шоуруме · смотреть все'],
    ['Sobre nosotros','About us','О нас'],['Quiénes somos y cómo trabajamos','Who we are and how we work','Кто мы и как работаем'],
    ['Ventajas','Our benefits','Преимущества'],['Garantía, revisión, entrega','Warranty, inspection, delivery','Гарантия, проверка, доставка'],
    ['Cómo comprar','How to buy','Как купить'],['De la reserva a las llaves en 4 pasos','From reservation to keys in 4 steps','От брони до ключей за 4 шага'],
    ['Contacto','Contact','Контакты'],['Barcelona · lun–sáb 10:00–20:00','Barcelona · Mon–Sat 10:00–20:00','Барселона · пн–сб 10:00–20:00'],
    ['Llamar','Call','Позвонить'],['Ficha','Car details','Карточка автомобиля'],['Datos de ejemplo','Sample data','Демонстрационные данные'],
    ['Cerrar','Close','Закрыть'],['Más detalles','More details','Подробнее'],['Galería','Gallery','Галерея'],
    ['Showroom','Showroom','Шоурум'],['Guardar','Save','Сохранить'],['Compartir','Share','Поделиться'],
    ['Datos principales','Key specifications','Основные характеристики'],['Equipamiento destacado','Equipment highlights','Оснащение'],
    ['Incluido con KARATS AUTO','Included with KARATS AUTO','Включено в KARATS AUTO'],
    ['Garantía 12 meses','12-month warranty','Гарантия 12 месяцев'],['Ampliable a 36','Extendable to 36 months','Можно продлить до 36 месяцев'],
    ['Revisión 150 puntos','150-point inspection','Проверка по 150 пунктам'],['Informe en la entrega','Report provided on delivery','Отчёт при передаче автомобиля'],
    ['Transferencia incluida','Ownership transfer included','Переоформление включено'],['Gestión DGT por nuestra cuenta','We handle the DGT paperwork','Оформление в DGT за наш счёт'],
    ['Entrega en toda España','Delivery throughout Spain','Доставка по всей Испании'],['O recógelo en Barcelona','Or collect in Barcelona','Или самовывоз в Барселоне'],
    ['Maqueta: fotos y datos de ejemplo. Las fotos reales se añaden después.','Prototype: sample photos and data. Real photos will be added later.','Макет: фотографии и данные демонстрационные. Реальные фото будут добавлены позже.'],
    ['Escribir','Message us','Написать'],['Año','Year','Год'],['Kilómetros','Mileage','Пробег'],['Combustible','Fuel type','Тип топлива'],
    ['Cambio','Transmission','Коробка передач'],['Potencia','Power','Мощность'],['Consumo','Consumption','Расход'],
    ['Etiqueta DGT','DGT environmental label','Экологическая категория DGT'],['Color','Colour','Цвет'],['Puertas / plazas','Doors / seats','Двери / места'],['Propietarios','Previous owners','Владельцы'],
    ['WhatsApp · número pendiente','WhatsApp · number not added yet','WhatsApp · номер пока не указан'],
    ['Teléfono · número pendiente','Phone · number not added yet','Телефон · номер пока не указан'],
    ['Guardado','Saved','Сохранено'],['Quitado de guardados','Removed from saved','Удалено из сохранённого'],
    ['Gasolina MHEV','Petrol mild hybrid','Бензин, мягкий гибрид'],['Gasolina','Petrol','Бензин'],['Diésel','Diesel','Дизель'],['Híbrido','Hybrid','Гибрид'],['Eléctrico','Electric','Электро'],
    ['Automático DCT','Automatic DCT','Автоматическая DCT'],['Automático Steptronic','Automatic Steptronic','Автоматическая Steptronic'],
    ['Automático e-CVT','Automatic e-CVT','Автоматическая e-CVT'],['Automático','Automatic','Автомат'],['Manual 6 vel.','6-speed manual','Механическая, 6 ступеней'],['Manual','Manual','Механика'],
    ['320d Sedán','320d Saloon','320d Седан'],['Rojo Infra','Infra Red','Красный Infra'],['Gris Dravit','Dravit Grey','Серый Dravit'],['Blanco Puro','Pure White','Белый Pure'],['Gris Gravity','Gravity Grey','Серый Gravity'],['Azul Atlántico','Atlantic Blue','Синий Atlantic'],
    ['Etiqueta ECO','ECO environmental label','Экологическая категория ECO'],['Un solo propietario','One owner','Один владелец'],
    ['Libro de mantenimiento BMW','BMW service history','Сервисная история BMW'],['Revisiones en Toyota','Serviced by Toyota','Обслуживание в Toyota'],
    ['Etiqueta 0 emisiones','Zero-emission label','Экологическая категория 0'],['Carga rápida 800 V','800 V fast charging','Быстрая зарядка 800 В'],
    ['Garantía batería 8 años','8-year battery warranty','Гарантия на батарею 8 лет'],['Libro de mantenimiento VW','VW service history','Сервисная история VW'],['ITV recién pasada','Recently passed ITV inspection','Недавно пройден техосмотр ITV'],
    ['Cámara 360°','360° camera','Камера 360°'],['Navegador 12,3"','12.3-inch navigation display','Навигация с экраном 12,3″'],
    ['Faros full LED','Full LED headlights','Полностью светодиодные фары'],['Climatizador bizona','Dual-zone climate control','Двухзонный климат-контроль'],
    ['Asientos calefactados','Heated seats','Подогрев сидений'],['Control de crucero adaptativo','Adaptive cruise control','Адаптивный круиз-контроль'],['Portón eléctrico','Power tailgate','Электропривод багажника'],
    ['Faros LED adaptativos','Adaptive LED headlights','Адаптивные LED-фары'],['Asistente de aparcamiento','Parking assistant','Парковочный ассистент'],['Volante deportivo M','M sports steering wheel','Спортивный руль M'],
    ['Climatizador trizona','Three-zone climate control','Трёхзонный климат-контроль'],['Carga inalámbrica','Wireless charging','Беспроводная зарядка'],['Retrovisores abatibles','Folding door mirrors','Складывающиеся зеркала'],['Sensores delante y detrás','Front and rear parking sensors','Передние и задние парктроники'],
    ['Cámara trasera','Reversing camera','Камера заднего вида'],['Faros LED','LED headlights','LED-фары'],['Arranque sin llave','Keyless start','Запуск без ключа'],['Llantas 16"','16-inch alloy wheels','Легкосплавные диски 16″'],
    ['Bomba de calor','Heat pump','Тепловой насос'],['Carga 10→80 % en 18 min','10→80% charge in 18 min','Зарядка 10→80% за 18 мин'],
    ['Pantalla panorámica 12,3"','12.3-inch panoramic display','Панорамный экран 12,3″'],['Highway Driving Assist','Highway Driving Assist','Ассистент движения по шоссе'],
    ['Asientos ventilados','Ventilated seats','Вентиляция сидений'],['Head-up display','Head-up display','Проекционный дисплей'],['V2L (enchufe 220 V)','V2L (220 V socket)','V2L (розетка 220 В)'],['Faros LED paramétricos','Parametric LED headlights','Параметрические LED-фары'],
    ['Navegador Discover','Discover navigation','Навигация Discover'],['App-Connect inalámbrico','Wireless App-Connect','Беспроводной App-Connect'],['Lane Assist','Lane Assist','Удержание в полосе Lane Assist'],['Front Assist','Front Assist','Предупреждение столкновений Front Assist'],['Sensores de aparcamiento','Parking sensors','Парктроники'],
    ['Tres cuartos delantero','Front three-quarter view','Спереди в три четверти'],['Frontal','Front view','Вид спереди'],['Lateral','Side view','Вид сбоку'],['Tres cuartos trasero','Rear three-quarter view','Сзади в три четверти'],['Trasera','Rear view','Вид сзади'],['Tres cuartos izquierdo','Left three-quarter view','Слева в три четверти'],['Vista superior','Top view','Вид сверху'],['Ángulo bajo','Low-angle view','Низкий ракурс'],['Llanta','Wheel','Колёсный диск'],['Faro','Headlight','Фара'],['Piloto trasero','Rear light','Задний фонарь'],
    ['Créditos','Credits','Авторы и лицензии'],['Créditos · KARATS AUTO','Credits · KARATS AUTO','Авторы и лицензии · KARATS AUTO'],
    ['Escena renderizada con Blender Cycles. Modelos 3D de coches (Sketchfab), recoloreados y con materiales modificados:','Scene rendered with Blender Cycles. Car 3D models (Sketchfab), recoloured with modified materials:','Сцена отрендерена в Blender Cycles. 3D-модели автомобилей (Sketchfab), с изменёнными цветами и материалами:'],
    ['Texturas y HDRI: Poly Haven (CC0). Las marcas pertenecen a sus titulares; los datos de los coches son de ejemplo.','Textures and HDRI: Poly Haven (CC0). Trademarks belong to their respective owners; vehicle data is illustrative.','Текстуры и HDRI: Poly Haven (CC0). Товарные знаки принадлежат их владельцам; данные автомобилей демонстрационные.'],
    ['← Volver','← Back','← Назад'],['Idioma','Language','Язык'],['KARATS AUTO · Showroom','KARATS AUTO · Showroom','KARATS AUTO · Шоурум']
  ];
  const dictionaries = Object.fromEntries(LANGS.map((l,i)=>[l,Object.fromEntries(rows.map(r=>[r[0],r[i]]))]));
  const stored = () => { try { return localStorage.getItem(KEY); } catch (_) { return null; } };
  const requested = new URL(location.href).searchParams.get('lang');
  const back = performance.getEntriesByType('navigation')[0]?.type === 'back_forward';
  let lang = (back && LANGS.includes(stored()) ? stored() : LANGS.includes(requested) ? requested : stored()) || 'es';
  if (!LANGS.includes(lang)) lang = 'es';
  const memory = new WeakMap();
  function translate(raw) {
    const s = raw.trim(), index = LANGS.indexOf(lang);
    let t = dictionaries[lang][s];
    if (t === undefined) {
      if (/^o desde \d+ €\/mes$/.test(s)) { const n=s.match(/\d+/)[0]; t=[s,`or from €${n}/month`,`или от ${n} €/мес`][index]; }
      else if (/^\d+ fotos$/.test(s)) { const n=s.match(/\d+/)[0]; t=[s,`${n} photos`,`${n} фото`][index]; }
      else if (s.endsWith(' · página en preparación')) t=translate(s.slice(0,-' · página en preparación'.length))+[' · página en preparación',' · page in preparation',' · страница пока не готова'][index];
      else if (s.startsWith('por ')) t=[s,'by '+s.slice(4),'автор: '+s.slice(4)][index];
      else t = s.replace(/BMW Serie 3/g,['BMW Serie 3','BMW 3 Series','BMW 3 серии'][index])
                .replace(/(\d+) CV\b/g,`$1 ${['CV','PS','л.с.'][index]}`)
                .replace(/\bkm\b/g,['km','km','км'][index])
                .replace(/\bl\/100/g,['l/100','L/100','л/100'][index])
                .replace(/\bkWh\b/g,['kWh','kWh','кВт⋅ч'][index]);
      if (lang==='en') t=t.replace(/(\d),(\d)/g,'$1.$2');
    }
    return raw.slice(0,raw.indexOf(s))+t+raw.slice(raw.indexOf(s)+s.length);
  }
  function value(node, key, current, write) {
    if (!current.trim()) return;
    let slots=memory.get(node); if (!slots) { slots={}; memory.set(node,slots); }
    let rec=slots[key];
    if (!rec || current!==rec.result) rec={source:current,result:current};
    const next=translate(rec.source); rec.result=next; slots[key]=rec;
    if (next!==current) write(next);
  }
  function url(href) {
    const u=new URL(href,location.href);
    if(u.origin===location.origin && u.pathname.startsWith(location.pathname.replace(/[^/]*$/,''))) u.searchParams.set('lang',lang);
    return u.href;
  }
  function artwork(path) {
    return path.replace(/gal\/ph\/(?:en\/|ru\/)?(\d{2}_[a-z0-9]+_[fmt]\.webp)/g, 'gal/ph/'+(lang==='es'?'':lang+'/')+'$1');
  }
  function scan(root) {
    if(root.nodeType===Node.TEXT_NODE) {
      if(!root.parentElement?.closest('script,style,svg,video,canvas,[translate="no"]')) value(root,'text',root.data,v=>root.data=v);
      return;
    }
    if(root.nodeType!==Node.ELEMENT_NODE || root.matches('script,style,svg,video,canvas,[translate="no"]')) return;
    for(const a of ['aria-label','alt','title']) if(root.hasAttribute(a)) value(root,a,root.getAttribute(a),v=>root.setAttribute(a,v));
    for(const a of ['src','data-src','data-full']) {
      const old=root.getAttribute(a); if(old && artwork(old)!==old) root.setAttribute(a,artwork(old));
    }
    const bg=root.style.backgroundImage; if(bg && artwork(bg)!==bg) root.style.backgroundImage=artwork(bg);
    if(root.matches('a[href]')) {
      const href=root.getAttribute('href');
      if(href && !href.startsWith('#')) { const dest=url(href); if(dest!==root.href) root.href=dest; }
    }
    for(const child of root.childNodes) scan(child);
  }
  const observer = new MutationObserver(records=>{
    observer.disconnect();
    for(const r of records) {
      if(r.type==='childList') r.addedNodes.forEach(scan);
      else scan(r.target);
      if(r.type==='attributes' && r.attributeName==='href') scan(r.target);
    }
    watch();
  });
  function watch() { observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','alt','title','href','src','data-src','data-full']}); }
  function apply() {
    observer.disconnect();
    document.documentElement.lang=lang;
    scan(document.body);
    value(document.documentElement,'pageTitle',document.title,v=>document.title=v);
    document.querySelectorAll('#lang button').forEach((b,i)=>{
      b.classList.toggle('on',LANGS[i]===lang); b.setAttribute('aria-pressed',String(LANGS[i]===lang));
      b.setAttribute('aria-label',['Español','English','Русский'][i]);
    });
    const knob=document.querySelector('#lang .knob'); if(knob) knob.style.transform=`translateX(${LANGS.indexOf(lang)*46}px)`;
    const select=document.getElementById('pageLang'); if(select) select.value=lang;
    watch();
  }
  function set(next) {
    if(!LANGS.includes(next)) return;
    lang=next;
    try { localStorage.setItem(KEY,lang); } catch (_) {}
    history.replaceState(history.state,'',url(location.href));
    apply();
    dispatchEvent(new Event('karats:language'));
  }
  window.KLang={get language(){return lang;},translate,url,set};
  document.querySelectorAll('#lang button').forEach((b,i)=>b.onclick=()=>set(LANGS[i]));
  const select=document.getElementById('pageLang'); if(select) select.onchange=()=>set(select.value);
  addEventListener('pageshow',e=>{if(e.persisted) set(stored()||lang);});
  // Closing a history-backed panel must not restore an older language query.
  addEventListener('popstate',()=>set(lang));
  set(lang);
})();
