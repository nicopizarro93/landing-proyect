// Hero 2.5D: convierte el scroll en una variable CSS --p (0 a 1) y el puntero en --mx/--my.
// Las capas se mueven solo con transform en CSS. Con "reducir movimiento" no hace nada.
const root = document.querySelector("[data-cine]");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (root && !reduce) {
  root.classList.add("cine--live");

  const panels = [...root.querySelectorAll("[data-panel]")];
  // Rangos de scroll (0 a 1) en que cada panel está activo.
  const ranges = [
    [0, 0.3],
    [0.3, 0.78],
    [0.74, 1.01],
  ];
  const clamp = (n) => Math.min(1, Math.max(0, n));

  const setProgress = (p) => {
    root.style.setProperty("--p", p.toFixed(4));
    panels.forEach((el, i) => {
      const on = p >= ranges[i][0] && p < ranges[i][1];
      el.toggleAttribute("inert", !on); // fuera de pantalla: sin foco ni lectura
      el.setAttribute("aria-hidden", on ? "false" : "true");
    });
  };

  // QA como en el kit: ?p=0.5 congela el progreso para revisar una posición exacta.
  const fixed = new URLSearchParams(location.search).get("p");
  if (fixed !== null && !Number.isNaN(Number(fixed))) {
    setProgress(clamp(Number(fixed)));
  } else {
    // El evento scroll ya llega una vez por fotograma: se actualiza directo, solo lectura + variable CSS.
    const update = () => {
      const rect = root.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      setProgress(total > 0 ? clamp(-rect.top / total) : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  // Parallax con el puntero (solo mouse, no táctil), suavizado.
  if (window.matchMedia("(pointer: fine)").matches) {
    let tx = 0, ty = 0, cx = 0, cy = 0, running = false;
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      root.style.setProperty("--mx", cx.toFixed(3));
      root.style.setProperty("--my", cy.toFixed(3));
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) requestAnimationFrame(loop);
      else running = false;
    };
    root.addEventListener("pointermove", (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!running) {
        running = true;
        requestAnimationFrame(loop);
      }
    });
  }
}
