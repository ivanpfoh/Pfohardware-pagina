// GSAP + ScrollTrigger (y Lenis en escritorio), cargados una sola vez y después de pintar la página.
import { escritorio, moverPoco, raiz, usarDesplazador } from "./base";

type Gsap = typeof import("gsap").gsap;
type ST = typeof import("gsap/ScrollTrigger").ScrollTrigger;
export interface Movimiento { gsap: Gsap; ScrollTrigger: ST; suave: boolean }

let promesa: Promise<Movimiento> | null = null;

export function cargarMovimiento(): Promise<Movimiento> {
  promesa ??= (async () => {
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
    gsap.registerPlugin(ScrollTrigger);
    gsap.config({ nullTargetWarn: false });
    let suave = false;
    // Scroll suave solo con mouse en pantallas grandes: en el celular el scroll nativo ya es fluido
    if (!moverPoco() && escritorio()) {
      const { default: Lenis } = await import("lenis");
      const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1, anchors: false });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      raiz.classList.add("lenis");
      usarDesplazador(lenis);
      suave = true;
    }
    return { gsap, ScrollTrigger, suave };
  })();
  return promesa;
}
