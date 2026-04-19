import { useMemo, useState, useEffect } from "react";

export type OverlayPhase = "idle" | "in" | "out";

const COLS = 14;
const IN_DURATION = 0.4;    // each cell's fade-in duration
const OUT_DURATION = 0.5;   // each cell's fade-out duration
const MAX_IN_DELAY = 0.5;   // random cloud spread (longer = more gradual buildup)
const MAX_OUT_DELAY = 0.55; // random rain spread (longer = more raindrop feel)

export const OVERLAY_IN_MS = (MAX_IN_DELAY + IN_DURATION) * 1000;
export const OVERLAY_OUT_MS = (MAX_OUT_DELAY + OUT_DURATION) * 1000;

export default function PageOverlay({ phase }: { phase: OverlayPhase }) {
  // One rAF after mount establishes opacity:0 before we animate to 1,
  // preventing cells from appearing as a sudden solid sheet.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const cellVw = 100 / COLS;
  const rows =
    typeof window !== "undefined"
      ? Math.ceil(window.innerHeight / (window.innerWidth / COLS)) + 2
      : 16;
  const total = COLS * rows;

  // Fresh random delays each mount (each transition)
  const delays = useMemo(
    () => ({
      in: Array.from({ length: total }, () => Math.random() * MAX_IN_DELAY),
      out: Array.from({ length: total }, () => Math.random() * MAX_OUT_DELAY),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (phase === "idle") return null;

  // Before ready: all cells are opacity:0 (no transition — just a hard 0)
  // In 'in' phase (ready): animate 0→1 with random in-delays
  // In 'out' phase: animate current→0 with random out-delays
  const targetOpacity = ready && phase === "in" ? 1 : 0;

  return (
    <div
      className="fixed inset-0 z-[9900] pointer-events-none overflow-hidden"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${COLS}, ${cellVw}vw)`,
        gridAutoRows: `${cellVw}vw`,
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            backgroundColor: "#0a0a0a",
            opacity: targetOpacity,
            transition: !ready
              ? "none"
              : phase === "in"
              ? `opacity ${IN_DURATION}s ease-in ${delays.in[i].toFixed(3)}s`
              : `opacity ${OUT_DURATION}s ease-out ${delays.out[i].toFixed(3)}s`,
          }}
        />
      ))}
    </div>
  );
}
