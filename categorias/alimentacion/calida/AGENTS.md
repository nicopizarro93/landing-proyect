# Reglas del proyecto
- Stack: Astro + CSS propio (src/styles/global.css). No agregar frameworks ni dependencias sin preguntar.
- Todo texto, precio, comuna, enlace y color editable vive en src/data/content.json. Nunca escribir textos fijos en los componentes.
- Mobile-first. Probar en 360px y con textos largos (sin espacios) para verificar que nada desborda.
- Accesibilidad: un solo h1, contraste AA, foco visible, objetivos táctiles de 44px, controles con label visible.
- Los botones de contacto usan WhatsAppButton con un `origen` distinto. Los precios del cotizador son referenciales y deben decirlo.
- Idioma: español de Chile. Trabajar en la rama dev.

## Motion
- Sin librerías de animación. Solo CSS (scroll-driven animations, transitions) y src/scripts/motion.js.
- Animar solo transform, translate, scale y opacity. Curvas: `--ease` (ease-out) para entradas; hover 180 ms, presionar 120 ms.
- Todo `:hover` va dentro de `@media (hover: hover) and (pointer: fine)`.
- Con `prefers-reduced-motion`: sin desplazamientos, solo fundidos cortos de opacidad, y todo el contenido visible.
- El contenido debe verse sin JavaScript: los estados ocultos cuelgan de la clase `.js`.
