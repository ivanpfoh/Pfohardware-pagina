"use strict";

document.documentElement.classList.remove("no-js");

const moverPoco = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const ahorroDatos = Boolean(navigator.connection && navigator.connection.saveData);
const escritorio = window.matchMedia("(min-width: 1025px) and (hover: hover) and (pointer: fine)").matches;

function cargarScript(src) {
  return new Promise((ok, falla) => {
    const s = document.createElement("script");
    s.src = src; s.onload = ok; s.onerror = falla;
    document.head.appendChild(s);
  });
}

// ==========================================
// Navegación / Menú del celular
// ==========================================
const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav");
let lenis = null;

function closeMenu() {
  if (!nav || !nav.classList.contains("open")) return;
  nav.classList.remove("open");
  document.body.classList.remove("menu-abierto");
  menu?.setAttribute("aria-expanded", "false");
  menu?.setAttribute("aria-label", "Abrir menú");
}

function openMenu() {
  if (!nav) return;
  encabezado?.classList.remove("oculto");
  nav.classList.add("open");
  document.body.classList.add("menu-abierto");
  menu?.setAttribute("aria-expanded", "true");
  menu?.setAttribute("aria-label", "Cerrar menú");
}

if (menu && nav) {
  menu.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.contains("open") ? closeMenu() : openMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) { closeMenu(); menu.focus(); }
  });
}

// Enlaces a una sección de esta misma página: desplazamiento suave (con Lenis si está activo)
document.querySelectorAll('a[href*="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href") || "";
    const [ruta, hash] = href.split("#");
    if (!hash) return;
    const actual = window.location.pathname;
    const mismaPagina = !ruta || actual.endsWith("/" + ruta) ||
      (ruta === "index.html" && (actual.endsWith("/") || actual === ""));
    const destino = mismaPagina && document.getElementById(hash);
    if (!destino) return;
    e.preventDefault();
    closeMenu();
    if (lenis) lenis.scrollTo(destino, { offset: -80 });
    else destino.scrollIntoView({ behavior: moverPoco ? "auto" : "smooth", block: "start" });
    try { history.pushState(null, "", "#" + hash); } catch (_) {}
  });
});

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
      lenis?.stop();
    });
  });
  lightbox.addEventListener("close", () => lenis?.start());
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

// Tira de trabajos en el celular (o sin animaciones): flechas que pasan de a una foto
document.querySelectorAll("[data-tira]").forEach(bloque => {
  const tira = bloque.querySelector(".tira");
  bloque.querySelectorAll("[data-mover]").forEach(b => b.addEventListener("click", () => {
    const paso = (tira.querySelector(".photo")?.offsetWidth || 300) + 16;
    tira.scrollBy({ left: paso * Number(b.dataset.mover), behavior: moverPoco ? "auto" : "smooth" });
  }));
});

// ==========================================
// Encabezado: fondo apenas se baja; se esconde al bajar y vuelve al subir
// ==========================================
const encabezado = document.querySelector(".site-header");
if (encabezado) {
  let ultimo = window.scrollY;
  const marcar = () => {
    const y = window.scrollY;
    encabezado.classList.toggle("con-scroll", y > 8);
    if (!moverPoco && !document.body.classList.contains("menu-abierto")) {
      encabezado.classList.toggle("oculto", y > 400 && y > ultimo + 4);
      if (y < ultimo - 4) encabezado.classList.remove("oculto");
    }
    ultimo = y;
  };
  marcar();
  window.addEventListener("scroll", marcar, { passive: true });
  encabezado.addEventListener("focusin", () => encabezado.classList.remove("oculto"));
}

// ==========================================
// Motion graphics (hechos con HyperFrames: ver la carpeta _motion)
// ==========================================
// La portada (el diagnóstico, que se reproduce una vez) se decide en el script que está junto al video.
// Optimizador: la demo corre solo mientras está a la vista. Con "reducir movimiento" o ahorro de
// datos no arranca sola: queda la pantalla inicial con controles para verla si se quiere.
const demo = document.querySelector("[data-demo]");
if (demo) {
  if (moverPoco || ahorroDatos || !("IntersectionObserver" in window)) {
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

// Fondo con shader en la portada: solo en escritorio, con movimiento y sin ahorro de datos
if (!moverPoco && !ahorroDatos && escritorio && document.querySelector(".hero-fondo[data-shader]")) {
  const lanzar = () => cargarScript("js/fondo.js").catch(() => {});
  "requestIdleCallback" in window ? requestIdleCallback(lanzar, { timeout: 1200 }) : setTimeout(lanzar, 400);
}

// ==========================================
// Animaciones con GSAP + ScrollTrigger
// Sin JS o si GSAP no carga, todo se ve igual pero quieto: nada arranca oculto en el CSS.
// ==========================================
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
  iniciarAnimaciones();
} else {
  document.querySelectorAll(".paso").forEach(p => p.classList.add("encendido"));
}

function iniciarAnimaciones() {
  const raiz = document.documentElement;

  // --- Tonos: el fondo de la página pasa de un tono al otro según la sección que se ve
  const tonos = { base: "#05080A", teal: "#03161A", ink: "#060A16", copper: "#0D0A08" };
  const secciones = gsap.utils.toArray("main > [data-tone]");
  if (secciones.length) {
    raiz.classList.add("tonos");
    secciones.forEach(sec => {
      const color = tonos[sec.dataset.tone] || tonos.base;
      ScrollTrigger.create({
        trigger: sec, start: "top 55%", end: "bottom 55%",
        onToggle: self => {
          if (self.isActive) gsap.to(document.body, { backgroundColor: color, duration: moverPoco ? 0 : 0.9, ease: "power2.out", overwrite: true });
        }
      });
    });
  }

  const mm = gsap.matchMedia();

  // --- Con "reducir movimiento": todo quieto y en su estado final
  mm.add("(prefers-reduced-motion: reduce)", () => {
    document.querySelectorAll(".paso").forEach(p => p.classList.add("encendido"));
  });

  mm.add({ mover: "(prefers-reduced-motion: no-preference)", ancho: "(min-width: 1025px) and (hover: hover) and (pointer: fine)" }, (ctx) => {
    const { mover, ancho } = ctx.conditions;
    if (!mover) return;

    // Scroll suave solo en escritorio con mouse (en el celular queda el scroll nativo, que ya es fluido)
    if (ancho && !lenis) {
      cargarScript("js/vendor/lenis.min.js").then(() => {
        if (!window.Lenis || lenis) return;
        lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(t => lenis && lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
        raiz.classList.add("lenis");
      }).catch(() => {});
    }

    // --- Entrada de la portada: el único momento orquestado al cargar
    const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
    const titulo = document.querySelectorAll(".hero h1 .line > span, .page-hero h1 .line > span");
    if (titulo.length) intro.from(titulo, { yPercent: 110, duration: 1.1, stagger: 0.09 }, 0.1);
    intro.from(".hero .kicker, .page-hero .kicker", { opacity: 0, y: 12, duration: 0.8 }, 0)
      .from(".hero .lead, .page-hero .lead, .hero .actions, .page-hero .actions, .hero .checks", { opacity: 0, y: 18, duration: 0.9, stagger: 0.07 }, 0.45)
      .from(".hero-card-inner", { opacity: 0, y: 50, rotateX: 12, scale: 0.94, duration: 1.4 }, 0.25)
      .from(".scroll-cue", { opacity: 0, duration: 0.6 }, 1.2);

    // --- Títulos de sección: las líneas suben desde atrás de la máscara
    gsap.utils.toArray(".section h2 .line, .section-tight h2 .line").forEach(linea => {
      gsap.from(linea.firstElementChild, {
        yPercent: 110, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: linea, start: "top 88%", once: true }
      });
    });

    // --- Lo demás aparece escalonado, de a grupos (lo que entra junto)
    const aparecen = gsap.utils.toArray(".reveal");
    gsap.set(aparecen, { opacity: 0, y: 28 });
    ScrollTrigger.batch(aparecen, {
      start: "top 90%", once: true,
      onEnter: lote => gsap.to(lote, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.07, overwrite: true })
    });

    // --- Parallax suave de la portada al bajar
    if (document.querySelector(".hero-grid")) {
      gsap.to(".hero-grid > :first-child", { yPercent: -12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-card", { yPercent: -6, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    }

    // --- El método: la pista se llena con el scroll y cada nodo se enciende al llegar
    const metodo = document.querySelector(".metodo");
    if (metodo) {
      const pasos = [...metodo.querySelectorAll(".paso")];
      ScrollTrigger.create({
        trigger: metodo, start: "top 75%", end: "bottom 45%", scrub: 0.6,
        onUpdate: self => {
          metodo.style.setProperty("--p", self.progress.toFixed(3));
          pasos.forEach((p, i) => p.classList.toggle("encendido", self.progress >= i / (pasos.length - 1) - 0.02));
        }
      });
    }

    if (!ancho) return;

    // --- Escritorio: la tarjeta del diagnóstico se inclina un poco siguiendo el mouse
    const tarjeta = document.querySelector(".hero-card-inner");
    if (tarjeta) {
      const rx = gsap.quickTo(tarjeta, "rotationX", { duration: 0.8, ease: "power3.out" });
      const ry = gsap.quickTo(tarjeta, "rotationY", { duration: 0.8, ease: "power3.out" });
      const mover = e => {
        const b = tarjeta.getBoundingClientRect();
        rx(((e.clientY - b.top) / b.height - 0.5) * -6);
        ry(((e.clientX - b.left) / b.width - 0.5) * 8);
      };
      const soltar = () => { rx(0); ry(0); };
      tarjeta.addEventListener("pointermove", mover);
      tarjeta.addEventListener("pointerleave", soltar);
      ctx.add(() => () => { tarjeta.removeEventListener("pointermove", mover); tarjeta.removeEventListener("pointerleave", soltar); });
    }

    // --- Escritorio: la tira de trabajos se fija y avanza de costado mientras se baja
    const bloque = document.querySelector("[data-tira]");
    if (bloque) {
      const tira = bloque.querySelector(".tira");
      bloque.classList.add("tira-fijada");
      const recorrido = () => Math.max(0, tira.scrollWidth - window.innerWidth);
      const avance = gsap.to(tira, {
        x: () => -recorrido(), ease: "none",
        scrollTrigger: { trigger: bloque, start: "top top", end: () => "+=" + recorrido(), pin: true, scrub: 0.5, invalidateOnRefresh: true, anticipatePin: 1 }
      });
      tira.querySelectorAll(".photo img").forEach(img => {
        gsap.fromTo(img, { xPercent: -4 }, { xPercent: 4, ease: "none", scrollTrigger: { trigger: img.parentElement, containerAnimation: avance, start: "left right", end: "right left", scrub: true } });
      });
      return () => bloque.classList.remove("tira-fijada");
    }
  });

  // --- La pista de cobre de la portada: se arma con las posiciones reales de las secciones
  armarPista();
}

function armarPista() {
  const main = document.querySelector("main.con-pista");
  if (!main) return;
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.classList.add("pista");
  svg.setAttribute("aria-hidden", "true");
  svg.innerHTML = `<defs>
      <linearGradient id="pista-color" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stop-color="#B87333"/><stop offset=".22" stop-color="#E3A673"/>
        <stop offset=".6" stop-color="#00F5A0"/><stop offset="1" stop-color="#1FDDF5"/>
      </linearGradient>
      <clipPath id="pista-corte"><rect x="-50" y="0" width="200" height="0"/></clipPath>
    </defs>
    <path class="pista-base"/><path class="pista-viva" stroke="url(#pista-color)" clip-path="url(#pista-corte)"/><g class="pista-nodos"></g>`;
  main.prepend(svg);
  const grad = svg.querySelector("linearGradient"), corte = svg.querySelector("#pista-corte rect");
  const base = svg.querySelector(".pista-base"), viva = svg.querySelector(".pista-viva"), grupo = svg.querySelector(".pista-nodos");
  let nodos = [], inicioY = 0, finY = 0, dibujar = () => {};

  function construir() {
    if (window.innerWidth < 1300) return;
    const top = main.getBoundingClientRect().top + window.scrollY;
    const cont = main.querySelector(".container");
    const x = cont.getBoundingClientRect().left + parseFloat(getComputedStyle(cont).paddingLeft) - 44;
    const marcas = [...main.querySelectorAll("[data-nodo]")].map(el => el.getBoundingClientRect().top + window.scrollY - top + 14);
    if (!marcas.length) return;
    inicioY = marcas[0] - 260; finY = marcas[marcas.length - 1];
    // Trazo vertical con quiebres a 45°, como una pista de placa
    let d = `M ${x} ${inicioY}`, lado = 0;
    marcas.forEach((y, i) => {
      if (i > 0) {
        const desvio = (lado = 1 - lado) ? 18 : -18;
        const medio = (marcas[i - 1] + y) / 2;
        d += ` V ${medio - 9} l ${desvio} 18 V ${medio + 60} l ${-desvio} 18`;
      }
      d += ` V ${y}`;
    });
    base.setAttribute("d", d); viva.setAttribute("d", d);
    svg.setAttribute("height", Math.ceil(finY + 20));
    grad.setAttribute("y1", inicioY); grad.setAttribute("y2", finY);
    grupo.innerHTML = marcas.map(y => `<circle cx="${x}" cy="${y}" r="6" stroke="#243238"/>`).join("");
    nodos = [...grupo.children].map((c, i) => ({ c, y: marcas[i] }));
    dibujar = () => {
      const centro = window.scrollY + window.innerHeight * 0.6 - top;
      const hasta = moverPoco ? finY : Math.min(finY + 20, Math.max(inicioY, centro));
      corte.setAttribute("y", inicioY); corte.setAttribute("height", Math.max(0, hasta - inicioY));
      nodos.forEach(n => n.c.setAttribute("stroke", hasta >= n.y ? (n.y > (inicioY + finY) / 2 ? "#00F5A0" : "#E3A673") : "#243238"));
    };
    dibujar();
  }
  ScrollTrigger.addEventListener("refresh", construir);
  ScrollTrigger.create({ trigger: main, start: "top top", end: "bottom bottom", onUpdate: () => dibujar() });
  construir();
}
