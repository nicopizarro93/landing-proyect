# Plantilla Landing "Potencia" (personal trainer, negro y amarillo)

Landing de entrenamiento personal con identidad de gimnasio de alto impacto (negro con amarillo, estilo Smart Fit). Misma estructura y componentes que la plantilla de inventario "Bodega", con un hero por capas con scroll como el de la demo 2.5D. Hecha con la skill **taste-skill** (`design-taste-frontend`), ui-ux-pro-max y las reglas de motion de emilkowalski/skills.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
```

## Sistema de diseño
| Elemento | Decisión |
|---|---|
| Paleta | Negro `#0C0C0D`, superficie `#151517`, texto `#F3F3F0`, suave `#A7A7AD` y **un solo acento amarillo `#FFC800`** |
| Tema | Oscuro siempre (decisión de marca; no depende del sistema). Los tokens están en `colores` de `content.json` |
| Amarillo | Supera el 80 % de saturación que la skill recomienda por defecto, pero es el color pedido. Se limita a un acento y a 3 bloques sólidos (servicios, resultados y cierre) |
| Tipografía | Outfit (texto y títulos) + Geist Mono (cifras), autoalojadas con `@fontsource-variable`. Sin Google Fonts |
| Íconos | Phosphor (`@phosphor-icons/core`), estilo regular |
| Formas | Botones en píldora; tarjetas, imágenes y paneles con un único radio (14 px) |

Contrastes AA: texto/fondo 17,6:1, suave/fondo 8,2:1, suave/superficie 7,6:1, tinta/amarillo 12,6:1.

## Hero por capas (inspirado en la demo 2.5D)
Un escenario fijo con cuatro capas que se mueven a distinta velocidad mientras haces scroll: foto de fondo (la más lenta), velo de legibilidad, bloque amarillo diagonal (más rápido) y, opcionalmente, un deportista recortado. Dos escenas de texto se alternan.

- Todo con **CSS scroll-driven animations** (`animation-timeline: scroll(root)`): sin JavaScript y sin listeners de scroll.
- La escena que no se ve queda con `visibility: hidden`, así no recibe foco ni lectura.
- Con `prefers-reduced-motion` o en navegadores sin soporte queda una portada estática de una pantalla, sin la escena B.
- Para sumar el deportista recortado: PNG con fondo transparente (unos 900x1350 px) en `public/` y su ruta en `hero.capas.sujeto` de `content.json`.

## Secciones (mismo esqueleto que Bodega)
Hero por capas, Servicios (bento: foto, franjas diagonales, bloque amarillo y base), Proceso (el número de sesiones sube mientras recorres los pasos), Resultados (una cifra grande y dos pequeñas), Programas (carrusel con `scroll-snap`, botones y teclado), Planes (uno destacado y dos compactos), Testimonios, Preguntas y Cierre.

## Reglas de la skill verificadas
Cero guiones largos, una sola etiqueta de contacto ("Reservar evaluación"), 1 eyebrow, ningún listener de scroll, sin `100vh`. Probada a 375 px con 23 textos de más de 100 caracteres sin espacios: sin desborde. En móvil el bloque amarillo queda en el borde y el texto se limita a su izquierda para no superponerse.

## Lo que hay que reemplazar antes de usarla con un cliente
- **Fotos:** son de ejemplo (Picsum, en gris y con `data-placeholder`). Cambiar las rutas `foto` de `content.json` por fotos reales del estudio, del entrenador y de los alumnos.
- **Cifras, testimonios y precios:** son de ejemplo (`muestra: true` en resultados).
- Falta `public/og-image.jpg` y el dominio en `astro.config.mjs`.
