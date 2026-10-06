// Cotizador: personas x dias x precio por persona. Sin JavaScript el boton igual abre WhatsApp con el mensaje base.
const root = document.querySelector("[data-quote]");

if (root) {
  const cfg = JSON.parse(root.dataset.config);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clp = (n) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);

  const range = root.querySelector('input[name="personas"]');
  const outPersonas = root.querySelector("[data-out-personas]");
  const outTotal = root.querySelector("[data-out-total]");
  const outDetail = root.querySelector("[data-out-detail]");
  const cta = root.querySelector("[data-quote-cta]");

  const state = () => ({
    personas: Number(range.value),
    dias: Number(root.querySelector('input[name="dias"]:checked').value),
    plan: root.querySelector('input[name="plan"]:checked').value,
  });
  const total = ({ personas, dias, plan }) => Math.round(personas * dias * cfg.semanas * cfg.planes[plan].precio);

  let shown = Number(outTotal.dataset.raw) || total(state());
  let raf = 0;
  const tween = (to) => {
    cancelAnimationFrame(raf);
    if (reduce || document.hidden) { shown = to; outTotal.textContent = clp(to); return; }
    const from = shown;
    const t0 = performance.now();
    const step = (now) => {
      const t = Math.min((now - t0) / 280, 1);
      shown = Math.round(from + (to - from) * (1 - Math.pow(1 - t, 3)));
      outTotal.textContent = clp(shown);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  };

  const update = () => {
    const s = state();
    const value = total(s);
    const pct = ((s.personas - range.min) / (range.max - range.min)) * 100;
    range.style.setProperty("--pct", pct.toFixed(1) + "%");
    outPersonas.textContent = String(s.personas);
    outDetail.textContent = `${s.personas} personas · ${s.dias} ${s.dias === 1 ? "día" : "días"} · ${cfg.planes[s.plan].nombre}`;
    tween(value);
    const msg = `${cfg.mensaje}: ${s.personas} personas, ${s.dias} ${s.dias === 1 ? "día" : "días"} a la semana, ${cfg.planes[s.plan].nombre}. Valor referencial ${clp(value)} al mes (desde: cotizador)`;
    cta.href = `https://wa.me/${cfg.numero}?text=${encodeURIComponent(msg)}`;
  };

  root.addEventListener("input", update);
  root.addEventListener("change", update);
  root.querySelector("form")?.addEventListener("submit", (e) => e.preventDefault());
  update();
}
