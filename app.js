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
// VERSIÓN SIMPLIFICADA - GARANTIZADA
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeBtn = document.getElementById('closeBtn');
    const navMobile = document.getElementById('navMobile');
    const navOverlay = document.getElementById('navOverlay');
    
    if (hamburgerBtn && navMobile) {
        // ABRIR MENÚ
        hamburgerBtn.addEventListener('click', function() {
            navMobile.classList.add('open');
            navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // CERRAR MENÚ
        function closeMenu() {
            navMobile.classList.remove('open');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        closeBtn.addEventListener('click', closeMenu);
        navOverlay.addEventListener('click', closeMenu);
        
        // LOS LINKS FUNCIONAN NORMALMENTE - SIN JavaScript que los bloquee
        // El menú se cierra automáticamente al cambiar de página
        
        // CERRAR CON ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMenu();
            }
        });
    }
});
document.querySelectorAll('.nav-mobile-link').forEach(link => {
    link.addEventListener('click', function(e) {
        console.log('Click en link:', this.href);
        console.log('Página actual:', window.location.href);
    });
});