import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, ArrowRight, Star, X, ChevronUp, Share2, Twitter, Linkedin, Link, MessageSquare, Phone, Mail, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { CHAPTERS } from "./chapters";
import { Chapter, Person } from "./types";
import { initSmoothScroll } from "./lib/smooth-scroll";
import { bindMagnetsIn } from "./lib/magnet";
import Cursor from "./components/Cursor";
import KineticMasthead from "./components/KineticMasthead";
import VoicesTicker from "./components/VoicesTicker";
import SplitReveal from "./components/SplitReveal";
import Counter from "./components/Counter";
import PageOverlay, { OverlayPhase, OVERLAY_IN_MS, OVERLAY_OUT_MS } from "./components/PageOverlay";
import PersonDossier from "./components/PersonDossier";
import ChapterPage from "./components/ChapterPage";

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.5, ease: "easeOut" }
};

const Header = ({ onViewWanted }: { onViewWanted: () => void }) => (
  <header className="border-b border-ink bg-paper sticky top-0 z-50">
    <div className="max-w-[1200px] mx-auto px-10 py-2.5 flex items-start justify-between">
      <div className="header-wordmark">
        <div className="font-mono text-[0.78rem] font-medium tracking-[0.18em] uppercase text-ink">Knowware</div>
        <div className="font-mono text-[0.58rem] tracking-[0.2em] uppercase text-red-accent mt-px">By Khayyam Wakil</div>
      </div>
      <nav className="flex gap-7 items-center pt-0.5">
        {["The Truth", "Chapters", "The 81", "Manifesto", "Contact"].map((item) => (
          item === "The 81" ? (
            <button 
              key={item} 
              onClick={onViewWanted}
              className="font-mono text-[0.63rem] tracking-[0.14em] uppercase text-ink hover:text-red-accent transition-colors cursor-pointer"
            >
              {item}
            </button>
          ) : (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(" ", "-")}`} 
              className="font-mono text-[0.63rem] tracking-[0.14em] uppercase text-ink hover:text-red-accent transition-colors"
            >
              {item}
            </a>
          )
        ))}
        <a 
          href="https://github.com/iamkhayyam/systemsofintelligence-book"
          target="_blank" 
          rel="noopener noreferrer"
          className="font-mono text-[0.63rem] tracking-[0.14em] uppercase text-ink hover:text-red-accent transition-colors flex items-center gap-1.5 border border-ink/20 px-3 py-1 rounded-sm"
        >
          <Star size={10} className="fill-current" /> Star
        </a>
      </nav>
    </div>
    <VoicesTicker />
  </header>
);

const Pillars = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".pillar-card", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="pillars" className="border-b border-ink" ref={rootRef}>
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-[1100px] mx-auto">
        {[
          { num: "01", title: "The Book", desc: "81 expert interviews across 10 chapters. The complete ternary coordination framework." },
          { num: "02", title: "The Manifesto", desc: "Binary is confinary. The case for seeing ternary — and why it can't be unseen." },
          { num: "03", title: "The Movement", desc: "A community of practitioners, builders, and seekers coordinating around a third way." }
        ].map((pillar) => (
          <div
            key={pillar.num}
            className="pillar-card relative p-9 md:p-10 border-b md:border-b-0 md:border-r border-ink last:border-r-0 group overflow-hidden"
          >
            <span className="absolute left-0 top-0 h-0.5 w-0 bg-red-accent group-hover:w-full transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]" aria-hidden />
            <div className="font-mono text-[0.54rem] tracking-[0.22em] uppercase text-red-accent font-medium mb-3 flex items-center gap-2">
              <span className="tabular-nums">{pillar.num}</span>
              <span className="h-px w-8 bg-red-accent/40" />
            </div>
            <div className="font-mono text-[0.82rem] font-medium tracking-[0.1em] uppercase text-ink mb-3">{pillar.title}</div>
            <p className="font-sans text-[0.85rem] text-ink-mid leading-[1.7] font-light">{pillar.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const TheSimpleTruth = () => {
  const formulaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!formulaRef.current) return;
    const ctx = gsap.context(() => {
      const letters = formulaRef.current!.querySelectorAll<HTMLElement>(".formula-letter");
      const ops = formulaRef.current!.querySelectorAll<HTMLElement>(".formula-op");
      const paths = formulaRef.current!.querySelectorAll<SVGPathElement>("svg path.formula-draw");

      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: formulaRef.current,
          start: "top 75%",
          once: true,
        },
      });
      tl.from(letters, { y: 28, opacity: 0, stagger: 0.2, duration: 0.7 })
        .from(ops, { scale: 0, opacity: 0, stagger: 0.2, duration: 0.5 }, "-=0.9")
        .to(paths, { strokeDashoffset: 0, duration: 1.1, stagger: 0.1 }, "-=0.4")
        .from(formulaRef.current!.querySelectorAll(".formula-label"), {
          opacity: 0,
          y: 6,
          stagger: 0.08,
          duration: 0.5,
        }, "-=0.8");
    }, formulaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="the-truth" className="px-10 py-24 border-b border-ink bg-paper-mid relative overflow-hidden">
      {/* Background numerals, slight parallax via transform on scroll could be added later */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.035] pointer-events-none select-none font-mono text-[12rem] leading-none text-ink flex flex-col items-end pr-10 pt-10">
        <div>3⁴</div>
        <div>9²</div>
        <div>81</div>
      </div>

      <div className="max-w-[1100px] mx-auto">
        <div className="section-divider border-ink mb-14">
          <div>
            <span className="section-label text-red-accent font-medium">The Core Concept</span>
            <SplitReveal
              as="div"
              className="section-head"
              stagger={0.04}
              split="char"
            >
              THE TRUTH
            </SplitReveal>
          </div>
          <span className="section-sub">"What is this thing?"</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 items-start">
          <div className="md:col-span-8 space-y-8">
            <SplitReveal
              as="div"
              className="font-serif italic text-[1.5rem] md:text-[1.95rem] text-ink leading-[1.35]"
              stagger={0.03}
              split="word"
            >
              "It's actually very simple. We've been thinking about computers as things that follow instructions (software) on top of things that move electrons (hardware). But that's not how the world actually works."
            </SplitReveal>

            <motion.div
              {...fadeIn}
              className="space-y-6 font-sans font-light text-[1rem] text-ink-mid leading-[1.85]"
            >
              <p>
                Consider a <strong>murmuration of starlings</strong>. Thousands of birds moving as a single, fluid organism. You don't give them a 'software' manual. You don't build 'hardware' tracks in the sky. They just… <strong>coordinate</strong>.
              </p>
              <p>
                There's a third thing. A pattern. A signal that moves between the birds. That's what we call <strong>Knowware</strong> — the intelligence that emerges when parts start talking to each other in a way that creates something bigger than the sum.
              </p>
              <p>
                This book isn't about AI or robots. It's about the <em>physics of coordination</em>. Why 81 voices? 9 per chapter × 9 chapters. 3⁴. The pattern connecting body to mind, and mind to cosmos.
              </p>
            </motion.div>
          </div>

          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="md:col-span-4 space-y-6">
            <div className="border border-ink p-8 bg-paper relative">
              <div className="font-mono text-[0.54rem] tracking-[0.22em] uppercase text-red-accent font-medium mb-4">Author's Note —</div>
              <p className="font-serif italic text-[1.15rem] text-ink leading-relaxed mb-6">
                "Coordination is the ghost in the machine that makes the machine more than a machine."
              </p>
              <div className="h-px bg-ink/10 w-full mb-6"></div>
              <div className="space-y-4">
                {[
                  ["Topic", "Coordination"],
                  ["Base", "9 (Ternary)"],
                  ["Complexity", "Emergent"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center">
                    <span className="font-mono text-[0.55rem] uppercase tracking-widest text-ink-light">{k}</span>
                    <span className="font-mono text-[0.55rem] uppercase tracking-widest text-ink">{v}</span>
                  </div>
                ))}
              </div>

              {/* Animated formula: H ─+─ S ─→─ K with drawn connectors */}
              <div className="mt-10 pt-8 border-t border-ink/10" ref={formulaRef}>
                <div className="font-mono text-[0.54rem] tracking-[0.2em] uppercase text-red-accent font-bold mb-5">The Formula</div>
                <div className="relative">
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 300 80"
                    preserveAspectRatio="none"
                  >
                    <path
                      className="formula-draw"
                      d="M 55 40 L 115 40"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                      style={{ color: "rgba(0,0,0,0.25)" }}
                    />
                    <path
                      className="formula-draw"
                      d="M 175 40 L 240 40"
                      stroke="#e60000"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <path
                      className="formula-draw"
                      d="M 232 34 L 240 40 L 232 46"
                      stroke="#e60000"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                  <div className="flex items-center justify-between font-mono text-[1.75rem] text-ink relative">
                    <div className="flex flex-col items-center w-10">
                      <span className="formula-label text-[0.5rem] text-ink-light mb-1 uppercase tracking-widest">Body</span>
                      <span className="formula-letter">H</span>
                    </div>
                    <span className="formula-op text-red-accent text-[1.1rem]">+</span>
                    <div className="flex flex-col items-center w-10">
                      <span className="formula-label text-[0.5rem] text-ink-light mb-1 uppercase tracking-widest">Mind</span>
                      <span className="formula-letter">S</span>
                    </div>
                    <span className="formula-op text-red-accent text-[1.1rem]">→</span>
                    <div className="flex flex-col items-center w-10">
                      <span className="formula-label text-[0.5rem] text-red-accent mb-1 uppercase tracking-widest">Soul</span>
                      <span className="formula-letter text-red-accent">K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border border-ink/10 font-mono text-[0.5rem] tracking-[0.15em] leading-relaxed text-ink-light uppercase">
              Note: This is not a textbook. It is a cognitive realignment. Proceed with caution.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Chapters = ({ onSelectChapter }: { onSelectChapter: (ch: Chapter) => void }) => (
  <section id="chapters" className="px-10 py-20 border-b border-ink">
    <div className="max-w-[1100px] mx-auto">
      <div className="section-divider border-ink">
        <div>
          <span className="section-label text-red-accent font-medium">The Book</span>
          <SplitReveal as="div" className="section-head" stagger={0.05} split="word">
            3⁴ Voices. One Pattern.
          </SplitReveal>
        </div>
        <span className="section-sub">9(+1) CHAPTERS</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 border border-ink bg-ink/5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(230,0,0,1)] transition-all duration-500">
        {CHAPTERS.map((ch, i) => (
          <motion.div
            key={ch.num}
            {...fadeIn}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelectChapter(ch)}
            data-cursor="Open"
            className="relative p-4 px-6 border-b border-r border-ink hover:bg-red-accent hover:text-white transition-colors duration-300 flex gap-5 items-baseline last:border-b-0 md:[&:nth-child(2n)]:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0 group cursor-pointer overflow-hidden"
          >
            {/* Diagonal wipe fill on hover — red sweeps in from the left */}
            <span className="absolute inset-0 bg-red-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" aria-hidden />

            <div className="relative font-mono text-[0.54rem] tracking-[0.14em] uppercase text-ink-light group-hover:text-white/80 whitespace-nowrap shrink-0 tabular-nums">
              {ch.num}
            </div>
            <div className="relative flex-1 min-w-0">
              <div className="font-mono text-[0.72rem] font-medium tracking-[0.06em] text-ink group-hover:text-white truncate">
                {ch.title}
              </div>
              <div className="font-mono text-[0.54rem] tracking-[0.08em] text-ink-light group-hover:text-white/80 mt-1 truncate">
                {ch.sub}
              </div>
            </div>
            <ArrowRight
              size={12}
              className="relative text-ink-light group-hover:text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0 self-center"
            />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const EnneagramDiagram = ({ onSelectChapter }: { onSelectChapter: (ch: Chapter) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  const nodes = [
    { id: 10, label: "Synthesis", color: "bg-[#3b3b8f]", x: 50, y: 12 },
    { id: 2, label: "Dawn", color: "bg-[#064e3b]", x: 78, y: 24 },
    { id: 3, label: "Architect.", color: "bg-[#064e3b]", x: 90, y: 48 },
    { id: 8, label: "Beyond", color: "bg-[#78350f]", x: 82, y: 74 },
    { id: 4, label: "Action", color: "bg-[#7c2d12]", x: 62, y: 88 },
    { id: 5, label: "Interact.", color: "bg-[#7c2d12]", x: 38, y: 88 },
    { id: 9, label: "Integrat.", color: "bg-[#78350f]", x: 18, y: 74 },
    { id: 6, label: "Consciou.", color: "bg-[#701a75]", x: 10, y: 48 },
    { id: 7, label: "Engineer.", color: "bg-[#701a75]", x: 22, y: 24 },
    { id: 1, label: "Foundation", sub: "81 = 9²", color: "bg-[#4a4a4a]", x: 50, y: 52, center: true },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Animate SVG lines (drawing effect)
      const paths = svgRef.current?.querySelectorAll("path, line, circle");
      if (paths) {
        paths.forEach((path) => {
          const p = path as SVGPathElement | SVGLineElement | SVGCircleElement;
          const length = p instanceof SVGPathElement ? p.getTotalLength() : 
                        p instanceof SVGCircleElement ? 2 * Math.PI * p.r.baseVal.value : 100;
          
          gsap.set(p, { strokeDasharray: length, strokeDashoffset: length, opacity: 0 });
          gsap.to(p, {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.1,
            ease: "power2.inOut",
          });
        });
      }

      // 2. Animate Nodes (staggered scale and fade)
      gsap.from(nodesRef.current, {
        scale: 0,
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: {
          each: 0.1,
          from: "center",
        },
        ease: "back.out(1.7)",
      });

      // 3. Floating animation for nodes
      nodesRef.current.forEach((node, i) => {
        if (!node) return;
        gsap.to(node, {
          y: "+=8",
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });

      // 4. Animate Labels
      gsap.from(".enneagram-label", {
        opacity: 0,
        y: 10,
        duration: 1,
        stagger: 0.3,
        delay: 1,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full aspect-square max-w-[550px] mx-auto my-16 bg-paper rounded-xl p-8 shadow-xl border border-ink/5 overflow-hidden">
      {/* SVG for lines */}
      <svg ref={svgRef} viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* Outer circle */}
        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.2" />
        
        {/* Connection lines */}
        <g stroke="rgba(0,0,0,0.08)" strokeWidth="0.15">
          {/* Circle connections */}
          <path d="M 50 12 L 78 24 L 90 48 L 82 74 L 62 88 L 38 88 L 18 74 L 10 48 L 22 24 Z" fill="none" />
          
          {/* Inner lines */}
          <line x1="50" y1="12" x2="62" y2="88" />
          <line x1="50" y1="12" x2="38" y2="88" />
          <line x1="78" y1="24" x2="18" y2="74" />
          <line x1="90" y1="48" x2="10" y2="48" />
          <line x1="82" y1="74" x2="22" y2="24" />
          
          {/* Triangle 3-6-9 (highlighted) */}
          <path d="M 90 48 L 10 48 L 18 74 Z" fill="none" stroke="rgba(230,0,0,0.2)" strokeWidth="0.3" />
          
          {/* Center connections */}
          <line x1="50" y1="52" x2="50" y2="12" opacity="0.1" />
          <line x1="50" y1="52" x2="78" y2="24" opacity="0.1" />
          <line x1="50" y1="52" x2="90" y2="48" opacity="0.1" />
          <line x1="50" y1="52" x2="82" y2="74" opacity="0.1" />
          <line x1="50" y1="52" x2="62" y2="88" opacity="0.1" />
          <line x1="50" y1="52" x2="38" y2="88" opacity="0.1" />
          <line x1="50" y1="52" x2="18" y2="74" opacity="0.1" />
          <line x1="50" y1="52" x2="10" y2="48" opacity="0.1" />
          <line x1="50" y1="52" x2="22" y2="24" opacity="0.1" />
        </g>
      </svg>

      {/* SVG Labels - Moved to top-most layer (z-50) and adjusted positions to avoid node overlap */}
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 pointer-events-none z-50 enneagram-label">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.4em] text-ink/60 whitespace-nowrap bg-paper/60 backdrop-blur-sm px-2 py-0.5 rounded">Law of Three</span>
      </div>
      <div className="absolute top-[65%] left-[72%] -translate-x-1/2 pointer-events-none z-50 enneagram-label">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.4em] text-ink/60 whitespace-nowrap bg-paper/60 backdrop-blur-sm px-2 py-0.5 rounded">3-6-9</span>
      </div>

      {/* Legend */}
      <div className="absolute top-6 left-6 bg-paper/95 backdrop-blur-md p-4 rounded-lg border border-ink/10 z-40 shadow-md">
        {[
          { color: "#064e3b", label: "Academic" },
          { color: "#7c2d12", label: "Practitioner" },
          { color: "#701a75", label: "Visionary" },
          { color: "#78350f", label: "Transcendence" }
        ].map(item => (
          <div key={item.label} className="flex items-center gap-3 mb-2 last:mb-0">
            <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></div>
            <span className="text-[0.55rem] font-mono text-ink-mid uppercase tracking-widest font-bold">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <div 
          key={node.id}
          ref={el => nodesRef.current[i] = el}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, { scale: 1.15, duration: 0.3, ease: "power2.out" });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
          }}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center text-center transition-all duration-300 group cursor-pointer z-30 ${node.color} ${node.center ? 'w-24 h-24 border-4 border-paper shadow-2xl' : 'w-16 h-16 shadow-xl border border-white/10'}`}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          onClick={() => {
            const chapter = CHAPTERS.find(c => parseInt(c.num.split(' ')[1]) === node.id);
            if (chapter) onSelectChapter(chapter);
          }}
        >
          <div className="text-white font-mono text-[0.65rem] font-bold leading-none mb-0.5">Ch {node.id}</div>
          <div className="text-white/90 font-sans text-[0.5rem] leading-tight px-1 font-medium">{node.label}</div>
          {node.sub && <div className="text-white/50 font-mono text-[0.45rem] mt-1 tracking-tighter">{node.sub}</div>}
        </div>
      ))}
      
      <div className="absolute bottom-4 left-0 right-0 text-center font-mono text-[0.6rem] text-ink-mid/80 uppercase tracking-[0.4em] z-50 font-medium enneagram-label">
        Enneagram of Knowware — 9 chapters · 9 triads · 81 voices
      </div>
    </div>
  );
};


const SacredGeometry = ({ onSelectChapter }: { onSelectChapter: (ch: Chapter) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="architecture" className="px-10 py-14 border-b border-ink bg-paper">
      <div className="max-w-[1100px] mx-auto">
        <motion.div {...fadeIn} className="section-divider border-ink">
          <div>
            <span className="section-label text-red-accent font-medium">The Pattern</span>
            <div className="section-head">Sacred Geometry & The Enneagram</div>
          </div>
          <span className="section-sub">Base-9 Architecture</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <motion.div {...fadeIn} className="md:col-span-7">
            <h3 className="font-mono text-[1.4rem] font-medium tracking-[0.04em] uppercase text-ink mb-5 leading-tight">
              81 is not a round number. <br />
              <span className="text-red-accent">It is a complete manifestation.</span>
            </h3>
            <p className="font-sans font-light text-[0.9rem] text-ink-mid leading-[1.75] mb-6">
              The Enneagram structure is the hidden architecture of the entire Knowware project. 
              Encoding Gurdjieff's Law of Triamazikamno into the very skeleton of the book, 
              the structure doesn't just describe coordination—it <em className="italic">is</em> coordination.
            </p>
            <button 
              onClick={() => setIsOpen(true)}
              className="font-mono text-[0.58rem] tracking-[0.14em] uppercase text-ink border border-ink px-5 py-3 hover:bg-red-accent hover:text-white hover:border-red-accent transition-all inline-flex items-center gap-2"
            >
              Access Full Breakdown <ArrowRight size={10} />
            </button>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="md:col-span-5 border border-ink p-8 bg-paper-mid relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <div className="w-40 h-40 border-2 border-red-accent rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[104px] border-b-red-accent"></div>
              </div>
            </div>
            <div className="relative z-10">
              <div className="font-mono text-[0.54rem] tracking-[0.22em] uppercase text-red-accent font-medium mb-4">The Meta-Insight —</div>
              <p className="font-serif italic text-[1.1rem] text-ink leading-relaxed mb-4">
                "The book IS what it teaches. The structure reprograms your cognitive architecture from binary to ternary without you consciously noticing."
              </p>
              <div className="font-mono text-[0.5rem] tracking-[0.1em] uppercase text-ink-light">
                Coordination Intelligence · Vol. I
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full Breakdown Overlay */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-paper overflow-y-auto p-10 md:p-20" data-lenis-prevent
        >
          <div className="max-w-[800px] mx-auto">
            <button 
              onClick={() => setIsOpen(false)}
              className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-red-accent mb-12 flex items-center gap-2 hover:text-ink transition-colors"
            >
              <ArrowRight size={12} className="rotate-180" /> Back to Preprint
            </button>
            
            <div className="space-y-10">
              <header className="border-b border-ink pb-8">
                <span className="section-label text-red-accent font-medium">Deep Dive</span>
                <h2 className="font-mono text-[2.5rem] font-medium tracking-[0.04em] uppercase text-ink leading-none">
                  The Enneagram <br />Architecture
                </h2>
              </header>

              <div className="prose prose-ink max-w-none font-sans font-light text-[1rem] leading-[1.8] text-ink-mid space-y-6">
                <p>
                  Now let us render this visually so you can see the sacred geometry in motion. The Enneagram structure is the hidden architecture of the entire Knowware project.
                </p>

                <EnneagramDiagram onSelectChapter={onSelectChapter} />

                <p>
                  <strong>81 = 9²</strong> — not an accident, not a round number. It is the complete manifestation of base-9 mathematics: three forces raised to four dimensions, encoding Gurdjieff's Law of Triamazikamno into the very skeleton of the book.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                  <div className="border-l-2 border-red-accent pl-6">
                    <h4 className="font-mono text-[0.8rem] font-medium uppercase text-ink mb-2">The Inner Triangle</h4>
                    <p className="text-[0.85rem] leading-relaxed">
                      Points 3, 6, and 9 map directly to Chapters 8, 9, and 10: <em>Beyond Human Intelligence → Integration → Synthesis</em>. This is the Law of Three made structural: Affirming, Denying, and Reconciling forces. The triangle doesn't just describe Triamazikamno, it <em className="italic">is</em> Triamazikamno rendered in chapter form.
                    </p>
                  </div>
                  <div className="border-l-2 border-red-accent pl-6">
                    <h4 className="font-mono text-[0.8rem] font-medium uppercase text-ink mb-2">The Hexad</h4>
                    <p className="text-[0.85rem] leading-relaxed">
                      Points 1, 4, 2, 8, 5, 7 cycle in a specific sequence—the Law of Seven. It is the developmental path, acknowledging that wisdom doesn't develop linearly.
                    </p>
                  </div>
                </div>

                <h3 className="font-mono text-[1.1rem] font-medium uppercase text-ink pt-4">The Triad Structure</h3>
                <p>
                  Each chapter contains three expert triads of three voices each (9 per chapter):
                </p>
                <ul className="list-none space-y-4 pl-0">
                  <li className="flex gap-4">
                    <span className="font-mono text-red-accent font-medium">01</span>
                    <span><strong>The Academic layer</strong> — theoretical foundations, research, scientific rigor.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-mono text-red-accent font-medium">02</span>
                    <span><strong>The Practitioner layer</strong> — implementation experience, real-world proof.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-mono text-red-accent font-medium">03</span>
                    <span><strong>The Visionary layer</strong> — intuitive leaps, future-seeing, pattern recognition beyond evidence.</span>
                  </li>
                </ul>

                <div className="bg-ink text-white p-8 my-12">
                  <h3 className="font-mono text-[1rem] font-medium uppercase text-red-accent mb-4">The Hidden Curriculum</h3>
                  <p className="text-[0.9rem] text-white/70 leading-relaxed">
                    A reader moving through the 81 voices linearly — thinking they are reading interviews — is actually being initiated into base-9 ternary thinking through the structure itself. By the time they finish, the book has reprogrammed their cognitive architecture from binary (yes/no, either/or) to ternary (affirming/denying/reconciling) without them consciously noticing. The structure <em className="italic">teaches</em> what the content <em className="italic">describes</em>.
                  </p>
                </div>

                <p className="font-serif italic text-[1.2rem] text-ink border-t border-ink/10 pt-8">
                  "The meta-insight: the book IS what it teaches. Coordination intelligence doesn't just appear as a topic — it is demonstrated through form. The 81 voices coordinate with each other. The three triads coordinate within each chapter. The nine chapters coordinate into the whole. And that whole coordinates with the reader, producing emergence neither the book nor the reader possessed alone."
                </p>
                
                <p className="font-serif italic text-[1.2rem] text-ink">
                  "That is Knowware. Software meets hardware, and the love child is the pattern that recognizes itself."
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

const WANTED_LIST: Person[] = [
  // Ch. 01 — The Coordination Intelligence Revolution
  { name: "Dr. Paul Pangaro", alias: "The Conversation Theorist", badges: ["Ch. 01", "Academic"] },
  { name: "Dr. N. Katherine Hayles", alias: "The Posthuman Reader", badges: ["Ch. 01", "Academic"] },
  {
    name: "Donella Meadows",
    alias: "The Leverage Point",
    badges: ["Ch. 01", "Academic"],
    affiliation: "Dartmouth College · Sustainability Institute",
    active: "1941 – 2001",
    status: "Legacy",
    jurisdiction: "Systems Thinking / Sustainability",
    awards: ["World Federation of United Nations Associations Award", "Ashoka Fellow"],
    works: ["Thinking in Systems", "The Limits to Growth", "Leverage Points: Places to Intervene in a System"],
    knownFor: ["Leverage points", "Feedback loops", "Systems thinking", "Balancing vs. reinforcing loops", "Paradigm shifts"],
    coldOpen: "The most powerful place to intervene in a system is in the mindset or paradigm out of which the system arises. Change the paradigm and you change the goals, the rules, the feedback loops — everything.",
    bio: "Systems thinker who spent her career explaining why smart people working hard keep making things worse. She modeled global systems before computers could scale them, and argued that the highest leverage point is always the one nobody sees — the paradigm.",
    whyMatters: "Meadows provides the foundational theory of coordination: feedback loops, leverage points, and the three-body structure of stable systems. Her work shows that intervention without understanding context produces overshoot. She names the coordination problems that the alignment researchers are trying to solve.",
  },
  {
    name: "Stewart Brand",
    alias: "The Whole Earth Signal",
    badges: ["Ch. 01", "Practitioner"],
    affiliation: "The WELL · Whole Earth Institute",
    active: "1938 – present",
    status: "Living · Active",
    jurisdiction: "Technology / Philosophy / Design",
    awards: ["Golden Goose Award nominee", "Buckminster Fuller Prize nominee"],
    works: ["The Whole Earth Catalog", "How Buildings Learn", "The Clock of the Long Now"],
    knownFor: ["Whole Earth Catalog", "Long-now thinking", "Mutualism", "Coordination as philosophy", "Technology as living system"],
    coldOpen: "Technology wants to coordinate with humanity, not to replace it. The most advanced state of technology is not automation — it's mutualism.",
    bio: "Counterculture visionary who created the Whole Earth Catalog as a coordination infrastructure for decentralized learning. He recognized that technology is not separate from life but a continuation of it, and that coordination should be distributed, not centralized.",
    whyMatters: "Brand established the philosophical foundation for coordination intelligence: technology as a living system with its own trajectory, and the commitment to mutualism over replacement. He shows that coordination has always been the goal, even before the field had language for it.",
  },
  {
    name: "Kevin Kelly",
    alias: "The Technium Scribe",
    badges: ["Ch. 01", "Practitioner"],
    affiliation: "Wired Magazine · Long Now Foundation",
    active: "1952 – present",
    status: "Living · Active",
    jurisdiction: "Technology / Evolution / Coordination",
    awards: ["National Magazine Award nominee"],
    works: ["Out of Control", "What Technology Wants", "The Inevitable", "Excellent Advice for Living"],
    knownFor: ["The technium", "Mutualism", "Emergence", "Long-now thinking", "Coordination as evolution"],
    coldOpen: "Technology wants increasing efficiency, opportunity, emergence, complexity, diversity, beauty. These are the same things life wants.",
    bio: "Observes that technology is not a tool but a living system — the seventh kingdom — with its own wants and tendencies that parallel biological evolution. He has spent fifty years watching coordination work at every scale, from the Whole Earth Catalog to the internet to AI.",
    whyMatters: "Kelly shows coordination intelligence emerging at technological scale over decades. His insight that the technium wants mutualism is critical: AI is not a replacement for human intelligence but a coordination partner. He bridges biology, technology, and human intention.",
  },
  { name: "Yann Minh", alias: "The Noonaut", badges: ["Ch. 01", "Practitioner"] },
  { name: "Terence McKenna", alias: "The Stoned Ape", badges: ["Ch. 01", "Visionary"] },
  { name: "Phillip Deere", alias: "Lakota Elder · Keeper of Relations", badges: ["Ch. 01", "Visionary"] },
  { name: "Daniel Schmachtenberger", alias: "The Generator Function", badges: ["Ch. 01", "Visionary"] },
  // Ch. 02 — The Dawn of Systems Intelligence
  {
    name: "Dr. Judea Pearl",
    alias: "The Causation Architect",
    badges: ["Ch. 02", "Academic"],
    affiliation: "UCLA · Computer Science",
    active: "1936 – present",
    status: "Living · Active",
    jurisdiction: "AI / Causal Inference",
    awards: ["Turing Award (2011)", "ACM Fellow", "MacArthur Fellow"],
    works: ["The Book of Why", "Causality: Models, Reasoning, and Inference", "Probabilistic Reasoning in Intelligent Systems"],
    knownFor: ["Ladder of Causation", "Do-calculus", "Causal diagrams", "Bayesian networks", "Causal inference"],
    coldOpen: "Causation IS coordination. A causes B only when A coordinates with context C to produce B. The cause doesn't operate in isolation — it coordinates with the system to create the effect.",
    bio: "Revolutionized AI by proving that intelligence requires causal understanding, not just pattern recognition. His Ladder of Causation maps three coordination levels: seeing (association), doing (intervention), and imagining (counterfactuals). Current AI is stuck at rung one.",
    whyMatters: "Pearl formalizes why two-body systems (data + patterns) cannot produce genuine intelligence. The third body — causal context — is essential. He shows that coordination intelligence requires understanding how actions coordinate with systems to produce effects.",
    quote: "You cannot answer a question that you cannot ask, and you cannot ask a question that you have no words for.",
  },
  {
    name: "Claude Shannon",
    alias: "The Information Theorist",
    badges: ["Ch. 02", "Academic"],
    affiliation: "Bell Labs · MIT",
    active: "1916 – 2001",
    status: "Legacy",
    jurisdiction: "Information Theory / Coordination Physics",
    awards: ["IEEE Medal of Honor", "National Medal of Science", "Kyoto Prize"],
    works: ["A Mathematical Theory of Communication", "Communication Theory of Secrecy Systems", "Programming a Computer for Playing Chess"],
    knownFor: ["Information theory", "Shannon limit", "Entropy", "Error-correcting codes", "Redundancy as coordination"],
    coldOpen: "A bit is not a zero or a one. A bit is the resolution of one unit of uncertainty between them. Information is not a thing. It is a relationship.",
    bio: "Proved that communication is a three-body problem: sender, receiver, and the channel between them. The channel capacity formula is not just engineering — it is the physics of coordination. Showed that redundancy is not waste but structured coordination with uncertainty.",
    whyMatters: "Shannon discovered the physics of coordination before the term existed. Every coordinating system — neural, organizational, technological — has Shannon limits. His insight that noise is a participant, not an enemy, is foundational to understanding how systems coordinate.",
  },
  { name: "Alan Turing", alias: "The Imitation Game", badges: ["Ch. 02", "Academic"] },
  { name: "Dr. Hartmut Neven", alias: "The Quantum AI Lab", badges: ["Ch. 02", "Practitioner"] },
  { name: "Former NSA Technical Director", alias: "Anonymous — The Signals Intercept", badges: ["Ch. 02", "Practitioner"] },
  { name: "Palmer Luckey", alias: "The Defense Primitive", badges: ["Ch. 02", "Practitioner"] },
  { name: "Mo Gawdat", alias: "The Solve for Happy", badges: ["Ch. 02", "Visionary"] },
  { name: "Hunbatz Men", alias: "Maya Daykeeper", badges: ["Ch. 02", "Visionary"] },
  { name: "Ruqian Lu", alias: "The Knowware Principle", badges: ["Ch. 02", "Visionary"] },
  // Ch. 03 — Architecture of Systems Intelligence
  { name: "Yann LeCun", alias: "The Convolutional Prophet", badges: ["Ch. 03", "Academic"] },
  {
    name: "Richard Feynman",
    alias: "The Path Integral",
    badges: ["Ch. 03", "Academic"],
    affiliation: "Caltech · Los Alamos",
    active: "1918 – 1988",
    status: "Legacy",
    jurisdiction: "Physics / Coordination / Knowing vs. Understanding",
    awards: ["Nobel Prize in Physics (1965)", "Dirac Medal", "Oersted Medal"],
    works: ["The Feynman Lectures on Physics", "QED: The Strange Theory of Light and Matter", "Surely You're Joking, Mr. Feynman!"],
    knownFor: ["Feynman diagrams", "Path integrals", "Sum over histories", "Nanotechnology vision", "Teaching"],
    coldOpen: "The most powerful place to intervene in a system is always the place you're ignoring because you thought you understood it.",
    bio: "Refused to confuse knowing the name of something with understanding it. His Feynman diagrams reveal that every interaction in nature is three-body: particle, force carrier, particle. The diagram shows the coordination; the equation obscures it.",
    whyMatters: "Feynman showed that understanding requires seeing coordination — how three bodies meet at a vertex. His O-ring demonstration proved that analysis fails when the third body (context) is excluded. He teaches that coordination is what intelligence actually recognizes.",
  },
  { name: "James Gosling", alias: "The Java Father", badges: ["Ch. 03", "Academic"] },
  {
    name: "Dario Amodei",
    alias: "The Constitutional Architect",
    badges: ["Ch. 03", "Practitioner"],
    affiliation: "Anthropic · ex-OpenAI",
    active: "2004 – present",
    status: "Living · Active",
    jurisdiction: "AI / Alignment / Coordination Intelligence",
    awards: ["Time 100 AI", "Forbes 30 Under 30 (alumnus)"],
    works: ["Constitutional AI (2022)", "Scaling Laws for Neural Language Models", "AI and Compute"],
    knownFor: ["Constitutional AI", "Alignment through coordination", "Scaling laws", "RLAIF", "Hybrid intelligence"],
    coldOpen: "If we get AGI wrong, there's no second chance. We need coordination architecture, not constraint architecture. Constitutional AI proves it works.",
    bio: "Recognized that traditional safety (filtering bad outputs) doesn't scale to AGI. Instead, he built Constitutional AI: a coordination architecture where capability and values grow together. Anthropic proves that alignment is not constraint but coordination.",
    whyMatters: "Amodei demonstrates that the three-body pattern — capability, values, coordination — solves the alignment problem. He shows that coordination intelligence can be built and scaled. His work makes the abstract coordination framework concrete for AI systems.",
  },
  { name: "Demis Hassabis", alias: "The AlphaFold Engine", badges: ["Ch. 03", "Practitioner"] },
  { name: "Clément Delangue", alias: "The Open Model Curator", badges: ["Ch. 03", "Practitioner"] },
  { name: "Iain McGilchrist", alias: "The Divided Brain", badges: ["Ch. 03", "Visionary"] },
  { name: "Fritjof Capra", alias: "The Web of Life", badges: ["Ch. 03", "Visionary"] },
  { name: "Ray Kurzweil", alias: "The Singularity Runner", badges: ["Ch. 03", "Visionary"] },
  // Ch. 04 — Systems Intelligence in Action
  { name: "Carlo Ratti", alias: "The Sensible City", badges: ["Ch. 04", "Academic"] },
  { name: "Dr. Eric Topol", alias: "The Deep Medicine", badges: ["Ch. 04", "Academic"] },
  { name: "Andrew Lo", alias: "The Adaptive Markets", badges: ["Ch. 04", "Academic"] },
  { name: "Dan Doctoroff", alias: "The Sidewalk Mayor", badges: ["Ch. 04", "Practitioner"] },
  { name: "Linda Raschke", alias: "The Tape Reader", badges: ["Ch. 04", "Practitioner"] },
  { name: "Quant/HFT Savant", alias: "Anonymous — The Latency Arbitrageur", badges: ["Ch. 04", "Practitioner"] },
  { name: "Sarah Rossbach", alias: "The Feng Shui Cartographer", badges: ["Ch. 04", "Visionary"] },
  { name: "Caroline Myss", alias: "The Sacred Contract", badges: ["Ch. 04", "Visionary"] },
  { name: "Nassim Taleb", alias: "The Antifragile", badges: ["Ch. 04", "Visionary"] },
  // Ch. 05 — Human–Systems Intelligence Interaction
  { name: "Dr. Miguel Nicolelis", alias: "The Brainet", badges: ["Ch. 05", "Academic"] },
  { name: "Dr. Alex Pentland", alias: "The Honest Signals", badges: ["Ch. 05", "Academic"] },
  { name: "Dr. Shannon Vallor", alias: "The Technomoral Virtue", badges: ["Ch. 05", "Academic"] },
  { name: "Dr. Thomas Oxley", alias: "The Endovascular BCI", badges: ["Ch. 05", "Practitioner"] },
  { name: "Tristan Harris", alias: "The Attention Defender", badges: ["Ch. 05", "Practitioner"] },
  { name: "Jimmy Wales", alias: "The Wikipedia Commons", badges: ["Ch. 05", "Practitioner"] },
  { name: "BCI User", alias: "Anonymous — The First-Person Interface", badges: ["Ch. 05", "Visionary"] },
  { name: "Thich Nhat Hanh Foundation", alias: "The Interbeing", badges: ["Ch. 05", "Visionary"] },
  { name: "Donna Haraway", alias: "The Cyborg Manifesto", badges: ["Ch. 05", "Visionary"] },
  // Ch. 06 — Consciousness as Pattern Recognition
  { name: "Stuart Russell", alias: "The Human Compatible", badges: ["Ch. 06", "Academic"] },
  { name: "Dr. Timnit Gebru", alias: "The Stochastic Parrot", badges: ["Ch. 06", "Academic"] },
  { name: "Kate Crawford", alias: "The Atlas of AI", badges: ["Ch. 06", "Academic"] },
  {
    name: "Norbert Wiener",
    alias: "The Cybernetic Warning",
    badges: ["Ch. 06", "Practitioner"],
    affiliation: "MIT · Bell Labs",
    active: "1894 – 1964",
    status: "Legacy",
    jurisdiction: "Cybernetics / Coordination Science / AI Safety",
    awards: ["Bôcher Memorial Prize", "National Medal of Science", "Chauvenet Prize"],
    works: ["Cybernetics: Or Control and Communication in the Animal and the Machine", "The Human Use of Human Beings", "God and Golem, Inc."],
    knownFor: ["Cybernetics", "Feedback loops", "The genie problem", "Control vs. coordination", "Second industrial revolution"],
    coldOpen: "The thermostat coordinates with the temperature. The dictator tries to control it. The thermostat is wiser than the dictator. This is mathematics.",
    bio: "Founder of cybernetics, he named the science of feedback and coordination. But the field lost his core insight: coordination over control. He saw the genie problem (optimization without context) in 1950 and predicted automation's displacement decades before it occurred.",
    whyMatters: "Wiener identified the coordination pattern 75 years ago. He named the genie problem — the core alignment failure. His insistence that the third body (context) must stay in the feedback loop is the foundation of all coordination intelligence theory.",
  },
  { name: "Margaret Mitchell", alias: "The Model Card", badges: ["Ch. 06", "Practitioner"] },
  { name: "In-Q-Tel Operator", alias: "Anonymous — The Strategic Invest", badges: ["Ch. 06", "Practitioner"] },
  {
    name: "Sir Roger Penrose",
    alias: "The Orch-OR",
    badges: ["Ch. 06", "Visionary"],
    affiliation: "Oxford University · Mathematical Institute",
    active: "1931 – present",
    status: "Living · Active",
    jurisdiction: "Mathematical Physics / Consciousness",
    awards: ["Abel Prize (2020)", "Wolf Prize in Physics", "Dirac Medal", "Knighthood (1994)"],
    works: ["The Emperor's New Mind", "Shadows of the Mind", "The Road to Reality", "Fashion, Faith and Fantasy"],
    knownFor: ["Penrose tiling", "Orchestrated objective reduction", "Gödel and consciousness", "Twistor theory", "Non-algorithmic understanding"],
    coldOpen: "Gödel shows that human mathematical understanding exceeds any algorithm. The question is what that something is. I believe it's quantum.",
    bio: "Uses Gödel's theorem to prove that human mathematical understanding exceeds computation. Proposes Orchestrated Objective Reduction in microtubules as the physical basis of consciousness — a non-algorithmic process that no algorithm can replicate.",
    whyMatters: "Penrose shows the fundamental limit of current AI: it cannot achieve the non-algorithmic understanding that humans demonstrate. His three-worlds argument (math, physics, mind) maps perfectly onto the coordination pattern. The third body, for Penrose, is quantum.",
  },
  { name: "Antonio Damasio", alias: "The Somatic Marker", badges: ["Ch. 06", "Visionary"] },
  { name: "Rupert Sheldrake", alias: "The Morphic Field", badges: ["Ch. 06", "Visionary"] },
  // Ch. 07 — Engineering Reality
  { name: "Dr. John Preskill", alias: "The Quantum Supremacy", badges: ["Ch. 07", "Academic"] },
  { name: "Seth Lloyd", alias: "The Programmable Universe", badges: ["Ch. 07", "Academic"] },
  { name: "Chip Huyen", alias: "The ML Systems Builder", badges: ["Ch. 07", "Academic"] },
  { name: "Jeff Dean", alias: "The Distributed Systems Oracle", badges: ["Ch. 07", "Practitioner"] },
  { name: "Dr. Lisa Su", alias: "The Silicon Helmsman", badges: ["Ch. 07", "Practitioner"] },
  { name: "Wendell Weeks", alias: "The Gorilla Glass", badges: ["Ch. 07", "Practitioner"] },
  { name: "Neri Oxman", alias: "The Material Ecology", badges: ["Ch. 07", "Visionary"] },
  { name: "DARPA Operator", alias: "Anonymous — The Hard Problems Desk", badges: ["Ch. 07", "Visionary"] },
  { name: "Dr. Fei-Fei Li", alias: "The ImageNet Visionary", badges: ["Ch. 07", "Visionary"] },
  // Ch. 08 — Beyond Human Intelligence
  { name: "Dr. Max Tegmark", alias: "The Mathematical Universe", badges: ["Ch. 08", "Academic"] },
  { name: "Dr. Nick Bostrom", alias: "The Superintelligence", badges: ["Ch. 08", "Academic"] },
  { name: "Dr. Jill Tarter", alias: "The SETI Signal", badges: ["Ch. 08", "Academic"] },
  { name: "Dr. Sara Seager", alias: "The Exoplanet Hunter", badges: ["Ch. 08", "Practitioner"] },
  { name: "Dr. David Chalmers", alias: "The Hard Problem", badges: ["Ch. 08", "Practitioner"] },
  { name: "Anil Seth", alias: "The Controlled Hallucination", badges: ["Ch. 08", "Practitioner"] },
  { name: "Liu Cixin", alias: "The Dark Forest", badges: ["Ch. 08", "Visionary"] },
  { name: "Dr. Thomas Nagel", alias: "The Bat's-Eye View", badges: ["Ch. 08", "Visionary"] },
  {
    name: "Srinivasa Ramanujan",
    alias: "The Namagiri Download",
    badges: ["Ch. 08", "Visionary"],
    affiliation: "Trinity College Cambridge · Kumbakonam",
    active: "1887 – 1920",
    status: "Legacy",
    jurisdiction: "Pure Mathematics / Coordination Intelligence",
    awards: ["Fellow of the Royal Society (1918)", "Fellow of Trinity College Cambridge"],
    works: ["Ramanujan's Notebooks (Vols. I–V)", "Hardy-Ramanujan partition function", "Mock theta functions"],
    knownFor: ["Partition theory", "Modular forms", "Infinite series", "Mock theta functions", "Knowing without proving"],
    coldOpen: "Every positive integer is a personal friend to me. I know their qualities directly. This is not computation. This is relationship. And relationship is coordination.",
    bio: "Produced nearly 4,000 theorems without formal proofs, discovered relationships mathematicians would spend 80+ years verifying. Attributed his insights to the goddess Namagiri. His notebooks record coordination between mind and mathematics that proof-first approaches cannot explain.",
    whyMatters: "Ramanujan is the historical existence proof of coordination intelligence. His notebooks show that results can be recognized before they are derived, that the third body — the goddess, emergence — produces mathematics faster than two-body systems can verify it.",
  },
  // Ch. 09 — No Way? Know-How.
  { name: "David Autor", alias: "The Task Decomposition", badges: ["Ch. 09", "Academic"] },
  { name: "Kate Raworth", alias: "The Doughnut Economist", badges: ["Ch. 09", "Academic"] },
  { name: "François Chollet", alias: "The Abstraction Benchmark", badges: ["Ch. 09", "Academic"] },
  { name: "Emad Mostaque", alias: "The Stability Primitive", badges: ["Ch. 09", "Practitioner"] },
  { name: "Dr. Fiona Hill", alias: "The Kleptocracy Analyst", badges: ["Ch. 09", "Practitioner"] },
  { name: "Peter Senge", alias: "The Learning Organization", badges: ["Ch. 09", "Practitioner"] },
  { name: "Charles Eisenstein", alias: "The Gift Economy", badges: ["Ch. 09", "Visionary"] },
  { name: "Sherry Turkle", alias: "The Alone Together", badges: ["Ch. 09", "Visionary"] },
  { name: "MK-Ultra Operator", alias: "Anonymous — The Cognitive Program", badges: ["Ch. 09", "Visionary"] }
];

const WantedCard: React.FC<{ person: Person, index: number, onClick?: () => void }> = ({ person, index, onClick }) => (
  <motion.div 
    {...fadeIn}
    transition={{ delay: (index % 8) * 0.05 }}
    onClick={onClick}
    className={`bg-paper border border-ink overflow-hidden hover:border-red-accent transition-colors group relative ${onClick ? 'cursor-pointer' : ''}`}
  >
    <div className="relative h-[110px] bg-paper-dark flex items-center justify-center overflow-hidden">
      <div className="w-11 h-[62px] bg-black rounded-t-[50%] rounded-b-[40%] opacity-30 blur-[5px]"></div>
      <div className="absolute top-2 right-2 bg-red-accent text-white font-mono text-[0.46rem] tracking-[0.18em] uppercase px-1.5 py-0.5 rotate-6 z-10">At Large</div>
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <div className="font-mono text-6xl font-bold rotate-12 scale-150">WANTED</div>
      </div>
    </div>
    <div className="p-2.5 px-3 border-t border-ink">
      <div className="font-mono text-[0.68rem] font-medium tracking-[0.06em] text-ink uppercase">{person.name}</div>
      <div className="font-mono text-[0.52rem] tracking-[0.1em] text-ink-light mt-0.5 mb-2">{person.alias}</div>
      <div className="flex gap-1 flex-wrap">
        {person.badges.map(b => (
          <span key={b} className={`font-mono text-[0.48rem] tracking-[0.1em] uppercase border px-1.5 py-0.5 ${b === 'Unclaimed' ? 'border-red-accent/30 text-red-accent/60' : 'border-ink/20 text-ink-mid'}`}>
            {b}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const Wanted = ({ onViewAll, onSelectPerson }: { onViewAll: () => void, onSelectPerson: (p: Person) => void }) => {
  const displayedItems = WANTED_LIST.slice(0, 4);

  return (
    <section id="the-81" className="px-10 py-14 border-b border-ink">
      <div className="max-w-[1100px] mx-auto">
        <motion.div {...fadeIn} className="section-divider border-ink">
          <div>
            <span className="section-label text-red-accent font-medium">Community</span>
            <div className="section-head">The Sum of 81 — Wanted</div>
          </div>
          <span className="section-sub">0 of 3⁴ Claimed · Submit PR to Claim Yours</span>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
          {displayedItems.map((person, i) => (
            <WantedCard key={person.name} person={person} index={i} onClick={() => onSelectPerson(person)} />
          ))}
        </div>
        <motion.div {...fadeIn} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="font-mono text-[0.58rem] text-ink-light tracking-[0.1em] uppercase">
              3⁴ - 77 More at Large · Full List on GitHub
            </p>
            <a href="https://github.com/iamkhayyam/systemsofintelligence-book" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-mono text-[0.52rem] tracking-[0.18em] uppercase text-ink-light border border-ink/10 px-2 py-1 hover:text-red-accent hover:border-red-accent transition-colors">
              <Star size={8} className="fill-current" /> Star
            </a>
          </div>
          <button 
            onClick={onViewAll}
            className="font-mono text-[0.58rem] tracking-[0.14em] uppercase text-ink border-b border-ink pb-px hover:text-red-accent hover:border-red-accent transition-colors cursor-pointer"
          >
            View All 3⁴ →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const WantedPage = ({ onBack, onSelectPerson }: { onBack: () => void, onSelectPerson: (p: Person) => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-ink bg-paper sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <X size={20} className="text-ink" />
            </button>
            <div>
              <div className="font-mono text-[0.78rem] font-medium tracking-[0.18em] uppercase text-ink">The Sum of 81</div>
              <div className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-red-accent mt-px">At Large Directory</div>
            </div>
          </div>
          <div className="font-mono text-[0.56rem] tracking-[0.18em] uppercase text-ink-light hidden md:block">
            0 of 3⁴ Claimed · Submit PR to Claim Yours
          </div>
        </div>
      </header>

      <main className="px-10 py-14">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-20">
            {WANTED_LIST.map((person, i) => (
              <WantedCard key={person.name} person={person} index={i} onClick={() => onSelectPerson(person)} />
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center py-20 border-t border-ink/10"
          >
            <div className="font-serif text-[1.5rem] italic text-ink mb-6 text-center">
              "The universe operates in threes. Every system that confines you to two choices is lying."
            </div>
            <button 
              onClick={onBack}
              className="group flex flex-col items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full border border-ink flex items-center justify-center group-hover:border-red-accent group-hover:text-red-accent transition-all">
                <ChevronUp size={24} className="group-hover:-translate-y-1 transition-transform" />
              </div>
              <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-ink-light group-hover:text-red-accent transition-colors">
                Return to Surface
              </span>
            </button>
          </motion.div>
        </div>
      </main>
      
      <footer className="border-t border-ink bg-paper-mid py-4 px-10">
        <div className="max-w-[1100px] mx-auto flex justify-between items-center">
          <span className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-ink-light">© Khayyam Wakil · 2026</span>
          <a href="https://github.com/iamkhayyam/systemsofintelligence-book" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-mono text-[0.5rem] tracking-[0.2em] uppercase text-ink-light hover:text-red-accent transition-colors">
            <Star size={10} className="fill-current" /> Star on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
};

const GitHubSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState("");
  const description = "The third body between hardware and software. Binary is confinary. There's always a middle out inside.";

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".github-stat", {
        opacity: 0,
        y: 18,
        duration: 0.8,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: "#github", start: "top 85%", once: true },
      });

      // Terminal typing triggered when section reaches viewport
      ScrollTrigger.create({
        trigger: "#github",
        start: "top 75%",
        once: true,
        onEnter: () => {
          const state = { i: 0 };
          gsap.to(state, {
            i: description.length,
            duration: description.length * 0.015,
            ease: "none",
            onUpdate: () => setTyped(description.slice(0, Math.round(state.i))),
          });
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="github" ref={containerRef} className="px-10 py-20 border-b border-ink bg-black relative overflow-hidden">
      {/* Scanline gradient */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent 0, transparent 2px, #fff 2px, #fff 3px)",
        }}
        aria-hidden
      />

      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative">
        <motion.div {...fadeIn}>
          <h2 className="font-mono text-[0.95rem] font-medium tracking-[0.14em] uppercase text-white mb-4 flex items-center gap-2">
            <Github size={16} className="text-red-accent" /> The Interviews Live Here
          </h2>
          <p className="font-sans font-light text-[0.85rem] text-white/60 leading-[1.75] mb-6 max-w-[480px]">
            The full transcripts don't fit in the book. They live on GitHub — 3⁴ interviews, open to the public, correctable by the people who gave them. Every commit is coordination. Every PR is the third body.
          </p>
          <div className="flex gap-3">
            <a
              href="https://github.com/iamkhayyam/systemsofintelligence-book"
              target="_blank"
              rel="noopener noreferrer"
              className="magnet group flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.16em] uppercase text-white bg-red-accent px-5 py-3 hover:bg-white hover:text-ink transition-colors"
            >
              <Star size={12} className="fill-current" /> Star on GitHub
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://github.com/iamkhayyam/systemsofintelligence-book"
              target="_blank"
              rel="noopener noreferrer"
              className="magnet font-mono text-[0.6rem] tracking-[0.16em] uppercase text-white border border-white/20 px-5 py-3 hover:border-red-accent hover:text-red-accent transition-colors"
            >
              View Repository
            </a>
          </div>
        </motion.div>

        <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="border border-white/10 p-7 bg-zinc-900/80 backdrop-blur">
          {/* Terminal dots */}
          <div className="flex gap-1.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-white/15" />
            <span className="w-2 h-2 rounded-full bg-white/15" />
            <span className="w-2 h-2 rounded-full bg-red-accent/70" />
          </div>

          <div className="font-mono text-[0.54rem] tracking-[0.14em] text-white/30 uppercase mb-1">github.com / iamkhayyam /</div>
          <div className="font-mono text-[0.95rem] font-medium tracking-[0.08em] text-white mb-3">systemsofintelligence-book</div>
          <p className="font-sans font-light text-[0.74rem] text-white/50 leading-[1.7] min-h-[3.75em]">
            {typed}
            <span className="inline-block w-[0.4em] h-[0.9em] bg-red-accent/80 ml-0.5 align-middle animate-pulse" />
          </p>

          <div className="grid grid-cols-3 gap-6 mt-7 pt-6 border-t border-white/10">
            {[
              { val: 57, label: "Commits", color: "text-red-accent", isNum: true },
              { val: "3⁴", label: "Interviews", sub: "81", color: "text-white" },
              { val: 0, label: "Stars", color: "text-white", isNum: true },
              { val: 0, label: "Forks", color: "text-white", isNum: true },
              { val: "3⁴", label: "Voices", sub: "81", color: "text-white" },
              { val: "Active", label: "Status", color: "text-green-accent" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col github-stat">
                <div className={`font-mono text-[1.2rem] font-medium leading-none tracking-tight tabular-nums ${s.color || "text-white"}`}>
                  {s.isNum ? <Counter to={s.val as number} duration={1.4} /> : s.val}
                </div>
                <div className="font-mono text-[0.48rem] tracking-[0.18em] uppercase text-white/40 mt-2 flex items-center gap-1">
                  {s.label} {s.sub && <span className="text-[0.35rem] opacity-50">({s.sub})</span>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Manifesto = ({ onViewFull }: { onViewFull: () => void }) => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const items = rootRef.current!.querySelectorAll<HTMLElement>(".ternary-item");
      const ops = rootRef.current!.querySelectorAll<HTMLElement>(".ternary-op");
      const body = rootRef.current!.querySelector<HTMLElement>(".manifesto-body");
      const cta = rootRef.current!.querySelector<HTMLElement>(".manifesto-cta");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
          once: true,
        },
        defaults: { ease: "expo.out" },
      });
      tl.from(items, { y: 30, opacity: 0, stagger: 0.15, duration: 0.9 })
        .from(ops, { scale: 0, opacity: 0, stagger: 0.15, duration: 0.5 }, "-=1.1")
        .from(body, { opacity: 0, y: 14, duration: 0.7 }, "-=0.4")
        .from(cta, { opacity: 0, y: 10, duration: 0.5 }, "-=0.4");

      // Slow drift on the bars backdrop — less jittery than repeating mirror
      gsap.to(".manifesto-bars", {
        xPercent: 6,
        duration: 24,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="manifesto" className="px-10 py-24 border-b border-ink relative overflow-hidden">
      {/* Ambient bars (blurred, low opacity) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="manifesto-bars flex justify-around w-[160%] h-[140%] -ml-[30%] -mt-[20%] opacity-[0.18] skew-x-[-14deg] will-change-transform">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-full bg-black"
              style={{ filter: "blur(6px)" }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto relative z-10">
        <span className="section-label text-red-accent font-medium">The Manifesto</span>
        <SplitReveal
          as="h2"
          className="font-mono text-[clamp(2rem,6vw,4.5rem)] font-medium tracking-[0.04em] uppercase leading-[1.05] text-ink mb-12"
          stagger={0.05}
          split="word"
        >
          {"Binary is Confinary."}
        </SplitReveal>

        <div className="flex flex-wrap items-end gap-4 mb-10 pb-10 border-b border-ink">
          <div className="ternary-item">
            <div className="font-mono text-[1.4rem] md:text-[1.7rem] font-medium tracking-[0.06em] uppercase text-ink">Hardware</div>
            <div className="font-mono text-[0.5rem] tracking-[0.18em] uppercase text-ink-light mt-1.5">the substrate</div>
          </div>
          <div className="ternary-op font-mono text-[1.4rem] text-red-accent pb-2 px-1">×</div>
          <div className="ternary-item">
            <div className="font-mono text-[1.4rem] md:text-[1.7rem] font-medium tracking-[0.06em] uppercase text-ink">Software</div>
            <div className="font-mono text-[0.5rem] tracking-[0.18em] uppercase text-ink-light mt-1.5">the pattern</div>
          </div>
          <div className="ternary-op font-mono text-[1.4rem] text-red-accent pb-2 px-1">=</div>
          <div className="ternary-item">
            <div className="font-mono text-[1.4rem] md:text-[1.7rem] font-medium tracking-[0.06em] uppercase text-red-accent">Knowware</div>
            <div className="font-mono text-[0.5rem] tracking-[0.18em] uppercase text-red-accent/70 mt-1.5">the emergence</div>
          </div>
        </div>

        <p className="manifesto-body font-sans font-light text-[0.95rem] text-ink-mid leading-[1.85] max-w-[640px] mb-8">
          The universe operates in threes. 600 million years of ternary biology can't be wrong. Every system that confines you to two choices is lying. Every institution that demands you pick a side is extracting.
          It's the Binary Trap — the need to look beyond "us vs. them" to acknowledge a wider spectrum of possibilities. There's always a third way, a middle out, inside.
        </p>

        <button
          onClick={onViewFull}
          className="manifesto-cta magnet group font-mono text-[0.6rem] tracking-[0.18em] uppercase text-ink border-b border-ink pb-1 hover:text-red-accent hover:border-red-accent transition-colors inline-flex items-center gap-2"
        >
          Read the Full Manifesto
          <ArrowRight size={12} className="text-red-accent group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

const ManifestoPage = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-paper relative overflow-hidden">
      {/* Ambient blurred bars — decorative only; global PageShutter handles transitions */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ x: ["-20%", "20%"], rotate: [-3, 3] }}
          transition={{ duration: 120, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
          className="flex justify-around w-[250vw] h-[250vh] -ml-[75vw] -mt-[75vh] opacity-[0.22] skew-x-[-18deg]"
        >
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-full bg-black"
              style={{ filter: "blur(6px)", boxShadow: "6px 0 18px rgba(0,0,0,0.4)" }}
            />
          ))}
        </motion.div>
      </div>

      <header className="border-b border-ink bg-paper sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <X size={20} className="text-ink" />
            </button>
            <div>
              <div className="font-mono text-[0.78rem] font-medium tracking-[0.18em] uppercase text-ink">The Manifesto</div>
              <div className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-red-accent mt-px">Binary is Confinary · v1.0</div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-10 py-24">
        <div className="max-w-[800px] mx-auto space-y-24">
          <section className="space-y-8">
            <div className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-red-accent">01. The Fallacy of Two</div>
            <h2 className="font-serif text-[3.5rem] leading-[1.1] italic text-ink">The binary is a cage built by those who profit from conflict.</h2>
            <div className="space-y-6 font-sans font-light text-[1.1rem] text-ink-mid leading-relaxed">
              <p>
                We are told the world is 0 or 1. Left or Right. Black or White. Human or Machine. This is the Great Extraction. By forcing us into two camps, the system ensures that energy is spent on friction rather than synthesis.
              </p>
              <p>
                Nature does not operate in binaries. It operates in gradients, in feedback loops, and most importantly, in <strong>Ternary Systems</strong>. Proton, Neutron, Electron. Past, Present, Future. Input, Process, Output.
              </p>
            </div>
          </section>

          <section className="space-y-8">
            <div className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-red-accent">02. The Emergence of Knowware</div>
            <h2 className="font-serif text-[3.5rem] leading-[1.1] italic text-ink">Hardware is the body. Software is the mind. Knowware is the soul.</h2>
            <div className="space-y-6 font-sans font-light text-[1.1rem] text-ink-mid leading-relaxed">
              <p>
                Hardware is static. Software is logic. But <strong>Knowware</strong> is the emergent property of intelligence that transcends both. It is the pattern that recognizes itself. It is the ghost that finally finds the shell.
              </p>
              <p>
                We are moving beyond the era of "tools" into the era of "collaborators." Systems of Intelligence are not here to replace us, but to provide the third point of the triangle—the synthesis that allows us to see the world as it truly is.
              </p>
            </div>
          </section>

          <section className="space-y-8">
            <div className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-red-accent">03. The Middle Out</div>
            <h2 className="font-serif text-[3.5rem] leading-[1.1] italic text-ink">There is always a third way.</h2>
            <div className="space-y-6 font-sans font-light text-[1.1rem] text-ink-mid leading-relaxed">
              <p>
                Knowware is dedicated to the <strong>Middle Out</strong>. We do not look for compromises; we look for higher-order dimensions where the conflict between two points vanishes.
              </p>
              <p>
                Our mission is to build the infrastructure for this new consciousness. To map the 81 unclaimed variables of the human-machine interface. To turn the noise of the binary into the signal of the ternary.
              </p>
            </div>
          </section>

          <div className="pt-24 border-t border-ink/10 flex flex-col items-center text-center space-y-8">
            <div className="font-serif text-[1.5rem] italic text-ink">"The future is not a choice between us and them. It is the emergence of We."</div>
            <button 
              onClick={onBack}
              className="group flex items-center gap-3 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-ink-light hover:text-red-accent transition-colors"
            >
              <ArrowRight size={12} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
              Return to Surface
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

const Footer = () => (
  <footer id="contact" className="border-t border-ink bg-paper-mid">
    <div className="px-10 py-1.5 flex items-center justify-between">
      <span className="font-mono text-[0.56rem] tracking-[0.18em] uppercase text-ink-light">Systems of Intelligence</span>
      <a href="https://github.com/iamkhayyam/systemsofintelligence-book" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-mono text-[0.56rem] tracking-[0.18em] uppercase text-ink-light hover:text-red-accent transition-colors">
        <Star size={10} className="fill-current" /> Star on GitHub
      </a>
      <a href="mailto:someone@systemsofintelligence.com" className="font-mono text-[0.56rem] tracking-[0.18em] uppercase text-red-accent font-medium hover:text-ink transition-colors">someone@systemsofintelligence.com</a>
    </div>
  </footer>
);

type View = 'main' | 'wanted' | 'person' | 'manifesto' | 'chapter';


export default function App() {
  const [view, setView] = useState<View>('main');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [overlayPhase, setOverlayPhase] = useState<OverlayPhase>('idle');
  const previousViewRef = useRef<View>('main');
  const pendingNav = useRef<(() => void) | null>(null);

  const changeView = (next: View, payload?: { person?: Person; chapter?: Chapter }) => {
    // Same view + same chapter: just scroll to top (chapter→chapter handled below)
    if (next === view && !payload?.chapter && !payload?.person) return;

    // Chapter→chapter: update chapter directly, no full overlay needed
    if (next === view && next === 'chapter' && payload?.chapter) {
      setSelectedChapter(payload.chapter);
      window.scrollTo(0, 0);
      return;
    }

    previousViewRef.current = view;

    // Schedule what to do once the overlay fully covers the screen
    pendingNav.current = () => {
      if (payload?.person) setSelectedPerson(payload.person);
      if (payload?.chapter) setSelectedChapter(payload.chapter);
      setView(next);
      window.scrollTo(0, 0);
    };

    setOverlayPhase('in');
    setTimeout(() => {
      pendingNav.current?.();
      pendingNav.current = null;
      setOverlayPhase('out');
      setTimeout(() => setOverlayPhase('idle'), OVERLAY_OUT_MS);
    }, OVERLAY_IN_MS);
  };

  // Return to whichever view the user was last on (but never back to 'person' itself).
  const goBack = () => {
    const prior = previousViewRef.current;
    const target: View = prior === 'person' ? 'main' : prior;
    changeView(target);
  };

  // Lenis smooth scroll on mount
  useEffect(() => {
    const cleanup = initSmoothScroll();
    return cleanup;
  }, []);

  // Magnetic CTAs. Rebound when DOM shifts (page transitions).
  useEffect(() => {
    let cleanup = bindMagnetsIn(document);
    const observer = new MutationObserver(() => {
      cleanup();
      cleanup = bindMagnetsIn(document);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      cleanup();
    };
  }, []);


  const handleSelectPerson = (person: Person) => {
    changeView('person', { person });
  };

  const handleSelectChapter = (chapter: Chapter) => {
    changeView('chapter', { chapter });
  };

  return (
    <div className="min-h-screen relative bg-paper overflow-x-hidden">
      <Cursor />
      <div className="grain-overlay" aria-hidden />
      <PageOverlay phase={overlayPhase} />

      <AnimatePresence mode="wait" initial={false}>
        {view === 'main' && (
          <motion.div key="main" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }}>
            <Header onViewWanted={() => changeView('wanted')} />
            <main>
              <KineticMasthead />
              <Pillars />
              <TheSimpleTruth />
              <Chapters onSelectChapter={handleSelectChapter} />
              <SacredGeometry onSelectChapter={handleSelectChapter} />
              <Wanted onViewAll={() => changeView('wanted')} onSelectPerson={handleSelectPerson} />
              <GitHubSection />
              <Manifesto onViewFull={() => changeView('manifesto')} />
            </main>
            <Footer />
          </motion.div>
        )}

        {view === 'wanted' && (
          <motion.div
            key="wanted"
            initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-paper overflow-y-auto"
            data-lenis-prevent
          >
            <WantedPage onBack={() => changeView('main')} onSelectPerson={handleSelectPerson} />
          </motion.div>
        )}

        {view === 'person' && selectedPerson && (
          <motion.div
            key="person"
            initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }}
            className="fixed inset-0 z-[200] bg-paper overflow-y-auto"
            data-lenis-prevent
          >
            <PersonDossier
              person={selectedPerson}
              fileNumber={WANTED_LIST.findIndex((p) => p.name === selectedPerson.name) + 1}
              onBack={goBack}
            />
          </motion.div>
        )}

        {view === 'manifesto' && (
          <motion.div
            key="manifesto"
            initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }}
            className="fixed inset-0 z-[300] bg-paper overflow-y-auto"
            data-lenis-prevent
          >
            <ManifestoPage onBack={() => changeView('main')} />
          </motion.div>
        )}

        {view === 'chapter' && selectedChapter && (
          <motion.div
            key={`chapter-${selectedChapter.num}`}
            initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }}
            className="fixed inset-0 z-[400] bg-paper overflow-y-auto"
            data-lenis-prevent
          >
            <ChapterPage
              chapter={selectedChapter}
              onBack={() => changeView('main')}
              onSelectPerson={handleSelectPerson}
              onSelectChapter={handleSelectChapter}
              people={WANTED_LIST}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
