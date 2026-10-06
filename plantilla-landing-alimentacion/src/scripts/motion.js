// Motion sin dependencias. Con "reducir movimiento" no hay desplazamientos: solo fundidos cortos y el estado final.
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* 1. Reveal y contadores */
const setCount = (el, v) => (el.textContent = String(v));
const animateCount = (el) => {
  const target = Number(el.dataset.count);
  if (reduce) return setCount(el, target);
  const t0 = performance.now();
  const dur = 1300;
  const tick = (now) => {
    const t = Math.min((now - t0) / dur, 1);
    setCount(el, Math.round(target * (1 - Math.pow(1 - t, 3))).toLocaleString("es-CL"));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const reveals = $$("[data-reveal]");
const counters = $$("[data-count]");
if (!("IntersectionObserver" in window)) {
  reveals.forEach((el) => el.classList.add("is-visible"));
  counters.forEach((el) => setCount(el, Number(el.dataset.count).toLocaleString("es-CL")));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("is-visible");
        if (e.target.hasAttribute("data-count")) animateCount(e.target);
        io.unobserve(e.target);
      }
    },
    { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
  );
  reveals.forEach((el) => io.observe(el));
  counters.forEach((el) => io.observe(el));
}

/* 2. Menu de la semana: el plato sticky cambia de color y de dia segun el bloque que cruza el centro */
const menu = document.querySelector("[data-menu]");
if (menu && "IntersectionObserver" in window) {
  const days = $$("[data-day]", menu);
  const stage = menu.querySelector("[data-stage]");
  const plate = stage?.querySelector(".plato");
  const label = stage?.querySelector("[data-stage-day]");
  const so = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        days.forEach((d) => d.classList.toggle("is-active", d === e.target));
        const tone = e.target.dataset.tone;
        if (stage) stage.dataset.tone = tone;
        if (plate) plate.dataset.tone = tone;
        if (label) label.textContent = e.target.dataset.label;
      }
    },
    { rootMargin: "-42% 0px -42% 0px" },
  );
  days.forEach((d) => so.observe(d));
}

/* 3. Cabecera con sombra y boton flotante tras pasar el hero */
const top = document.querySelector("[data-top]");
const fab = document.querySelector("[data-fab]");
const onScroll = () => {
  top?.classList.toggle("is-stuck", window.scrollY > 8);
  fab?.classList.toggle("is-shown", window.scrollY > window.innerHeight * 0.6);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
