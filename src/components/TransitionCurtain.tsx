"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { VERTEX_COLORS } from "@/data/palette";

const CELL_SIZE = 130; // px, target grid-cell size before responsive column count is derived
const DOT_SCALE = 0.82; // dot diameter as a multiple of the cell size — kept under 1 so neighbors stay visibly separate, not overlapping
const COVER_STEP = 26; // ms of stagger between rows while assembling
const REVEAL_STEP = 22; // ms of stagger between rows while dispersing
const DOT_COVER_DURATION = 420;
const DOT_REVEAL_DURATION = 320;
const HOLD_AFTER_COVER = 150; // ms the curtain stays fully assembled before it's allowed to disperse
const FALLBACK_TIMEOUT = 2500; // safety net if a navigation never actually changes the pathname

type Phase = "idle" | "cover" | "reveal";

type Trigger = (colors?: string[]) => void;

const CurtainContext = createContext<Trigger | null>(null);

export function useCurtain() {
  const trigger = useContext(CurtainContext);
  if (!trigger) throw new Error("useCurtain must be used within TransitionCurtainProvider");
  return trigger;
}

function useGrid() {
  const [grid, setGrid] = useState({ cols: 10, rows: 7, cellSize: CELL_SIZE });

  useEffect(() => {
    function measure() {
      const cols = Math.max(6, Math.round(window.innerWidth / CELL_SIZE));
      const cellSize = window.innerWidth / cols;
      const rows = Math.ceil(window.innerHeight / cellSize) + 1;
      setGrid({ cols, rows, cellSize });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return grid;
}

export default function TransitionCurtainProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { cols, rows, cellSize } = useGrid();
  const [phase, setPhase] = useState<Phase>("idle");

  const pendingRef = useRef(false);
  const triggeredAtRef = useRef(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [palette, setPalette] = useState<string[]>(VERTEX_COLORS);

  const dots = useMemo(() => {
    const count = cols * rows;
    return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
  }, [cols, rows, palette]);

  function clearTimeouts() {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }

  function revealAfter(ms: number) {
    clearTimeouts();
    timeoutsRef.current.push(
      setTimeout(() => {
        setPhase("reveal");
        timeoutsRef.current.push(
          setTimeout(() => setPhase("idle"), rows * REVEAL_STEP + DOT_REVEAL_DURATION),
        );
      }, ms),
    );
  }

  function trigger(colors?: string[]) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    pendingRef.current = true;
    triggeredAtRef.current = performance.now();
    setPalette(colors && colors.length ? colors : VERTEX_COLORS);
    setPhase("cover");
    const minCover = rows * COVER_STEP + DOT_COVER_DURATION + HOLD_AFTER_COVER;
    clearTimeouts();
    timeoutsRef.current.push(setTimeout(() => revealAfter(0), FALLBACK_TIMEOUT));
    // Hold the minimum assemble time; the pathname effect below will extend this if navigation is slower.
    timeoutsRef.current.push(
      setTimeout(() => {
        if (pendingRef.current) return; // pathname hasn't changed yet, let that effect take over
        revealAfter(0);
      }, minCover),
    );
  }

  useEffect(() => {
    if (!pendingRef.current) return;
    pendingRef.current = false;
    // The new page has just mounted while the curtain is still fully covering the
    // screen — force the scroll position back to the top here so it happens
    // invisibly, instead of relying on the browser's default (which can be
    // inconsistent, e.g. if the previous page was scrolled and a library like
    // Lenis was involved).
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const elapsed = performance.now() - triggeredAtRef.current;
    const minCover = rows * COVER_STEP + DOT_COVER_DURATION + HOLD_AFTER_COVER;
    revealAfter(Math.max(0, minCover - elapsed));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => clearTimeouts, []);

  return (
    <CurtainContext.Provider value={trigger}>
      {children}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[200] grid overflow-hidden"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridAutoRows: `${cellSize}px` }}
      >
        {dots.map((color, i) => {
          const row = Math.floor(i / cols);
          const covering = phase === "cover";
          const delay = covering ? (rows - 1 - row) * COVER_STEP : row * REVEAL_STEP;
          return (
            <div key={i} className="relative">
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                  covering ? "scale-100" : "scale-0"
                }`}
                style={{
                  width: `${cellSize * DOT_SCALE}px`,
                  height: `${cellSize * DOT_SCALE}px`,
                  backgroundColor: color,
                  transitionProperty: "scale",
                  transitionDuration: `${covering ? DOT_COVER_DURATION : DOT_REVEAL_DURATION}ms`,
                  transitionTimingFunction: covering
                    ? "cubic-bezier(0.34, 1.56, 0.64, 1)"
                    : "cubic-bezier(0.5, 0, 1, 1)",
                  transitionDelay: `${delay}ms`,
                }}
              />
            </div>
          );
        })}
      </div>
    </CurtainContext.Provider>
  );
}
