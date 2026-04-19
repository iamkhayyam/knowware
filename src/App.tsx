import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useIsPresent } from "motion/react";
import { ExternalLink, Github, ArrowRight, Star, X, ChevronUp, Share2, Twitter, Linkedin, Link, MessageSquare, Phone, Mail, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { CHAPTERS } from "./chapters";
import { Chapter } from "./types";

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
    <div className="border-t border-ink/10 px-10 py-1.5 flex items-center justify-between">
      <span className="font-mono text-[0.56rem] tracking-[0.18em] uppercase text-ink-light">Systems of Intelligence · Vol. I</span>
      <span className="font-mono text-[0.56rem] tracking-[0.18em] uppercase text-ink-light">Draft · April 2026</span>
      <span className="font-mono text-[0.56rem] tracking-[0.18em] uppercase text-red-accent font-medium">81 Voices · 9(+1) Chapters</span>
    </div>
  </header>
);

const Masthead = () => {
  return (
    <section id="masthead" className="border-b border-ink px-10 py-20 md:py-16">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-18 items-end">
        <motion.div {...fadeIn} className="headline">
          <h1 className="font-mono text-[clamp(3rem,6vw,5.5rem)] font-medium tracking-[0.06em] uppercase text-ink leading-none mb-2.5">
            Knowware
          </h1>
          <div className="font-mono text-[0.6rem] tracking-[0.24em] uppercase text-red-accent font-medium mb-6">
            Systems of Intelligence · Vol. I
          </div>
          <hr className="border-none border-t border-ink mb-5" />
          <p className="font-serif italic text-[1.05rem] text-ink-mid leading-relaxed">
            "When software meets hardware and fall in love, that's Knowware."
          </p>
        </motion.div>
        <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="meta">
          <div className="flex gap-8 pb-5.5 border-b border-ink mb-5.5">
            {[
              { num: "81", label: "Expert Voices" },
              { num: "9(+1)", label: "Chapters" },
              { num: "Base(9)", label: "Structure" }
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-mono text-[2.2rem] font-medium leading-none text-ink tracking-[0.04em] whitespace-nowrap">{stat.num}</div>
                <div className="font-mono text-[0.54rem] tracking-[0.2em] uppercase text-red-accent mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="font-serif text-[0.92rem] leading-[1.65] text-ink italic border-l-2 border-red-accent pl-4 mb-8">
            "Binary is confinary. There's always a middle out inside."
          </div>
          <div className="flex gap-3">
            <a href="https://github.com/iamkhayyam/systemsofintelligence-book" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.2em] uppercase bg-ink text-paper px-6 py-3.5 hover:bg-red-accent transition-colors">
              <Star size={12} className="fill-current" /> Star on GitHub
            </a>
            <a href="#github" className="flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.2em] uppercase border border-ink text-ink px-6 py-3.5 hover:border-red-accent hover:text-red-accent transition-colors">
              View Transcripts
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Pillars = () => (
  <section id="pillars" className="border-b border-ink">
    <div className="grid grid-cols-1 md:grid-cols-3 max-w-[1100px] mx-auto">
      {[
        { num: "01", title: "The Book", desc: "81 expert interviews across 10 chapters. The complete ternary coordination framework." },
        { num: "02", title: "The Manifesto", desc: "Binary is confinary. The case for seeing ternary — and why it can't be unseen." },
        { num: "03", title: "The Movement", desc: "A community of practitioners, builders, and seekers coordinating around a third way." }
      ].map((pillar, i) => (
        <motion.div 
          key={pillar.num} 
          {...fadeIn} 
          transition={{ delay: i * 0.1 }}
          className={`p-7.5 md:p-9 border-b md:border-b-0 md:border-r border-ink last:border-r-0`}
        >
          <div className="font-mono text-[0.54rem] tracking-[0.22em] uppercase text-red-accent font-medium mb-2">{pillar.num} —</div>
          <div className="font-mono text-[0.76rem] font-medium tracking-[0.1em] uppercase text-ink mb-2">{pillar.title}</div>
          <p className="font-sans text-[0.78rem] text-ink-mid leading-[1.65] font-light">{pillar.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

const TheSimpleTruth = () => (
  <section id="the-truth" className="px-10 py-20 border-b border-ink bg-paper-mid relative overflow-hidden">
    {/* Background "Chalkboard" elements */}
    <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] pointer-events-none select-none font-mono text-[10rem] leading-none text-ink flex flex-col items-end pr-10 pt-10">
      <div>3⁴</div>
      <div>9²</div>
      <div>81</div>
    </div>

    <div className="max-w-[1100px] mx-auto">
      <motion.div {...fadeIn} className="section-divider border-ink mb-12">
        <div>
          <span className="section-label text-red-accent font-medium">The Core Concept</span>
          <div className="section-head">THE TRUTH</div>
        </div>
        <span className="section-sub">"What is this thing?"</span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        <motion.div {...fadeIn} className="md:col-span-8 space-y-8">
          <div className="font-serif italic text-[1.4rem] md:text-[1.8rem] text-ink leading-relaxed">
            "It's actually very simple. We've been thinking about computers as things that follow instructions (software) on top of things that move electrons (hardware). But that's not how the world actually works."
          </div>
          
          <div className="space-y-6 font-sans font-light text-[1rem] text-ink-mid leading-[1.8]">
            <p>
              Consider a <strong>murmuration of starlings</strong>. Thousands of birds moving as a single, fluid organism. You don't give them a 'software' manual on how to maintain the shape. And you don't build 'hardware' tracks in the sky for them to follow. They just... <strong>coordinate</strong>.
            </p>
            <p>
              There's a third thing. A pattern. A signal that moves between the birds. That's what we call <strong>Knowware</strong>. It's the intelligence that emerges when things start talking to each other in a way that creates something bigger than the sum of the parts.
            </p>
            <p>
              This book isn't just about AI or robots. It's about the <em>physics of coordination</em>. Why 81 voices? Because 9 squared is a beautiful, complete number in this base-9 universe we've discovered. We're looking for the pattern that connects the body to the mind, and the mind to the cosmos.
            </p>
          </div>
        </motion.div>

        <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="md:col-span-4 space-y-6">
          <div className="border border-ink p-8 bg-paper relative">
            <div className="font-mono text-[0.54rem] tracking-[0.22em] uppercase text-red-accent font-medium mb-4">Author's Note —</div>
            <p className="font-serif italic text-[1.1rem] text-ink leading-relaxed mb-6">
              "Coordination is the ghost in the machine that makes the machine more than a machine."
            </p>
            <div className="h-px bg-ink/10 w-full mb-6"></div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[0.55rem] uppercase tracking-widest text-ink-light">Topic</span>
                <span className="font-mono text-[0.55rem] uppercase tracking-widest text-ink">Coordination</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-[0.55rem] uppercase tracking-widest text-ink-light">Base</span>
                <span className="font-mono text-[0.55rem] uppercase tracking-widest text-ink">9 (Ternary)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-[0.55rem] uppercase tracking-widest text-ink-light">Complexity</span>
                <span className="font-mono text-[0.55rem] uppercase tracking-widest text-ink">Emergent</span>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-ink/10">
              <div className="font-mono text-[0.54rem] tracking-[0.2em] uppercase text-red-accent font-bold mb-4">The Formula</div>
              <div className="flex items-center justify-between font-mono text-[1.5rem] text-ink">
                <div className="flex flex-col items-center">
                  <span className="text-[0.5rem] text-ink-light mb-1 uppercase tracking-widest">Body</span>
                  H
                </div>
                <span className="text-red-accent text-sm">+</span>
                <div className="flex flex-col items-center">
                  <span className="text-[0.5rem] text-ink-light mb-1 uppercase tracking-widest">Mind</span>
                  S
                </div>
                <span className="text-red-accent text-sm">→</span>
                <div className="flex flex-col items-center">
                  <span className="text-[0.5rem] text-red-accent mb-1 uppercase tracking-widest">Soul</span>
                  K
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

const Chapters = ({ onSelectChapter }: { onSelectChapter: (ch: Chapter) => void }) => (
  <section id="chapters" className="px-10 py-14 border-b border-ink">
    <div className="max-w-[1100px] mx-auto">
      <motion.div {...fadeIn} className="section-divider border-ink">
        <div>
          <span className="section-label text-red-accent font-medium">The Book</span>
          <div className="section-head">3⁴ Voices. One Pattern.</div>
        </div>
        <span className="section-sub">9(+1) CHAPTERS</span>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 border border-ink bg-ink/5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(230,0,0,1)] transition-all duration-500">
        {CHAPTERS.map((ch, i) => (
          <motion.div 
            key={ch.num} 
            {...fadeIn}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelectChapter(ch)}
            className="p-3.5 px-5 border-b border-r border-ink hover:bg-red-accent hover:text-white transition-colors flex gap-4.5 items-baseline last:border-b-0 md:[&:nth-child(2n)]:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0 group cursor-pointer"
          >
            <div className="font-mono text-[0.54rem] tracking-[0.14em] uppercase text-ink-light group-hover:text-white/70 whitespace-nowrap shrink-0">{ch.num}</div>
            <div>
              <div className="font-mono text-[0.7rem] font-medium tracking-[0.06em] text-ink group-hover:text-white">{ch.title}</div>
              <div className="font-mono text-[0.54rem] tracking-[0.08em] text-ink-light group-hover:text-white/70 mt-0.5">{ch.sub}</div>
            </div>
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
          className="fixed inset-0 z-[100] bg-paper overflow-y-auto p-10 md:p-20"
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

interface Person {
  name: string;
  alias: string;
  badges: string[];
  bio?: string;
  contributions?: string[];
  quote?: string;
}

const WANTED_LIST: Person[] = [
  // Ch. 01 — The Coordination Intelligence Revolution
  { name: "Dr. Paul Pangaro", alias: "The Conversation Theorist", badges: ["Ch. 01", "Academic"] },
  { name: "Dr. N. Katherine Hayles", alias: "The Posthuman Reader", badges: ["Ch. 01", "Academic"] },
  { name: "Donella Meadows", alias: "The Leverage Point", badges: ["Ch. 01", "Academic"] },
  { name: "Stewart Brand", alias: "The Whole Earth Signal", badges: ["Ch. 01", "Practitioner"] },
  { name: "Kevin Kelly", alias: "The Technium Scribe", badges: ["Ch. 01", "Practitioner"] },
  { name: "Yann Minh", alias: "The Noonaut", badges: ["Ch. 01", "Practitioner"] },
  { name: "Terence McKenna", alias: "The Stoned Ape", badges: ["Ch. 01", "Visionary"] },
  { name: "Phillip Deere", alias: "Lakota Elder · Keeper of Relations", badges: ["Ch. 01", "Visionary"] },
  { name: "Daniel Schmachtenberger", alias: "The Generator Function", badges: ["Ch. 01", "Visionary"] },
  // Ch. 02 — The Dawn of Systems Intelligence
  {
    name: "Dr. Judea Pearl",
    alias: "The Causation Architect",
    badges: ["Ch. 02", "Academic"],
    bio: "Pioneer of Bayesian networks and the probabilistic approach to AI. His work on causal inference — the ladder of causation — reframed how we understand the 'Why' behind the data.",
    contributions: [
      "The Book of Why",
      "Probabilistic Reasoning in Intelligent Systems",
      "Causality: Models, Reasoning, and Inference"
    ],
    quote: "You cannot answer a question that you cannot ask, and you cannot ask a question that you have no words for."
  },
  { name: "Claude Shannon", alias: "The Information Theorist", badges: ["Ch. 02", "Academic"] },
  { name: "Alan Turing", alias: "The Imitation Game", badges: ["Ch. 02", "Academic"] },
  { name: "Dr. Hartmut Neven", alias: "The Quantum AI Lab", badges: ["Ch. 02", "Practitioner"] },
  { name: "Former NSA Technical Director", alias: "Anonymous — The Signals Intercept", badges: ["Ch. 02", "Practitioner"] },
  { name: "Palmer Luckey", alias: "The Defense Primitive", badges: ["Ch. 02", "Practitioner"] },
  { name: "Mo Gawdat", alias: "The Solve for Happy", badges: ["Ch. 02", "Visionary"] },
  { name: "Hunbatz Men", alias: "Maya Daykeeper", badges: ["Ch. 02", "Visionary"] },
  { name: "Ruqian Lu", alias: "The Knowware Principle", badges: ["Ch. 02", "Visionary"] },
  // Ch. 03 — Architecture of Systems Intelligence
  { name: "Yann LeCun", alias: "The Convolutional Prophet", badges: ["Ch. 03", "Academic"] },
  { name: "Richard Feynman", alias: "The Path Integral", badges: ["Ch. 03", "Academic"] },
  { name: "James Gosling", alias: "The Java Father", badges: ["Ch. 03", "Academic"] },
  { name: "Dario Amodei", alias: "The Constitutional Architect", badges: ["Ch. 03", "Practitioner"] },
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
  { name: "Norbert Wiener", alias: "The Cybernetic Warning", badges: ["Ch. 06", "Practitioner"] },
  { name: "Margaret Mitchell", alias: "The Model Card", badges: ["Ch. 06", "Practitioner"] },
  { name: "In-Q-Tel Operator", alias: "Anonymous — The Strategic Invest", badges: ["Ch. 06", "Practitioner"] },
  { name: "Sir Roger Penrose", alias: "The Orch-OR", badges: ["Ch. 06", "Visionary"] },
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
  { name: "Srinivasa Ramanujan", alias: "The Namagiri Download", badges: ["Ch. 08", "Visionary"] },
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

const PersonDetail = ({ person, onBack }: { person: Person, onBack: () => void }) => {
  const [tipForm, setTipForm] = useState({ name: '', contact: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTipLine, setShowTipLine] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitTip = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setTipForm({ name: '', contact: '', message: '' });
  };

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
              <div className="font-mono text-[0.78rem] font-medium tracking-[0.18em] uppercase text-ink">{person.name}</div>
              <div className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-red-accent mt-px">{person.alias}</div>
            </div>
          </div>
          <div className="flex gap-2">
            {person.badges.map(b => (
              <span key={b} className="font-mono text-[0.48rem] tracking-[0.1em] uppercase border border-ink/20 px-1.5 py-0.5 text-ink-mid">
                {b}
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className="px-10 py-14">
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="aspect-[3/4] bg-paper-dark border border-ink relative overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none select-none">
                  <div className="font-mono text-8xl font-bold rotate-12 scale-150">WANTED</div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-24 h-40 bg-black rounded-t-[50%] rounded-b-[40%] opacity-30 blur-[10px]"></div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-red-accent text-white font-mono text-[0.5rem] tracking-[0.2em] uppercase px-3 py-1 text-center">
                  At Large
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-ink-light border-b border-ink/10 pb-1">Status</div>
                  <div className="font-mono text-[0.7rem] text-ink">Unclaimed Variable</div>
                  
                  <div className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-ink-light border-b border-ink/10 pb-1">Last Seen</div>
                  <div className="font-mono text-[0.7rem] text-ink">{person.badges[0] || "Unclaimed"} · {person.badges[1] || "Voice"}</div>
                </div>

                <div className="pt-4 space-y-3">
                  <button 
                    onClick={() => alert("Self-surrender protocol initiated. Please report to the nearest Knowware terminal for reward processing.")}
                    className="w-full bg-red-accent text-white font-mono text-[0.6rem] tracking-[0.2em] uppercase py-3 hover:bg-ink transition-colors flex items-center justify-center gap-2"
                  >
                    <ShieldCheck size={14} /> Turn Yourself In
                  </button>
                  <p className="font-mono text-[0.45rem] text-ink-light text-center leading-tight">
                    ARE YOU THE PERP? CLAIM YOUR REWARD BY AUTHENTICATING YOUR IDENTITY.
                  </p>
                </div>

                <div className="pt-6 space-y-4">
                  <div className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-ink-light border-b border-ink/10 pb-1">Share Poster</div>
                  <div className="flex gap-2">
                    <button onClick={handleCopyLink} className="p-2 border border-ink/10 hover:border-red-accent hover:text-red-accent transition-all rounded-sm" title="Copy Link">
                      {copied ? <span className="font-mono text-[0.5rem]">COPIED</span> : <Link size={14} />}
                    </button>
                    <button className="p-2 border border-ink/10 hover:border-red-accent hover:text-red-accent transition-all rounded-sm" title="Share on X">
                      <Twitter size={14} />
                    </button>
                    <button className="p-2 border border-ink/10 hover:border-red-accent hover:text-red-accent transition-all rounded-sm" title="Share on LinkedIn">
                      <Linkedin size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <h1 className="font-serif text-[3rem] leading-none text-ink italic">{person.name}</h1>
                <p className="font-mono text-[0.8rem] tracking-[0.05em] text-ink-mid leading-relaxed">
                  {person.bio || "No detailed dossier available for this entity. Full synthesized interview lives in the book repo — 42+ minutes, 5,000–8,500 words."}
                </p>
              </div>

              {person.quote && (
                <div className="border-l-2 border-red-accent pl-6 py-2">
                  <div className="font-serif text-[1.2rem] italic text-ink leading-relaxed">
                    "{person.quote}"
                  </div>
                </div>
              )}

              {person.contributions && (
                <div className="space-y-6">
                  <div className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-ink-light border-b border-ink/10 pb-2">Key Contributions</div>
                  <ul className="space-y-3">
                    {person.contributions.map((c, i) => (
                      <li key={i} className="flex items-start gap-4 group">
                        <span className="font-mono text-[0.6rem] text-red-accent mt-1">0{i+1}</span>
                        <span className="font-mono text-[0.75rem] text-ink group-hover:text-red-accent transition-colors">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-12 border-t border-ink/10 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between max-w-[500px]">
                    <div className="flex items-center gap-3">
                      <MessageSquare size={16} className="text-red-accent" />
                      <h3 className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-ink font-bold">The Tip Line</h3>
                    </div>
                    <button 
                      onClick={() => setShowTipLine(!showTipLine)}
                      className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-red-accent border-b border-red-accent/30 pb-px hover:text-ink hover:border-ink transition-all cursor-pointer"
                    >
                      {showTipLine ? "CLOSE LINE" : "DROP A DIME"}
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {showTipLine && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-6 pt-2 pb-4">
                          <p className="font-mono text-[0.6rem] text-ink-light leading-relaxed max-w-[500px]">
                            HAVE INFORMATION ON THE WHEREABOUTS OF THIS ENTITY? LEAVE A TIP. IF YOUR LEAD RESULTS IN A SUCCESSFUL CAPTURE, WE WILL MAIL YOUR REWARD.
                          </p>
                          
                          {submitted ? (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-ink text-white p-6 border border-red-accent"
                            >
                              <div className="font-mono text-[0.7rem] tracking-[0.1em] mb-2 uppercase">Tip Received.</div>
                              <div className="font-mono text-[0.55rem] text-white/70 uppercase">Our agents are investigating. Keep your eyes open.</div>
                            </motion.div>
                          ) : (
                            <form onSubmit={handleSubmitTip} className="space-y-4 max-w-[500px]">
                              <div className="grid grid-cols-2 gap-4">
                                <input 
                                  type="text" 
                                  placeholder="YOUR NAME" 
                                  required
                                  value={tipForm.name}
                                  onChange={(e) => setTipForm({...tipForm, name: e.target.value})}
                                  className="bg-paper border border-ink/20 p-3 font-mono text-[0.6rem] focus:border-red-accent outline-none transition-colors"
                                />
                                <input 
                                  type="text" 
                                  placeholder="EMAIL / PHONE" 
                                  required
                                  value={tipForm.contact}
                                  onChange={(e) => setTipForm({...tipForm, contact: e.target.value})}
                                  className="bg-paper border border-ink/20 p-3 font-mono text-[0.6rem] focus:border-red-accent outline-none transition-colors"
                                />
                              </div>
                              <textarea 
                                placeholder="LEAVE YOUR INTRODUCTION OR TIP HERE..." 
                                rows={4}
                                required
                                value={tipForm.message}
                                onChange={(e) => setTipForm({...tipForm, message: e.target.value})}
                                className="w-full bg-paper border border-ink/20 p-3 font-mono text-[0.6rem] focus:border-red-accent outline-none transition-colors resize-none"
                              />
                              <button 
                                type="submit"
                                className="bg-ink text-white font-mono text-[0.6rem] tracking-[0.2em] uppercase px-8 py-3 hover:bg-red-accent transition-colors"
                              >
                                Submit Tip
                              </button>
                            </form>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-8 border-t border-ink/5">
                  <button 
                    onClick={onBack}
                    className="group flex items-center gap-3 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-ink-light hover:text-red-accent transition-colors"
                  >
                    <ArrowRight size={12} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                    Return to Directory
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

const ChapterPage = ({ chapter, onBack }: { chapter: Chapter, onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nextChapter = CHAPTERS.find(c => parseInt(c.num.split(' ')[1]) === parseInt(chapter.num.split(' ')[1]) + 1);

  return (
    <div className="min-h-screen bg-paper selection:bg-red-accent selection:text-white">
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
              <div className="font-mono text-[0.78rem] font-medium tracking-[0.18em] uppercase text-ink">{chapter.num}</div>
              <div className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-red-accent mt-px">{chapter.title}</div>
            </div>
          </div>
          <div className="font-mono text-[0.56rem] tracking-[0.18em] uppercase text-ink-light hidden md:block">
            Systems of Intelligence · Vol. I
          </div>
        </div>
      </header>

      <main className="px-10 py-14 md:py-24">
        <div className="max-w-[900px] mx-auto space-y-20 md:space-y-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-red-accent font-bold">Abstract</span>
              <div className="h-px flex-1 bg-ink/10"></div>
            </div>
            <h1 className="font-serif text-[clamp(2.8rem,7vw,5rem)] leading-[0.95] italic text-ink tracking-tight">{chapter.title}</h1>
            <p className="font-serif italic text-[1.4rem] md:text-[1.8rem] text-ink-mid leading-relaxed max-w-[800px] border-l-4 border-red-accent pl-8 py-2">
              {chapter.content}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-ink/10 pt-16">
            {Object.entries(chapter.triads).map(([type, voices], i) => (
              <motion.div 
                key={type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 + 0.4 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <div className="font-mono text-[0.5rem] tracking-[0.25em] uppercase text-red-accent font-bold">
                    Triad {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="font-mono text-[0.8rem] tracking-[0.1em] uppercase text-ink border-b border-ink/10 pb-2">
                    {type}
                  </div>
                </div>
                <ul className="space-y-6">
                  {voices.map((voice, j) => (
                    <li key={j} className="group cursor-default">
                      <div className="font-mono text-[0.85rem] font-medium text-ink group-hover:text-red-accent transition-colors">
                        {voice}
                      </div>
                      <div className="font-mono text-[0.45rem] tracking-[0.15em] uppercase text-ink-light mt-1.5 flex items-center gap-2">
                        <span className="w-1 h-1 bg-red-accent rounded-full"></span>
                        Voice {i * 3 + j + 1} of 81
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-ink text-white p-12 md:p-20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 space-y-10">
              <div className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-red-accent font-bold">The Synthesis</div>
              <div className="font-serif text-[1.6rem] md:text-[2.2rem] italic text-white/90 leading-[1.3]">
                "The coordination of these nine voices creates a resonance that transcends the individual contributions. In {chapter.num}, we see the pattern of intelligence emerging from the noise of raw data."
              </div>
              <div className="flex flex-wrap gap-4 pt-6">
                {(() => {
                  const chNum = chapter.num.split(' ')[1];
                  const chSlug = chNum === "10" ? "chX" : `ch${chNum}`;
                  return (
                    <>
                      <a
                        href={`https://github.com/iamkhayyam/systemsofintelligence-book/tree/main/chapters/${chSlug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-accent text-white font-mono text-[0.65rem] tracking-[0.2em] uppercase px-8 py-4 hover:bg-white hover:text-ink transition-all flex items-center gap-3 group"
                      >
                        Read Full Chapter <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                      <a
                        href={`https://github.com/iamkhayyam/systemsofintelligence-book/tree/main/chapters/${chSlug}/interviews`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-white/20 text-white font-mono text-[0.65rem] tracking-[0.2em] uppercase px-8 py-4 hover:border-red-accent hover:text-red-accent transition-all"
                      >
                        9 Interviews
                      </a>
                    </>
                  );
                })()}
              </div>
            </div>
          </motion.div>

          <div className="pt-20 border-t border-ink/10 flex flex-col md:flex-row justify-between items-center gap-12">
            <button 
              onClick={onBack}
              className="group flex items-center gap-4 font-mono text-[0.65rem] tracking-[0.25em] uppercase text-ink-light hover:text-red-accent transition-colors"
            >
              <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-2 transition-transform" />
              Return to Chapters
            </button>

            {nextChapter && (
              <button 
                onClick={() => {
                  window.scrollTo(0, 0);
                  onBack(); // This is a bit hacky, but since we are using state-based navigation, we need to update the selected chapter
                  // Wait, I should probably pass a function to ChapterPage to change the chapter directly
                }}
                className="group text-right"
              >
                <div className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-ink-light mb-2">Next Chapter</div>
                <div className="flex items-center gap-4 font-mono text-[0.75rem] tracking-[0.1em] uppercase text-ink group-hover:text-red-accent transition-colors">
                  {nextChapter.num}: {nextChapter.title} <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const GitHubSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".github-stat", {
        opacity: 0,
        y: 15,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#github",
          start: "top 85%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="github" ref={containerRef} className="px-10 py-14 border-b border-ink bg-black">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <motion.div {...fadeIn}>
          <h2 className="font-mono text-[0.9rem] font-medium tracking-[0.14em] uppercase text-white mb-3.5 flex items-center gap-2">
            <Github size={16} className="text-red-accent" /> The Interviews Live Here
          </h2>
          <p className="font-sans font-light text-[0.8rem] text-white/55 leading-relaxed mb-5.5">
            The full transcripts don't fit in the book. They live on GitHub — 3⁴ interviews, open to the public, correctable by the people who gave them. Every commit is coordination. Every PR is the third body.
          </p>
          <div className="flex gap-2.5">
            <a href="https://github.com/iamkhayyam/systemsofintelligence-book" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-mono text-[0.58rem] tracking-[0.14em] uppercase text-white bg-red-accent px-4.5 py-2.5 hover:bg-red-accent/80 transition-colors">
              <Star size={12} className="fill-current" /> Star on GitHub
            </a>
            <a href="https://github.com/iamkhayyam/systemsofintelligence-book" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.58rem] tracking-[0.14em] uppercase text-white border border-white/20 px-4.5 py-2.5 hover:border-red-accent hover:text-red-accent transition-colors">View Repository</a>
          </div>
        </motion.div>
        <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="border border-white/10 p-6 bg-zinc-900">
          <div className="font-mono text-[0.54rem] tracking-[0.14em] text-white/30 uppercase mb-1">github.com / iamkhayyam /</div>
          <div className="font-mono text-[0.88rem] font-medium tracking-[0.08em] text-white mb-2.5">systemsofintelligence-book</div>
          <p className="font-sans font-light text-[0.72rem] text-white/40 leading-relaxed">
            The third body between hardware and software. Binary is confinary. There's always a middle out inside.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-6 pt-6 border-t border-white/10">
            {[
              { val: "57", label: "Commits", color: "text-red-accent" },
              { val: "3⁴", label: "Interviews", sub: "81" },
              { val: "0", label: "Stars", color: "text-white" },
              { val: "0", label: "Forks" },
              { val: "3⁴", label: "Voices", sub: "81" },
              { val: "Active", label: "Status", color: "text-green-accent" }
            ].map((s, i) => (
              <div key={i} className="flex flex-col github-stat">
                <div className={`font-mono text-[1.1rem] font-medium leading-none tracking-tight ${s.color || 'text-white'}`}>
                  {s.val}
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

const Manifesto = ({ onViewFull }: { onViewFull: () => void }) => (
  <section id="manifesto" className="px-10 py-18 border-b border-ink relative overflow-hidden">
    {/* Moving Prison Bars Shadow Effect */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div 
        animate={{ 
          x: ["-20%", "20%"],
          rotate: [-3, 3]
        }}
        transition={{ 
          duration: 90, 
          repeat: Infinity, 
          repeatType: "mirror", 
          ease: "linear" 
        }}
        className="flex justify-around w-[250%] h-[500%] -ml-[75%] -mt-[100%] opacity-[0.25] skew-x-[-15deg]"
      >
        {[...Array(36)].map((_, i) => (
          <div 
            key={i} 
            className="w-4 h-full bg-black"
            style={{ 
              filter: 'blur(4px)',
              boxShadow: '4px 0 12px rgba(0,0,0,0.4)'
            }}
          />
        ))}
      </motion.div>
    </div>

    <div className="max-w-[1100px] mx-auto relative z-10">
      <motion.span {...fadeIn} className="section-label text-red-accent font-medium">The Manifesto</motion.span>
      <motion.h2 {...fadeIn} className="font-mono text-[clamp(1.8rem,4vw,3rem)] font-medium tracking-[0.06em] uppercase leading-[1.1] text-ink mb-9">
        Binary is <em className="not-italic text-red-accent">Confinary.</em>
      </motion.h2>
      <motion.div {...fadeIn} className="flex items-end gap-3.5 mb-7.5 pb-7.5 border-b border-ink">
        <div className="ternary-item">
          <div className="font-mono text-[1.2rem] font-medium tracking-[0.08em] uppercase text-ink">Hardware</div>
          <div className="font-mono text-[0.5rem] tracking-[0.18em] uppercase text-ink-light mt-1">the substrate</div>
        </div>
        <div className="font-mono text-[1rem] text-red-accent pb-1.5 px-1">×</div>
        <div className="ternary-item">
          <div className="font-mono text-[1.2rem] font-medium tracking-[0.08em] uppercase text-ink">Software</div>
          <div className="font-mono text-[0.5rem] tracking-[0.18em] uppercase text-ink-light mt-1">the pattern</div>
        </div>
        <div className="font-mono text-[1rem] text-red-accent pb-1.5 px-1">=</div>
        <div className="ternary-item">
          <div className="font-mono text-[1.2rem] font-medium tracking-[0.08em] uppercase text-ink">Knowware</div>
          <div className="font-mono text-[0.5rem] tracking-[0.18em] uppercase text-ink-light mt-1">the emergence</div>
        </div>
      </motion.div>
      <motion.p {...fadeIn} className="font-sans font-light text-[0.88rem] text-ink-mid leading-[1.85] max-w-[580px] mb-6">
        The universe operates in threes. 600 million years of ternary biology can't be wrong. Every system that confines you to two choices is lying. Every institution that demands you pick a side is extracting. 
        It's the Binary Trap. It's the need to look beyond "us vs. them" or "true/false" scenarios to acknowledge a wider spectrum of possibilities. There's always a third way, a middle out, inside.
      </motion.p>
      <motion.button 
        {...fadeIn} 
        onClick={onViewFull}
        className="font-mono text-[0.58rem] tracking-[0.14em] uppercase text-ink border-b border-ink pb-px hover:text-red-accent hover:border-red-accent transition-colors inline-flex items-center gap-2"
      >
        Read the Full Manifesto <ArrowRight size={10} className="text-red-accent" />
      </motion.button>
    </div>
  </section>
);

const ManifestoPage = ({ onBack }: { onBack: () => void }) => {
  const isPresent = useIsPresent();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-paper relative overflow-hidden">
      {/* Moving Prison Bars Shadow Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ 
            x: ["-20%", "20%"],
            rotate: [-3, 3]
          }}
          transition={{ 
            duration: 120, 
            repeat: Infinity, 
            repeatType: "mirror", 
            ease: "linear" 
          }}
          className="flex justify-around w-[250vw] h-[250vh] -ml-[75vw] -mt-[75vh] opacity-[0.22] skew-x-[-18deg]"
        >
          {[...Array(40)].map((_, i) => (
            <motion.div 
              key={i} 
              initial={{ scaleY: 1 }}
              animate={!isPresent ? { scaleY: 1.5, opacity: 0, filter: "blur(20px)" } : { scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: i * 0.01 }}
              className="w-4 h-full bg-black"
              style={{ 
                filter: 'blur(6px)',
                boxShadow: '6px 0 18px rgba(0,0,0,0.4)'
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Surface Shutter Overlay */}
      <AnimatePresence>
        {!isPresent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[600] pointer-events-none flex"
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ 
                  duration: 0.4, 
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.02 
                }}
                className="flex-1 bg-ink origin-top"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

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

export default function App() {
  const [view, setView] = useState<'main' | 'wanted' | 'person' | 'manifesto' | 'chapter'>('main');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  // Lock body scroll when sub-pages are open
  useEffect(() => {
    if (view !== 'main') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [view]);

  const handleSelectPerson = (person: Person) => {
    setSelectedPerson(person);
    setView('person');
  };

  const handleSelectChapter = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setView('chapter');
  };

  return (
    <div className="min-h-screen relative bg-paper overflow-x-hidden">
      <Header onViewWanted={() => setView('wanted')} />
      <motion.main
        animate={{ 
          scale: view === 'main' ? 1 : 0.98,
          opacity: view === 'main' ? 1 : 0.5,
          filter: view === 'main' ? "blur(0px)" : "blur(4px)"
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Masthead />
        <Pillars />
        <TheSimpleTruth />
        <Chapters onSelectChapter={handleSelectChapter} />
        <SacredGeometry onSelectChapter={handleSelectChapter} />
        <Wanted onViewAll={() => setView('wanted')} onSelectPerson={handleSelectPerson} />
        <GitHubSection />
        <Manifesto onViewFull={() => setView('manifesto')} />
      </motion.main>
      <Footer />

      <AnimatePresence>
        {view === 'wanted' && (
          <motion.div
            key="wanted"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-paper overflow-y-auto"
          >
            <WantedPage onBack={() => setView('main')} onSelectPerson={handleSelectPerson} />
          </motion.div>
        )}

        {view === 'person' && selectedPerson && (
          <motion.div
            key="person"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] bg-paper overflow-y-auto"
          >
            <PersonDetail 
              person={selectedPerson} 
              onBack={() => setView(selectedPerson.name.startsWith('Entity') ? 'wanted' : 'main')} 
            />
          </motion.div>
        )}

        {view === 'manifesto' && (
          <motion.div
            key="manifesto"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ 
              opacity: 0, 
              scale: 1.05, 
              y: -50,
              filter: "blur(10px)",
              transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[300] bg-paper overflow-y-auto"
          >
            <ManifestoPage onBack={() => setView('main')} />
          </motion.div>
        )}

        {view === 'chapter' && selectedChapter && (
          <motion.div
            key="chapter"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[400] bg-paper overflow-y-auto"
          >
            <ChapterPage 
              chapter={selectedChapter} 
              onBack={() => setView('main')} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
