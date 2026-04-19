import { useMemo } from "react";

export type OverlayPhase = "idle" | "in" | "out";

const COLS = 14;
const IN_DURATION = 0.4;
const OUT_DURATION = 0.5;
const MAX_DELAY = 0.5; // same spread for both phases

// Total wall-clock time for each phase
export const OVERLAY_IN_MS = (MAX_DELAY + IN_DURATION) * 1000;
export const OVERLAY_OUT_MS = (MAX_DELAY + OUT_DURATION) * 1000;

export default function PageOverlay({ phase }: { phase: OverlayPhase }) {
  const cellVw = 100 / COLS;
  const rows =
    typeof window !== "undefined"
      ? Math.ceil(window.innerHeight / (window.innerWidth / COLS)) + 2
      : 16;
  const total = COLS * rows;

  const delays = useMemo(() => {
    // OUT: each cell gets a random delay
    const out = Array.from({ length: total }, () => Math.random() * MAX_DELAY);
    // IN: palindrome — mirror the OUT delays so the last cell to disappear
    // is the first to appear, giving a true reverse-play feel
    const maxOut = Math.max(...out);
    const inDelays = out.map((d) => parseFloat((maxOut - d).toFixed(3)));
    return { in: inDelays, out: out.map((d) => parseFloat(d.toFixed(3))) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === "idle") return null;

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
            // CSS keyframe `both` fill-mode guarantees the `from` state is painted
            // before the animation starts — no flash-to-black on mount.
            animation:
              phase === "in"
                ? `pixel-cover ${IN_DURATION}s ease-in ${delays.in[i]}s both`
                : `pixel-reveal ${OUT_DURATION}s ease-out ${delays.out[i]}s both`,
          }}
        />
      ))}
    </div>
  );
}
