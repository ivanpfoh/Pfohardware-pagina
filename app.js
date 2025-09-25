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

// VERSIÓN MEJORADA DEL MENÚ MÓVIL
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - inicializando menú móvil');
    
    const hamburgerBtn = getElementSafe('hamburgerBtn');
    const closeBtn = getElementSafe('closeBtn');
    const navMobile = getElementSafe('navMobile');
    const navOverlay = getElementSafe('navOverlay');
    
    // Verificar que todos los elementos existen
    if (!hamburgerBtn || !closeBtn || !navMobile || !navOverlay) {
        console.log('No se encontraron todos los elementos del menú móvil');
        console.log('hamburgerBtn:', hamburgerBtn);
        console.log('closeBtn:', closeBtn);
        console.log('navMobile:', navMobile);
        console.log('navOverlay:', navOverlay);
        return;
    }
    
    console.log('Todos los elementos del menú móvil encontrados');
    
    // Función para abrir el menú
    function openMenu() {
        console.log('Abriendo menú móvil');
        navMobile.classList.add('open');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    }
    
    // Función para cerrar el menú
    function closeMenu() {
        console.log('Cerrando menú móvil');
        navMobile.classList.remove('open');
        navOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll del body
    }
    
    // Event listeners
    hamburgerBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    navOverlay.addEventListener('click', closeMenu);
    
    // Cerrar menú al hacer clic en enlaces (opcional)
    navMobile.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Prevenir que los clics dentro del menú lo cierren
    navMobile.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMobile.classList.contains('open')) {
            closeMenu();
        }
    });
    
    console.log('Menú móvil inicializado correctamente');
});

// Debug: Verificar que el script se está cargando
console.log('app.js cargado correctamente');