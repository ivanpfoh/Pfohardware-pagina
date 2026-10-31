// @ts-check
import { defineConfig } from "astro/config";

// GitHub Pages publica el repo en https://ivanpfoh.github.io/Pfohardware-pagina/
// Las páginas salen como archivos .html (servicios.html, descarga.html...) porque el Optimizador
// abre descarga.html y lee version.json en esas mismas direcciones.
export default defineConfig({
  site: "https://ivanpfoh.github.io",
  base: "/Pfohardware-pagina",
  trailingSlash: "ignore",
  build: {
    format: "file",
    assets: "_astro",
    inlineStylesheets: "auto",
  },
  compressHTML: true,
  devToolbar: { enabled: false },
  vite: {
    build: { cssMinify: "lightningcss" },
  },
});
