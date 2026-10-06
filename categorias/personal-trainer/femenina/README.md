# Plantilla Landing: Personal Trainer femenina (con motion)

Variante clara y suave de `oscura`, diseñada con la skill **ui-ux-pro-max**. Astro + CSS propio, sin dependencias de animación.

## Uso
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

## Personalizar para una clienta
1. Editar `src/data/content.json` (textos, planes, WhatsApp, colores).
2. Fotos: poner la ruta en `hero.foto` y `sobre.foto` (WebP, en `public/`). Si están vacías se muestra un arco decorativo.
3. Cambiar `site` en `astro.config.mjs` y `public/robots.txt`.
4. Agregar `public/og-image.jpg` (1200x630).
5. En el entorno preview de Cloudflare: `PUBLIC_NOINDEX=true`.

## Sistema de diseño
| Elemento | Valor |
|---|---|
| Estilo | Suave y orgánico: arcos, blobs difusos, esquinas redondeadas |
| Tipografía | Playfair Display (títulos) + Inter (texto), vía Google Fonts con `display=swap` |
| Fondo / texto | `#FDF2F8` / `#4A1D3F` (12.5:1) |
| Acento (botones, enlaces) | `#BE185D` (6.0:1 con blanco) |
| Lavanda (detalles, foco) | `#6D28D9` (6.5:1) |
| Decorativos sin texto | `#EC4899`, `#F9A8D4`, `#C4B5FD` |

Los colores se cambian en `colores` del JSON. `#EC4899` no se usa con texto blanco porque da 3.5:1 (no pasa AA).

## Kinetic type
| Efecto | Dónde | Técnica |
|---|---|---|
| Letras que suben con retraso y reaccionan al pasar el mouse | Título del hero | `.char` + `animation-delay` por palabra y letra |
| Líneas grandes que se desplazan en sentidos opuestos | `Kinetico.astro` | CSS `animation-timeline: view()` |
| Palabras que se encienden al subir | Frase de `Kinetico.astro` | CSS `view()` por palabra |
| Inclinación según velocidad de scroll | Líneas con `data-skew` | `motion.js`, solo `transform` |

Textos en `kinetico` del JSON. Accesible: el `h1` usa `aria-label` con el título completo, las letras son decorativas y las líneas gigantes se anuncian una vez con un `h2` solo para lector de pantalla. Con `prefers-reduced-motion` todo queda quieto y legible. Sin soporte de `view()` el texto queda estático.

## Motion
Barra de progreso, título palabra por palabra con subrayado que se dibuja, arco con parallax suave, chips flotantes, marquee, contadores, reveal escalonado, paso activo en "Proceso", carrusel con scroll-snap y botón flotante de WhatsApp. Con `prefers-reduced-motion` todo queda estático; sin JavaScript el contenido sigue visible.

Nota: la tipografía viene de Google Fonts. Para autoalojarla (mejor privacidad y rendimiento) usar `@fontsource` y quitar los `<link>` de `Base.astro`.

## Demo hero 2.5D (`/hero-25d`)
Página de prueba con un escenario fijo de 4 capas (fondo, plano medio, sujeto, primer plano) que se mueven a distinta velocidad con el scroll, más parallax con el mouse y 3 escenas de texto. Inspirado en el enfoque del *cinematic-scroll-prompt-kit*, pero con solo 4 capas y sin librerías.

- Código: `src/components/Hero25D.astro` y `src/scripts/cine.js`. Textos y rutas de imagen en `hero25d` del JSON.
- Sin imágenes en `hero25d.capas` se muestran formas de placeholder. Para usar fotos: PNG/WebP con fondo transparente para `sujeto` (≈900x1350) y capas panorámicas para `fondo`, `medio` y `frente` (≈1600x1000, con margen extra en los bordes).
- QA: agregar `?p=0.5` a la URL congela el progreso (0 a 1) para revisar una posición exacta.
- Con `prefers-reduced-motion` o sin JavaScript se muestra una composición estática con los tres textos apilados.
