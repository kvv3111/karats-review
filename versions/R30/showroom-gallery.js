/* Gallery belongs to the live showroom; the car document is only the photo renderer. */
(() => {
  'use strict';
  let dialog = null, frame = null, opener = null, closing = false;
  let exitMotion = null, revealTimer = null;
  const motionDuration = () => matchMedia('(prefers-reduced-motion: reduce)').matches ? 100 : 220;
  const fades = new WeakMap();
  function fade(node, frames) {
    fades.get(node)?.cancel();
    const from = Number(frames[0].opacity), to = Number(frames[1].opacity);
    const started = performance.now(), duration = motionDuration();
    let timer, raf, resolve, stopped = false;
    const finished = new Promise(done => { resolve = done; });
    const cancel = () => { stopped = true; clearTimeout(timer); cancelAnimationFrame(raf); resolve(); };
    function step() {
      clearTimeout(timer); cancelAnimationFrame(raf);
      if (stopped) return;
      const progress = Math.min(1, (performance.now() - started) / duration);
      node.style.opacity = from + (to - from) * (1 - Math.pow(1 - progress, 3));
      if (progress === 1) { stopped = true; resolve(); return; }
      raf = requestAnimationFrame(step);
      // WebKit can throttle the parent timeline while its iframe covers it.
      // A short-lived timer keeps the exit progressing, never an invisible trap.
      timer = setTimeout(step, 16);
    }
    const animation = { finished, cancel };
    fades.set(node, animation); step();
    return animation;
  }
  const tr = s => window.KLang ? KLang.translate(s) : s;
  const valid = g => g && KARATS_CARS.some(c => c.id === g.car) && KARATS_SHOTS.some(s => s[0] === g.shot);
  async function hide() {
    if (!dialog || exitMotion) return;
    const node = dialog;
    const animation = fade(node, [{opacity:getComputedStyle(node).opacity}, {opacity:0}]);
    exitMotion = animation;
    let deadline;
    try {
      await Promise.race([animation.finished, new Promise(resolve => { deadline = setTimeout(resolve, motionDuration() + 50); })]);
    } catch (_) { return; } finally { clearTimeout(deadline); }
    if (exitMotion !== animation || dialog !== node) return;
    clearTimeout(revealTimer); revealTimer = null;
    node.close(); node.remove(); dialog = frame = null; exitMotion = null;
    if (opener?.isConnected) opener.focus({ preventScroll:true });
    opener = null;
  }
  function close() {
    if (closing || !dialog) return;
    if (history.state?.showroomGallery) { closing = true; history.back(); }
    else hide();
  }
  function show(g) {
    if (!valid(g)) return;
    if (dialog) {
      if (exitMotion) {
        const opacity = getComputedStyle(dialog).opacity;
        exitMotion.cancel(); exitMotion = null;
        fade(dialog, [{opacity}, {opacity:1}]);
      }
      return;
    }
    opener = document.activeElement;
    dialog = document.createElement('dialog'); dialog.id = 'showroomGallery';
    dialog.setAttribute('aria-label',tr('Galería'));
    dialog.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;max-width:none;max-height:none;margin:0;padding:0;border:0;background:#0d0e0d;color:white;overflow:hidden;';
    const exit = document.createElement('button');
    exit.type='button'; exit.textContent='×'; exit.setAttribute('aria-label',tr('Cerrar'));
    exit.style.cssText='position:absolute;right:12px;top:calc(10px + env(safe-area-inset-top));z-index:2;width:44px;height:44px;border:0;border-radius:50%;background:#333;color:white;font-size:28px;cursor:pointer;';
    exit.onclick=close;
    frame = document.createElement('iframe'); frame.title = tr('Galería');
    // the photo page paints its light background before the viewer is up: keep it invisible until it says "ready"
    frame.style.cssText='position:absolute;inset:0;width:100%;height:100%;border:0;background:#0d0e0d;opacity:0;transition:opacity .18s ease-out;';
    const ownFrame = frame;
    const reveal = () => { if (frame === ownFrame) ownFrame.style.opacity = 1; };
    clearTimeout(revealTimer); revealTimer = setTimeout(reveal, 2500);
    const url = new URL('coche.html',location.href);
    url.searchParams.set('id',g.car); url.searchParams.set('lang',g.lang);
    url.searchParams.set('galleryOverlay','1'); url.hash='foto-'+g.shot;
    frame.src=url.href;
    dialog.append(frame,exit); document.body.append(dialog); dialog.showModal();
    fade(dialog, [{opacity:0}, {opacity:1}]);
    dialog.addEventListener('cancel',e=>{e.preventDefault();close();});
  }
  document.addEventListener('click',e=>{
    const target=e.target.closest('#sGal,#sThumbs button,#sGalGrid button,#sHero');
    if (!target || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button) return;
    const link = new URL(document.getElementById('sGal').href,location.href);
    const car = KARATS_CARS.find(c => c.id === link.searchParams.get('id') ||
      (window.carURL && new URL(carURL(c), location.href).pathname === link.pathname));
    const g={car:car?.id,shot:target.dataset.shot || KARATS_SHOTS[0][0],lang:window.KLang?.language || 'es'};
    if (!valid(g)) return;
    e.preventDefault(); e.stopImmediatePropagation();
    history.pushState({...history.state,showroomGallery:g},'',location.href);show(g);
  },true);
  // Do not let the showroom's keyboard handlers act behind the modal.
  addEventListener('keydown',e=>{
    if (!dialog) return;
    e.stopImmediatePropagation();
    if (e.key==='Escape') { e.preventDefault(); close(); }
  },true);
  addEventListener('message',e=>{
    if (!frame || e.origin!==location.origin || e.source!==frame.contentWindow) return;
    if (e.data?.type==='karats:gallery-close') close();
    if (e.data?.type==='karats:gallery-ready') {
      const readyFrame = frame;
      requestAnimationFrame(() => requestAnimationFrame(() => { if (frame === readyFrame) readyFrame.style.opacity = 1; }));
      dialog.querySelector('button').hidden=true; frame.focus();
    }
    if (e.data?.type==='karats:gallery-shot' && history.state?.showroomGallery && KARATS_SHOTS.some(s=>s[0]===e.data.shot)) {
      const state={...history.state,showroomGallery:{...history.state.showroomGallery,shot:e.data.shot}};
      history.replaceState(state,'',location.href);
    }
  });
  addEventListener('popstate',()=>{
    closing=false;
    const g=history.state?.showroomGallery;
    if (valid(g)) show(g); else hide();
  });
  if (valid(history.state?.showroomGallery)) show(history.state.showroomGallery);
})();
