"use strict";

// ==========================================
// Navegación / Menú móvil
// ==========================================
const menu = document.querySelector(".menu");
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

function toggleMenu() {
  if (!nav) return;
  const isOpen = nav.classList.contains("open");
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

if (menu && nav) {
  menu.setAttribute("aria-label", "Abrir menú");
  menu.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Cerrar menú al hacer clic en cualquier enlace y realizar navegación suave
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", (e) => {
      closeMenu();

      const href = a.getAttribute("href") || "";
      let targetId = "";

      if (href.startsWith("#") && href.length > 1) {
        targetId = href.slice(1);
      } else if (href.includes("#")) {
        const [pathPart, hashPart] = href.split("#");
        const currentPath = window.location.pathname;
        if (
          currentPath.endsWith(pathPart) ||
          (pathPart === "index.html" && (currentPath.endsWith("/") || currentPath === "" || currentPath.endsWith("index.html")))
        ) {
          targetId = hashPart;
        }
      }

      if (targetId) {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
          try {
            history.pushState(null, "", "#" + targetId);
          } catch (_) {}
        }
      }
    });
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("open") && !nav.contains(e.target) && !menu.contains(e.target)) {
      closeMenu();
    }
  });

  // Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });
}

// ==========================================
// Smooth scroll para otros enlaces internos
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const href = a.getAttribute("href");
    if (href && href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

// ==========================================
// Botón de WhatsApp (dinámico)
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
// Galería Lightbox
// ==========================================
const photos = [...document.querySelectorAll("[data-gallery]")];
const lightbox = document.querySelector("#lightbox");
let current = 0;

function showPhoto(index) {
  if (!photos.length || !lightbox) return;
  current = (index + photos.length) % photos.length;
  const photo = photos[current];
  const img = lightbox.querySelector("img");
  if (img) {
    img.src = photo.href;
    img.alt = photo.querySelector("img")?.alt || photo.textContent.trim() || "";
  }
  const caption = lightbox.querySelector("figcaption");
  if (caption) {
    caption.textContent = img ? img.alt : "";
  }
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
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      showPhoto(current - 1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      showPhoto(current + 1);
    }
  });

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
      const b = lightbox.getBoundingClientRect();
      if (e.clientX < b.left || e.clientX > b.right || e.clientY < b.top || e.clientY > b.bottom) {
        lightbox.close();
      }
    }
  });
}

// ==========================================
// Fallback para nombres de imágenes
// ==========================================
document.querySelectorAll('img[src="notebook1.jpeg"]').forEach(img => {
  img.addEventListener("error", () => {
    img.src = "notebook1.jpg";
    const parentA = img.closest("a");
    if (parentA) parentA.href = "notebook1.jpg";
  }, { once: true });
});
