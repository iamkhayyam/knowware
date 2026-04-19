import { useEffect, useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Link as LinkIcon,
  Twitter,
  Linkedin,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Person } from "../types";

/**
 * Vintage dossier. Layout is section-per-band: some are constrained to a
 * content column; the "Modus Operandi" and "Documented Works" bands break
 * out to viewport edges with a wider inner max-width so the evidence of
 * a subject's work reads like a case file spread.
 *
 * Breakpoints:
 *   default  < 640px  — single column, dense
 *   sm:      ≥ 640px  — 2-col grids in modus operandi
 *   md:      ≥ 768px  — mugshot + vital stats side-by-side
 *   lg:      ≥ 1024px — 3/4/5-col grids, sidebar reappears
 *   xl:      ≥ 1280px — comfortable padding, 5-col modus
 */
export default function PersonDossier({
  person,
  onBack,
  fileNumber,
  onPrev,
  onNext,
  prevPerson,
  nextPerson,
  onViewRedThread,
}: {
  person: Person;
  onBack: () => void;
  fileNumber?: number;
  onPrev?: () => void;
  onNext?: () => void;
  prevPerson?: Person;
  nextPerson?: Person;
  onViewRedThread?: () => void;
}) {
  const [tipForm, setTipForm] = useState({ name: "", contact: "", message: "" });
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

  const handleSubmitTip = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setTipForm({ name: "", contact: "", message: "" });
  };

  const chapter = person.badges[0] || "Unclaimed";
  const role = person.badges[1] || "Voice";

  const initials = person.name
    .replace(/\(.*?\)/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const hasAnyContent = !!(
    person.bio ||
    person.whyMatters ||
    person.coldOpen ||
    (person.knownFor && person.knownFor.length) ||
    (person.works && person.works.length)
  );

  return (
    <div className="min-h-screen bg-paper">
      {/* FILE-HEADER BAR */}
      <header className="border-b border-ink bg-paper sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button
              onClick={onBack}
              className="p-2 hover:bg-black/5 rounded-full transition-colors shrink-0"
              aria-label="Close dossier"
            >
              <X size={20} className="text-ink" />
            </button>
            <div className="flex items-baseline gap-3 sm:gap-4 min-w-0 overflow-hidden">
              <div className="font-mono text-[0.54rem] tracking-[0.22em] uppercase text-red-accent font-medium shrink-0">
                Dossier
              </div>
              <div className="font-mono text-[0.54rem] tracking-[0.22em] uppercase text-ink-light shrink-0">
                File · {String(fileNumber ?? 0).padStart(2, "0")} / 81
              </div>
              <div className="font-mono text-[0.54rem] tracking-[0.22em] uppercase text-ink-light hidden md:block shrink-0">
                {chapter} · {role}
              </div>
            </div>
          </div>
          <div className="font-mono text-[0.54rem] tracking-[0.22em] uppercase text-red-accent font-medium hidden lg:block">
            Classification · Open
          </div>
        </div>
      </header>

      {/* ====== IDENTITY BAND — constrained to content column ====== */}
      <section className="px-4 sm:px-6 lg:px-10 pt-10 sm:pt-12 lg:pt-16">
        <div className="max-w-[1100px] mx-auto">
          <div className="border border-ink bg-paper relative">
            {/* Corner stamps */}
            <div className="absolute -top-3 -right-3 z-10 rotate-[7deg] bg-red-accent text-white font-mono text-[0.55rem] tracking-[0.2em] uppercase px-3 py-1 shadow">
              At Large
            </div>
            <div className="absolute top-3 left-3 font-mono text-[0.48rem] sm:text-[0.5rem] tracking-[0.2em] uppercase text-ink-light">
              Form K-{String(fileNumber ?? 0).padStart(2, "0")} · Rev. III
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] border-t border-ink mt-8 md:mt-6">
              {/* MUGSHOT */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative border-b md:border-b-0 md:border-r border-ink"
              >
                <div className="aspect-[3/4] bg-paper-dark relative overflow-hidden">
                  <div className="absolute top-0 bottom-0 right-0 w-px bg-ink/10" />
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute left-0 right-0 border-t border-ink/10"
                        style={{ top: `${(i + 1) * (100 / 7)}%` }}
                      >
                        <span className="absolute left-2 -top-2 font-mono text-[0.45rem] tracking-[0.15em] text-ink-light">
                          {(6 - i).toString().padStart(2, "0")}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
                    <div className="font-mono text-[5rem] font-bold rotate-12 scale-125">WANTED</div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-28 h-40 sm:w-32 sm:h-44 bg-black rounded-t-[50%] rounded-b-[40%] opacity-20 blur-[6px]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-serif italic text-[2.5rem] sm:text-[3rem] text-ink/80 leading-none">
                          {initials}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-ink text-paper font-mono text-[0.5rem] tracking-[0.2em] uppercase px-3 py-1.5 flex items-center justify-between">
                    <span>Case #{String(fileNumber ?? 0).padStart(3, "0")}-81</span>
                    <span className="text-red-accent">{role}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 sm:p-8 lg:p-10 flex flex-col gap-6"
              >
                <div>
                  <div className="font-mono text-[0.5rem] tracking-[0.22em] uppercase text-red-accent font-medium mb-3">
                    Subject of interest —
                  </div>
                  <h1 className="font-serif text-[clamp(2rem,5vw,3.4rem)] leading-[0.95] text-ink italic mb-3">
                    {person.name}
                  </h1>
                  <div className="font-mono text-[0.66rem] sm:text-[0.72rem] tracking-[0.14em] uppercase text-ink-light">
                    "{person.alias}"
                  </div>
                </div>

                <div className="h-px bg-ink/10" />

                <dl className="grid grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-4">
                  {[
                    ["Chapter", chapter],
                    ["Role", role],
                    ["Status", person.status || "Unclaimed Variable"],
                    ["Active", person.active || "—"],
                    ["Affiliation", person.affiliation || "—"],
                    ["Jurisdiction", person.jurisdiction || "Coordination Intelligence"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex flex-col gap-1">
                      <dt className="font-mono text-[0.48rem] tracking-[0.22em] uppercase text-ink-light">
                        {k}
                      </dt>
                      <dd className="font-mono text-[0.7rem] sm:text-[0.72rem] text-ink leading-snug break-words">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== TESTIMONY — constrained ====== */}
      {person.coldOpen && (
        <section className="px-4 sm:px-6 lg:px-10 mt-8 sm:mt-10">
          <div className="max-w-[1100px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="border border-ink bg-paper-mid p-6 sm:p-10 lg:p-14 relative"
            >
              <div className="absolute -top-3 left-6 sm:left-8 bg-ink text-paper font-mono text-[0.55rem] tracking-[0.2em] uppercase px-3 py-1">
                Testimony on Record
              </div>
              <div className="font-serif italic text-[1.2rem] sm:text-[1.5rem] lg:text-[1.85rem] text-ink leading-[1.4] max-w-[900px]">
                "{person.coldOpen}"
              </div>
              <div className="font-mono text-[0.5rem] sm:text-[0.52rem] tracking-[0.2em] uppercase text-ink-light mt-5 sm:mt-6">
                — Cold open, {chapter} interview · 42+ min · 5,000–8,500 words
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ====== BIO + WHY MATTERS + SIDEBAR — constrained, 2-col on lg ====== */}
      {(person.bio || person.whyMatters || person.awards) && (
        <section className="px-4 sm:px-6 lg:px-10 mt-10 sm:mt-12">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-10"
              >
                {person.bio && (
                  <div>
                    <SectionHead label="Background" />
                    <p className="font-sans text-[0.95rem] sm:text-[1rem] leading-[1.75] text-ink-mid font-light">
                      {person.bio}
                    </p>
                  </div>
                )}

                {person.whyMatters && (
                  <div className="border-l-2 border-red-accent pl-5 sm:pl-6">
                    <SectionHead label="Why Their Perspective Is Needed" accent />
                    <p className="font-sans text-[1rem] sm:text-[1.05rem] leading-[1.8] text-ink font-light">
                      {person.whyMatters}
                    </p>
                  </div>
                )}

                {person.quote && !person.coldOpen && (
                  <div className="border-l-2 border-red-accent pl-5 sm:pl-6 py-2">
                    <div className="font-serif italic text-[1.2rem] sm:text-[1.25rem] text-ink leading-relaxed">
                      "{person.quote}"
                    </div>
                  </div>
                )}
              </motion.div>

              <motion.aside
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                {person.awards && person.awards.length > 0 && (
                  <div className="border border-ink p-5 sm:p-6">
                    <SectionHead label="Distinguishing Marks" small />
                    <ul className="space-y-2 mt-3">
                      {person.awards.map((a, i) => (
                        <li
                          key={i}
                          className="font-mono text-[0.66rem] sm:text-[0.68rem] text-ink leading-snug flex items-start gap-2"
                        >
                          <span className="text-red-accent mt-0.5">◇</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <a
                  href={chapterUrlFromBadge(chapter)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnet group flex items-center justify-between gap-3 bg-ink text-paper font-mono text-[0.58rem] sm:text-[0.6rem] tracking-[0.18em] uppercase px-5 py-4 hover:bg-red-accent transition-colors"
                >
                  <span>Read Full Interview</span>
                  <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="border border-ink/10 p-4 sm:p-5 space-y-3">
                  <button
                    onClick={() =>
                      alert(
                        "Self-surrender protocol initiated. Please report to the nearest Knowware terminal for reward processing."
                      )
                    }
                    className="w-full bg-red-accent text-white font-mono text-[0.56rem] sm:text-[0.58rem] tracking-[0.2em] uppercase py-3 hover:bg-ink transition-colors flex items-center justify-center gap-2"
                  >
                    <ShieldCheck size={14} /> Turn Yourself In
                  </button>
                  <p className="font-mono text-[0.45rem] text-ink-light text-center leading-tight">
                    Are you the perp? Claim your reward by authenticating your identity.
                  </p>
                </div>

                <div>
                  <SectionHead label="Share Poster" small />
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={handleCopyLink}
                      className="p-2 border border-ink/10 hover:border-red-accent hover:text-red-accent transition-all rounded-sm"
                      title="Copy link"
                    >
                      {copied ? (
                        <span className="font-mono text-[0.5rem]">COPIED</span>
                      ) : (
                        <LinkIcon size={14} />
                      )}
                    </button>
                    <button
                      className="p-2 border border-ink/10 hover:border-red-accent hover:text-red-accent transition-all rounded-sm"
                      title="Share on X"
                    >
                      <Twitter size={14} />
                    </button>
                    <button
                      className="p-2 border border-ink/10 hover:border-red-accent hover:text-red-accent transition-all rounded-sm"
                      title="Share on LinkedIn"
                    >
                      <Linkedin size={14} />
                    </button>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>
      )}

      {/* ====== MODUS OPERANDI — FULL BLEED BAND ====== */}
      {person.knownFor && person.knownFor.length > 0 && (
        <section className="mt-16 sm:mt-20 lg:mt-24 border-y border-ink bg-paper-mid py-12 sm:py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 pointer-events-none select-none font-mono text-[12rem] sm:text-[16rem] lg:text-[22rem] leading-none text-ink/[0.03]">
            M.O.
          </div>
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-8 sm:mb-10 pb-5 border-b border-ink">
              <div>
                <div className="font-mono text-[0.5rem] tracking-[0.22em] uppercase text-red-accent font-medium mb-2">
                  Modus Operandi —
                </div>
                <div className="font-mono text-[1rem] sm:text-[1.1rem] lg:text-[1.25rem] tracking-[0.06em] uppercase text-ink leading-none">
                  Methods & Frameworks
                </div>
              </div>
              <div className="font-mono text-[0.5rem] tracking-[0.22em] uppercase text-ink-light">
                {person.knownFor.length} on file
              </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {person.knownFor.map((m, i) => (
                <li
                  key={i}
                  className="group relative bg-paper border border-ink/15 p-5 sm:p-6 hover:border-red-accent transition-colors"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-0.5 w-0 bg-red-accent group-hover:w-full transition-all duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  <div className="font-mono text-[0.5rem] tracking-[0.22em] uppercase text-red-accent tabular-nums mb-2">
                    {String(i + 1).padStart(2, "0")} —
                  </div>
                  <div className="font-mono text-[0.82rem] sm:text-[0.88rem] text-ink leading-[1.35]">
                    {m}
                  </div>
                </li>
              ))}
            </ul>

            {onViewRedThread && (
              <div className="mt-10 pt-8 border-t border-ink/10 flex items-center justify-between">
                <div>
                  <div className="font-mono text-[0.46rem] tracking-[0.2em] uppercase text-ink-light mb-1">
                    Cross-reference —
                  </div>
                  <div className="font-mono text-[0.72rem] tracking-[0.04em] text-ink">
                    Who shares {person.name.split(" ").slice(-1)[0]}'s methods?
                  </div>
                </div>
                <button
                  onClick={onViewRedThread}
                  className="group flex items-center gap-3 border border-red-accent/40 hover:border-red-accent bg-paper hover:bg-red-accent/5 px-5 py-3 transition-colors"
                >
                  <span className="font-mono text-[0.52rem] tracking-[0.18em] uppercase text-red-accent">
                    Follow the Red Thread
                  </span>
                  <ArrowRight size={11} className="text-red-accent group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ====== DOCUMENTED WORKS — FULL BLEED ====== */}
      {(person.works || person.contributions) && (
        <section className="border-b border-ink py-12 sm:py-16 lg:py-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-8 sm:mb-10 pb-5 border-b border-ink">
              <div>
                <div className="font-mono text-[0.5rem] tracking-[0.22em] uppercase text-red-accent font-medium mb-2">
                  Documented Works —
                </div>
                <div className="font-mono text-[1rem] sm:text-[1.1rem] lg:text-[1.25rem] tracking-[0.06em] uppercase text-ink leading-none">
                  Evidence Archive
                </div>
              </div>
              <div className="font-mono text-[0.5rem] tracking-[0.22em] uppercase text-ink-light">
                {(person.works || person.contributions || []).length} exhibits
              </div>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
              {(person.works || person.contributions || []).map((w, i) => (
                <li
                  key={i}
                  className="group flex items-baseline gap-4 border-b border-ink/10 pb-3"
                >
                  <span className="font-mono text-[0.55rem] text-red-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif italic text-[1rem] sm:text-[1.1rem] text-ink group-hover:text-red-accent transition-colors leading-snug">
                    {w}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ====== FALLBACK when no content ====== */}
      {!hasAnyContent && (
        <section className="px-4 sm:px-6 lg:px-10 mt-12">
          <div className="max-w-[1100px] mx-auto border border-dashed border-ink/20 p-8 text-center">
            <div className="font-mono text-[0.58rem] tracking-[0.2em] uppercase text-ink-light mb-2">
              Dossier Under Compilation
            </div>
            <p className="font-mono text-[0.72rem] text-ink/60 leading-relaxed max-w-[400px] mx-auto">
              Full synthesized interview is in the book repo — 42+ minutes, 5,000–8,500 words. This card is still being written.
            </p>
          </div>
        </section>
      )}

      {/* ====== FOOTER: PREV/NEXT + TIP LINE + RETURN ====== */}
      <section className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="max-w-[1100px] mx-auto">

          {/* Row 1 — Prev · File stamp · Next */}
          <div className="grid grid-cols-3 items-center pb-6 border-b border-ink/10 gap-2">
            <div className="flex items-center justify-start">
              {onPrev ? (
                <button
                  onClick={onPrev}
                  className="group flex items-center gap-2 font-mono text-[0.55rem] tracking-[0.2em] uppercase text-ink-light hover:text-red-accent transition-colors"
                >
                  <ArrowRight size={11} className="rotate-180 shrink-0 group-hover:-translate-x-1 transition-transform" />
                  <span className="hidden sm:inline truncate">{prevPerson?.name ?? "Previous"}</span>
                  <span className="sm:hidden">Prev</span>
                </button>
              ) : <div />}
            </div>

            <div className="flex items-center justify-center">
              <span className="font-mono text-[0.48rem] tracking-[0.22em] uppercase text-ink-light">
                File K-{String(fileNumber ?? 0).padStart(2, "0")}
              </span>
            </div>

            <div className="flex items-center justify-end">
              {onNext ? (
                <button
                  onClick={onNext}
                  className="group flex items-center gap-2 font-mono text-[0.55rem] tracking-[0.2em] uppercase text-ink-light hover:text-red-accent transition-colors"
                >
                  <span className="hidden sm:inline truncate">{nextPerson?.name ?? "Next"}</span>
                  <span className="sm:hidden">Next</span>
                  <ArrowRight size={11} className="shrink-0 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : <div />}
            </div>
          </div>

          {/* Row 2 — Tip Line · Drop a Dime · Return to Directory */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="grid grid-cols-3 items-center pt-6 gap-2">
              <div className="flex items-center gap-2 justify-start">
                <MessageSquare size={14} className="text-red-accent shrink-0" />
                <h3 className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-ink font-bold whitespace-nowrap hidden lg:block">
                  The Tip Line
                </h3>
              </div>

              <div className="flex items-center justify-center">
                <button
                  onClick={() => setShowTipLine(!showTipLine)}
                  className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-red-accent border-b border-red-accent/30 pb-px hover:text-ink hover:border-ink transition-all"
                >
                  {showTipLine ? "Close Line" : "Drop a Dime"}
                </button>
              </div>

              <div className="flex items-center justify-end">
                <button
                  onClick={onBack}
                  className="group flex items-center gap-2 font-mono text-[0.55rem] tracking-[0.2em] uppercase text-ink-light hover:text-red-accent transition-colors"
                >
                  <ArrowRight size={11} className="rotate-180 shrink-0 group-hover:-translate-x-0.5 transition-transform" />
                  <span className="hidden sm:inline">Return to Directory</span>
                  <span className="sm:hidden">Directory</span>
                </button>
              </div>
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
                  <div className="space-y-6 pt-4 pb-4">
                    <p className="font-mono text-[0.6rem] text-ink-light leading-relaxed max-w-[500px]">
                      Have information on the whereabouts of this entity? Leave a tip. If your lead results in a successful capture, we will mail your reward.
                    </p>

                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-ink text-white p-6 border border-red-accent max-w-[500px]"
                      >
                        <div className="font-mono text-[0.7rem] tracking-[0.1em] mb-2 uppercase">
                          Tip Received.
                        </div>
                        <div className="font-mono text-[0.55rem] text-white/70 uppercase">
                          Our agents are investigating. Keep your eyes open.
                        </div>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmitTip} className="space-y-4 max-w-[500px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="YOUR NAME"
                            required
                            value={tipForm.name}
                            onChange={(e) => setTipForm({ ...tipForm, name: e.target.value })}
                            className="bg-paper border border-ink/20 p-3 font-mono text-[0.6rem] focus:border-red-accent outline-none transition-colors"
                          />
                          <input
                            type="text"
                            placeholder="EMAIL / PHONE"
                            required
                            value={tipForm.contact}
                            onChange={(e) => setTipForm({ ...tipForm, contact: e.target.value })}
                            className="bg-paper border border-ink/20 p-3 font-mono text-[0.6rem] focus:border-red-accent outline-none transition-colors"
                          />
                        </div>
                        <textarea
                          placeholder="LEAVE YOUR INTRODUCTION OR TIP HERE..."
                          rows={4}
                          required
                          value={tipForm.message}
                          onChange={(e) => setTipForm({ ...tipForm, message: e.target.value })}
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
          </motion.div>

        </div>
      </section>
    </div>
  );
}

function SectionHead({
  label,
  accent = false,
  small = false,
}: {
  label: string;
  accent?: boolean;
  small?: boolean;
}) {
  return (
    <div
      className={`font-mono tracking-[0.22em] uppercase font-bold border-b pb-2 mb-4 ${
        small ? "text-[0.5rem]" : "text-[0.58rem]"
      } ${accent ? "text-red-accent border-red-accent/40" : "text-ink border-ink/10"}`}
    >
      {label}
    </div>
  );
}

function chapterUrlFromBadge(badge: string) {
  const match = badge.match(/(\d+)/);
  if (!match) return "https://github.com/iamkhayyam/systemsofintelligence-book";
  const n = match[1];
  const slug = n === "10" ? "chX" : `ch${n}`;
  return `https://github.com/iamkhayyam/systemsofintelligence-book/tree/main/chapters/${slug}/interviews`;
}
