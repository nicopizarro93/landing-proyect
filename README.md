# Landing Proyect

Plantillas de landing pages para personal trainers (Astro + CSS propio, con motion).

| Carpeta | Descripción |
|---|---|
| [`plantilla-landing`](plantilla-landing) | Versión oscura (negro y rojo) con motion de scroll |
| [`plantilla-landing-femenina`](plantilla-landing-femenina) | Versión clara (rosa y lavanda), diseñada con ui-ux-pro-max, con kinetic type y demo de hero 2.5D |
| [`plantilla-landing-femenina-v2`](plantilla-landing-femenina-v2) | La anterior, pulida con las reglas de emilkowalski/skills (hover solo con mouse, nav translúcido, casos extremos) |
| [`plantilla-landing-moderna`](plantilla-landing-moderna) | Disposición editorial totalmente distinta: lima, cobalto y tinta; bento, tarjetas apiladas, proceso horizontal y cintas de testimonios |

Cada carpeta es un proyecto independiente con su propio `README.md`:

```bash
cd plantilla-landing-femenina
npm install
npm run dev
```

## Galería de versiones (para mostrar a clientes)
`galeria/index.html` es una página de inicio con vista previa en vivo y botones a cada versión. Un script construye todo en un solo sitio estático:

```bash
node scripts/build-showcase.mjs   # genera showcase-dist/
node scripts/serve-showcase.mjs   # http://localhost:4400
```

- Cada plantilla se publica en su subcarpeta (`/oscura/`, `/femenina/`, `/femenina-v2/`) usando la variable `BASE_PATH`.
- Las demos salen con `noindex` (`PUBLIC_NOINDEX=true`) y con un botón "← Todas las versiones" (`PUBLIC_SHOWCASE=true`) que no aparece en las páginas de producción.
- Para probar desde el celular: con el servidor en marcha, abre `http://<IP-de-tu-PC>:4400` en la misma red Wi-Fi.
- Para agregar una versión nueva: sumarla a la lista en `scripts/build-showcase.mjs` y en `galeria/index.html`.
- Para publicarla en internet: subir el contenido de `showcase-dist/` a Cloudflare Pages (carga directa).

## Publicar en GitHub Pages
El flujo `.github/workflows/deploy-showcase.yml` construye la galería y la publica en `https://<usuario>.github.io/<repo>/` cada vez que se sube algo a `main` (o a mano desde la pestaña Actions → *Run workflow*).

Configuración única en GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

- El build usa `SHOWCASE_BASE=/<nombre-del-repo>` para que las rutas funcionen bajo esa subruta. Para probarlo en local: `SHOWCASE_BASE=/landing-proyect node scripts/build-showcase.mjs` y luego `SHOWCASE_BASE=/landing-proyect node scripts/serve-showcase.mjs 4401`.
- GitHub Pages es gratis solo con repositorios públicos; con uno privado exige un plan de pago.
- Las demos son públicas para quien tenga el enlace (no hay contraseña), llevan `noindex` y usan datos ficticios.
