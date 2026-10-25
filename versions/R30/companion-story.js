/* Companion pages only. Native scroll timelines first; batched fallback with no permanent loop. */
(() => {
 'use strict';
 const page=document.querySelector('.sp-page');
 if (!page) return;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const native=CSS.supports('animation-timeline:view()') && CSS.supports('animation-range:entry 0% entry 85%');
 const root=document.documentElement;
 let frame=0, anchors=[], heroes=[];
 const clamp=v=>Math.max(0,Math.min(1,v));
 function collect() {
  const active=page.querySelector('main > [data-lang]:not([hidden])');
  anchors=active?[...active.querySelectorAll('.motion-anchor')].map(el=>({el,child:el.firstElementChild})):[];
  heroes=active?[...active.querySelectorAll('.sh-frame')].map(el=>({el,card:el.querySelector('.sh-card'),image:el.querySelector('img')})):[];
 }
 function render() {
  frame=0;
  if (native || reduced.matches) return;
  const vh=innerHeight;
  // Complete geometry/style reads before any writes. No scroll interception.
  const a=anchors.map(o=>({...o,rect:o.el.getBoundingClientRect()}));
  const h=heroes.map(o=>({...o,rect:o.el.getBoundingClientRect(),s0:parseFloat(getComputedStyle(o.card).getPropertyValue('--s0'))||.94}));
  a.forEach(o=>{
   const p=clamp((vh-o.rect.top)/(Math.min(vh,o.rect.height)*.85));
   o.child.style.opacity=p.toFixed(4);
   o.child.style.transform=`translate3d(0,${((1-p)*48).toFixed(3)}px,0)`;
  });
  h.forEach(o=>{
   const p=clamp((vh*.7-o.rect.top)/(vh*.6));
   o.card.style.transform=`scale(${(o.s0+(1-o.s0)*p).toFixed(5)})`;
   o.image.style.transform=`scale(${(1.12-.12*p).toFixed(5)})`;
  });
 }
 const schedule=()=>{if(!frame&&!native&&!reduced.matches) frame=requestAnimationFrame(render);};
 function reset() {
  cancelAnimationFrame(frame); frame=0;
  page.querySelectorAll('.rv,.sh-card,.sh-card img').forEach(el=>{el.style.removeProperty('opacity');el.style.removeProperty('transform');});
  root.classList.toggle('sp-motion-fallback',!native&&!reduced.matches);
  collect(); schedule();
 }
 if (!native) {
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule,{passive:true});
  addEventListener('pageshow',reset);
  addEventListener('karats:language',reset);
  reduced.addEventListener('change',reset);
  new MutationObserver(()=>{collect();schedule();}).observe(page.querySelector('main'),{subtree:true,attributes:true,attributeFilter:['hidden']});
  document.fonts.ready.then(reset);
 }
 addEventListener('pagehide',()=>{cancelAnimationFrame(frame);frame=0;});
 reset();
 window.__companionStory=()=>({native,reduced:reduced.matches,pending:!!frame});
})();
