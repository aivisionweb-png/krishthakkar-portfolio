const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const menu=$(".menu"),nav=$(".header nav");

menu?.addEventListener("click",()=>{nav.classList.toggle("open");menu.setAttribute("aria-expanded",nav.classList.contains("open"))});
nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const meter=$(".scroll-meter");
addEventListener("scroll",()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  meter.style.width=(max?scrollY/max*100:0)+"%";
},{passive:true});

if(reduce){
  $$(".reveal").forEach(x=>x.classList.add("show"));
}else if(window.gsap&&window.ScrollTrigger){
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- DOM MOTION LAYERS ---------- */
  const loader=document.createElement("div");
  loader.className="loader";
  loader.innerHTML=`
    <div class="loader-inner">
      <div class="loader-kicker"><span>KRISH THAKKAR / PORTFOLIO</span><span>2026</span></div>
      <div class="loader-name"><span>K</span><span>R</span><span>I</span><span>S</span><span>H</span></div>
      <div class="loader-bar"><i></i></div>
      <div class="loader-count">00</div>
    </div>`;
  document.body.prepend(loader);

  const cursor=document.createElement("div");
  cursor.className="motion-cursor";
  document.body.append(cursor);
  const dot=document.createElement("div");
  dot.className="motion-cursor-dot";
  document.body.append(dot);
  const cursorLabel=document.createElement("div");
  cursorLabel.className="motion-cursor-label";
  cursorLabel.textContent="OPEN";
  document.body.append(cursorLabel);

  /* ---------- TEXT SPLITTING ---------- */
  const splitChars=el=>{
    if(!el||el.dataset.split)return [];
    const walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(walk.nextNode())nodes.push(walk.currentNode);
    nodes.forEach(node=>{
      const frag=document.createDocumentFragment();
      [...node.textContent].forEach(ch=>{
        const s=document.createElement("span");
        s.className="char";
        s.textContent=ch===" "?"\u00a0":ch;
        frag.append(s);
      });
      node.parentNode.replaceChild(frag,node);
    });
    el.dataset.split="1";
    return $$(".char",el);
  };
  const qsa=(root,sel)=>[...root.querySelectorAll(sel)];

  const heroChars=splitChars($(".hero-title h1"));
  const outlineChars=splitChars($(".outline"));
  const titleChars=[
    ...$$(".about-grid h2,.work-intro h2,.stack-head h2,.journey-head h2,.contact-title").flatMap(splitChars)
  ];

  /* ---------- LOADER / ENTRY ---------- */
  const loadTl=gsap.timeline();
  loadTl
    .to(".loader-name span",{y:0,stagger:.07,duration:.75,ease:"power4.out"})
    .to(".loader-bar i",{width:"100%",duration:1.35,ease:"power2.inOut"},"-=.55")
    .to(".loader-count",{duration:1.35,textContent:100,ease:"power2.inOut",snap:{textContent:1},onUpdate(){
      $(".loader-count").textContent=String(Math.round(Number($(".loader-count").textContent))).padStart(2,"0");
    }},"<")
    .to(".loader-inner",{y:-20,opacity:0,duration:.45,ease:"power2.in"})
    .to(".loader",{clipPath:"inset(0 0 100% 0)",duration:1.05,ease:"expo.inOut",onComplete(){
      loader.remove();
      ScrollTrigger.refresh();
    }});

  const intro=gsap.timeline({defaults:{ease:"power4.out"}});
  intro
    .from(".header",{y:-90,opacity:0,duration:.9},0)
    .from(".hero-meta span",{y:20,opacity:0,stagger:.08,duration:.65},.15)
    .from(heroChars,{y:"120%",rotateX:-80,opacity:0,stagger:.025,duration:1.1},"-=.25")
    .from(outlineChars,{y:"120%",opacity:0,stagger:.018,duration:.8},"-=.85")
    .from(".hero-copy > *",{y:35,opacity:0,stagger:.11,duration:.7},"-=.6")
    .from(".portrait-wrap",{scale:1.18,opacity:0,rotate:5,duration:1.4,ease:"expo.out"},"-=1")
    .from(".portrait-label,.portrait-stamp",{scale:0,opacity:0,stagger:.12,duration:.55,ease:"back.out(1.8)"},"-=.7")
    .from(".hero-foot",{y:25,opacity:0,duration:.6},"-=.35")
    .from(".signal",{scaleY:0,transformOrigin:"top",duration:.65},"-=.2");

  /* ---------- CURSOR ---------- */
  let mx=innerWidth/2,my=innerHeight/2;
  addEventListener("pointermove",e=>{mx=e.clientX;my=e.clientY},{passive:true});
  gsap.ticker.add(()=>{
    gsap.to(cursor,{x:mx,y:my,duration:.18,ease:"power3.out",overwrite:true});
    gsap.to(dot,{x:mx,y:my,duration:.04,overwrite:true});
    gsap.to(cursorLabel,{x:mx+14,y:my+14,duration:.2,ease:"power2.out",overwrite:true});
  });
  const interactive=$$("a,button,.work-art,.stack-row b");
  interactive.forEach(el=>{
    el.addEventListener("mouseenter",()=>{
      gsap.to(cursor,{scale:2.8,duration:.25,ease:"power3.out"});
      gsap.to(dot,{scale:.35,duration:.25});
      if(el.matches("a,button"))gsap.to(cursorLabel,{opacity:1,duration:.2});
    });
    el.addEventListener("mouseleave",()=>{
      gsap.to(cursor,{scale:1,duration:.3,ease:"elastic.out(1,.55)"});
      gsap.to(dot,{scale:1,duration:.2});
      gsap.to(cursorLabel,{opacity:0,duration:.15});
    });
  });

  /* ---------- HERO PARALLAX ---------- */
  gsap.to(".hero-title",{yPercent:-18,xPercent:-2,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1.2}});
  gsap.to(".hero-copy",{yPercent:-34,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1}});
  gsap.to(".portrait-wrap",{yPercent:22,rotate:-4,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1.3}});
  gsap.to(".portrait img",{scale:1.28,xPercent:-5,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1.5}});
  gsap.to(".hero-meta",{y:-45,opacity:.35,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1}});
  gsap.to(".hero::after",{x:"0%"}); // harmless CSS-only layer fallback

  /* ---------- MOUSE DEPTH ---------- */
  const hero=$(".hero");
  hero?.addEventListener("pointermove",e=>{
    const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    gsap.to(".hero-title",{x:x*18,y:y*12,duration:.8,ease:"power3.out",overwrite:true});
    gsap.to(".portrait-wrap",{x:x*-24,y:y*-18,duration:1,ease:"power3.out",overwrite:true});
    gsap.to(".portrait",{rotate:1.5+x*2.5,duration:.8,ease:"power3.out",overwrite:true});
    gsap.to(".hero-copy",{x:x*10,duration:1,ease:"power3.out",overwrite:true});
  });

  /* ---------- SECTION REVEALS ---------- */
  $$(".section-light,.journey,.contact").forEach(section=>{
    gsap.from(section,{opacity:.5,scale:.985,duration:1,ease:"power2.out",scrollTrigger:{trigger:section,start:"top 88%",toggleActions:"play none none reverse"}});
    const line=section.querySelector(":scope::before");
    if(line)gsap.to(line,{scaleX:1,duration:1.2,scrollTrigger:{trigger:section,start:"top 75%",toggleActions:"play none none reverse"}});
  });

  titleChars.forEach((chars,i)=>{
    if(!chars.length)return;
    gsap.from(chars,{y:"110%",rotateX:-75,opacity:0,stagger:.025,duration:.85,ease:"power4.out",scrollTrigger:{trigger:chars[0].closest("h2,.contact-title"),start:"top 82%",toggleActions:"play none none reverse"}});
  });

  $$(".about-text p").forEach((el,i)=>gsap.from(el,{x:40,opacity:0,duration:.8,delay:i*.06,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%",toggleActions:"play none none reverse"}}));
  $$(".fact-row>div").forEach((el,i)=>gsap.from(el,{y:70,opacity:0,scale:.92,duration:.7,delay:i*.08,ease:"back.out(1.4)",scrollTrigger:{trigger:".fact-row",start:"top 85%",toggleActions:"play none none reverse"}}));

  /* ---------- WORK: CINEMATIC PIN/ZOOM ---------- */
  $$(".work-item").forEach((item,i)=>{
    const art=item.querySelector(".work-art");
    const heading=item.querySelector("h3");
    gsap.from(item.querySelector(".work-number"),{x:-35,opacity:0,duration:.7,scrollTrigger:{trigger:item,start:"top 82%",toggleActions:"play none none reverse"}});
    gsap.from(heading,{x:-80,opacity:0,skewX:-8,duration:1,ease:"power4.out",scrollTrigger:{trigger:item,start:"top 82%",toggleActions:"play none none reverse"}});
    gsap.from(art,{clipPath:"inset(0 100% 0 0)",scale:1.08,duration:1.25,ease:"expo.inOut",scrollTrigger:{trigger:item,start:"top 72%",toggleActions:"play none none reverse"}});
    gsap.to(art,{y:-55,scale:1.04,ease:"none",scrollTrigger:{trigger:item,start:"top bottom",end:"bottom top",scrub:1.1}});
    gsap.to(art.querySelector(".art-main strong,.trip-copy strong,.cloth-word,.rapid-ui strong"),{y:-45,x:i%2?25:-25,ease:"none",scrollTrigger:{trigger:item,start:"top bottom",end:"bottom top",scrub:1.2}});
    gsap.to(art.querySelector(".bringit::after"),{rotation:80}); 
    art.addEventListener("mouseenter",()=>{art.classList.add("is-active");gsap.to(art,{scale:1.015,duration:.45,ease:"power3.out"})});
    art.addEventListener("mouseleave",()=>{art.classList.remove("is-active");gsap.to(art,{scale:1,duration:.55,ease:"elastic.out(1,.5)"})});
  });

  /* ---------- ART-SPECIFIC MOTION ---------- */
  $$(".bringit").forEach(el=>gsap.to(el.querySelector(":after"),{rotation:360,duration:14,repeat:-1,ease:"none"}));
  $$(".trip-lines").forEach(el=>gsap.to(el,{backgroundPosition:"260px 260px",duration:8,repeat:-1,ease:"none"}));
  $$(".cloth-object").forEach(el=>gsap.to(el,{y:-20,rotation:2,duration:2.8,repeat:-1,yoyo:true,ease:"sine.inOut"}));
  $$(".rapid-cells span").forEach((el,i)=>gsap.to(el,{y:-12,duration:1.8+i*.15,repeat:-1,yoyo:true,ease:"sine.inOut",delay:i*.12}));

  /* ---------- STACK / TIMELINE ---------- */
  $$(".stack-row").forEach((row,i)=>{
    gsap.from(row,{x:i%2?-80:80,opacity:0,duration:.9,ease:"power4.out",scrollTrigger:{trigger:row,start:"top 88%",toggleActions:"play none none reverse"}});
    gsap.from(row.querySelectorAll("b"),{y:25,opacity:0,scale:.85,stagger:.04,duration:.45,ease:"back.out(1.7)",scrollTrigger:{trigger:row,start:"top 82%",toggleActions:"play none none reverse"}});
  });
  gsap.to(".timeline::before",{scaleY:1,duration:2.2,ease:"power2.out",scrollTrigger:{trigger:".timeline",start:"top 78%",end:"bottom 70%",scrub:1}});
  $$(".timeline-row").forEach((row,i)=>gsap.from(row,{x:i%2?-55:55,opacity:0,duration:.85,scrollTrigger:{trigger:row,start:"top 86%",toggleActions:"play none none reverse"}}));
  $$(".recognition b").forEach((el,i)=>gsap.from(el,{y:30,rotation:i%2?4:-4,opacity:0,scale:.7,duration:.6,delay:i*.08,ease:"back.out(1.8)",scrollTrigger:{trigger:".recognition",start:"top 82%",toggleActions:"play none none reverse"}}));

  /* ---------- CONTACT FINALE ---------- */
  gsap.to(".contact-title",{y:-80,scale:1.08,ease:"none",scrollTrigger:{trigger:".contact",start:"top bottom",end:"bottom top",scrub:1.2}});
  gsap.from(".contact-bottom",{y:90,opacity:0,duration:1,ease:"power4.out",scrollTrigger:{trigger:".contact-bottom",start:"top 85%",toggleActions:"play none none reverse"}});
  gsap.to(".contact-title i",{rotation:-3,x:20,ease:"none",scrollTrigger:{trigger:".contact",start:"top bottom",end:"bottom top",scrub:1}});

  /* ---------- MAGNETIC LINKS ---------- */
  $$(".red-button,.contact-bottom a,.availability,.brand").forEach(el=>{
    el.addEventListener("pointermove",e=>{
      const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;
      gsap.to(el,{x:x*.16,y:y*.16,duration:.35,ease:"power3.out"});
    });
    el.addEventListener("pointerleave",()=>gsap.to(el,{x:0,y:0,duration:.7,ease:"elastic.out(1,.45)"}));
  });

  /* ---------- SCROLL VELOCITY DISTORTION ---------- */
  let last=scrollY,vel=0;
  addEventListener("scroll",()=>{
    vel=scrollY-last;last=scrollY;
  },{passive:true});
  gsap.ticker.add(()=>{
    const skew=Math.max(-2.5,Math.min(2.5,vel*.045));
    gsap.to(".work-art,.hero-title,.contact-title",{skewY:skew,duration:.35,ease:"power2.out",overwrite:true});
    vel*=.82;
  });

  /* ---------- ACTIVE NAV ---------- */
  const sections=["work","about","stack","contact"].map(id=>$("#"+id)).filter(Boolean);
  sections.forEach(sec=>{
    ScrollTrigger.create({trigger:sec,start:"top 45%",end:"bottom 45%",onEnter:()=>nav?.querySelector(`a[href="#${sec.id}"]`)?.classList.add("active"),onEnterBack:()=>nav?.querySelector(`a[href="#${sec.id}"]`)?.classList.add("active"),onLeave:()=>nav?.querySelector(`a[href="#${sec.id}"]`)?.classList.remove("active"),onLeaveBack:()=>nav?.querySelector(`a[href="#${sec.id}"]`)?.classList.remove("active")});
  });

  /* ---------- RESPONSIVE REFRESH ---------- */
  addEventListener("resize",()=>ScrollTrigger.refresh(),{passive:true});
  ScrollTrigger.refresh();
}else{
  const targets=$$(".about-grid,.fact-row,.work-item,.stack-row,.timeline-row,.recognition,.contact-bottom");
  targets.forEach(x=>x.classList.add("reveal","show"));
}

nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));


/* ===== MOBILE CINEMATIC MOTION ===== */
if(!reduce && window.gsap && window.ScrollTrigger){
  const mobile=window.matchMedia('(max-width:800px)').matches;
  if(mobile){
    const m=gsap.matchMedia();
    m.add('(max-width:800px)',()=>{
      gsap.utils.toArray('.hero-meta span,.hero-copy > *,.hero-foot span').forEach((el,i)=>{
        gsap.from(el,{y:24,opacity:0,delay:i*.05,duration:.65,ease:'power3.out',scrollTrigger:{trigger:'.hero',start:'top top',toggleActions:'play none none reverse'}});
      });
      gsap.to('.hero-title',{y:-70,x:10,rotate:-1.5,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.65}});
      gsap.to('.portrait-wrap',{y:55,x:-8,rotate:4,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.8}});
      gsap.to('.portrait img',{scale:1.22,xPercent:-7,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.9}});
      gsap.utils.toArray('.work-art').forEach((el,i)=>{
        gsap.fromTo(el,{y:70,scale:.92,rotate:i%2?-2:2,opacity:.35},{y:0,scale:1,rotate:0,opacity:1,duration:1.05,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 92%',end:'top 52%',scrub:1}});
        gsap.to(el,{y:-24,scale:1.035,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:1.2}});
      });
      gsap.utils.toArray('.work-head h3').forEach((el,i)=>gsap.from(el,{x:i%2?-45:45,opacity:0,skewX:i%2?5:-5,duration:.8,ease:'power4.out',scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none reverse'}}));
      gsap.utils.toArray('.fact-row>div').forEach((el,i)=>gsap.from(el,{y:45,scale:.9,opacity:0,rotation:i%2?2:-2,duration:.6,delay:i*.05,ease:'back.out(1.7)',scrollTrigger:{trigger:'.fact-row',start:'top 88%',toggleActions:'play none none reverse'}}));
      gsap.utils.toArray('.stack-row').forEach((el,i)=>gsap.from(el,{x:i%2?-45:45,opacity:0,duration:.75,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%',toggleActions:'play none none reverse'}}));
      gsap.utils.toArray('.stack-row b').forEach((el,i)=>gsap.from(el,{y:18,scale:.8,opacity:0,duration:.38,delay:(i%7)*.035,ease:'back.out(1.8)',scrollTrigger:{trigger:el.closest('.stack-row'),start:'top 90%',toggleActions:'play none none reverse'}}));
      gsap.utils.toArray('.timeline-row').forEach((el,i)=>gsap.from(el,{x:i%2?-35:35,opacity:0,duration:.75,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',toggleActions:'play none none reverse'}}));
      gsap.to('.journey .section-tag',{x:24,ease:'none',scrollTrigger:{trigger:'.journey',start:'top bottom',end:'bottom top',scrub:1}});
      gsap.to('.contact-title',{y:-55,scale:1.04,ease:'none',scrollTrigger:{trigger:'.contact',start:'top bottom',end:'bottom top',scrub:1}});
      gsap.utils.toArray('.contact-bottom a').forEach((el,i)=>gsap.from(el,{x:30,opacity:0,duration:.55,delay:i*.08,scrollTrigger:{trigger:'.contact-bottom',start:'top 88%',toggleActions:'play none none reverse'}}));
      ScrollTrigger.refresh();
    });
  }
}
