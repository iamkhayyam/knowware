import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, ChevronRight } from "lucide-react";
import { Person } from "../types";
import { MO_CLASSIFIERS } from "../moClassifiers";
import PrimePairsGraph from "./PrimePairsGraph";

interface ClassifierEntry {
  name: string;
  persons: Person[];
  phrases: Map<string, string[]>;
}

interface PersonPair {
  a: Person;
  b: Person;
  classifiers: string[];
}

type Filter = "all" | "pairs";

export default function MOTable({
  persons,
  onBack,
  onSelectPerson,
  focusPerson,
}: {
  persons: Person[];
  onBack: () => void;
  onSelectPerson: (p: Person) => void;
  focusPerson?: Person;
}) {
  const [filter, setFilter] = useState<Filter>(focusPerson ? "pairs" : "all");
  const [selected, setSelected] = useState<ClassifierEntry | null>(null);

  const entries: ClassifierEntry[] = useMemo(() => {
    return Object.entries(MO_CLASSIFIERS)
      .map(([name, classifierPhrases]) => {
        const phrases = new Map<string, string[]>();
        const matched: Person[] = [];
        persons.forEach((p) => {
          const hits = (p.knownFor ?? []).filter((kf) => classifierPhrases.includes(kf));
          if (hits.length > 0) {
            phrases.set(p.name, hits);
            matched.push(p);
          }
        });
        return { name, persons: matched, phrases };
      })
      .filter((e) => e.persons.length > 0)
      .sort((a, b) => b.persons.length - a.persons.length);
  }, [persons]);

  /** Cross-classifier prime pairs: all person↔person connections with shared classifiers */
  const primePairs: PersonPair[] = useMemo(() => {
    const personClassifiers = new Map<string, string[]>();
    entries.forEach((e) => {
      e.persons.forEach((p) => {
        const existing = personClassifiers.get(p.name) ?? [];
        existing.push(e.name);
        personClassifiers.set(p.name, existing);
      });
    });

    const result: PersonPair[] = [];
    for (let i = 0; i < persons.length; i++) {
      for (let j = i + 1; j < persons.length; j++) {
        const a = persons[i];
        const b = persons[j];
        const aC = personClassifiers.get(a.name) ?? [];
        const bC = personClassifiers.get(b.name) ?? [];
        const shared = aC.filter((c) => bC.includes(c));
        if (shared.length > 0) result.push({ a, b, classifiers: shared });
      }
    }
    return result.sort((x, y) => y.classifiers.length - x.classifiers.length);
  }, [entries, persons]);

  const totalClassifiers = entries.length;
  const sharedClassifiers = entries.filter((e) => e.persons.length > 1).length;

  function buildPairs(ps: Person[]): [Person, Person][] {
    const pairs: [Person, Person][] = [];
    for (let i = 0; i < ps.length; i++)
      for (let j = i + 1; j < ps.length; j++)
        pairs.push([ps[i], ps[j]]);
    return pairs;
  }

  const headerSub = selected
    ? `${selected.persons.length} operative${selected.persons.length !== 1 ? "s" : ""} · ${
        selected.persons.length > 1
          ? `${buildPairs(selected.persons).length} prime pair${buildPairs(selected.persons).length !== 1 ? "s" : ""}`
          : "sole practitioner"
      }`
    : filter === "pairs"
    ? `${primePairs.length} cross-classifier connections`
    : `${totalClassifiers} classifiers · ${sharedClassifiers} shared`;

  return (
    <div className="min-h-screen bg-paper">

      {/* ── Header ── */}
      <header className="border-b border-ink bg-paper sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={selected ? () => setSelected(null) : onBack}
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <X size={20} className="text-ink" />
            </button>
            <div>
              <div className="font-mono text-[0.78rem] font-medium tracking-[0.18em] uppercase text-ink">
                {selected ? selected.name : "Table of M.O."}
              </div>
              <div className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-red-accent mt-px">
                {headerSub}
              </div>
            </div>
          </div>

          {!selected && (
            <div className="flex items-center gap-1 border border-ink/20 p-0.5">
              {(["all", "pairs"] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`font-mono text-[0.5rem] tracking-[0.18em] uppercase px-3 py-1.5 transition-colors ${
                    filter === f ? "bg-ink text-white" : "text-ink-light hover:text-ink"
                  }`}
                >
                  {f === "all" ? "All Classifiers" : "Prime Pairs"}
                </button>
              ))}
            </div>
          )}

          {selected && (
            <button
              onClick={() => setSelected(null)}
              className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-ink-light hover:text-red-accent transition-colors flex items-center gap-1.5"
            >
              <ArrowRight size={10} className="rotate-180" />
              All Classifiers
            </button>
          )}
        </div>
      </header>

      <AnimatePresence mode="wait">

        {/* ── List views (classifier list OR prime pairs) ── */}
        {!selected && (
          <motion.main
            key="main-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className={filter === "pairs" ? "" : "px-6 lg:px-10 py-12"}
          >
            {/* Classifier List */}
            {filter === "all" && (
            <div className="max-w-[1100px] mx-auto">
              <div className="border-t border-b border-ink divide-y divide-ink/10">
                {entries.map((entry, i) => (
                  <motion.button
                    key={entry.name}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.01 }}
                    onClick={() => setSelected(entry)}
                    className="w-full flex items-center gap-4 py-3.5 group hover:bg-red-accent/5 transition-colors text-left"
                  >
                    <span className="font-mono text-[0.44rem] tracking-[0.12em] text-ink/25 tabular-nums w-7 shrink-0 text-right">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-mono text-[0.72rem] tracking-[0.05em] text-ink group-hover:text-red-accent transition-colors">
                      {entry.name}
                    </span>
                    <div className="hidden md:flex items-center gap-1 shrink-0 flex-wrap max-w-[280px] justify-end">
                      {entry.persons.slice(0, 6).map((p) => (
                        <span
                          key={p.name}
                          title={`${p.name} · ${p.badges[0]}`}
                          className="font-mono text-[0.38rem] tracking-[0.1em] uppercase text-ink-light border border-ink/15 px-1.5 py-0.5 group-hover:border-red-accent/30 transition-colors"
                        >
                          {p.badges[0]}
                        </span>
                      ))}
                      {entry.persons.length > 6 && (
                        <span className="font-mono text-[0.38rem] text-ink/30">
                          +{entry.persons.length - 6}
                        </span>
                      )}
                    </div>
                    <span
                      className={`font-mono text-[0.5rem] tracking-[0.08em] tabular-nums px-2 py-1 shrink-0 ${
                        entry.persons.length > 1 ? "bg-red-accent text-white" : "bg-ink/5 text-ink-light"
                      }`}
                    >
                      ×{entry.persons.length}
                    </span>
                    <ChevronRight size={11} className="text-ink/20 group-hover:text-red-accent transition-colors shrink-0" />
                  </motion.button>
                ))}
              </div>
              <div className="mt-6 font-mono text-[0.46rem] tracking-[0.14em] uppercase text-ink-light text-right">
                {entries.length} classifiers · {entries.reduce((s, e) => s + e.persons.length, 0)} operative slots
              </div>
            </div>
            )}

            {/* Prime Pairs Graph — full viewport minus header, equal inset on all sides */}
            {filter === "pairs" && (
            <div className="p-6" style={{ height: "calc(100vh - 57px)" }}>
              <PrimePairsGraph primePairs={primePairs} onSelectPerson={onSelectPerson} focusPerson={focusPerson} />
            </div>
            )}
          </motion.main>
        )}

        {/* ── Classifier Detail ── */}
        {selected && (
          <motion.main
            key={selected.name}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 lg:px-10 py-12"
          >
            <div className="max-w-[1100px] mx-auto space-y-14">

              <div>
                <div className="font-mono text-[0.5rem] tracking-[0.22em] uppercase text-red-accent font-medium mb-5">
                  Operatives on file —
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {selected.persons.map((p) => {
                    const hits = selected.phrases.get(p.name) ?? [];
                    return (
                      <button
                        key={p.name}
                        onClick={() => onSelectPerson(p)}
                        className="group text-left border border-ink/20 hover:border-red-accent p-4 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="font-mono text-[0.58rem] tracking-[0.08em] text-ink group-hover:text-red-accent transition-colors font-medium leading-snug">
                            {p.name}
                          </div>
                          <ArrowRight size={10} className="text-ink/20 group-hover:text-red-accent transition-colors shrink-0 mt-0.5" />
                        </div>
                        <div className="font-mono text-[0.42rem] tracking-[0.14em] uppercase text-ink-light mb-3">
                          {p.badges[0]} · {p.badges[1]}
                        </div>
                        <div className="space-y-1">
                          {hits.map((phrase) => (
                            <div key={phrase} className="font-mono text-[0.48rem] tracking-[0.06em] text-ink/50 group-hover:text-red-accent/60 transition-colors">
                              — {phrase}
                            </div>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selected.persons.length > 1 && (
                <div>
                  <div className="font-mono text-[0.5rem] tracking-[0.22em] uppercase text-red-accent font-medium mb-5">
                    Prime pairs —{" "}
                    {buildPairs(selected.persons).length} connection
                    {buildPairs(selected.persons).length !== 1 ? "s" : ""}
                  </div>
                  <div className="space-y-2.5">
                    {buildPairs(selected.persons).map(([a, b], i) => {
                      const aHits = selected.phrases.get(a.name) ?? [];
                      const bHits = selected.phrases.get(b.name) ?? [];
                      return (
                        <motion.div
                          key={`${a.name}·${b.name}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="grid grid-cols-[1fr_32px_1fr] items-start gap-3 border border-ink/10 hover:border-red-accent/30 p-4 transition-colors group"
                        >
                          <button onClick={() => onSelectPerson(a)} className="text-left group/a">
                            <div className="font-mono text-[0.56rem] tracking-[0.06em] text-ink group-hover/a:text-red-accent transition-colors font-medium">
                              {a.name}
                            </div>
                            <div className="font-mono text-[0.4rem] tracking-[0.12em] uppercase text-ink-light mt-0.5 mb-2">
                              {a.badges[0]} · {a.badges[1]}
                            </div>
                            {aHits.map((ph) => (
                              <div key={ph} className="font-mono text-[0.42rem] text-ink/40 group-hover/a:text-red-accent/50 transition-colors">
                                — {ph}
                              </div>
                            ))}
                          </button>

                          <div className="flex flex-col items-center justify-center gap-1 pt-1 h-full">
                            <div className="w-px flex-1 bg-ink/15 group-hover:bg-red-accent/30 transition-colors" />
                            <span className="font-mono text-[0.5rem] text-ink/25 group-hover:text-red-accent/50 transition-colors">↔</span>
                            <div className="w-px flex-1 bg-ink/15 group-hover:bg-red-accent/30 transition-colors" />
                          </div>

                          <button onClick={() => onSelectPerson(b)} className="text-right group/b">
                            <div className="font-mono text-[0.56rem] tracking-[0.06em] text-ink group-hover/b:text-red-accent transition-colors font-medium">
                              {b.name}
                            </div>
                            <div className="font-mono text-[0.4rem] tracking-[0.12em] uppercase text-ink-light mt-0.5 mb-2">
                              {b.badges[0]} · {b.badges[1]}
                            </div>
                            {bHits.map((ph) => (
                              <div key={ph} className="font-mono text-[0.42rem] text-ink/40 group-hover/b:text-red-accent/50 transition-colors justify-end">
                                {ph} —
                              </div>
                            ))}
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {selected.persons.length === 1 && (
                <div className="border border-dashed border-ink/20 p-8 text-center">
                  <div className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-ink-light mb-2">
                    Sole Practitioner
                  </div>
                  <p className="font-mono text-[0.6rem] text-ink/40">
                    No prime pair recorded under this classifier —{" "}
                    {selected.persons[0].name} holds this field alone.
                  </p>
                </div>
              )}
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
