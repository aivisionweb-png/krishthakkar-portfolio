const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const meter=$(".scroll-meter"),menu=$(".menu"),nav=$(".header nav");
menu?.addEventListener("click",()=>{nav.classList.toggle("open");menu.setAttribute("aria-expanded",nav.classList.contains("open"))});
nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
addEventListener("scroll",()=>{const max=document.documentElement.scrollHeight-innerHeight;meter.style.width=(max?scrollY/max*100:0)+"%"},{passive:true});
if(!reduce&&window.gsap&&window.ScrollTrigger){
 gsap.registerPlugin(ScrollTrigger);
 const loader=document.createElement("div");loader.className="loader";loader.innerHTML='<div style="position:fixed;inset:0;background:#071018;z-index:500;display:grid;place-items:center;color:#f4f1e8;font:11px DM Mono,monospace"><div style="text-align:center"><div style="color:#36e0c7;letter-spacing:.18em">KRISH THAKKAR</div><div style="font:italic 50px Instrument Serif,serif;margin:10px 0">Building ideas.</div><div style="width:180px;height:1px;background:#ffffff22"><i style="display:block;width:0;height:100%;background:#36e0c7"></i></div></div></div>';document.body.prepend(loader);
 gsap.to(loader.querySelector("i"),{width:"100%",duration:1.1,ease:"power2.inOut"});gsap.to(loader.firstChild,{opacity:0,duration:.45,delay:1.05,onComplete:()=>loader.remove()});
 const chars=el=>{if(!el)return[];const nodes=[];const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);while(w.nextNode())nodes.push(w.currentNode);nodes.forEach(n=>{const f=document.createDocumentFragment();[...n.textContent].forEach(c=>{const s=document.createElement("span");s.textContent=c===" "?"\u00a0":c;s.style.display="inline-block";f.append(s)});n.replaceWith(f)});return [...el.querySelectorAll("span")]};
 const heroChars=chars($(".hero-title h1"));
 gsap.from(heroChars,{y:"120%",rotateX:-70,opacity:0,stagger:.018,duration:1,ease:"power4.out",delay:1.35});
 gsap.from(".portrait-wrap",{scale:1.12,opacity:0,rotate:5,duration:1.3,ease:"expo.out",delay:1.2});
 gsap.from(".hero-copy>*",{y:30,opacity:0,stagger:.08,duration:.65,ease:"power3.out",delay:1.35});
 gsap.from(".header",{y:-80,opacity:0,duration:.8,delay:1.1});
 if(matchMedia("(hover:hover) and (pointer:fine)").matches){
  const c=document.createElement("div"),d=document.createElement("div"),l=document.createElement("div");c.className="motion-cursor";d.className="motion-cursor-dot";l.className="motion-cursor-label";l.textContent="OPEN";document.body.append(c,d,l);
  addEventListener("pointermove",e=>{gsap.to(c,{x:e.clientX,y:e.clientY,duration:.18});gsap.to(d,{x:e.clientX,y:e.clientY,duration:.03});gsap.to(l,{x:e.clientX+14,y:e.clientY+14,duration:.2})},{passive:true});
  $$("a,button,.tags b").forEach(x=>{x.addEventListener("mouseenter",()=>{gsap.to(c,{scale:2.7});gsap.to(l,{opacity:1})});x.addEventListener("mouseleave",()=>{gsap.to(c,{scale:1});gsap.to(l,{opacity:0})})});
 }
 gsap.to(".hero-title",{yPercent:-17,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1}});
 gsap.to(".portrait-wrap",{yPercent:20,rotate:-4,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1.2}});
 gsap.to(".portrait img",{scale:1.2,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1.4}});
 $$(".about-grid h2,.work-intro h2,.stack-head h2,.journey-head h2,.contact-title").forEach(el=>{const cs=chars(el);gsap.from(cs,{y:"105%",rotateX:-70,opacity:0,stagger:.018,duration:.8,ease:"power4.out",scrollTrigger:{trigger:el,start:"top 83%",toggleActions:"play none none reverse"}})});
 $$(".about-text p,.fact-row>div,.work-item,.stack-row,.timeline-row,.recognition b,.contact-bottom").forEach((el,i)=>gsap.from(el,{y:45,opacity:0,duration:.7,delay:(i%4)*.05,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%",toggleActions:"play none none reverse"}}));
 $$(".work-art").forEach((el,i)=>{gsap.from(el,{clipPath:"inset(0 100% 0 0)",scale:1.05,duration:1.1,ease:"expo.inOut",scrollTrigger:{trigger:el,start:"top 80%",toggleActions:"play none none reverse"}});gsap.to(el,{y:-35,scale:1.025,ease:"none",scrollTrigger:{trigger:el,start:"top bottom",end:"bottom top",scrub:1}})});
 gsap.to(".signal-track",{xPercent:-50,ease:"none",scrollTrigger:{trigger:".signal",start:"top bottom",end:"bottom top",scrub:.4}});
 $$(".cloth-object").forEach(x=>gsap.to(x,{y:-18,rotate:3,repeat:-1,yoyo:true,duration:2.4,ease:"sine.inOut"}));
 $$(".rapid-cells span").forEach((x,i)=>gsap.to(x,{y:-10,repeat:-1,yoyo:true,duration:1.5+i*.15,delay:i*.1,ease:"sine.inOut"}));
 gsap.to(".contact-title",{y:-55,scale:1.04,ease:"none",scrollTrigger:{trigger:".contact",start:"top bottom",end:"bottom top",scrub:1}});
 $$(".header nav a").forEach(a=>{const id=a.getAttribute("href")?.slice(1),s=id&&$("#"+id);if(s)ScrollTrigger.create({trigger:s,start:"top 45%",end:"bottom 45%",onEnter:()=>a.classList.add("active"),onEnterBack:()=>a.classList.add("active"),onLeave:()=>a.classList.remove("active"),onLeaveBack:()=>a.classList.remove("active")})});
}else{$$(".about-grid,.fact-row,.work-item,.stack-row,.timeline-row,.recognition,.contact-bottom").forEach(x=>x.classList.add("show"))}


/* --- tactile motion layer --- */
if(!reduce){
 const visuals=$$(".project-visual");
 visuals.forEach(v=>{
   v.addEventListener("pointermove",e=>{
     const r=v.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
     v.style.setProperty("--mx",(x*18)+"px");v.style.setProperty("--my",(y*18)+"px");
     const img=v.querySelector("img"); if(img) img.style.transform="translate("+(-x*12)+"px,"+(-y*12)+"px) scale(1.06)";
   });
   v.addEventListener("pointerleave",()=>{
     v.style.setProperty("--mx","0px");v.style.setProperty("--my","0px");
     const img=v.querySelector("img");if(img) img.style.transform="";
   });
 });
 $$(".hero-links a,.project-link").forEach(btn=>{
   btn.addEventListener("pointermove",e=>{
     const r=btn.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*.12,y=(e.clientY-r.top-r.height/2)*.12;
     btn.style.transform="translate("+x+"px,"+y+"px)";
   });
   btn.addEventListener("pointerleave",()=>btn.style.transform="");
 });
 const floaters=$$(".portrait-label,.portrait-stamp");
 floaters.forEach((el,i)=>gsap.to(el,{y:i?6:-5,rotate:i?-8:2,duration:2.4+i*.4,repeat:-1,yoyo:true,ease:"sine.inOut"}));
 $$(".fact-row>div").forEach((el,i)=>gsap.to(el,{y:i%2?8:-8,duration:2.2+i*.2,repeat:-1,yoyo:true,ease:"sine.inOut",scrollTrigger:{trigger:".fact-row",start:"top 85%",toggleActions:"play pause resume pause"}}));
}
