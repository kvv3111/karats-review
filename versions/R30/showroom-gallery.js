/* Gallery belongs to the live showroom; the car document is only the photo renderer. */
(() => {
  'use strict';
  let dialog = null, frame = null, opener = null, closing = false;
  const tr = s => window.KLang ? KLang.translate(s) : s;
  const valid = g => g && KARATS_CARS.some(c => c.id === g.car) && KARATS_SHOTS.some(s => s[0] === g.shot);
  function hide() {
    if (!dialog) return;
    dialog.close(); dialog.remove(); dialog = frame = null;
    if (opener?.isConnected) opener.focus({ preventScroll:true });
    opener = null;
  }
  function close() {
    if (closing || !dialog) return;
    if (history.state?.showroomGallery) { closing = true; history.back(); }
    else hide();
  }
  function show(g) {
    if (dialog || !valid(g)) return;
    opener = document.activeElement;
    dialog = document.createElement('dialog'); dialog.id = 'showroomGallery';
    dialog.setAttribute('aria-label',tr('Galería'));
    dialog.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;max-width:none;max-height:none;margin:0;padding:0;border:0;background:#0d0e0d;color:white;overflow:hidden;';
    const exit = document.createElement('button');
    exit.type='button'; exit.textContent='×'; exit.setAttribute('aria-label',tr('Cerrar'));
    exit.style.cssText='position:absolute;right:12px;top:calc(10px + env(safe-area-inset-top));z-index:2;width:44px;height:44px;border:0;border-radius:50%;background:#333;color:white;font-size:28px;cursor:pointer;';
    exit.onclick=close;
    frame = document.createElement('iframe'); frame.title = tr('Galería');
    frame.style.cssText='position:absolute;inset:0;width:100%;height:100%;border:0;background:#0d0e0d;';
    const url = new URL('coche.html',location.href);
    url.searchParams.set('id',g.car); url.searchParams.set('lang',g.lang);
    url.searchParams.set('galleryOverlay','1'); url.hash='foto-'+g.shot;
    frame.src=url.href;
    dialog.append(frame,exit); document.body.append(dialog); dialog.showModal();
    dialog.addEventListener('cancel',e=>{e.preventDefault();close();});
  }
  document.addEventListener('click',e=>{
    const target=e.target.closest('#sGal,#sThumbs button');
    if (!target || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button) return;
    const link = new URL(document.getElementById('sGal').href,location.href);
    const g={car:link.searchParams.get('id'),shot:target.dataset.shot || KARATS_SHOTS[0][0],lang:window.KLang?.language || 'es'};
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
