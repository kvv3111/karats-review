/* R30 ES/EN/RU. Source data stays Spanish; translations never alter car values or media.
   Observe text and accessibility labels only, NOT per-frame style/class/video changes. */
(() => {
  'use strict';
  const LANGS = ['es', 'ca', 'en', 'ru'], KEY = 'karats.language';
  // Catalan sits next to Spanish; rows keep the [es, en, ru] layout and Catalan comes from CA (falls back to Spanish).
  const CA = {"KARATS AUTO · Coches de segunda mano en Barcelona": "KARATS AUTO · Cotxes de segona mà a Barcelona", "Ver coche": "Veure el cotxe", "Mantén pulsados los puntos y arrastra": "Mantén premuts els punts i arrossega", "Modelos 3D:": "Models 3D:", "créditos (CC BY)": "crèdits (CC BY)", "Menú": "Menú", "Anterior": "Anterior", "Siguiente": "Següent", "Recorrer coches": "Recórrer els cotxes", "Showroom KARATS AUTO": "Showroom KARATS AUTO", "Coches": "Cotxes", "5 en el showroom · ver todos": "5 al showroom · veure'ls tots", "Sobre nosotros": "Qui som", "Quiénes somos y cómo trabajamos": "Qui som i com treballem", "Ventajas": "Avantatges", "Garantía, revisión, entrega": "Garantia, revisió, lliurament", "Cómo comprar": "Com comprar", "De la reserva a las llaves en 4 pasos": "De la reserva a les claus en 4 passos", "Contacto": "Contacte", "Barcelona · escríbenos cuando quieras": "Barcelona · escriu-nos quan vulguis", "Llamar": "Trucar", "Ficha": "Fitxa", "Datos de ejemplo": "Dades d'exemple", "Cerrar": "Tancar", "Más detalles": "Més detalls", "Galería": "Galeria", "Showroom": "Showroom", "Guardar": "Desar", "Favorito": "Preferit", "Compartir": "Compartir", "Datos principales": "Dades principals", "Equipamiento destacado": "Equipament destacat", "Antes de comprar": "Abans de comprar", "Garantía legal": "Garantia legal", "Consulta tus derechos": "Consulta els teus drets", "Estado del coche": "Estat del cotxe", "Consulta la documentación": "Consulta la documentació", "Cambio de titular": "Canvi de titular", "Condiciones antes de firmar": "Condicions abans de signar", "Entrega del vehículo": "Lliurament del vehicle", "Lugar, plazo y coste acordados": "Lloc, termini i cost acordats", "Maqueta: fotos y datos de ejemplo. Las fotos reales se añaden después.": "Maqueta: fotos i dades d'exemple. Les fotos reals s'afegiran més endavant.", "Escribir": "Escriure", "Año": "Any", "Kilómetros": "Quilòmetres", "Combustible": "Combustible", "Cambio": "Canvi", "Potencia": "Potència", "Consumo": "Consum", "Etiqueta DGT": "Etiqueta DGT", "Color": "Color", "Puertas / plazas": "Portes / places", "Propietarios": "Propietaris", "WhatsApp · número pendiente": "WhatsApp · número pendent", "Teléfono · número pendiente": "Telèfon · número pendent", "Guardado": "Desat", "Quitado de guardados": "Tret dels desats", "Gasolina MHEV": "Gasolina MHEV", "Gasolina": "Gasolina", "Diésel": "Dièsel", "Híbrido": "Híbrid", "Eléctrico": "Elèctric", "Automático DCT": "Automàtic DCT", "Automático Steptronic": "Automàtic Steptronic", "Automático e-CVT": "Automàtic e-CVT", "Automático": "Automàtic", "Manual 6 vel.": "Manual 6 vel.", "Manual": "Manual", "320d Sedán": "320d Sedan", "Rojo Infra": "Vermell Infra", "Gris Dravit": "Gris Dravit", "Blanco Puro": "Blanc Pur", "Gris Gravity": "Gris Gravity", "Azul Atlántico": "Blau Atlàntic", "Etiqueta ECO": "Etiqueta ECO", "Un solo propietario": "Un sol propietari", "Libro de mantenimiento BMW": "Llibre de manteniment BMW", "Revisiones en Toyota": "Revisions a Toyota", "Etiqueta 0 emisiones": "Etiqueta 0 emissions", "Carga rápida 800 V": "Càrrega ràpida 800 V", "Garantía batería 8 años": "Garantia de bateria 8 anys", "Libro de mantenimiento VW": "Llibre de manteniment VW", "ITV recién pasada": "ITV recent", "Cámara 360°": "Càmera 360°", "Navegador 12,3\"": "Navegador 12,3\"", "Faros full LED": "Fars full LED", "Climatizador bizona": "Climatitzador bizona", "Asientos calefactados": "Seients calefactats", "Control de crucero adaptativo": "Control de creuer adaptatiu", "Portón eléctrico": "Porta del maleter elèctrica", "Faros LED adaptativos": "Fars LED adaptatius", "Asistente de aparcamiento": "Assistent d'aparcament", "Volante deportivo M": "Volant esportiu M", "Climatizador trizona": "Climatitzador trizona", "Carga inalámbrica": "Càrrega sense fil", "Retrovisores abatibles": "Retrovisors abatibles", "Sensores delante y detrás": "Sensors davant i darrere", "Cámara trasera": "Càmera posterior", "Faros LED": "Fars LED", "Arranque sin llave": "Arrencada sense clau", "Llantas 16\"": "Llandes de 16\"", "Bomba de calor": "Bomba de calor", "Carga 10→80 % en 18 min": "Càrrega 10→80 % en 18 min", "Pantalla panorámica 12,3\"": "Pantalla panoràmica 12,3\"", "Highway Driving Assist": "Highway Driving Assist", "Asientos ventilados": "Seients ventilats", "Head-up display": "Head-up display", "V2L (enchufe 220 V)": "V2L (endoll 220 V)", "Faros LED paramétricos": "Fars LED paramètrics", "Navegador Discover": "Navegador Discover", "App-Connect inalámbrico": "App-Connect sense fil", "Lane Assist": "Lane Assist", "Front Assist": "Front Assist", "Sensores de aparcamiento": "Sensors d'aparcament", "Tres cuartos delantero": "Tres quarts davanter", "Frontal": "Frontal", "Lateral": "Lateral", "Tres cuartos trasero": "Tres quarts posterior", "Trasera": "Part posterior", "Tres cuartos izquierdo": "Tres quarts esquerre", "Vista superior": "Vista superior", "Ángulo bajo": "Angle baix", "Llanta": "Llanda", "Faro": "Far", "Piloto trasero": "Pilot posterior", "Créditos": "Crèdits", "Créditos · KARATS AUTO": "Crèdits · KARATS AUTO", "Escena renderizada con Blender Cycles. Modelos 3D de coches (Sketchfab), recoloreados y con materiales modificados:": "Escena renderitzada amb Blender Cycles. Models 3D de cotxes (Sketchfab), amb colors i materials modificats:", "Texturas y HDRI: Poly Haven (CC0). Las marcas pertenecen a sus titulares; los datos de los coches son de ejemplo.": "Textures i HDRI: Poly Haven (CC0). Les marques pertanyen als seus titulars; les dades dels cotxes són d'exemple.", "← Volver": "← Tornar", "Idioma": "Idioma", "KARATS AUTO · Showroom": "KARATS AUTO · Showroom", "Aviso legal": "Avís legal", "Privacidad": "Privadesa", "Política de cookies": "Política de cookies", "Configurar cookies": "Configurar les cookies", "Fuente Jost: Indestructible Type, SIL Open Font License 1.1.": "Tipografia Jost: Indestructible Type, SIL Open Font License 1.1."};
  const rows = [
    ['Ver coche','View car','Смотреть авто'],
    ['Mantén pulsados los puntos y arrastra','Hold the dots and drag sideways','Удерживайте пунктир и ведите в сторону'],
    ['Modelos 3D:','3D models:','3D-модели:'],
    ['créditos (CC BY)','credits (CC BY)','авторы (CC BY)'],
    ['Menú','Menu','Меню'],['Anterior','Previous','Назад'],['Siguiente','Next','Вперёд'],
    ['Recorrer coches','Browse cars','Выбор автомобиля'],['Showroom KARATS AUTO','KARATS AUTO showroom','Шоурум KARATS AUTO'],
    ['Coches','Cars','Автомобили'],['5 en el showroom · ver todos','5 in the showroom · view all','5 авто в шоуруме · смотреть все'],
    ['Sobre nosotros','About us','О нас'],['Quiénes somos y cómo trabajamos','Who we are and how we work','Кто мы и как работаем'],
    ['Ventajas','Our benefits','Преимущества'],['Garantía, revisión, entrega','Warranty, inspection, delivery','Гарантия, проверка, доставка'],
    ['Cómo comprar','How to buy','Как купить'],['De la reserva a las llaves en 4 pasos','From reservation to keys in 4 steps','От брони до ключей за 4 шага'],
    ['Contacto','Contact','Контакты'],['Barcelona · escríbenos cuando quieras','Barcelona · message us any time','Барселона · пишите в любое время'],
    ['Llamar','Call','Позвонить'],['Ficha','Car details','Карточка автомобиля'],['Datos de ejemplo','Sample data','Демонстрационные данные'],
    ['Cerrar','Close','Закрыть'],['Más detalles','More details','Подробнее'],['Galería','Gallery','Галерея'],
    ['Showroom','Showroom','Шоурум'],['Guardar','Save','Сохранить'],['Favorito','Favourite','Избранное'],['Compartir','Share','Поделиться'],
    ['Datos principales','Key specifications','Основные характеристики'],['Equipamiento destacado','Equipment highlights','Оснащение'],
    ['Antes de comprar','Before buying','Перед покупкой'],
    ['Garantía legal','Statutory protection','Законная гарантия'],['Consulta tus derechos','Know your rights','Узнайте свои права'],
    ['Estado del coche','Vehicle condition','Состояние машины'],['Consulta la documentación','Ask for the documents','Запросите документы'],
    ['Cambio de titular','Ownership transfer','Переоформление'],['Condiciones antes de firmar','Terms before signing','Условия до подписания'],
    ['Entrega del vehículo','Vehicle delivery','Передача автомобиля'],['Lugar, plazo y coste acordados','Agree location, timing and cost','Место, срок и стоимость'],
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
    ['← Volver','← Back','← Назад'],['Idioma','Language','Язык'],['KARATS AUTO · Showroom','KARATS AUTO · Showroom','KARATS AUTO · Шоурум'],
    ['KARATS AUTO · Coches de segunda mano en Barcelona','KARATS AUTO · Used cars in Barcelona','KARATS AUTO · Подержанные авто в Барселоне'],
    ['Aviso legal','Legal notice','Правовая информация'],['Privacidad','Privacy','Конфиденциальность'],['Política de cookies','Cookie policy','Политика cookies'],
    ['Configurar cookies','Cookie settings','Настройки cookies'],
    ['Fuente Jost: Indestructible Type, SIL Open Font License 1.1.','Jost typeface: Indestructible Type, SIL Open Font License 1.1.','Шрифт Jost: Indestructible Type, SIL Open Font License 1.1.']
  ];
  const COL = { es:0, en:1, ru:2 };
  const dictionaries = Object.fromEntries(LANGS.map(l=>[l,Object.fromEntries(rows.map(r=>[r[0], l==='ca' ? (CA[r[0]] ?? r[0]) : r[COL[l]]]))]));
  const missingCA = rows.filter(r=>!(r[0] in CA)).map(r=>r[0]); if (missingCA.length) console.warn('CA missing', missingCA);
  const stored = () => { try { return localStorage.getItem(KEY); } catch (_) { return null; } };
  const requested = new URL(location.href).searchParams.get('lang');
  const back = performance.getEntriesByType('navigation')[0]?.type === 'back_forward';
  let lang = window.KInitialLanguage || (back && LANGS.includes(stored()) ? stored() : LANGS.includes(requested) ? requested : stored()) || 'es';
  if (!LANGS.includes(lang)) lang = 'es';
  const memory = new WeakMap();
  function translate(raw) {
    const s = raw.trim(), pick = (es, en, ru, ca) => ({ es, en, ru, ca: ca ?? es })[lang];
    let t = dictionaries[lang][s];
    if (t === undefined) {
      if (/^o desde \d+ €\/mes$/.test(s)) { const n=s.match(/\d+/)[0]; t=pick(s,`or from €${n}/month`,`или от ${n} €/мес`,`o des de ${n} €/mes`); }
      else if (/^\d+ fotos$/.test(s)) { const n=s.match(/\d+/)[0]; t=pick(s,`${n} photos`,`${n} фото`,`${n} fotos`); }
      else if (s.endsWith(' · página en preparación')) t=translate(s.slice(0,-' · página en preparación'.length))+pick(' · página en preparación',' · page in preparation',' · страница пока не готова',' · pàgina en preparació');
      else if (s.startsWith('por ')) t=pick(s,'by '+s.slice(4),'автор: '+s.slice(4),'per '+s.slice(4));
      else t = s.replace(/BMW Serie 3/g,pick('BMW Serie 3','BMW 3 Series','BMW 3 серии','BMW Sèrie 3'))
                .replace(/(\d+) CV\b/g,`$1 ${pick('CV','PS','л.с.','CV')}`)
                .replace(/\bkm\b/g,pick('km','km','км','km'))
                .replace(/\bl\/100/g,pick('l/100','L/100','л/100','l/100'))
                .replace(/\bkWh\b/g,pick('kWh','kWh','кВт⋅ч','kWh'));
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
  const P=window.KPaths||{on:false};
  function url(href) {
    const u=new URL(href,location.href);
    if(P.on){   // prod: language = path; internal page links go to the same page in the current language
      if(u.origin!==location.origin || /\.(?!html)[a-z0-9]+$/i.test(u.pathname)) return u.href;
      return P.href(lang,u.href);
    }
    if(u.origin===location.origin && u.pathname.startsWith(location.pathname.replace(/[^/]*$/,''))) u.searchParams.set('lang',lang);
    return u.href;
  }
  function artwork(path) {
    return path.replace(/gal\/ph\/(?:en\/|ru\/|ca\/)?(\d{2}_[a-z0-9]+_[fmt]\.webp)/g, 'gal/ph/'+(lang==='es'?'':lang+'/')+'$1');
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
    if(root.matches('a[href]:not([hreflang])')) {   // language switch links (hreflang) keep their own ?lang
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
      b.setAttribute('aria-label',['Español','Català','English','Русский'][i]);
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
  addEventListener('pageshow',e=>{if(e.persisted) set(P.on ? P.of(location.pathname) : (stored()||lang));});
  // Closing a history-backed panel must not restore an older language query.
  addEventListener('popstate',()=>set(lang));
  set(lang);
})();
