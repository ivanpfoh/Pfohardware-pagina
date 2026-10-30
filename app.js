"use strict";

document.documentElement.classList.remove("no-js");

// ==========================================
// Navegación / Menú móvil
// ==========================================
const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav");

function closeMenu() {
  if (!nav) return;
  nav.classList.remove("open");
  menu?.setAttribute("aria-expanded", "false");
  menu?.setAttribute("aria-label", "Abrir menú");
}

function openMenu() {
  if (!nav) return;
  nav.classList.add("open");
  menu?.setAttribute("aria-expanded", "true");
  menu?.setAttribute("aria-label", "Cerrar menú");
}

if (menu && nav) {
  menu.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.contains("open") ? closeMenu() : openMenu();
  });

  // Cerrar el menú al elegir un enlace; si apunta a esta misma página, desplazarse suave
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", (e) => {
      closeMenu();
      const href = a.getAttribute("href") || "";
      const [pathPart, hashPart] = href.split("#");
      const currentPath = window.location.pathname;
      const mismaPagina = !pathPart || currentPath.endsWith(pathPart) ||
        (pathPart === "index.html" && (currentPath.endsWith("/") || currentPath === ""));
      if (hashPart && mismaPagina) {
        const destino = document.getElementById(hashPart);
        if (destino) {
          e.preventDefault();
          destino.scrollIntoView({ behavior: "smooth", block: "start" });
          try { history.pushState(null, "", "#" + hashPart); } catch (_) {}
        }
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (nav.classList.contains("open") && !nav.contains(e.target) && !menu.contains(e.target)) closeMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

// ==========================================
// Email con una guía para la consulta
// ==========================================
const EMAIL = "ivanpfohh85@gmail.com";
document.querySelectorAll("[data-mail]").forEach(a => {
  const asunto = "Consulta desde la web";
  const cuerpo = "Hola Iván,\n\nEquipo (PC, notebook o consola) y modelo:\nQué le pasa y desde cuándo:\n\nGracias.";
  a.href = `mailto:${EMAIL}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
});

// ==========================================
// Botón de WhatsApp (se muestra solo si hay un número cargado)
// ==========================================
const WHATSAPP_NUMBER = "";
if (/^\d{8,15}$/.test(WHATSAPP_NUMBER)) {
  document.querySelectorAll("[data-whatsapp]").forEach(a => {
    a.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent("Hola Iván, quisiera consultar por mi equipo.");
    a.hidden = false;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  });
}

// ==========================================
// Galería con visor
// ==========================================
const photos = [...document.querySelectorAll("[data-gallery]")];
const lightbox = document.querySelector("#lightbox");
let current = 0;

function showPhoto(index) {
  if (!photos.length || !lightbox) return;
  current = (index + photos.length) % photos.length;
  const photo = photos[current];
  const img = lightbox.querySelector("img");
  const texto = photo.querySelector("img")?.alt || "";
  img.src = photo.href;
  img.alt = texto;
  lightbox.querySelector("figcaption").textContent = texto;
}

if (photos.length && lightbox) {
  photos.forEach((a, i) => {
    a.addEventListener("click", e => {
      if (typeof lightbox.showModal !== "function") return;
      e.preventDefault();
      showPhoto(i);
      lightbox.showModal();
    });
  });
  lightbox.querySelector(".lightbox-close")?.addEventListener("click", () => lightbox.close());
  lightbox.querySelector("[data-prev]")?.addEventListener("click", () => showPhoto(current - 1));
  lightbox.querySelector("[data-next]")?.addEventListener("click", () => showPhoto(current + 1));
  lightbox.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") { e.preventDefault(); showPhoto(current - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); showPhoto(current + 1); }
  });
  lightbox.addEventListener("click", e => {
    if (e.target !== lightbox) return;
    const b = lightbox.getBoundingClientRect();
    if (e.clientX < b.left || e.clientX > b.right || e.clientY < b.top || e.clientY > b.bottom) lightbox.close();
  });
}

// ==========================================
// Aparición suave al hacer scroll (con "reducir movimiento" es solo un fundido: ver style.css)
// ==========================================
const aparecen = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver(entradas => {
    // Lo que entra a la vez (una fila de tarjetas) aparece escalonado, 60 ms entre cada uno
    let orden = 0;
    entradas.forEach(entrada => {
      if (!entrada.isIntersecting) return;
      entrada.target.style.setProperty("--d", `${Math.min(orden++, 4) * 60}ms`);
      entrada.target.classList.add("visible");
      observador.unobserve(entrada.target);
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  aparecen.forEach(el => observador.observe(el));
  document.querySelectorAll("[data-anim]").forEach(el => observador.observe(el));
} else {
  aparecen.forEach(el => el.classList.add("visible"));
  document.querySelectorAll("[data-anim]").forEach(el => el.classList.add("visible"));
}

// Encabezado con sombra apenas se baja
const encabezado = document.querySelector(".site-header");
if (encabezado) {
  const marcar = () => encabezado.classList.toggle("con-scroll", window.scrollY > 8);
  marcar();
  window.addEventListener("scroll", marcar, { passive: true });
}

// ==========================================
// Motion graphics (hechos con HyperFrames: ver la carpeta _motion)
// ==========================================
// La portada (el diagnóstico, que se reproduce una vez) se decide en el script que está junto al video.
const moverPoco = window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
  Boolean(navigator.connection && navigator.connection.saveData);

// Optimizador: la demo corre solo mientras está a la vista. Con "reducir movimiento" o ahorro de
// datos no arranca sola: queda la pantalla inicial con controles para verla si se quiere.
const demo = document.querySelector("[data-demo]");
if (demo) {
  if (moverPoco || !("IntersectionObserver" in window)) {
    demo.controls = true;
  } else {
    new IntersectionObserver(([entrada]) => {
      if (entrada.isIntersecting) {
        demo.preload = "auto";
        const intento = demo.play();
        if (intento && typeof intento.catch === "function") intento.catch(() => { demo.controls = true; });
      } else {
        demo.pause();
      }
    }, { threshold: 0.35 }).observe(demo);
  }
}
