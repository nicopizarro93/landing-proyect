# Plantilla Landing: Personal Trainer (con motion)

Landing estática en Astro, sin dependencias de animación.

## Uso
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

## Personalizar para un cliente
1. Editar `src/data/content.json` (textos, planes, WhatsApp, colores).
2. Cambiar `site` en `astro.config.mjs` y `public/robots.txt`.
3. Agregar `public/og-image.jpg` (1200x630).
4. En el entorno preview de Cloudflare: `PUBLIC_NOINDEX=true`.

## Componentes con motion
| Componente | Efecto |
|---|---|
| ScrollProgress | Barra de progreso de lectura (CSS `scroll()`) |
| Hero | Título palabra por palabra, texto fantasma con parallax, blobs flotantes |
| Marquee | Cinta infinita de palabras clave |
| Stats | Contadores animados al entrar en pantalla |
| Servicios / Planes / Faq | Reveal escalonado al hacer scroll |
| Proceso | Título sticky y paso activo según el scroll |
| Testimonios | Carrusel con scroll-snap |
| FloatingWhatsApp | Aparece tras el hero, con pulso |

Con `prefers-reduced-motion` todo queda estático. Sin soporte de scroll-driven animations (Firefox, Safari antiguos) la barra y el parallax simplemente no se muestran.
