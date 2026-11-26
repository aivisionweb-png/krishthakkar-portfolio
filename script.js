const $=(s)=>document.querySelector(s), $$=(s)=>document.querySelectorAll(s);
const menu=$(".menu"),nav=$(".nav-center");
menu?.addEventListener("click",()=>nav.classList.toggle("open"));
nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const progress=$(".progress");
window.addEventListener("scroll",()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(h>0?scrollY/h*100:0)+"%";},{passive:true});

const targets=$$(".manifesto-grid,.numbers,.project,.stack-row,.time,.recognition,.contact-grid");
targets.forEach(el=>el.classList.add("reveal"));
if("IntersectionObserver" in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("on");io.unobserve(e.target)}}),{threshold:.12});targets.forEach(el=>io.observe(el));}else targets.forEach(el=>el.classList.add("on"));

const dot=$(".cursor-dot"),ring=$(".cursor-ring");
if(dot&&ring){let mx=0,my=0,rx=0,ry=0;window.addEventListener("pointermove",e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+"px";dot.style.top=my+"px";});const loop=()=>{rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.left=rx+"px";ring.style.top=ry+"px";requestAnimationFrame(loop)};loop();$$("a,button,.project-visual,.stack-row b").forEach(el=>{el.addEventListener("mouseenter",()=>{ring.style.width="52px";ring.style.height="52px";ring.style.borderColor="#E7B85B"});el.addEventListener("mouseleave",()=>{ring.style.width="35px";ring.style.height="35px";ring.style.borderColor="#32D6C099"})})}

$$(".project-visual").forEach(card=>{card.addEventListener("pointermove",e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${-y*2}deg) rotateY(${x*2}deg) scale(1.012)`});card.addEventListener("pointerleave",()=>card.style.transform="")});
