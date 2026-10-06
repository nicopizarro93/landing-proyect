// Construye la galería de versiones en un solo sitio estático: showcase-dist/
//
// Descubre las plantillas solas:   categorias/<categoria>/<estilo>/   (con package.json y plantilla.json)
// y las publica en:                showcase-dist/<categoria>/<estilo>/
// La galería (galeria/index.html) recibe el catálogo agrupado por categoría (categoria.json de cada una).
//
// Uso:  node scripts/build-showcase.mjs
//       node scripts/build-showcase.mjs --solo personal-trainer/moderna     (construye solo esa plantilla)
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "showcase-dist");
const categoriasDir = join(root, "categorias");
// En GitHub Pages el sitio vive bajo /<repo>/ (ej. SHOWCASE_BASE=/landing-proyect). En local queda vacío.
const prefijo = (process.env.SHOWCASE_BASE || "").replace(/\/$/, "");

const args = process.argv.slice(2);
const solo = args.includes("--solo") ? args[args.indexOf("--solo") + 1] : null;

const leer = (ruta) => JSON.parse(readFileSync(ruta, "utf-8"));
const subcarpetas = (dir) =>
  readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);

// Enlaces antiguos (antes de separar por categoría) que siguen funcionando con una redirección.
const antiguos = {
  "oscura": "personal-trainer/oscura",
  "femenina": "personal-trainer/femenina",
  "femenina-v2": "personal-trainer/femenina-v2",
  "moderna": "personal-trainer/moderna",
};

// ---------- 1. Descubrir categorías y plantillas ----------
const catalogo = [];
for (const cat of subcarpetas(categoriasDir)) {
  const catDir = join(categoriasDir, cat);
  const metaCat = join(catDir, "categoria.json");
  if (!existsSync(metaCat)) continue;
  const info = leer(metaCat);
  const plantillas = [];
  for (const slug of subcarpetas(catDir)) {
    const dir = join(catDir, slug);
    if (!existsSync(join(dir, "package.json")) || !existsSync(join(dir, "plantilla.json"))) continue;
    plantillas.push({ slug, dir, ...leer(join(dir, "plantilla.json")) });
  }
  plantillas.sort((a, b) => (a.orden ?? 99) - (b.orden ?? 99) || a.slug.localeCompare(b.slug));
  if (plantillas.length) catalogo.push({ slug: cat, ...info, plantillas });
}
catalogo.sort((a, b) => (a.orden ?? 99) - (b.orden ?? 99) || a.slug.localeCompare(b.slug));
if (!catalogo.length) {
  console.error("No se encontró ninguna plantilla en categorias/. Cada una necesita package.json y plantilla.json.");
  process.exit(1);
}

const run = (cmd, argv, cwd, env = {}) => {
  const r = spawnSync(cmd, argv, { cwd, stdio: "inherit", shell: true, env: { ...process.env, ...env } });
  if (r.status !== 0) {
    console.error(`\nFalló: ${cmd} ${argv.join(" ")} (en ${cwd})`);
    process.exit(r.status ?? 1);
  }
};

// ---------- 2. Construir cada plantilla ----------
if (!solo) rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

for (const cat of catalogo) {
  for (const p of cat.plantillas) {
    const id = `${cat.slug}/${p.slug}`;
    if (solo && solo !== id) continue;
    console.log(`\n=== ${id} ===`);
    if (!existsSync(join(p.dir, "node_modules"))) run("npm", ["install", "--no-audit", "--no-fund"], p.dir);
    run("npm", ["run", "build"], p.dir, {
      BASE_PATH: `${prefijo}/${id}`,
      PUBLIC_NOINDEX: "true", // las demos no deben indexarse
      PUBLIC_SHOWCASE: "true", // muestra el botón "Todas las versiones"
    });
    const destino = join(out, cat.slug, p.slug);
    rmSync(destino, { recursive: true, force: true });
    mkdirSync(dirname(destino), { recursive: true });
    cpSync(join(p.dir, "dist"), destino, { recursive: true });
  }
}

// ---------- 3. Galería con el catálogo incrustado ----------
const publico = catalogo.map((c) => ({
  slug: c.slug,
  nombre: c.nombre,
  descripcion: c.descripcion,
  plantillas: c.plantillas.map(({ slug, nombre, texto, colores, etiquetas, extra }) => ({
    slug,
    carpeta: `${c.slug}/${slug}/`,
    nombre,
    texto,
    colores,
    etiquetas,
    extra: extra ? { etiqueta: extra.etiqueta, href: `${c.slug}/${slug}/${extra.ruta}` } : null,
  })),
}));
const html = readFileSync(join(root, "galeria", "index.html"), "utf-8").replace(
  "/*__CATALOGO__*/ []",
  JSON.stringify(publico).replace(/</g, "\\u003c"), // evita que un texto cierre el <script>
);
writeFileSync(join(out, "index.html"), html);
writeFileSync(join(out, ".nojekyll"), ""); // GitHub Pages no debe procesar con Jekyll (carpetas _astro)

// ---------- 4. Redirecciones de los enlaces antiguos ----------
const redirigir = (desde, hacia) => {
  const carpeta = join(out, desde);
  mkdirSync(carpeta, { recursive: true });
  const profundidad = desde.split("/").filter(Boolean).length;
  const rel = "../".repeat(profundidad) + hacia;
  writeFileSync(
    join(carpeta, "index.html"),
    `<!doctype html><html lang="es-CL"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Redirigiendo…</title>` +
      `<meta http-equiv="refresh" content="0; url=${rel}"><link rel="canonical" href="${rel}"></head>` +
      `<body><p>Esta página se movió. <a href="${rel}">Ir a la nueva dirección</a>.</p><script>location.replace(${JSON.stringify(rel)});</script></body></html>`,
  );
};
if (!solo) {
  for (const [viejo, nuevo] of Object.entries(antiguos)) {
    if (existsSync(join(out, nuevo))) redirigir(viejo, `${nuevo}/`);
  }
  if (existsSync(join(out, "personal-trainer/femenina/hero-25d"))) {
    redirigir("femenina/hero-25d", "personal-trainer/femenina/hero-25d/");
  }
}

console.log(`\nListo: ${out}\nPara verlo: node scripts/serve-showcase.mjs`);
