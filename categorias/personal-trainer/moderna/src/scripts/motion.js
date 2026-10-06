// Motion sin dependencias. Con "reducir movimiento" no hay desplazamientos ni scroll-jacking:
// solo fundidos cortos y el estado final legible.
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));

/* 1. Titulares partidos por palabra (se revelan al entrar en pantalla) */
if (!reduce) {
  for (const el of $$("[data-split]")) {
    const text = el.textContent.trim();
    el.setAttribute("aria-label", text);
    el.textContent = "";
    text.split(/\s+/).forEach((word, i, all) => {
      const outer = document.createElement("span");
      outer.className = "sw";
      outer.setAttribute("aria-hidden", "true");
      const inner = document.createElement("span");
      inner.className = "sw__i";
      inner.style.setProperty("--i", String(i));
      inner.textContent = word;
      outer.append(inner);
      el.append(outer);
      if (i < all.length - 1) el.append(" ");
    });
    el.classList.add("is-split");
  }
}

/* 2. Reveal, contadores y titulares: un solo observer */
const setCount = (el, v) => (el.textContent = String(v));
const animateCount = (el) => {
  const target = Number(el.dataset.count);
  if (reduce) return setCount(el, target);
  const dur = 1300;
  const t0 = performance.now();
  const tick = (now) => {
    const t = Math.min((now - t0) / dur, 1);
    setCount(el, Math.round(target * (1 - Math.pow(1 - t, 3))));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const revealEls = $$("[data-reveal], [data-split]");
const counters = $$("[data-count]");
if (!("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("is-visible"));
  counters.forEach((el) => setCount(el, el.dataset.count));
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
  revealEls.forEach((el) => io.observe(el));
  counters.forEach((el) => io.observe(el));
}

/* 3. Tarjetas apiladas: la anterior se encoge y oscurece a medida que la siguiente la cubre */
const cards = $$("[data-stack] .stack__card");
const updateStack = () => {
  cards.forEach((card, i) => {
    const next = cards[i + 1];
    if (!next || reduce) return;
    const a = card.getBoundingClientRect();
    const b = next.getBoundingClientRect();
    card.style.setProperty("--cover", clamp((a.bottom - b.top) / a.height).toFixed(3));
  });
};

/* 4. Proceso en horizontal (solo escritorio, 1 de las 2 secciones fijadas) */
const ruta = document.querySelector("[data-ruta]");
const panels = ruta ? $$("[data-step]", ruta) : [];
const wide = window.matchMedia("(min-width: 900px)");
const updateRuta = () => {
  if (!ruta || !ruta.classList.contains("ruta--live")) return;
  const r = ruta.getBoundingClientRect();
  const total = r.height - window.innerHeight;
  const p = total > 0 ? clamp(-r.top / total) : 0;
  ruta.style.setProperty("--p", p.toFixed(4));
  const active = Math.min(panels.length - 1, Math.round(p * (panels.length - 1)));
  panels.forEach((el, i) => el.classList.toggle("is-active", i === active));
};
const setRutaMode = () => {
  if (!ruta) return;
  const live = wide.matches && !reduce;
  ruta.classList.toggle("ruta--live", live);
  if (!live) {
    ruta.style.removeProperty("--p");
    panels.forEach((el) => el.classList.add("is-active"));
  }
  updateRuta();
};
wide.addEventListener?.("change", setRutaMode);
setRutaMode();

/* 5. Nav compacta al hacer scroll */
const nav = document.querySelector("[data-nav]");
const updateNav = () => nav?.classList.toggle("is-compact", window.scrollY > 48);

/* 6. Muro de testimonios: control de pausa (WCAG 2.2.2) */
const muro = document.querySelector("[data-muro]");
const toggle = document.querySelector("[data-muro-toggle]");
if (muro && toggle) {
  toggle.addEventListener("click", () => {
    const paused = muro.classList.toggle("is-paused");
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.querySelector(".muro__label").textContent = paused ? "Reanudar movimiento" : "Pausar movimiento";
  });
}

/* Un solo listener de scroll: el evento ya llega una vez por fotograma */
const onScroll = () => {
  updateNav();
  updateStack();
  updateRuta();
};
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
onScroll();
