import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ArrowRight } from "lucide-react";
import Counter from "./Counter";

// Full-bleed hero. Title is its own row so it never wraps; a 2-col meta grid
// lives below it. Letter reveal uses the masked inner-span pattern.
export default function KineticMasthead() {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!rootRef.current || !titleRef.current) return;

    // Fit-to-container: measure the natural width of the title and scale the
    // font-size so it fills the row without wrapping. Re-runs on resize.
    const fitTitle = () => {
      const el = titleRef.current!;
      const parent = el.parentElement!;
      // Reset to a baseline to measure
      el.style.fontSize = "";
      const parentWidth = parent.clientWidth;
      // Measure an invisible probe at a known size
      const probe = document.createElement("span");
      probe.textContent = "KNOWWARE";
      probe.style.fontFamily = getComputedStyle(el).fontFamily;
      probe.style.fontWeight = getComputedStyle(el).fontWeight;
      probe.style.letterSpacing = getComputedStyle(el).letterSpacing;
      probe.style.visibility = "hidden";
      probe.style.position = "absolute";
      probe.style.whiteSpace = "nowrap";
      const probeSize = 100;
      probe.style.fontSize = `${probeSize}px`;
      document.body.appendChild(probe);
      const probeWidth = probe.getBoundingClientRect().width;
      document.body.removeChild(probe);
      const target = (parentWidth / probeWidth) * probeSize * 0.98;
      el.style.fontSize = `${Math.floor(target)}px`;
    };

    fitTitle();
    const onResize = () => fitTitle();
    window.addEventListener("resize", onResize);

    const ctx = gsap.context(() => {
      const glyphs = rootRef.current!.querySelectorAll<HTMLSpanElement>(".k-glyph-inner");
      const tag = rootRef.current!.querySelector<HTMLElement>(".k-tag");
      const rule = rootRef.current!.querySelector<HTMLElement>(".k-rule");
      const quote = rootRef.current!.querySelector<HTMLElement>(".k-quote");
      const meta = rootRef.current!.querySelectorAll<HTMLElement>(".k-meta");
      const ctas = rootRef.current!.querySelector<HTMLElement>(".k-ctas");
      const bgGlyph = rootRef.current!.querySelector<HTMLElement>(".k-bg-glyph");
      const pulse = rootRef.current!.querySelector<HTMLElement>(".k-pulse");

      gsap.set(glyphs, { yPercent: 105 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });
      tl.to(glyphs, {
        yPercent: 0,
        duration: 1.2,
        stagger: 0.06,
      })
        .from(tag, { opacity: 0, y: 10, duration: 0.7 }, "-=0.75")
        .from(rule, { scaleX: 0, transformOrigin: "0% 50%", duration: 0.9 }, "-=0.6")
        .from(quote, { opacity: 0, y: 14, duration: 0.8 }, "-=0.6")
        .from(meta, { opacity: 0, y: 20, duration: 0.75, stagger: 0.08 }, "-=0.7")
        .from(ctas, { opacity: 0, y: 12, duration: 0.6 }, "-=0.4")
        .fromTo(pulse, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.2");

      if (bgGlyph) {
        gsap.to(bgGlyph, {
          yPercent: 25,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, rootRef);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  const word = "KNOWWARE";

  return (
    <section
      ref={rootRef}
      id="masthead"
      className="relative border-b border-ink px-10 pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden"
    >
      {/* Background glyph */}
      <div
        className="k-bg-glyph absolute -right-10 -top-10 pointer-events-none select-none font-mono text-[clamp(18rem,44vw,48rem)] leading-none text-ink/[0.03] will-change-transform"
        aria-hidden
      >
        3⁴
      </div>

      {/* Live status pulse */}
      <div className="k-pulse absolute top-6 right-10 flex items-center gap-2 opacity-0">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-accent" />
        </span>
        <span className="font-mono text-[0.5rem] tracking-[0.22em] uppercase text-ink-light">
          Draft · April 2026
        </span>
      </div>

      <div className="relative max-w-[1300px] mx-auto">
        {/* Hero title — full width, auto-fit */}
        <div className="mb-10">
          <h1
            ref={titleRef}
            aria-label="Knowware"
            className="font-mono font-medium tracking-[0] uppercase text-ink leading-[0.85] whitespace-nowrap"
            style={{ letterSpacing: "-0.015em" }}
          >
            {word.split("").map((ch, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-bottom"
                style={{ lineHeight: 0.85 }}
              >
                <span
                  className="k-glyph-inner inline-block will-change-transform"
                  style={{ lineHeight: 0.85 }}
                >
                  {ch}
                </span>
              </span>
            ))}
          </h1>
        </div>

        {/* Meta row: tag + rule + quote | stats + CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <div className="k-tag font-mono text-[0.6rem] sm:text-[0.62rem] tracking-[0.24em] uppercase text-red-accent font-medium mb-5">
              Systems of Intelligence · Vol. I · By Khayyam Wakil
            </div>
            <hr className="k-rule border-none border-t border-ink mb-5 origin-left" />
            <p className="k-quote font-serif italic text-[1.15rem] md:text-[1.3rem] text-ink leading-[1.45] max-w-[520px]">
              "When software meets hardware and fall in love, that's Knowware."
            </p>
          </div>

          <div className="lg:col-span-7 lg:pl-10 lg:border-l lg:border-ink">
            {/* Stats — clamp-sized so three numbers always fit; wrap to 2 rows on very narrow widths */}
            <div className="flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-8 pb-5 border-b border-ink mb-5">
              <div className="k-meta min-w-0">
                <Counter
                  to={81}
                  className="font-mono font-medium leading-none text-ink tracking-[0.01em] whitespace-nowrap tabular-nums block text-[clamp(1.8rem,4.5vw,2.8rem)]"
                />
                <div className="font-mono text-[0.5rem] sm:text-[0.52rem] tracking-[0.22em] uppercase text-red-accent mt-2">
                  Expert Voices
                </div>
              </div>
              <div className="k-meta min-w-0">
                <div className="font-mono font-medium leading-none text-ink tracking-[0.01em] whitespace-nowrap tabular-nums text-[clamp(1.8rem,4.5vw,2.8rem)]">
                  <Counter to={9} className="inline" />
                  <span className="text-red-accent">(+1)</span>
                </div>
                <div className="font-mono text-[0.5rem] sm:text-[0.52rem] tracking-[0.22em] uppercase text-red-accent mt-2">
                  Chapters
                </div>
              </div>
              <div className="k-meta min-w-0">
                <div className="font-mono font-medium leading-none text-ink tracking-[0.01em] whitespace-nowrap tabular-nums text-[clamp(1.8rem,4.5vw,2.8rem)]">
                  3<span className="align-super text-[0.55em] text-red-accent">4</span>
                </div>
                <div className="font-mono text-[0.5rem] sm:text-[0.52rem] tracking-[0.22em] uppercase text-red-accent mt-2">
                  Base (Ternary)
                </div>
              </div>
            </div>

            <div className="k-meta font-serif text-[0.95rem] leading-[1.55] text-ink italic border-l-2 border-red-accent pl-4 mb-6 max-w-[460px]">
              "Binary is confinary. There's always a middle out inside."
            </div>

            <div className="k-ctas flex flex-wrap gap-3">
              <a
                href="https://github.com/iamkhayyam/systemsofintelligence-book"
                target="_blank"
                rel="noopener noreferrer"
                className="magnet group flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.18em] uppercase bg-ink text-paper px-5 py-3 hover:bg-red-accent transition-colors"
              >
                <Star size={12} className="fill-current" /> Star on GitHub
                <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#github"
                className="magnet group flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.18em] uppercase border border-ink text-ink px-5 py-3 hover:border-red-accent hover:text-red-accent transition-colors"
              >
                View Transcripts
                <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
