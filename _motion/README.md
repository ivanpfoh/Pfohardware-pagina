# Motion graphics de la web (HyperFrames)

Fuente de los videos de `img/motion/`, hechos con [HyperFrames](https://hyperframes.heygen.com/) (HTML que se renderiza a video).
Esta carpeta empieza con `_`, así que GitHub Pages no la publica.

| Proyecto | En la web | Qué muestra |
| --- | --- | --- |
| `hero-diagnostico` | Portada (tarjeta de diagnóstico) | Un diagnóstico sobre una PC real: barrido, etiquetas en cada componente y "Listo". Se reproduce una vez y queda en el último cuadro. |
| `demo-optimizador` | Sección del Optimizador | Las pantallas reales del programa: clic en "Optimizar ahora", el anillo hasta 100 % y "Deshacer cambios". Se repite sin salto. |

## Editar y volver a generar

Requiere Node.js 22 o más nuevo y FFmpeg. La telemetría de HyperFrames se apaga con la variable `HYPERFRAMES_NO_TELEMETRY=1`.

```bash
cd _motion/hero-diagnostico
npx hyperframes preview          # vista previa con recarga
npx hyperframes check            # revisión de la composición
npx hyperframes render --output renders/hero-diagnostico.mp4 --quality delivery
```

Después se comprime para la web (calidad pareja y arranque rápido):

```bash
ffmpeg -i renders/hero-diagnostico.mp4 -an -c:v libx264 -preset veryslow -crf 27 -pix_fmt yuv420p -movflags +faststart ../../img/motion/hero-diagnostico.mp4
```

La demo usa `-crf 28`. Los pósters (`*-poster.webp`, `*-inicio.webp`, `*-final.webp`) son el primer y el último cuadro.
El material de la demo sale de las capturas reales del programa (`grabar_ui_v7.py`, en la carpeta de los reels).
