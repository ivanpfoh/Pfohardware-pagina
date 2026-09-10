// Función helper para verificar elementos
function getElementSafe(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.log(`Elemento #${id} no encontrado en esta página`);
        return null;
    }
    return element;
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (href.length > 1 && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    });
});

// Gallery lightbox (solo si existe)
const modal = getElementSafe('modal');
const modalImg = getElementSafe('modalImg');

if (modal && modalImg) {
    document.querySelectorAll('.gallery img').forEach(img => {
        img.addEventListener('click', () => {
            modalImg.src = img.dataset.full || img.src;
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
        });
    });
    
    modal.addEventListener('click', () => { 
        modal.classList.remove('open'); 
        modal.setAttribute('aria-hidden', 'true'); 
    });
}

// Progressive reveal
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in').forEach((el, i) => { 
        el.style.animationDelay = (i * 80) + 'ms'; 
    });
});

// WhatsApp button (solo si existe)
const contactWhatsApp = getElementSafe("contactWhatsApp");
if (contactWhatsApp) {
    contactWhatsApp.addEventListener("click", function(e) {
        e.preventDefault();
        
        const phoneNumber = "";
        const isMobile = /mobile|android|iphone|ipad/.test(navigator.userAgent.toLowerCase());
        
        if (isMobile) {
            window.location.href = `https://wa.me/${phoneNumber}`;
        } else {
            window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}`, "_blank");
        }
    });
}

// Funciones de alerta (solo si existen)
function abrirAlerta() {
    const alertaFondo = getElementSafe('alertaFondo');
    if (alertaFondo) alertaFondo.style.display = 'flex';
}

function cerrarAlerta() {
    const alertaFondo = getElementSafe('alertaFondo');
    if (alertaFondo) alertaFondo.style.display = 'none';
}
// VERSIÓN EXTRA-SIMPLE QUE SÍ FUNCIONA - NO CAMBIAR
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Menú móvil funcionando - mantener simple');
    
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeBtn = document.getElementById('closeBtn');
    const navMobile = document.getElementById('navMobile');
    
    if (!hamburgerBtn || !closeBtn || !navMobile) {
        return;
    }
    
    // SOLO ESTO FUNCIONA - NO CAMBIAR
    hamburgerBtn.onclick = function() {
        navMobile.classList.add('open');
    };
    
    closeBtn.onclick = function() {
        navMobile.classList.remove('open');
    };
    
    console.log('✅ Menú simple funcionando perfecto');
});
let currentIndex = 0;
const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

function openModal(index) {
  currentIndex = index;
  lightbox.style.display = "block";
  showImage(currentIndex);
}

function closeModal() {
  lightbox.style.display = "none";
}

function changeSlide(step) {
  currentIndex += step;
  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;
  showImage(currentIndex);
}

function showImage(index) {
  lightboxImg.src = images[index].src;
}
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

