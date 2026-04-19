import { useEffect } from "react";
import { motion } from "motion/react";
import { X, ArrowRight, ExternalLink, BookOpen, Network } from "lucide-react";
import { Chapter, Person } from "../types";
import { CHAPTERS } from "../chapters";

/**
 * Detailed chapter spread.
 *
 * Bands (top → bottom):
 *   1. Sticky header (part label · chapter number · title)
 *   2. Hero (number, title, sub, abstract pull-quote, vital stats strip)
 *   3. Opening Vignette — full-bleed, paper-mid bg, year stamp
 *   4. Three-Body System — full-bleed dark band with big triad
 *   5. Nine Voices — constrained, triad grid, clickable names resolve to dossiers
 *   6. Synthesis — ink-black band with key insight + deep-link CTAs
 *   7. Prev / Next — constrained nav
 *
 * Breakpoints mirror the dossier: default / sm / md / lg / xl.
 */
export default function ChapterPage({
  chapter,
  onBack,
  onSelectPerson,
  onSelectChapter,
  people,
}: {
  chapter: Chapter;
  onBack: () => void;
  onSelectPerson: (person: Person) => void;
  onSelectChapter: (chapter: Chapter) => void;
  people: Person[];
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const chNum = chapter.num.split(" ")[1];
  const chSlug = chNum === "10" ? "chX" : `ch${chNum}`;
  const idx = CHAPTERS.findIndex((c) => c.num === chapter.num);
  const prev = idx > 0 ? CHAPTERS[idx - 1] : undefined;
  const next = idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : undefined;
  const isCapstone = chapter.num === "Ch. 10";

  // Resolve a voice label to a Person; fires the dossier view if found.
  const tryOpenVoice = (voice: string) => {
    const match = people.find((p) => p.name === voice);
    if (match) onSelectPerson(match);
  };

  const triadLabels: ("Academic" | "Practitioner" | "Visionary")[] = [
    "Academic",
    "Practitioner",
    "Visionary",
  ];

  const voiceLists = [
    chapter.triads.academic,
    chapter.triads.practitioner,
    chapter.triads.visionary,
  ];

  return (
    <div className="min-h-screen bg-paper selection:bg-red-accent selection:text-white">
      {/* ====== STICKY FILE HEADER ====== */}
      <header className="border-b border-ink bg-paper sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button
              onClick={onBack}
              className="p-2 hover:bg-black/5 rounded-full transition-colors shrink-0"
              aria-label="Close chapter"
            >
              <X size={20} className="text-ink" />
            </button>
            <div className="min-w-0 overflow-hidden">
              <div className="font-mono text-[0.6rem] sm:text-[0.72rem] font-medium tracking-[0.18em] uppercase text-ink truncate">
                {chapter.num}
              </div>
              <div className="font-mono text-[0.46rem] sm:text-[0.5rem] tracking-[0.2em] uppercase text-red-accent mt-px truncate">
                {chapter.title}
              </div>
            </div>
          </div>
          <div className="font-mono text-[0.52rem] sm:text-[0.56rem] tracking-[0.18em] uppercase text-ink-light hidden md:block">
            Systems of Intelligence · Vol. I
          </div>
        </div>
      </header>

      {/* ====== HERO BAND — constrained ====== */}
      <section className="px-4 sm:px-6 lg:px-10 pt-12 sm:pt-16 lg:pt-20 pb-12">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Part label */}
            {chapter.part && (
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <span className="font-mono text-[0.5rem] tracking-[0.3em] uppercase text-red-accent font-medium">
                  {chapter.part}
                </span>
                <div className="h-px flex-1 bg-ink/15" />
              </div>
            )}

            {/* Chapter number — huge */}
            <div className="flex items-start justify-between gap-6 flex-wrap mb-5">
              <div className="font-mono text-[clamp(3rem,9vw,7rem)] font-medium leading-none text-ink tracking-[-0.02em] tabular-nums">
                {chNum}
              </div>
              <div className="flex items-center gap-2 pt-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-accent" />
                </span>
                <span className="font-mono text-[0.5rem] tracking-[0.22em] uppercase text-ink-light">
                  In Progress · Draft
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-serif text-[clamp(2.2rem,6vw,5rem)] leading-[0.95] italic text-ink tracking-tight mb-5">
              {chapter.title}
            </h1>

            {/* Sub */}
            <div className="font-mono text-[0.62rem] sm:text-[0.7rem] tracking-[0.22em] uppercase text-ink-light mb-10">
              {chapter.sub}
            </div>

            {/* Abstract */}
            <p className="font-serif italic text-[1.2rem] sm:text-[1.45rem] lg:text-[1.65rem] text-ink-mid leading-[1.45] max-w-[860px] border-l-4 border-red-accent pl-6 sm:pl-8 py-2">
              {chapter.content}
            </p>

            {/* Vital stats strip */}
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 mt-12 pt-6 border-t border-ink/15">
              {[
                ["Voices", isCapstone ? "81 — all" : "9"],
                ["Triads", isCapstone ? "3 × 3 × 3" : "3"],
                ["Avg. interview", "42+ min"],
                ["Chapter slug", chSlug],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1">
                  <dt className="font-mono text-[0.46rem] tracking-[0.22em] uppercase text-ink-light">
                    {k}
                  </dt>
                  <dd className="font-mono text-[0.82rem] sm:text-[0.88rem] text-ink tabular-nums">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </section>

      {/* ====== OPENING VIGNETTE — FULL BLEED ====== */}
      {chapter.vignette && (
        <section className="border-y border-ink bg-paper-mid py-14 sm:py-20 lg:py-24 relative overflow-hidden">
          <div className="absolute -left-6 -top-6 pointer-events-none select-none font-mono text-[10rem] sm:text-[14rem] lg:text-[18rem] leading-none text-ink/[0.04]">
            {chapter.vignette.year.replace(/[^0-9]/g, "").slice(0, 4) || "—"}
          </div>
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative">
            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6 }}
                className="space-y-3"
              >
                <div className="font-mono text-[0.5rem] tracking-[0.28em] uppercase text-red-accent font-medium">
                  Opening Scene —
                </div>
                <div className="font-mono text-[0.85rem] tracking-[0.06em] uppercase text-ink leading-snug">
                  {chapter.vignette.year}
                </div>
                <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-ink-light leading-snug">
                  {chapter.vignette.location}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="space-y-6"
              >
                <h2 className="font-serif italic text-[clamp(1.6rem,4vw,3rem)] leading-[1.1] text-ink">
                  {chapter.vignette.title}
                </h2>
                <p className="font-sans font-light text-[1rem] sm:text-[1.1rem] text-ink-mid leading-[1.8] max-w-[720px]">
                  {chapter.vignette.body}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ====== THE THREE-BODY SYSTEM — FULL BLEED, INK BG ====== */}
      {chapter.keyTriad && (
        <section className="bg-ink text-paper py-14 sm:py-20 lg:py-24 relative overflow-hidden">
          <div className="absolute -right-20 top-0 bottom-0 pointer-events-none select-none opacity-10">
            <div className="font-mono text-[14rem] lg:text-[20rem] leading-none text-white">3⁴</div>
          </div>
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-10 pb-5 border-b border-white/15">
              <div>
                <div className="font-mono text-[0.5rem] tracking-[0.28em] uppercase text-red-accent font-medium mb-2">
                  The Three-Body System —
                </div>
                <div className="font-mono text-[1rem] sm:text-[1.1rem] lg:text-[1.25rem] tracking-[0.06em] uppercase text-white leading-none">
                  What This Chapter Coordinates
                </div>
              </div>
              <div className="font-mono text-[0.5rem] tracking-[0.22em] uppercase text-white/40">
                A ↔ B ↔ C → emergence
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 md:gap-4 items-center mb-10">
              {[chapter.keyTriad.a, chapter.keyTriad.b, chapter.keyTriad.c].map((body, i) => (
                <div key={i} className="contents">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="border border-white/15 p-6 sm:p-8 bg-white/[0.02]"
                  >
                    <div className="font-mono text-[0.48rem] tracking-[0.28em] uppercase text-red-accent mb-3">
                      Body 0{i + 1}
                    </div>
                    <div className="font-mono text-[1rem] sm:text-[1.2rem] lg:text-[1.35rem] text-white leading-[1.15] tracking-[0.02em]">
                      {body}
                    </div>
                  </motion.div>
                  {i < 2 && (
                    <div className="flex items-center justify-center text-red-accent font-mono text-[1.4rem]">
                      ↔
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="border border-red-accent/40 p-6 sm:p-8 bg-red-accent/[0.05]">
              <div className="font-mono text-[0.5rem] tracking-[0.28em] uppercase text-red-accent font-medium mb-3">
                What Emerges —
              </div>
              <div className="font-serif italic text-[1.2rem] sm:text-[1.4rem] text-white leading-[1.4]">
                {chapter.keyTriad.emerges}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ====== 9 VOICES — constrained, clickable ====== */}
      <section className="px-4 sm:px-6 lg:px-10 py-14 sm:py-20 lg:py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-10 pb-5 border-b border-ink/20">
            <div>
              <div className="font-mono text-[0.5rem] tracking-[0.28em] uppercase text-red-accent font-medium mb-2">
                {isCapstone ? "Synthesis —" : "9 Voices in Coordination —"}
              </div>
              <div className="font-mono text-[1rem] sm:text-[1.1rem] lg:text-[1.25rem] tracking-[0.06em] uppercase text-ink leading-none">
                {isCapstone ? "All 81 Converge" : "Three Triads · Three Perspectives"}
              </div>
            </div>
            <div className="font-mono text-[0.5rem] tracking-[0.22em] uppercase text-ink-light">
              Click to open dossier
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {triadLabels.map((label, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="space-y-6"
              >
                <div className="space-y-2 pb-3 border-b border-ink/15">
                  <div className="font-mono text-[0.5rem] tracking-[0.28em] uppercase text-red-accent font-bold">
                    Triad 0{i + 1}
                  </div>
                  <div className="font-mono text-[0.85rem] tracking-[0.1em] uppercase text-ink">
                    {label}
                  </div>
                </div>
                <ul className="space-y-4 sm:space-y-5">
                  {voiceLists[i].map((voice, j) => {
                    const person = people.find((p) => p.name === voice);
                    const clickable = !!person;
                    const voiceIdx = i * 3 + j + 1;
                    return (
                      <li
                        key={j}
                        role={clickable ? "button" : undefined}
                        tabIndex={clickable ? 0 : undefined}
                        onClick={() => clickable && tryOpenVoice(voice)}
                        onKeyDown={(e) => {
                          if (clickable && (e.key === "Enter" || e.key === " ")) {
                            e.preventDefault();
                            tryOpenVoice(voice);
                          }
                        }}
                        data-cursor={clickable ? "Dossier" : undefined}
                        className={`group border-l-2 border-transparent pl-4 -ml-4 ${
                          clickable
                            ? "cursor-pointer hover:border-red-accent transition-colors"
                            : "cursor-default"
                        }`}
                      >
                        <div className="flex items-baseline gap-3">
                          <span className="font-mono text-[0.48rem] tracking-[0.2em] uppercase text-ink-light tabular-nums shrink-0 w-5">
                            {String(voiceIdx).padStart(2, "0")}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div
                              className={`font-mono text-[0.85rem] sm:text-[0.92rem] font-medium leading-snug ${
                                clickable
                                  ? "text-ink group-hover:text-red-accent transition-colors"
                                  : "text-ink-light"
                              }`}
                            >
                              {voice}
                            </div>
                            {person?.alias && (
                              <div className="font-mono text-[0.54rem] tracking-[0.1em] text-ink-light mt-1 leading-snug">
                                "{person.alias}"
                              </div>
                            )}
                            {!isCapstone && (
                              <div className="font-mono text-[0.44rem] tracking-[0.18em] uppercase text-ink-light/60 mt-2 flex items-center gap-2">
                                <span
                                  className={`w-1 h-1 rounded-full ${
                                    clickable ? "bg-red-accent" : "bg-ink-light/40"
                                  }`}
                                />
                                Voice {voiceIdx} of 81
                                {clickable && (
                                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-red-accent">
                                    Open dossier →
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SYNTHESIS + CTAs — FULL BLEED DARK BAND ====== */}
      <section className="bg-ink text-paper py-14 sm:py-20 lg:py-24 relative overflow-hidden border-y border-ink">
        <div className="absolute top-0 right-0 w-[32rem] h-[32rem] bg-red-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 relative">
          <div className="font-mono text-[0.5rem] tracking-[0.3em] uppercase text-red-accent font-bold mb-6">
            The Synthesis
          </div>
          {chapter.keyInsight && (
            <blockquote className="font-serif italic text-[1.45rem] sm:text-[1.8rem] lg:text-[2.2rem] text-white/90 leading-[1.3] max-w-[900px] mb-12">
              "{chapter.keyInsight}"
            </blockquote>
          )}

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a
              href={`https://github.com/iamkhayyam/systemsofintelligence-book/tree/main/chapters/${chSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="magnet group flex items-center gap-3 bg-red-accent text-white font-mono text-[0.58rem] sm:text-[0.62rem] tracking-[0.2em] uppercase px-6 py-4 hover:bg-white hover:text-ink transition-colors"
            >
              <BookOpen size={14} /> Read Full Chapter
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={`https://github.com/iamkhayyam/systemsofintelligence-book/tree/main/chapters/${chSlug}/interviews`}
              target="_blank"
              rel="noopener noreferrer"
              className="magnet group flex items-center gap-3 border border-white/25 text-white font-mono text-[0.58rem] sm:text-[0.62rem] tracking-[0.2em] uppercase px-6 py-4 hover:border-red-accent hover:text-red-accent transition-colors"
            >
              <ExternalLink size={14} /> {isCapstone ? "Manifesto & Notes" : "9 Interviews"}
            </a>
            <a
              href={`https://github.com/iamkhayyam/systemsofintelligence-book/tree/main/chapters/${chSlug}/diagrams`}
              target="_blank"
              rel="noopener noreferrer"
              className="magnet group flex items-center gap-3 border border-white/25 text-white font-mono text-[0.58rem] sm:text-[0.62rem] tracking-[0.2em] uppercase px-6 py-4 hover:border-red-accent hover:text-red-accent transition-colors"
            >
              <Network size={14} /> Diagrams
            </a>
          </div>
        </div>
      </section>

      {/* ====== PREV / NEXT — constrained ====== */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prev ? (
              <button
                onClick={() => onSelectChapter(prev)}
                className="group text-left border border-ink/15 p-6 hover:border-red-accent transition-colors"
              >
                <div className="flex items-center gap-3 font-mono text-[0.5rem] tracking-[0.24em] uppercase text-ink-light mb-3">
                  <ArrowRight size={10} className="rotate-180" /> Previous Chapter
                </div>
                <div className="font-mono text-[0.58rem] tracking-[0.18em] uppercase text-red-accent mb-2 tabular-nums">
                  {prev.num}
                </div>
                <div className="font-serif italic text-[1.15rem] sm:text-[1.3rem] text-ink group-hover:text-red-accent transition-colors leading-snug">
                  {prev.title}
                </div>
              </button>
            ) : (
              <div className="border border-dashed border-ink/10 p-6 flex items-center">
                <span className="font-mono text-[0.56rem] tracking-[0.2em] uppercase text-ink-light">
                  Start of book
                </span>
              </div>
            )}

            {next ? (
              <button
                onClick={() => onSelectChapter(next)}
                className="group text-right border border-ink/15 p-6 hover:border-red-accent transition-colors"
              >
                <div className="flex items-center justify-end gap-3 font-mono text-[0.5rem] tracking-[0.24em] uppercase text-ink-light mb-3">
                  Next Chapter <ArrowRight size={10} />
                </div>
                <div className="font-mono text-[0.58rem] tracking-[0.18em] uppercase text-red-accent mb-2 tabular-nums">
                  {next.num}
                </div>
                <div className="font-serif italic text-[1.15rem] sm:text-[1.3rem] text-ink group-hover:text-red-accent transition-colors leading-snug">
                  {next.title}
                </div>
              </button>
            ) : (
              <div className="border border-dashed border-ink/10 p-6 flex items-center justify-end">
                <span className="font-mono text-[0.56rem] tracking-[0.2em] uppercase text-ink-light">
                  End of book
                </span>
              </div>
            )}
          </div>

          <div className="pt-10 mt-10 border-t border-ink/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <button
              onClick={onBack}
              className="group flex items-center gap-3 font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-light hover:text-red-accent transition-colors"
            >
              <ArrowRight
                size={12}
                className="rotate-180 group-hover:-translate-x-1 transition-transform"
              />
              Return to Surface
            </button>
            <div className="font-mono text-[0.48rem] tracking-[0.22em] uppercase text-ink-light">
              End of chapter · {chSlug}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
