---
name: PfoHardware
description: The Optimizer's own interface, opened at page scale.
colors:
  marca-1: "#00F5A0"
  marca-2: "#1FDDF5"
  marca: "#12E8D6"
  fondo: "#05080A"
  campo-2: "#0A1013"
  campo-3: "#071512"
  panel: "#0B1114"
  borde: "#17262A"
  linea: "#243238"
  segmento-activo: "#0C2A23"
  segmento-borde: "#145442"
  texto: "#E6EDF3"
  texto-dim: "#8B949E"
  pie: "#7D8590"
  texto-marca: "#04120E"
typography:
  display:
    fontFamily: "Segoe UI Variable Display, Segoe UI, Selawik, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 6.6vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Segoe UI Variable Display, Segoe UI, Selawik, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.4vw, 3.9rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Segoe UI Variable Display, Segoe UI, Selawik, system-ui, sans-serif"
    fontSize: "clamp(1.35rem, 2vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Segoe UI Variable Display, Segoe UI, Selawik, system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 1.6vw, 1.4rem)"
    fontWeight: 600
    lineHeight: 1.45
  body:
    fontFamily: "Segoe UI Variable Text, Segoe UI, Selawik, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.94rem + 0.3vw, 1.15rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Segoe UI Variable Text, Segoe UI, Selawik, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  sm: "6px"
  segment: "10px"
  md: "12px"
  window: "14px"
  full: "50%"
spacing:
  page-margin: "clamp(16px, 4.4vw, 64px)"
  section: "clamp(72px, 8.5vw, 120px)"
  header: "68px"
  container: "1320px"
components:
  button-primary:
    backgroundColor: "linear-gradient(120deg, #00F5A0, #1FDDF5)"
    textColor: "{colors.texto-marca}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
    height: "52px"
  button-primary-large:
    backgroundColor: "linear-gradient(120deg, #00F5A0, #1FDDF5)"
    textColor: "{colors.texto-marca}"
    rounded: "{rounded.md}"
    padding: "18px 32px"
    height: "64px"
  button-panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.texto}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
    height: "52px"
  button-panel-hover:
    backgroundColor: "#0E161A"
  button-dark-on-gradient:
    backgroundColor: "{colors.texto-marca}"
    textColor: "{colors.texto}"
    rounded: "{rounded.md}"
    padding: "18px 32px"
    height: "64px"
  segmented-option-active:
    backgroundColor: "{colors.segmento-activo}"
    textColor: "{colors.marca-1}"
    rounded: "{rounded.segment}"
    height: "48px"
  segmented-option-idle:
    backgroundColor: "transparent"
    textColor: "{colors.texto-dim}"
    rounded: "{rounded.segment}"
    height: "48px"
  window-titlebar:
    backgroundColor: "#070B0D"
    textColor: "{colors.texto-dim}"
    height: "34px"
    padding: "0 12px"
  faq-item:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.texto}"
    rounded: "{rounded.md}"
    padding: "22px 24px"
  nav-link:
    textColor: "{colors.texto-dim}"
    padding: "10px 12px"
  nav-link-current:
    textColor: "{colors.texto}"
---

# Design System: PfoHardware

## Overview

**Creative North Star: "The Program, Opened Up"**

The site is not about the Optimizer; it is the Optimizer. Every surface borrows the program's own materials: its near-black ground, its panel and border tones, the Windows typeface it is drawn in, its window chrome, the dotted field behind its ring, its segmented mode selector, and the one gradient button that does the work. On the home page the program window fills the first viewport and can be pressed; below it, sections are stepped field tones of the same palette, never separated by rules or cards.

Density is calm and large. Few type sizes, set big and tight; generous section padding; one action per group. Interface fragments that copy the program are marked `data-ui` and keep the program's exact values even where page-level rules would differ (shadows on Windows-style windows, transparent borders, inner radii). Real proof replaces decoration: program captures, HyperFrames renders, and photos of real jobs.

Motion is entrance and response, not ambience. Titles rise line by line behind a mask, content eases up into place, and two desktop-only scroll scenes (the pinned jobs strip and the scrubbed undo layers) carry the story. With reduced motion the first screen is complete on load and nothing travels on its own.

**Key Characteristics:**
- Palette and type taken verbatim from the program (COLOR_* constants, Segoe UI Variable).
- Real program fragments, marked `data-ui`, as the main imagery.
- Brand gradient as a scarce, action-bearing material.
- Depth by tone steps, not lines or shadows.
- Exponential ease-out; desktop-only scroll scenes; reduced motion fully honored.

## Colors

A near-black, blue-green dark interface lit by a single mint-to-cyan gradient.

### Primary
- **Optimizer Mint** (`marca-1`): the first stop of the brand gradient; on its own it is the "active" ink: the selected segment label, the Comprar text in panel buttons, check marks, the licence dot, strong words in the undo copy, the current jobs caption.
- **Optimizer Cyan** (`marca-2`): the second stop of the gradient. Never used alone.
- **Brand Gradient** (`linear-gradient(120deg, marca-1, marca-2)`): the program's "Optimizar ahora" fill. See The Scarce Gradient Rule.
- **Ring Teal** (`marca`): the midpoint; used for the ring's bolt, focus rings, text links, arrow links, `accent-color`, and the 0.32-alpha text selection.

### Neutral
- **Program Ground** (`fondo`): page background, the window body, mobile menu sheet, `theme-color`. Also field tone 1.
- **Field Two** (`campo-2`): alternate section tone (home cover band, Cómo funciona, Trabajos, footer).
- **Segment Green Field** (`campo-3`): the dark green of the program's active segment, used as the tone of the service closing section only.
- **Panel** (`panel`): the program's panels: secondary buttons, FAQ items, requirement box, icon wells, label chips.
- **Border** (`borde`): the program's 1px border on windows, segmented control and panel buttons.
- **Ring Track** (`linea`): the ring's empty track, the method progress rail, panel-button hover border, scrollbar thumb.
- **Segment Active** (`segmento-activo`) with **Segment Edge** (`segmento-borde`): the selected option of the segmented control; the active fill is reused for service icon wells, the email channel and the hover wipe of the service list.
- **Ink** (`texto`), **Dim Ink** (`texto-dim`), **Footer Ink** (`pie`): primary text, secondary text, and the program's footer grey (slightly lifted to read at 14px) for small notes.
- **Ink on Gradient** (`texto-marca`): text on any gradient fill, and the background of the dark button that sits on a gradient section.

### Named Rules
**The Scarce Gradient Rule.** The gradient fills only two kinds of thing: the one primary button of an action group (always beside panel buttons, never two gradient buttons together), and the purchase sections drenched in it (Compra on home, the Optimizer band on Servicios). Anywhere else it appears only as a thin indicator: the 2px nav underline, the 6px method rail, the 3px undo sweep line, the active step disc, the "Después" photo tag.

**The Program's Palette Rule.** New colors come from the program first. One-off hover steps (#0E161A, #0D1518, #0F1A1E, #0E3229) are tiny lifts of an existing tone, not new hues.

## Typography

**Display Font:** Segoe UI Variable Display (with Segoe UI, then self-hosted Selawik 400/600/700, then system-ui)
**Body Font:** Segoe UI Variable Text (same fallback chain)
**Label/Mono Font:** ui-monospace, Cascadia Mono, Consolas for inline code only

**Character:** The program's own Windows typeface: plain, engineered, familiar to every Windows user, made confident by size and tight negative tracking rather than by a contrasting display face.

### Hierarchy
- **Display** (600, `clamp(2.2rem, 6.6vw, 6rem)`, 0.98, -0.04em): page h1. The purchase price (up to 8.4rem, 0.9, -0.055em), the service close (up to 5.6rem) and the footer wordmark (up to 15.5rem) push it further as single moments.
- **Headline** (600, `clamp(2.1rem, 4.4vw, 3.9rem)`, 1.02, -0.035em): section h2, usually two masked lines.
- **Title** (600, `clamp(1.35rem, 2vw, 1.75rem)`, 1.15, -0.02em): h3, step names, the program's state title.
- **Lead** (600 display face, `clamp(1.15rem, 1.6vw, 1.4rem)`, 1.45): the one large explanatory paragraph of a section (undo copy, bio). Max about 30em.
- **Body** (400, `clamp(1rem, 0.94rem + 0.3vw, 1.15rem)`, 1.6): running text, `text-wrap: pretty`, reading width 28 to 36em (FAQ answers 70ch).
- **Label** (600, 0.85 to 0.95rem): nav links, captions, photo tags, notes. Sentence case, no tracking.

### Named Rules
**The One Typeface Rule.** Everything is Segoe UI Variable (Selawik where Windows fonts are missing). Hierarchy comes from size, weight 600 and negative tracking, never from a second family.

**The Tabular Price Rule.** Prices and percentages use tabular numerals.

## Layout

A centered container of 1320px plus fluid side margins (16 to 64px). Sections are full-bleed bands with `clamp(72px, 8.5vw, 120px)` vertical padding, alternating Program Ground and Field Two; the fixed header is 68px and turns 94%-opaque ground after 12px of scroll, hiding on downward scroll past 480px.

Two-column grids are asymmetric (about 1.1fr / 0.9fr) and align to the bottom of the heading; gaps scale up to about 120px. The home cover is a single program window up to 1240px wide whose dotted field takes the height left over so the whole window fits the first viewport. The Optimizer window's internal measures scale with container units.

Breakpoints: 1025px with hover and fine pointer is "desktop" (scroll scenes, Lenis); grids collapse to one column at 900px; the nav becomes a full-screen sheet at 960px; the cover header and footer reflow at 760px.

## Elevation & Depth

Depth is tonal. Sections step between ground, Field Two and Segment Green Field; containers sit on Panel; nothing is separated by divider lines. Shadows exist only where Windows itself draws them: on program windows and window recordings, and on the floating service preview that follows the pointer.

### Shadow Vocabulary
- **Windows window** (`box-shadow: 0 40px 90px -30px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.015) inset`): program window fragments. The page-scale cover window drops it.
- **Window recording** (`box-shadow: 0 50px 100px -40px rgba(0,0,0,0.9)`): the program video in Cómo funciona.
- **Floating preview** (`box-shadow: 0 30px 60px -20px rgba(0,0,0,0.8)`): the service hover preview.
- **Primary glow** (`box-shadow: 0 14px 40px -12px rgba(18,232,214,0.55)`): hover response of gradient buttons only; the cover's Optimizar ahora uses a 4px teal ring and a one-time invitation pulse instead.

### Named Rules
**The Step-Not-Line Rule.** Separate regions with a step in tone, never a rule. Borders belong to program fragments (window, segmented control, panel buttons), not to page layout.

## Shapes

Gently rounded, matching the program: 12px on buttons, panels, FAQ items and photos; 14px on windows, the segmented control's track, the cover's buttons and program captures; 10px on the segment options and small chips; 6px on inline code; full circles only for step numbers and the licence dot. Window chrome draws minimize, maximize and close as 1px strokes in #56646C. Icons are 24px-grid stroke SVGs with round caps, 2px stroke by default, in the current text color.

## Components

### Buttons
- **Shape:** gently rounded (12px); 52px minimum height, 64px for the large size; 600 weight.
- **Primary:** the brand gradient with Ink on Gradient text; on hover a white sheen sweeps across (700ms) and a teal glow appears; the arrow icon nudges 3px.
- **Panel (secondary):** Panel fill, 1px Border; hover lifts to #0E161A with the Ring Track border. In the header, panel buttons carry Mint text for Comprar.
- **Dark on gradient:** Ink on Gradient fill with Ink text, used only inside gradient sections; hover goes to #000.
- **Press:** every button scales to 0.97 to 0.98 on press (160ms ease-out).
- **Links:** text links in Ring Teal with a 45% underline that firms on hover; arrow links in Ring Teal with an arrow that moves 4px.

### Segmented Control (program fragment)
- **Style:** Panel track with 1px Border, 5px inset, 14px radius; options 48px tall, 10px radius.
- **State:** selected option Segment Active fill, Segment Edge border, Mint label; idle options transparent in Dim Ink, Ink on hover. Arrow keys move the choice (radiogroup).

### Program Window (signature)
A 34px title bar (#070B0D) with the favicon, the program name in 13px Dim Ink and stroke-drawn window buttons, over a Program Ground body with a 1px Border and 14px radius. At page scale it frames the whole cover: the h1 sits where the program shows its name, the price where it shows Windows and RAM, the demo note where it shows "Licencia activa" (with the Mint dot), and Comprar y descargar where it shows the version.

### Ring Field (signature)
A dotted field (Ring Track dots on a 4cqh grid, with a faint teal center glow) holding a 7-unit ring: Ring Track at rest with a Ring Teal bolt; while working, the gradient arc fills by stepped eases to 100% with a large tabular percentage; when done the ring turns Mint and a check draws in. The HyperFrames intro (PH logo shrinking into the ring) plays over it once, then hands off to the live ring.

### FAQ
Native details on Panel (opening to #0D1518), 12px radius, 22px by 24px padding, a Ring Teal chevron that rotates; the content height animates where supported.

### Navigation
Plain bar: logo plus wordmark left, Dim Ink 600 links with a gradient underline that wipes in on hover and stays under the current page, and a panel Comprar button. Below 960px a full-screen ground sheet opens with a clip-path wipe and large display-face links staggered in; Comprar stays in the bar beside the menu button.

### Motion
- **Curves:** `--ease-out` (cubic-bezier(0.16, 1, 0.3, 1)) for entrances and responses; `--ease-in-out` (cubic-bezier(0.65, 0, 0.35, 1)) for wipes, sweeps and page exits.
- **Title reveal:** headings marked as titles rise from 108% behind a line mask, 1100ms, 90ms per line.
- **Entrances:** marked content fades in and rises 24px, 900ms, staggered 70ms within a batch (max five steps).
- **Desktop scenes:** GSAP ScrollTrigger pins the jobs section while the photo strip scrolls sideways with inner parallax, and scrubs the undo layers apart with a gradient sweep line; Lenis smooths scrolling. Both load only at 1025px+ with a fine pointer; phones get native scroll, a one-time timed undo, and a photo grid.
- **Page changes:** cross-document view transitions (exit 240ms fade, scale and blur; enter 560ms rise with a clip reveal); the header holds still.
- **Reduced motion:** no travel and no self-starting animation. The first screen renders complete, content below fades in place (600ms), the intro video is skipped, the undo layers cross-fade, the header stops hiding, scroll scenes and Lenis never load. The user-pressed Optimizar ahora demo still runs.

## Do's and Don'ts

### Do:
- **Do** take every color and form from the program first; mark copied interface fragments `data-ui` and keep their exact program values.
- **Do** keep one gradient button per action group, beside panel buttons; let gradient drench only purchase sections.
- **Do** separate sections by stepping field tone (ground, Field Two, Segment Green Field).
- **Do** use Segoe UI Variable at weight 600 with negative tracking for every heading; tabular numerals for prices.
- **Do** use real proof (program captures, HyperFrames renders from `_motion/` compressed into `public/img/motion`, job photos) instead of illustration.
- **Do** keep scroll scenes and smooth scrolling desktop-only, and keep the first screen complete under reduced motion.

### Don't:
- **Don't** use glass, blur panels or translucent cards; the program has none.
- **Don't** add small uppercase labels above headings; headings stand alone.
- **Don't** introduce a second typeface or warm metallic accents (no copper).
- **Don't** separate sections or list items with divider lines.
- **Don't** put two gradient-filled buttons side by side, or use the gradient as a card or panel background outside a purchase section.
- **Don't** add drop shadows to page-level cards; shadows belong to Windows windows and floating previews.
