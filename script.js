const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const menu=$(".menu"),nav=$(".header nav");
menu?.addEventListener("click",()=>nav.classList.toggle("open"));
nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const meter=$(".scroll-meter");
addEventListener("scroll",()=>{const max=document.documentElement.scrollHeight-innerHeight;meter.style.width=(max?scrollY/max*100:0)+"%"},{passive:true});

const targets=$$(".about-grid,.fact-row,.work-item,.stack-row,.timeline-row,.recognition,.contact-bottom");
targets.forEach(x=>x.classList.add("reveal"));
if("IntersectionObserver" in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");io.unobserve(e.target)}}),{threshold:.12});targets.forEach(x=>io.observe(x))}else targets.forEach(x=>x.classList.add("show"));

$$(".work-art").forEach(el=>{
  el.addEventListener("pointermove",e=>{
    if(innerWidth<800)return;
    const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    el.style.transform=`perspective(1200px) rotateX(${-y*1.2}deg) rotateY(${x*1.2}deg)`;
  });
  el.addEventListener("pointerleave",()=>el.style.transform="");
});
