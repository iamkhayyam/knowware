import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CHAPTERS } from "../chapters";

// Infinite marquee of all 81 voices + chapter markers.
// direction="rtl" (default) scrolls right-to-left; "ltr" scrolls left-to-right.
export default function VoicesTicker({ direction = "rtl" }: { direction?: "ltr" | "rtl" }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const items: { label: string; kind: "chapter" | "voice" }[] = [];
  CHAPTERS.forEach((ch) => {
    if (ch.num === "Ch. 10") return;
    items.push({ label: ch.num, kind: "chapter" });
    [...ch.triads.academic, ...ch.triads.practitioner, ...ch.triads.visionary].forEach((voice) => {
      items.push({ label: voice, kind: "voice" });
    });
  });

  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const singleWidth = track.scrollWidth / 2;

    const tween =
      direction === "ltr"
        ? gsap.fromTo(track, { x: -singleWidth }, { x: 0, duration: 180, ease: "none", repeat: -1 })
        : gsap.fromTo(track, { x: 0 }, { x: -singleWidth, duration: 180, ease: "none", repeat: -1 });

    const onEnter = () => tween.timeScale(0.25);
    const onLeave = () => tween.timeScale(1);
    track.parentElement?.addEventListener("mouseenter", onEnter);
    track.parentElement?.addEventListener("mouseleave", onLeave);

    return () => {
      tween.kill();
      track.parentElement?.removeEventListener("mouseenter", onEnter);
      track.parentElement?.removeEventListener("mouseleave", onLeave);
    };
  }, [direction]);

  return (
    <div className="relative overflow-hidden border-t border-ink/10 bg-paper">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-paper to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-paper to-transparent z-10 pointer-events-none" />
      <div ref={trackRef} className="flex whitespace-nowrap py-2 will-change-transform">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`font-mono text-[0.58rem] tracking-[0.18em] uppercase px-5 flex items-center gap-5 shrink-0 ${
              item.kind === "chapter" ? "text-red-accent font-medium" : "text-ink-light"
            }`}
          >
            {item.label}
            <span className="w-1 h-1 rounded-full bg-ink/20" />
          </span>
        ))}
      </div>
    </div>
  );
}
