// Construye la galería de versiones en un solo sitio estático: showcase-dist/
//   showcase-dist/index.html          ← galería (galeria/index.html)
//   showcase-dist/oscura/             ← plantilla-landing
//   showcase-dist/femenina/           ← plantilla-landing-femenina
//   showcase-dist/femenina-v2/        ← plantilla-landing-femenina-v2
// Uso: node scripts/build-showcase.mjs
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "showcase-dist");

const versiones = [
  { slug: "oscura", dir: "plantilla-landing" },
  { slug: "femenina", dir: "plantilla-landing-femenina" },
  { slug: "femenina-v2", dir: "plantilla-landing-femenina-v2" },
];

const run = (cmd, args, cwd, env = {}) => {
  const r = spawnSync(cmd, args, { cwd, stdio: "inherit", shell: true, env: { ...process.env, ...env } });
  if (r.status !== 0) {
    console.error(`\nFalló: ${cmd} ${args.join(" ")} (en ${cwd})`);
    process.exit(r.status ?? 1);
  }
};

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(join(root, "galeria"), out, { recursive: true });

for (const { slug, dir } of versiones) {
  const cwd = join(root, dir);
  console.log(`\n=== ${slug} (${dir}) ===`);
  if (!existsSync(join(cwd, "node_modules"))) run("npm", ["install", "--no-audit", "--no-fund"], cwd);
  run("npm", ["run", "build"], cwd, {
    BASE_PATH: `/${slug}`,
    PUBLIC_NOINDEX: "true", // las demos no deben indexarse
    PUBLIC_SHOWCASE: "true", // muestra el botón "Todas las versiones"
  });
  cpSync(join(cwd, "dist"), join(out, slug), { recursive: true });
}

console.log(`\nListo: ${out}\nPara verlo: node scripts/serve-showcase.mjs`);
