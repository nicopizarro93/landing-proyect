# Plantilla Landing: Servicio de alimentación ("Cocina del Valle")

Landing para servicios de alimentación: colaciones diarias, catering para eventos y servicio en terreno. Diseñada con **ui-ux-pro-max** (estilo *Nature Distilled* + movimiento marcado para alimentos; tipografía Calistoga + Karla) y las reglas de movimiento de **emilkowalski/skills**. Astro + CSS propio, sin dependencias de animación.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
```

## Paleta "cocina cálida"
| Color | Valor | Contraste |
|---|---|---|
| Cacao (texto) | `#2A1A12` | 14.9:1 sobre crema |
| Crema (fondo) | `#F8F1E4` | – |
| Terracota (acento) | `#B2432A` | 5.0:1 con crema |
| Oliva | `#4F6B2F` | 6.0:1 con crema |
| Mostaza | `#E8A93A` | 8.1:1 con cacao |
| Arena | `#EAD9BD` | 12.1:1 con cacao |

Se cambian en `colores` del JSON.

## Secciones y motion
| Sección | Qué hace |
|---|---|
| Cabecera | Franja de cobertura + barra con CTA; sombra al hacer scroll |
| Hero | Plato hecho en CSS que gira con el scroll; entrada escalonada |
| Servicios | Filas en zigzag; la ilustración entra desde el lado (`animation-timeline: view()`) |
| **Menú de la semana** | Plato fijo que cambia de color y de día mientras recorres la lista (scrollytelling) |
| **Cotizador** | Personas × días × tipo de colación; total animado y botón que abre WhatsApp con la cotización armada |
| Cómo funciona | Línea de tiempo que se dibuja con el scroll |
| Cifras | Contadores |
| Testimonios | Tres tarjetas con parallax diferente por columna |
| Cobertura, FAQ, Cierre | Comunas, preguntas desplegables y panel terracota |

## Personalizar
- Todo en `src/data/content.json`: menú (`menu.dias`), precios (`cotizador.planes`, en CLP por persona), comunas, FAQ, textos.
- El cotizador usa 4,3 semanas por mes (`semanas` en `Cotizador.astro`). El total es **referencial**; el mensaje a WhatsApp lo dice.
- Fotos: `hero.foto` reemplaza el plato del hero; si está vacío se usa el plato en CSS.
- Falta `public/og-image.jpg` y el dominio en `astro.config.mjs`.

## Accesibilidad y robustez
- Con `prefers-reduced-motion`: sin desplazamientos, la línea y el menú quedan estáticos y legibles.
- Sin JavaScript: el menú muestra los 5 días, y el cotizador mantiene un enlace a WhatsApp con el mensaje base.
- Hover solo con mouse; objetivos táctiles de 44 px; foco visible.
- Probada con 20 textos de más de 100 caracteres sin espacios en 375 px: sin desborde.
