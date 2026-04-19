import { useEffect, useState } from "react";
import { useIsPresent } from "motion/react";

export const PixelSwipeTransition = ({
  cols = 12,
  cellDuration = 0.3,
  colStagger = 0.06,
  rowStagger = 0.04,
  zIndex = "z-[9900]",
}: {
  cols?: number;
  cellDuration?: number;
  colStagger?: number;
  rowStagger?: number;
  zIndex?: string;
}) => {
  const isPresent = useIsPresent();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!isPresent) {
      const id = requestAnimationFrame(() => setPlaying(true));
      return () => cancelAnimationFrame(id);
    }
  }, [isPresent]);

  if (isPresent) return null;

  const cellVw = 100 / cols;
  const rows =
    typeof window !== "undefined"
      ? Math.ceil(window.innerHeight / (window.innerWidth / cols)) + 2
      : 16;

  return (
    <div
      className={`fixed inset-0 ${zIndex} pointer-events-none overflow-hidden`}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${cellVw}vw)`,
        gridAutoRows: `${cellVw}vw`,
      }}
    >
      {Array.from({ length: cols * rows }).map((_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        // col drives left-to-right cascade; row offset is large enough that
        // adjacent squares in the same column are visibly at different stages
        const delay = col * colStagger + row * rowStagger;
        return (
          <div
            key={i}
            style={{
              backgroundColor: "#0a0a0a",
              opacity: 0,
              animation: playing
                ? `pixel-wave-cell ${cellDuration}s ease-in-out ${delay}s forwards`
                : "none",
            }}
          />
        );
      })}
    </div>
  );
};

export default PixelSwipeTransition;

export interface PageShutterHandle {
  transition: (swap: () => void) => Promise<void>;
}
