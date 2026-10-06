// Motion sin dependencias: reveal al hacer scroll, contadores y estado del paso activo.
// Todo se desactiva si el usuario prefiere menos movimiento.
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const reveals = document.querySelectorAll("[data-reveal]");
const counters = document.querySelectorAll("[data-count]");
const steps = document.querySelectorAll("[data-step]");

function setCount(el, value) {
  el.textContent = String(value);
}

function animateCount(el) {
  const target = Number(el.dataset.count);
  if (reduce) return setCount(el, target);
  const duration = 1400;
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    setCount(el, Math.round(target * eased));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

if (!("IntersectionObserver" in window)) {
  reveals.forEach((el) => el.classList.add("is-visible"));
  counters.forEach((el) => setCount(el, el.dataset.count));
  steps.forEach((el) => el.classList.add("is-active"));
} else {
  // Con "reducir movimiento" los bloques aparecen con un fundido corto (sin desplazamiento).
  if (reduce) {
    counters.forEach((el) => setCount(el, el.dataset.count));
    steps.forEach((el) => el.classList.add("is-active"));
  }
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
  reveals.forEach((el) => io.observe(el));

  const co = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        animateCount(e.target);
        co.unobserve(e.target);
      }
    },
    { threshold: 0.6 },
  );
  if (!reduce) counters.forEach((el) => co.observe(el));

  // Paso activo en la sección "Proceso": el más cercano al centro de la pantalla.
  const so = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        e.target.classList.toggle("is-active", e.isIntersecting);
      }
    },
    { rootMargin: "-45% 0px -45% 0px" },
  );
  if (!reduce) steps.forEach((el) => so.observe(el));
}

// Kinetic type: la tipografía se inclina según la velocidad del scroll (solo transform).
const skewEls = document.querySelectorAll("[data-skew]");
if (!reduce && skewEls.length) {
  let lastY = window.scrollY;
  let skew = 0;
  const MAX = 7; // grados
  const frame = () => {
    const y = window.scrollY;
    const v = y - lastY;
    lastY = y;
    const target = Math.max(-MAX, Math.min(MAX, v * -0.35));
    skew += (target - skew) * 0.12; // suavizado
    if (Math.abs(skew) < 0.01) skew = 0;
    const value = `skewX(${skew.toFixed(2)}deg)`;
    skewEls.forEach((el) => (el.style.transform = value));
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

// Botón flotante de WhatsApp y nav translúcido: aparecen tras pasar el hero.
const fab = document.querySelector("[data-fab]");
const nav = document.querySelector("[data-nav]");
if (fab || nav) {
  const onScroll = () => {
    const shown = window.scrollY > window.innerHeight * 0.6;
    fab?.classList.toggle("is-shown", shown);
    nav?.classList.toggle("is-shown", shown);
    if (nav) nav.inert = !shown; // oculto: sin foco por teclado
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
