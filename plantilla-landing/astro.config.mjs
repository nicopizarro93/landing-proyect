import { defineConfig } from "astro/config";

// Cambiar por el dominio real del cliente antes de publicar.
export default defineConfig({
  site: "https://dominio-del-cliente.cl",
  // En la galeria de versiones cada plantilla vive en una subcarpeta (ej. BASE_PATH=/oscura).
  base: process.env.BASE_PATH || "/",
});
