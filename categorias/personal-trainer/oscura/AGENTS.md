# Reglas del proyecto
- Stack: Astro + CSS propio (src/styles/global.css). No agregar frameworks ni dependencias sin preguntar.
- Todo texto, precio, enlace y color editable vive en src/data/content.json.
  Nunca escribir textos fijos en los componentes.
- Mobile-first. Probar en 360px de ancho.
- Accesibilidad: un solo h1, alt en imágenes, contraste suficiente, botones con texto claro.
- Rendimiento: imágenes en WebP/AVIF, con width/height y loading="lazy" (excepto el Hero).
- Los botones de contacto usan el componente WhatsAppButton con un `origen` distinto.
- Idioma: español de Chile. Tono cercano y profesional.
- No tocar la rama main directamente; trabajar en dev.

## Motion
- Sin librerías de animación. Solo CSS (scroll-driven animations, transitions) y src/scripts/motion.js.
- Animar solo `transform` y `opacity`. Nunca width, height, top o left.
- Para revelar un elemento al hacer scroll: atributo `data-reveal` (`"scale"` opcional) y `style="--d:120ms"` para escalonar.
- Contadores: `data-count="250"`. Paso activo del proceso: `data-step`.
- Todo movimiento nuevo debe quedar cubierto por el bloque `prefers-reduced-motion` de global.css.
- El contenido debe ser visible sin JavaScript: los estados ocultos iniciales cuelgan de la clase `.js`.
