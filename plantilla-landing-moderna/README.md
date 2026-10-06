# Plantilla Landing "Impulso" (moderna, scroll motion)

Cuarta variante para coach / personal trainer, con una disposición editorial completamente distinta. Diseñada con la skill **ui-ux-pro-max** (estilo *Bento Box Grid* + bloques vibrantes, tipografía Space Grotesk + DM Sans) y las reglas de movimiento de **emilkowalski/skills**. Astro + CSS propio, sin dependencias de animación.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
```

## Paleta
| Color | Valor | Uso | Contraste |
|---|---|---|---|
| Tinta | `#0E1116` | Texto, fondos oscuros | 16.5:1 sobre hueso |
| Hueso | `#F2EFE8` | Fondo | – |
| Lima eléctrica | `#C6F135` | Acento, botones | 14.4:1 con tinta |
| Cobalto | `#2F4BFF` | Acento secundario | 5.9:1 con blanco |
| Arena | `#E3DCCB` | Superficies | 13.8:1 con tinta |
| Suave | `#4B5160` | Texto secundario | 6.9:1 sobre hueso |

Se cambian en `colores` del JSON.

## Disposición y motion por sección
| Sección | Disposición | Motion de scroll |
|---|---|---|
| Nav | Pastilla flotante siempre visible con CTA | Se compacta al hacer scroll |
| Hero | Titular gigante con píldoras dentro del texto; sello circular | Palabras que suben, píldoras que se abren, sello que gira con el scroll, tarjeta de media que se expande |
| Bento | Cuadrícula asimétrica de cifras | Reveal escalonado y contadores |
| Servicios | Tarjetas que se apilan | La anterior se encoge y oscurece (JS, `--cover`) |
| Sobre mí | Foto fija a la izquierda, texto a la derecha | Reveal por líneas |
| Proceso | Carril horizontal fijado (solo escritorio) | Scroll vertical mueve el carril (`--p`); en móvil es vertical |
| Planes | Filas desplegables (`<details name>`) | Apertura animada con `::details-content` |
| Testimonios | Dos cintas en sentidos opuestos | Botón de pausa (WCAG 2.2.2) |
| FAQ | Título fijo + lista numerada | Reveal |
| Cierre / footer | Panel lima, nombre gigante | El nombre sube al entrar |
| Global | Barra de progreso vertical a la derecha | `animation-timeline: scroll()` |

## Accesibilidad y robustez
- Con `prefers-reduced-motion`: sin desplazamientos, sin fijados, cintas quietas y fundidos cortos.
- Sin JavaScript el contenido se ve completo.
- Hover solo con mouse (`hover: hover` y `pointer: fine`), sin hover pegado en el celular.
- Probada con textos de más de 100 caracteres sin espacios en 375 px: sin desborde.
- Foto del hero y de "Sobre mí": rutas en `hero.foto` y `sobre.foto` del JSON (si están vacías se muestran formas decorativas). Faltan `public/og-image.jpg` y el dominio en `astro.config.mjs`.
