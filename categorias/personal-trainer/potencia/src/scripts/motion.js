// Sin listeners de scroll: todo con IntersectionObserver o CSS scroll-driven animations (regla de la skill).
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 1. Reveal al entrar en pantalla (jerarquia: lo importante aparece primero)
const items = [...document.querySelectorAll("[data-reveal]")];
if (!("IntersectionObserver" in window)) {
  items.forEach((el) => el.classList.add("is-visible"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
  );
  items.forEach((el) => io.observe(el));
}

// 2. Cabecera: borde y fondo mas firme cuando deja de estar arriba (observa un centinela, no el scroll)
const nav = document.querySelector("[data-nav]");
const sentinel = document.querySelector("[data-sentinel]");
if (nav && sentinel && "IntersectionObserver" in window) {
  new IntersectionObserver(([e]) => nav.classList.toggle("is-stuck", !e.isIntersecting)).observe(sentinel);
}

// 3. Carrusel de rubros: botones como alternativa a arrastrar o hacer scroll horizontal
const track = document.querySelector("[data-rubros]");
if (track) {
  const paso = () => Math.max(track.clientWidth * 0.8, 240);
  const mover = (dir) => track.scrollBy({ left: dir * paso(), behavior: reduce ? "auto" : "smooth" });
  document.querySelector("[data-rubros-prev]")?.addEventListener("click", () => mover(-1));
  document.querySelector("[data-rubros-next]")?.addEventListener("click", () => mover(1));
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); mover(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); mover(-1); }
  });
}
