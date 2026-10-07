# Plantilla Landing: Inventario ("Cuenta Cabal")

Landing para una empresa de toma de inventarios y control de stock (conteo físico, inventario cíclico, conciliación y etiquetado). Es la primera plantilla hecha con la skill **taste-skill** (`design-taste-frontend`, de Leonxlnx) además de ui-ux-pro-max y las reglas de motion de emilkowalski/skills.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
```

## Lectura del encargo (paso 0 de la skill)
*Landing de servicios B2B para jefes de bodega y gerentes de operaciones, con un lenguaje sobrio y operativo, apoyado en CSS nativo con scroll-driven animations.* Diales: `DESIGN_VARIANCE 7`, `MOTION_INTENSITY 6`, `VISUAL_DENSITY 4`.

## Sistema de diseño
| Elemento | Decisión |
|---|---|
| Tipografía | Geist (texto y títulos) + Geist Mono (conteo y etiquetas), **autoalojadas** con `@fontsource-variable`. Sin Google Fonts, sin Inter, sin serif |
| Color | Zinc frío + **un solo acento** naranja señal (`#B4501F` claro, `#E48B62` oscuro, saturación 71 %). Sin morado, sin beige y latón |
| Tema | Claro u oscuro según el sistema, un solo tema por página. Los tokens viven en `colores` de `content.json` |
| Formas | Botones en píldora; tarjetas, imágenes y paneles con un único radio (14 px) |
| Íconos | Phosphor (`@phosphor-icons/core`), estilo regular, sin SVG hechos a mano |
| Movimiento | Resorte suave con `linear()` para botones y reveals; todo con `transform` y `opacity` |

Contrastes AA medidos. Claro: texto/fondo 16,3:1, suave/fondo 6,2:1, blanco/acento 4,9:1. Oscuro: texto/fondo 16,3:1, suave/fondo 7,4:1, tinta/acento 7,4:1.

## Secciones (7 familias de layout distintas)
| Sección | Layout y motion |
|---|---|
| Hero | Asimétrico: texto a la izquierda, foto a la derecha que se revela con `clip-path`. Cabe en el viewport |
| Clientes | Franja de logos (solo logos, monogramas SVG para marcas ficticias) |
| Servicios | Bento de 4 celdas con variación real: foto, patrón de código de barras, tinte de acento y base |
| Proceso | Número fijo que **cuenta hacia arriba mientras recorres los pasos** (CSS `@property` + `animation-timeline`), con verbos como títulos |
| Resultados | Una cifra grande y dos pequeñas, sin tarjetas iguales |
| Rubros | Carrusel con `scroll-snap`, botones y teclado (sin arrastre obligatorio) |
| Testimonios | Una cita principal y dos secundarias (máximo 3 líneas) |
| Preguntas y cierre | Acordeón exclusivo (`details name`) y panel de cierre |

## Reglas de la skill verificadas
- Cero guiones largos (`—`) y cero `–` como separador, en código y contenido.
- Una sola etiqueta de contacto ("Cotizar inventario") en nav, hero y cierre.
- 1 eyebrow en toda la página (el límite era 3).
- Ningún `window.addEventListener("scroll")`: solo `IntersectionObserver` y CSS scroll-driven.
- Sin `100vh`, sin cursores a medida, sin puntos decorativos, sin scroll cues, sin pantallas falsas hechas con `div`.
- Modo claro y oscuro revisados por separado. Con `prefers-reduced-motion`: sin animaciones, contador en su valor final.
- Probada a 375 px con 20 textos de más de 100 caracteres sin espacios: sin desborde.

## Lo que hay que reemplazar antes de usarla con un cliente
- **Fotos:** son de ejemplo (Picsum, en escala de grises y marcadas con `data-placeholder`). Cambia las rutas `foto` de `content.json` por fotos reales de la bodega, del equipo contando y de cada rubro; al hacerlo el filtro gris deja de aplicarse solo.
- **Logos de clientes:** son monogramas de marcas inventadas. Con clientes reales, usar sus logos en SVG.
- **Cifras de Resultados:** son de ejemplo (`muestra: true`). Usar datos reales del negocio.
- Falta `public/og-image.jpg` y el dominio en `astro.config.mjs`.

## Nota sobre el stack
La skill propone React, Tailwind y Motion por defecto. Aquí se respeta la convención del repo (Astro + CSS propio) y se usa lo que la skill permite de forma nativa: CSS scroll-driven animations, `IntersectionObserver` y `linear()` para el resorte.
