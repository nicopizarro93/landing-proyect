# Reglas del proyecto
- Stack: Astro + CSS propio (src/styles/global.css). Dependencias permitidas: Astro, @fontsource-variable (Outfit y Geist Mono) y @phosphor-icons/core (íconos). No agregar otras sin preguntar.
- Todo texto, cifra, enlace, foto y color vive en src/data/content.json. Los colores (claro y oscuro) se inyectan desde ahí en Base.astro; no repetirlos en global.css.
- Mobile-first. Probar en 360px y con textos largos sin espacios.
- Una sola etiqueta para la intención "contactar" (CtaButton). Un solo acento de color (amarillo) y un solo radio (--radio). Tema oscuro fijo.
- Copy: español de Chile, sin guiones largos (—), sin "·" como separador, sin frases de relleno. Una cita de testimonio no pasa de 3 líneas.
- Íconos solo de Phosphor, estilo regular. No dibujar SVG a mano (los monogramas de logos ficticios son la excepción).
- Imágenes: reales cuando existan. Las de Picsum son temporales y llevan data-placeholder.

## Motion
- Sin librerías de animación. Solo CSS y src/scripts/motion.js.
- Prohibido `window.addEventListener("scroll")`: usar IntersectionObserver o CSS scroll-driven animations.
- Animar solo transform, opacity y propiedades registradas con @property. Todo movimiento debe poder justificarse en una frase (jerarquía, narración, feedback o cambio de estado).
- Máximo un marquee por página. Todo `:hover` dentro de `@media (hover: hover) and (pointer: fine)`.
- Con `prefers-reduced-motion`: sin desplazamientos y todo el contenido visible. Sin JavaScript el contenido se ve completo.
- El hero por capas se mueve solo con CSS (`animation-timeline: scroll(root)`). Si se cambia la altura de `.cine` (270dvh), ajustar el rango `0 170dvh` (altura menos una pantalla).
