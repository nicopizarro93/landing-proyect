# Plantilla Landing femenina v2 (pulida con las reglas de emilkowalski/skills)

Misma identidad visual que `femenina` (rosa y lavanda, Playfair + Inter, kinetic type), pero revisada con las reglas de [emilkowalski/skills](https://github.com/emilkowalski/skills): `emil-design-eng`, `animate`, `mobile-native`, `apple-design` y `break-ui`. Las reglas se leyeron de sus `SKILL.md` y se aplicaron a mano; no se instaló nada.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
```

## Qué cambió respecto a la v1
| Regla (skill) | Antes | Ahora |
|---|---|---|
| Curvas fijas (`animate`) | Curva propia | `--ease` `cubic-bezier(.23,1,.32,1)` para entradas, `--ease-hover` para color |
| Duraciones por tipo (`animate`) | 250 ms en todo | Presionar 120 ms, hover 180 ms, reveals 600 ms (marketing) |
| Hover solo con mouse (`mobile-native`) | `:hover` siempre | Todo `:hover` dentro de `@media (hover: hover) and (pointer: fine)`, sin hover pegado en el celular |
| Feedback al presionar (`mobile-native`) | Parcial | `:active` con `scale(.97)` en botones y botón flotante |
| Sin `scale(0)` (`animate`) | Botón flotante nacía de `scale(0)` | Nace de `scale(.8)` con fundido |
| Movimiento con propósito (`emil-design-eng`) | Chips flotando y pulso infinito | Chips estáticos; el pulso del botón flotante se repite 3 veces |
| Clip-path (`animate`) | Arco con fundido | Arco que se revela con `clip-path` |
| Materiales (`apple-design`) | Sin nav | Nav translúcido con `backdrop-filter`, aparece tras el hero |
| Tracking según tamaño (`apple-design`) | Fijo | Más cerrado en títulos grandes, 0 en texto |
| Reducir movimiento (`apple-design`) | Todo estático | Sin desplazamientos, pero con fundidos cortos de opacidad (200 ms) |
| Pulido móvil (`mobile-native`) | Básico | `viewport-fit=cover`, áreas seguras en el botón flotante, `touch-action: manipulation`, sin selección accidental en controles, sin resaltado gris al tocar |
| Casos extremos (`break-ui`) | Texto largo ensanchaba la página | `minmax(0, 1fr)` en todas las cuadrículas y `overflow-wrap: anywhere` en el texto; precios con `tabular-nums` |

## Prueba de estrés
Se reemplazaron 19 textos por cadenas de más de 100 caracteres sin espacios (títulos, tarjetas, planes, FAQ, pasos, citas, correo) en 375 px. Antes aparecían tres desbordes (estadísticas, proceso y plan/contacto); ahora el ancho se mantiene en 375 px.

## Pendiente
- Resortes con velocidad (`apple-design`) para gestos de arrastre: no aplica, la landing no tiene arrastre.
- Probar en un celular real por red local (la skill lo exige: hover pegado, altura de la barra del navegador y teclado no se ven en emulación).
- Medir Lighthouse.
