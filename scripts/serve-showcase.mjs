// Servidor estático mínimo para ver showcase-dist/ en local (sin dependencias).
// Uso: node scripts/serve-showcase.mjs [puerto]   (por defecto 4400)
// Para probar desde el celular: abre http://<IP-de-tu-PC>:4400 en la misma red Wi-Fi.
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(resolve(dirname(fileURLToPath(import.meta.url)), ".."), "showcase-dist");
const port = Number(process.argv[2]) || 4400;
const prefijo = (process.env.SHOWCASE_BASE || "").replace(/\/$/, "");

if (!existsSync(root)) {
  console.error("No existe showcase-dist/. Ejecuta primero: node scripts/build-showcase.mjs");
  process.exit(1);
}

const tipos = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8", ".xml": "application/xml",
};

createServer((req, res) => {
  let ruta = decodeURIComponent(new URL(req.url, "http://x").pathname);
  // Para probar el prefijo de GitHub Pages: SHOWCASE_BASE=/landing-proyect node scripts/serve-showcase.mjs
  if (prefijo) {
    if (ruta === prefijo) { res.writeHead(301, { Location: prefijo + "/" }).end(); return; }
    if (!ruta.startsWith(prefijo + "/")) { res.writeHead(404).end("No encontrado (usa " + prefijo + "/)"); return; }
    ruta = ruta.slice(prefijo.length);
  }
  let archivo = normalize(join(root, ruta));
  if (!archivo.startsWith(root)) { res.writeHead(403).end("Prohibido"); return; }
  if (existsSync(archivo) && statSync(archivo).isDirectory()) {
    // Las carpetas sin barra final se redirigen para que las rutas relativas funcionen.
    if (!ruta.endsWith("/")) { res.writeHead(301, { Location: ruta + "/" }).end(); return; }
    archivo = join(archivo, "index.html");
  }
  if (!existsSync(archivo)) { res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("No encontrado"); return; }
  res.writeHead(200, { "Content-Type": tipos[extname(archivo)] || "application/octet-stream" });
  res.end(readFileSync(archivo));
}).listen(port, "0.0.0.0", () => {
  console.log(`Galería en http://localhost:${port}`);
});
