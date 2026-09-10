"use strict";
// Número de WhatsApp en formato internacional, solo dígitos.
// Para un celular argentino: 549 + código de área + número, sin 0 ni 15.
// Mientras quede vacío, el botón se oculta para evitar enlaces sin destino.
const WHATSAPP_NUMBER = "";
const menu = document.querySelector(".menu");
const nav = document.querySelector("#nav");
function closeMenu(){nav?.classList.remove("open");menu?.setAttribute("aria-expanded","false");menu?.setAttribute("aria-label","Abrir menú");}
if(menu){menu.setAttribute("aria-label","Abrir menú");menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?"Cerrar menú":"Abrir menú");});}
nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeMenu();}});
if(/^\d{8,15}$/.test(WHATSAPP_NUMBER)){document.querySelectorAll("[data-whatsapp]").forEach(a=>{a.href="https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent("Hola Iván, quisiera consultar por mi equipo.");a.hidden=false;a.target="_blank";a.rel="noopener noreferrer";});}
const photos=[...document.querySelectorAll("[data-gallery]")];
const lightbox=document.querySelector("#lightbox");
let current=0;
function showPhoto(index){current=(index+photos.length)%photos.length;const photo=photos[current];const img=lightbox.querySelector("img");img.src=photo.href;img.alt=photo.querySelector("img").alt;lightbox.querySelector("figcaption").textContent=img.alt;}
photos.forEach((a,i)=>a.addEventListener("click",e=>{if(typeof lightbox?.showModal!=="function")return;e.preventDefault();showPhoto(i);lightbox.showModal();}));
lightbox?.querySelector(".lightbox-close").addEventListener("click",()=>lightbox.close());
lightbox?.querySelector("[data-prev]").addEventListener("click",()=>showPhoto(current-1));
lightbox?.querySelector("[data-next]").addEventListener("click",()=>showPhoto(current+1));
lightbox?.addEventListener("keydown",e=>{if(e.key==="ArrowLeft"){e.preventDefault();showPhoto(current-1);}if(e.key==="ArrowRight"){e.preventDefault();showPhoto(current+1);}});
lightbox?.addEventListener("click",e=>{if(e.target===lightbox){const b=lightbox.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)lightbox.close();}});
// El HTML original alternaba notebook1.jpeg y notebook1.jpg.
document.querySelectorAll('img[src="notebook1.jpeg"]').forEach(img=>img.addEventListener("error",()=>{img.src="notebook1.jpg";img.closest("a").href="notebook1.jpg";},{once:true}));

