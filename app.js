// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
        const href=a.getAttribute('href');
        if(href.length>1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'});
    }
    });
});
// Gallery lightbox
const modal=document.getElementById('modal');
const modalImg=document.getElementById('modalImg');
document.querySelectorAll('.gallery img').forEach(img=>{
    img.addEventListener('click',()=>{
    modalImg.src = img.dataset.full || img.src;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    });
});
modal.addEventListener('click',()=>{ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); });
// Simple analytics: track clicks on contact button (client-side only)
document.getElementById('contactTop').addEventListener('click',()=>{
    console.log('Contact top clicked');
});
// Small progressive reveal
document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('.fade-in').forEach((el,i)=>{ el.style.animationDelay = (i*80)+'ms'; });
});
document.getElementById("contactWhatsApp").addEventListener("click", function(e) {
    e.preventDefault();
    
    const phoneNumber = "2974299737"; // tu número sin + ni espacios
    const userAgent = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone|ipad/.test(userAgent)) {
    // Si es celular → abrir WhatsApp directamente
        window.location.href = `https://wa.me/${phoneNumber}`;
    } else {
    // Si es PC → abrir WhatsApp Web
        window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}`, "_blank");
    }
});
function abrirAlerta() {
    document.getElementById('alertaFondo').style.display = 'flex';
}

function cerrarAlerta() {
    document.getElementById('alertaFondo').style.display = 'none';
}

