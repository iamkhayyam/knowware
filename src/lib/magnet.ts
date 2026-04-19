import gsap from "gsap";

// Magnetic hover: element subtly pulls toward the cursor while inside its bounds.
// Returns a cleanup function. Designed for <a>/<button> CTAs; skipped on touch.
export function bindMagnet(
  el: HTMLElement,
  strength = 0.35,
  ease = "power3.out"
) {
  if (window.matchMedia("(pointer: coarse)").matches) return () => {};

  const qx = gsap.quickTo(el, "x", { duration: 0.45, ease });
  const qy = gsap.quickTo(el, "y", { duration: 0.45, ease });

  const onMove = (e: MouseEvent) => {
    const r = el.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    qx(relX * strength);
    qy(relY * strength);
  };

  const onLeave = () => {
    qx(0);
    qy(0);
  };

  el.addEventListener("mousemove", onMove);
  el.addEventListener("mouseleave", onLeave);

  return () => {
    el.removeEventListener("mousemove", onMove);
    el.removeEventListener("mouseleave", onLeave);
  };
}

// Auto-bind all elements matching the `.magnet` selector inside a root.
export function bindMagnetsIn(root: ParentNode = document) {
  const els = root.querySelectorAll<HTMLElement>(".magnet");
  const cleanups = Array.from(els).map((el) => bindMagnet(el));
  return () => cleanups.forEach((fn) => fn());
}
