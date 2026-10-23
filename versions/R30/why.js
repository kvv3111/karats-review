/* Native scroll rails + one accessible, interruptible detail dialog. No tracking. */
(() => {
 'use strict';
 const modal = document.getElementById('why-dialog');
 if (!modal) return;
 const reduce = matchMedia('(prefers-reduced-motion: reduce)');
 const labels = {es:'Cerrar',ca:'Tancar',en:'Close',ru:'Закрыть'};
 const closeButton = modal.querySelector('.why-close');
 const title = modal.querySelector('h2');
 const detail = modal.querySelector('.why-dialog-copy');
 let trigger = null, motion = null, epoch = 0, lock = null;
 function lockPage() {
  if (lock) return;
  lock = {x:scrollX,y:scrollY,body:document.body.getAttribute('style'),root:document.documentElement.style.overflow};
  document.documentElement.style.overflow = 'hidden';
  Object.assign(document.body.style,{position:'fixed',top:`-${lock.y}px`,left:'0',right:'0',width:'100%'});
 }
 function unlockPage() {
  if (!lock) return;
  const saved = lock; lock = null;
  if (saved.body === null) document.body.removeAttribute('style'); else document.body.setAttribute('style',saved.body);
  document.documentElement.style.overflow = saved.root;
  window.scrollTo({left:saved.x,top:saved.y,behavior:'instant'});
 }
 function animateTo(open) {
  const token = ++epoch;
  const start = {opacity:getComputedStyle(modal).opacity,transform:getComputedStyle(modal).transform};
  if (motion) motion.cancel();
  const end = {opacity:open ? 1 : 0,transform:reduce.matches ? 'none' : (open ? 'translateY(0)' : 'translateY(12px)')};
  motion = modal.animate([start,end],{duration:reduce.matches?100:(open?240:180),easing:'cubic-bezier(.22,.8,.25,1)',fill:'forwards'});
  // The animation owns presentation now; its cancellation must reveal the settled CSS state.
  modal.style.opacity = ''; modal.style.transform = '';
  motion.finished.then(() => {
   if (token !== epoch) return;
   if (!open) { modal.close(); }
   if (motion) { motion.cancel(); motion = null; }
  }).catch(() => {});
 }
 function openCard(button) {
  const template = document.getElementById(button.dataset.detail);
  if (!template) return;
  trigger = button;
  title.textContent = button.querySelector('.why-title').textContent;
  detail.replaceChildren(template.content.cloneNode(true));
  modal.querySelector('.why-dialog-icon').innerHTML = button.querySelector('.why-icon').innerHTML;
  modal.lang = button.dataset.tileLang;
  closeButton.setAttribute('aria-label',labels[modal.lang] || labels.es);
  if (!modal.open) {
   lockPage(); modal.showModal(); modal.scrollTop = 0;
   modal.style.opacity = '0'; modal.style.transform = reduce.matches?'none':'translateY(12px)';
  }
  animateTo(true);
  closeButton.focus({preventScroll:true});
 }
 function closeCard() { if (modal.open) animateTo(false); }
 document.querySelectorAll('.why-card').forEach(button => button.addEventListener('click',() => openCard(button)));
 closeButton.addEventListener('click',closeCard);
 // The disclosure currently has one interactive control. Keep Tab inside,
 // including browsers that otherwise move focus into their browser chrome.
 modal.addEventListener('keydown',event => {
  if (event.key === 'Tab') { event.preventDefault(); closeButton.focus({preventScroll:true}); }
 });
 modal.addEventListener('cancel',event => { event.preventDefault(); closeCard(); });
 let downOutside = false;
 const outside = event => { const r=modal.getBoundingClientRect(); return event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom; };
 modal.addEventListener('pointerdown',event => { downOutside = event.target === modal && outside(event); });
 modal.addEventListener('click',event => { if (downOutside && event.target === modal && outside(event)) closeCard(); downOutside=false; });
 modal.addEventListener('close',() => {
  ++epoch;
  if (motion) { motion.cancel(); motion=null; }
  modal.style.opacity=''; modal.style.transform='';
  unlockPage();
  if (trigger && trigger.offsetParent) trigger.focus({preventScroll:true});
 });
 // A bfcache restore must not leave a locked document or an old dialog open.
 addEventListener('pagehide',() => { if (modal.open) modal.close(); unlockPage(); });
 const rails = [];
 document.querySelectorAll('.why-section').forEach(section => {
  const track = section.querySelector('.why-track');
  const controls = section.querySelector('.why-controls');
  const prev = controls.querySelector('.why-prev'), next = controls.querySelector('.why-next');
  const update = () => {
   if (!track.clientWidth) return;
   const max=track.scrollWidth-track.clientWidth;
   controls.hidden=max<2;
   prev.disabled=track.scrollLeft<2;
   next.disabled=track.scrollLeft>=max-2;
  };
  const move = direction => {
   const cards=[...track.children];
   const first=cards[0].offsetLeft;
   const pos=track.scrollLeft;
   const offsets=cards.map(card=>card.offsetLeft-first);
   const target=direction>0 ? offsets.find(x=>x>pos+4) : offsets.reverse().find(x=>x<pos-4);
   track.scrollTo({left:target===undefined?(direction>0?track.scrollWidth:0):target,behavior:reduce.matches?'instant':'smooth'});
  };
  prev.addEventListener('click',()=>move(-1)); next.addEventListener('click',()=>move(1));
  track.addEventListener('keydown',event => {
   if (event.target !== track) return;
   if (event.key==='ArrowRight'||event.key==='ArrowLeft') { event.preventDefault(); move(event.key==='ArrowRight'?1:-1); }
   if (event.key==='Home'||event.key==='End') { event.preventDefault(); track.scrollTo({left:event.key==='Home'?0:track.scrollWidth,behavior:'instant'}); }
  });
  let frame=0;
  track.addEventListener('scroll',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update);},{passive:true});
  new ResizeObserver(update).observe(track);
  rails.push(update); update();
 });
 addEventListener('karats:language',() => {
  if (modal.open) modal.close();
  requestAnimationFrame(()=>rails.forEach(update=>update()));
 });
})();
