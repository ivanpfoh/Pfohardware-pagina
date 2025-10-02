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
        
        const phoneNumber = "2974299737";
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
