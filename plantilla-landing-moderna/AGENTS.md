# Reglas del proyecto
- Stack: Astro + CSS propio (src/styles/global.css). No agregar frameworks ni dependencias sin preguntar.
- Todo texto, precio, enlace y color editable vive en src/data/content.json. Nunca escribir textos fijos en los componentes.
- Mobile-first. Probar en 360px de ancho y con textos largos (sin espacios) para verificar que nada desborda.
- Accesibilidad: un solo h1, alt en imágenes, contraste AA, foco visible, objetivos táctiles de 44px.
- Los botones de contacto usan WhatsAppButton con un `origen` distinto.
- Idioma: español de Chile. Trabajar en la rama dev.

## Motion
- Sin librerías de animación. Solo CSS (scroll-driven animations, transitions) y src/scripts/motion.js.
- Animar solo transform, translate, scale y opacity. Curvas: `--ease` (ease-out) para entradas; hover 180 ms, presionar 120 ms.
- Todo `:hover` va dentro de `@media (hover: hover) and (pointer: fine)`.
- Máximo 2 secciones fijadas (pin): hoy son las tarjetas apiladas y el proceso horizontal. El horizontal solo en ≥900px.
- El movimiento continuo (cintas) debe tener botón de pausa y quedar quieto con `prefers-reduced-motion`.
- Con `prefers-reduced-motion`: sin desplazamientos ni fijados, solo fundidos cortos de opacidad, y todo el contenido visible.
- El contenido debe verse sin JavaScript: los estados ocultos cuelgan de la clase `.js`.
