// Lo que comparten todas las páginas: menú, encabezado, entradas al hacer scroll y scroll suave.
// GSAP y Lenis se cargan aparte (movimiento.ts), solo cuando hacen falta.

export const raiz = document.documentElement;
export const moverPoco = (): boolean => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const ahorroDatos = (): boolean => Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
export const escritorio = (): boolean => window.matchMedia("(min-width: 1025px) and (hover: hover) and (pointer: fine)").matches;

type Desplazador = { scrollTo: (destino: Element | number, opciones?: { offset?: number; immediate?: boolean }) => void; stop: () => void; start: () => void };
let desplazador: Desplazador | null = null;
export function usarDesplazador(d: Desplazador | null): void { desplazador = d; }
export function pararScroll(): void { desplazador?.stop(); }
export function seguirScroll(): void { desplazador?.start(); }

function iniciarMenu(): void {
  const boton = document.querySelector<HTMLButtonElement>("[data-menu-boton]");
  const menu = document.querySelector<HTMLElement>("[data-menu]");
  const texto = document.querySelector<HTMLElement>("[data-menu-texto]");
  const encabezado = document.querySelector<HTMLElement>("[data-encabezado]");
  if (!boton || !menu) return;
  const enCelular = window.matchMedia("(max-width: 960px)");

  const cerrar = (devolverFoco = false): void => {
    if (!menu.classList.contains("abierto")) return;
    menu.classList.remove("abierto");
    boton.setAttribute("aria-expanded", "false");
    if (texto) texto.textContent = "Abrir menú";
    document.body.style.overflow = "";
    seguirScroll();
    if (devolverFoco) boton.focus();
  };
  const abrir = (): void => {
    encabezado?.classList.remove("oculto");
    menu.classList.add("abierto");
    boton.setAttribute("aria-expanded", "true");
    if (texto) texto.textContent = "Cerrar menú";
    document.body.style.overflow = "hidden";
    pararScroll();
    menu.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });
  };
  boton.addEventListener("click", () => (menu.classList.contains("abierto") ? cerrar() : abrir()));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrar(true); });
  menu.addEventListener("click", (e) => { if ((e.target as Element).closest("a")) cerrar(); });
  enCelular.addEventListener("change", () => cerrar());
  // Con el menú abierto, el Tab no se escapa por detrás
  menu.addEventListener("keydown", (e) => {
    if (e.key !== "Tab" || !menu.classList.contains("abierto")) return;
    const focos = [boton, ...menu.querySelectorAll<HTMLElement>("a")];
    const primero = focos[0], ultimo = focos[focos.length - 1];
    if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
  });
}

function iniciarEncabezado(): void {
  const encabezado = document.querySelector<HTMLElement>("[data-encabezado]");
  if (!encabezado) return;
  let anterior = window.scrollY;
  let pendiente = false;
  const marcar = (): void => {
    pendiente = false;
    const y = window.scrollY;
    encabezado.classList.toggle("con-fondo", y > 12);
    if (!moverPoco() && !document.querySelector("[data-menu].abierto")) {
      if (y > 480 && y > anterior + 6) encabezado.classList.add("oculto");
      else if (y < anterior - 6 || y <= 480) encabezado.classList.remove("oculto");
    }
    anterior = y;
  };
  marcar();
  window.addEventListener("scroll", () => { if (!pendiente) { pendiente = true; requestAnimationFrame(marcar); } }, { passive: true });
  encabezado.addEventListener("focusin", () => encabezado.classList.remove("oculto"));
}

// Enlaces a una sección de la misma página: desplazamiento suave
function iniciarAnclas(): void {
  document.addEventListener("click", (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
    const url = new URL(a.href, location.href);
    if (url.pathname.replace(/index\.html$/, "") !== location.pathname.replace(/index\.html$/, "") || !url.hash) return;
    const destino = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!destino) return;
    e.preventDefault();
    if (desplazador) desplazador.scrollTo(destino, { offset: -72 });
    else destino.scrollIntoView({ behavior: moverPoco() ? "auto" : "smooth", block: "start" });
    history.pushState(null, "", url.hash);
  });
}

// Entradas: lo marcado con data-entra aparece al verse, escalonado dentro de cada grupo
function iniciarEntradas(): void {
  const elementos = [...document.querySelectorAll<HTMLElement>("[data-entra], [data-titulo]")];
  if (raiz.classList.contains("quieto") && "IntersectionObserver" in window) {
    // "Reducir movimiento": la primera pantalla ya está; lo de más abajo aparece con un fundido, sin moverse
    const abajo = elementos.filter((el) => el.hasAttribute("data-entra") && el.getBoundingClientRect().top > window.innerHeight);
    elementos.filter((el) => !abajo.includes(el)).forEach((el) => el.classList.add("entro"));
    abajo.forEach((el) => el.classList.add("abajo"));
    const obs = new IntersectionObserver((entradas) => entradas.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("entro"); obs.unobserve(e.target); }
    }), { rootMargin: "0px 0px -10% 0px" });
    abajo.forEach((el) => obs.observe(el));
    return;
  }
  if (!raiz.classList.contains("mov") || !("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.add("entro"));
    return;
  }
  const observador = new IntersectionObserver((entradas) => {
    let orden = 0;
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      const el = entrada.target as HTMLElement;
      if (!el.style.getPropertyValue("--d")) el.style.setProperty("--d", `${Math.min(orden++, 5) * 70}ms`);
      el.classList.add("entro");
      observador.unobserve(el);
    });
  }, { rootMargin: "0px 0px -10% 0px" });
  elementos.forEach((el) => observador.observe(el));
}

export function iniciarBase(): void {
  raiz.classList.add("app");
  iniciarMenu();
  iniciarEncabezado();
  iniciarAnclas();
  iniciarEntradas();
}
