// Los servicios técnicos, con los textos de siempre. Los usa la portada y la página de servicios.
export interface Servicio {
  id: string;
  icono: "pulso" | "viento" | "chip" | "monitor" | "llave" | "wifi";
  titulo: string;
  texto: string;
  items: string[];
  foto?: { src: string; alt: string };
}

export const servicios: Servicio[] = [
  {
    id: "diagnostico", icono: "pulso", titulo: "Diagnóstico completo",
    texto: "Pruebas de hardware, temperaturas, discos y sistema. Recibís una explicación clara y un presupuesto antes de avanzar.",
    items: ["Informe del estado", "Pruebas y recomendaciones"],
    foto: { src: "img/trabajos/notebook-diagnostico-arranque-640.webp", alt: "Diagnóstico de arranque en una notebook" },
  },
  {
    id: "limpieza", icono: "viento", titulo: "Limpieza y refrigeración",
    texto: "Limpieza interna, cambio de pasta térmica y revisión del flujo de aire para cuidar rendimiento y vida útil.",
    items: ["Limpieza interna", "Cambio de pasta térmica", "Revisión del flujo de aire"],
    foto: { src: "img/trabajos/pc-despues-limpieza-640.webp", alt: "PC después de la limpieza" },
  },
  {
    id: "upgrades", icono: "chip", titulo: "Upgrades con criterio",
    texto: "SSD, memoria y componentes elegidos según tu uso y presupuesto. Migración y clonación incluidas cuando corresponde.",
    items: ["SSD y memoria", "Migración y clonación cuando corresponde"],
    foto: { src: "img/trabajos/armado-pc-640.webp", alt: "Armado de PC" },
  },
  {
    id: "formateo", icono: "monitor", titulo: "Formateo y sistemas",
    texto: "Instalación y configuración de Windows o Linux, drivers, actualizaciones y puesta a punto segura.",
    items: ["Windows o Linux", "Drivers y actualizaciones"],
    foto: { src: "img/trabajos/pc-escritorio-640.webp", alt: "Mantenimiento de computadora de escritorio" },
  },
  {
    id: "reparacion", icono: "llave", titulo: "Reparación de componentes",
    texto: "Diagnóstico de placa, conectores y piezas dañadas. Te digo con honestidad cuándo conviene reparar y cuándo reemplazar.",
    items: ["Placa, conectores y piezas", "Reparar o reemplazar, con honestidad"],
    foto: { src: "img/trabajos/notebook-modulo-pantalla-640.webp", alt: "Cambio de módulo de pantalla" },
  },
  {
    id: "remoto", icono: "wifi", titulo: "Soporte remoto",
    texto: "Asistencia a distancia para problemas de software, configuración y asesoramiento de seguridad.",
    items: ["Software y configuración", "Asesoramiento de seguridad"],
  },
];
