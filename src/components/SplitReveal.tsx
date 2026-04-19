import { useEffect, useRef, ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SplitRevealProps {
  children: string;
  as?: ElementType;
  className?: string;
  stagger?: number;
  delay?: number;
  split?: "word" | "char";
  start?: string;
}

// Reveals text by splitting into word (default) or char spans, each wrapped
// in an overflow-hidden mask with the glyph translated down and eased up.
// Triggered once when the element hits `start` in viewport.
export default function SplitReveal({
  children,
  as: Tag = "h2",
  className,
  stagger = 0.06,
  delay = 0,
  split = "word",
  start = "top 82%",
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const inners = ref.current.querySelectorAll<HTMLSpanElement>(".sr-inner");
    gsap.set(inners, { yPercent: 110 });

    const tween = gsap.to(inners, {
      yPercent: 0,
      duration: 1,
      ease: "expo.out",
      stagger,
      delay,
      scrollTrigger: {
        trigger: ref.current,
        start,
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [children, stagger, delay, start]);

  const tokens =
    split === "word" ? children.split(/(\s+)/) : children.split("");

  const Component = Tag as any;
  return (
    <Component ref={ref} className={className}>
      {tokens.map((tok, i) => {
        if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
        return (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <span className="sr-inner inline-block will-change-transform">
              {tok}
            </span>
          </span>
        );
      })}
    </Component>
  );
}
