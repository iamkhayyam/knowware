import { useEffect, useRef } from "react";
import gsap from "gsap";

// Minimal red dot cursor. Tracks 1:1 with a touch of easing; subtle scale on interactives.
// Skipped on coarse pointers (touch).
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current!;
    const dotX = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power3" });

    const handleMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
    };

    const handleEnter = () => {
      gsap.to(dot, { scale: 2.6, duration: 0.3, ease: "power3.out" });
    };
    const handleLeave = () => {
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power3.out" });
    };

    const bind = () => {
      const targets = document.querySelectorAll<HTMLElement>(
        "a, button, [data-cursor], input, textarea, [role='button']"
      );
      targets.forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
      return targets;
    };

    let targets = bind();

    const observer = new MutationObserver(() => {
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
      targets = bind();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", handleMove);
    document.documentElement.classList.add("cursor-none-all");

    return () => {
      window.removeEventListener("mousemove", handleMove);
      observer.disconnect();
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
      document.documentElement.classList.remove("cursor-none-all");
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-[7px] h-[7px] rounded-full bg-red-accent pointer-events-none z-[9999] hidden md:block -ml-[3.5px] -mt-[3.5px]"
      style={{ transform: "translate3d(-100px,-100px,0)" }}
    />
  );
}
