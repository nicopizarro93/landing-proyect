# Landing Proyect

Plantillas de landing pages para negocios locales, organizadas por categoría (Astro + CSS propio, con motion).

```
categorias/
├─ personal-trainer/            ← categoria.json
│  ├─ oscura/                   ← plantilla.json + proyecto Astro
│  ├─ femenina/
│  ├─ femenina-v2/
│  └─ moderna/
└─ alimentacion/                ← categoria.json
   └─ calida/
```

| Categoría | Plantilla | Descripción |
|---|---|---|
| Personal trainers y coaches | [`oscura`](categorias/personal-trainer/oscura) | Negro y rojo, motion de scroll |
| | [`femenina`](categorias/personal-trainer/femenina) | Rosa y lavanda, kinetic type, demo de hero 2.5D |
| | [`femenina-v2`](categorias/personal-trainer/femenina-v2) | La anterior, pulida (hover solo con mouse, nav translúcido, casos extremos) |
| | [`moderna`](categorias/personal-trainer/moderna) | Editorial: lima y cobalto; bento, tarjetas apiladas, proceso horizontal |
| Servicios de alimentación | [`calida`](categorias/alimentacion/calida) | Terracota y oliva; menú que cambia con el scroll y cotizador |

Cada plantilla es un proyecto independiente con su propio `README.md`:

```bash
cd categorias/personal-trainer/moderna
npm install
npm run dev
```

## Agregar una categoría o una plantilla nueva
1. Crea la carpeta `categorias/<categoria>/<estilo>/` con el proyecto Astro (copia el más parecido).
2. Agrega `plantilla.json` dentro de la plantilla:
   ```json
   { "nombre": "Mi estilo", "texto": "Una frase que lo describe.", "colores": ["#111", "#c6f135", "#2f4bff"],
     "etiquetas": ["Etiqueta 1", "Etiqueta 2"], "orden": 1 }
   ```
   (opcional: `"extra": { "etiqueta": "Ver demo", "ruta": "otra-pagina/" }` para un segundo botón)
3. Si la categoría es nueva, agrega `categorias/<categoria>/categoria.json`:
   ```json
   { "nombre": "Nombre visible", "descripcion": "Para qué tipo de negocio es.", "orden": 3 }
   ```
4. Cada plantilla debe tener `astro.config.mjs` con `base: process.env.BASE_PATH || "/"` y el componente `ShowcaseBack` (cópialo de otra). Nada más: el script y la galería la descubren solos.

## Galería de versiones (para mostrar a clientes)
`galeria/index.html` es la página de inicio, agrupada por categoría, con vista previa en vivo y botones a cada versión. Un script construye todo en un solo sitio estático:

```bash
node scripts/build-showcase.mjs                              # genera showcase-dist/
node scripts/build-showcase.mjs --solo alimentacion/calida   # reconstruye solo una plantilla
node scripts/serve-showcase.mjs                              # http://localhost:4400
```

- Cada plantilla se publica en `/<categoria>/<estilo>/` usando la variable `BASE_PATH`.
- Las demos salen con `noindex` (`PUBLIC_NOINDEX=true`) y con un botón "← Todas las versiones" (`PUBLIC_SHOWCASE=true`) que no aparece en las páginas de producción.
- Los enlaces antiguos (`/oscura/`, `/femenina/`, `/femenina-v2/`, `/moderna/`, `/femenina/hero-25d/`) redirigen a su nueva ruta.
- Para probar desde el celular: con el servidor en marcha, abre `http://<IP-de-tu-PC>:4400` en la misma red Wi-Fi.

## Publicar en GitHub Pages
El flujo `.github/workflows/deploy-showcase.yml` construye la galería y la publica en `https://<usuario>.github.io/<repo>/` cada vez que se sube algo a `main` (o a mano desde la pestaña Actions → *Run workflow*).

Configuración única en GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

- El build usa `SHOWCASE_BASE=/<nombre-del-repo>` para que las rutas funcionen bajo esa subruta.
- GitHub Pages es gratis solo con repositorios públicos; con uno privado exige un plan de pago.
- Las demos son públicas para quien tenga el enlace (no hay contraseña), llevan `noindex` y usan datos ficticios.

## Ramas
`main` es lo que se publica; el trabajo en curso va en `dev`.
