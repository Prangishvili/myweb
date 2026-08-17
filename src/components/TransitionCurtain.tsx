"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { VERTEX_COLORS } from "@/data/palette";

const CELL_SIZE = 130; // px, target grid-cell size before responsive column count is derived
const DOT_SCALE = 0.82; // dot diameter as a multiple of the cell size — kept under 1 so neighbors stay visibly separate, not overlapping
const SCATTER_DIST_MIN = 1.4; // multiples of cell size the dot flies out to when scattered
const SCATTER_DIST_MAX = 3.2;
const SCATTER_SCALE = 0.25; // dot size while scattered, before it magnetically snaps to full size
const RIPPLE_WINDOW = 420; // ms the ripple takes to radiate from the origin to the farthest corner
const RIPPLE_JITTER = 60; // ms of random per-dot noise added on top of the radial delay, so it doesn't read as a perfect mechanical ring
const DOT_COVER_DURATION = 620; // includes the spring overshoot/settle
const DOT_REVEAL_DURATION = 420;
const HOLD_AFTER_COVER = 150; // ms the curtain stays fully assembled before it's allowed to disperse
const FALLBACK_TIMEOUT = 2500; // safety net if a navigation never actually changes the pathname

type Phase = "idle" | "cover" | "reveal";
type Point = { x: number; y: number };

type Trigger = (colors?: string[], origin?: Point) => void;

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
  const [origin, setOrigin] = useState<Point | null>(null);

  const pendingRef = useRef(false);
  const triggeredAtRef = useRef(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [palette, setPalette] = useState<string[]>(VERTEX_COLORS);

  const dots = useMemo(() => {
    const count = cols * rows;
    return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
  }, [cols, rows, palette]);

  // Per-dot scatter magnitude and a little timing jitter — stable per grid size so
  // only the ripple's radial delay (origin-dependent) changes between triggers.
  const scatterData = useMemo(() => {
    const count = cols * rows;
    return Array.from({ length: count }, () => ({
      dist: SCATTER_DIST_MIN + Math.random() * (SCATTER_DIST_MAX - SCATTER_DIST_MIN),
      jitter: Math.random() * RIPPLE_JITTER,
    }));
  }, [cols, rows]);

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
          setTimeout(() => setPhase("idle"), RIPPLE_WINDOW + RIPPLE_JITTER + DOT_REVEAL_DURATION),
        );
      }, ms),
    );
  }

  function trigger(colors?: string[], origin?: Point) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    pendingRef.current = true;
    triggeredAtRef.current = performance.now();
    setPalette(colors && colors.length ? colors : VERTEX_COLORS);
    setOrigin(origin ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setPhase("cover");
    const minCover = RIPPLE_WINDOW + RIPPLE_JITTER + DOT_COVER_DURATION + HOLD_AFTER_COVER;
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
    const minCover = RIPPLE_WINDOW + RIPPLE_JITTER + DOT_COVER_DURATION + HOLD_AFTER_COVER;
    revealAfter(Math.max(0, minCover - elapsed));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => clearTimeouts, []);

  // Ripple delay for every dot, radiating outward from the click origin — normalized
  // against the farthest dot so the ripple always reaches every corner within RIPPLE_WINDOW
  // regardless of where on screen the origin sits.
  const delays = useMemo(() => {
    const originPoint = origin ?? { x: 0, y: 0 };
    let maxDist = 1;
    const raw = dots.map((_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const cx = (col + 0.5) * cellSize;
      const cy = (row + 0.5) * cellSize;
      const dist = Math.hypot(cx - originPoint.x, cy - originPoint.y);
      if (dist > maxDist) maxDist = dist;
      return { cx, cy, dist };
    });
    return raw.map((d, i) => ({
      dirX: d.dist > 1 ? (d.cx - originPoint.x) / d.dist : Math.cos(i),
      dirY: d.dist > 1 ? (d.cy - originPoint.y) / d.dist : Math.sin(i),
      delay: (d.dist / maxDist) * RIPPLE_WINDOW + scatterData[i].jitter,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dots, cols, cellSize, origin, scatterData]);

  return (
    <CurtainContext.Provider value={trigger}>
      {children}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[200] grid overflow-hidden"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridAutoRows: `${cellSize}px` }}
      >
        {dots.map((color, i) => {
          const covering = phase === "cover";
          const scatter = scatterData[i];
          const { dirX, dirY, delay } = delays[i];
          const offsetX = dirX * scatter.dist * cellSize;
          const offsetY = dirY * scatter.dist * cellSize;
          const scatteredTransform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${SCATTER_SCALE})`;
          return (
            <div key={i} className="relative">
              <div
                className="absolute top-1/2 left-1/2 rounded-full"
                style={
                  {
                    width: `${cellSize * DOT_SCALE}px`,
                    height: `${cellSize * DOT_SCALE}px`,
                    backgroundColor: color,
                    "--curtain-scattered": scatteredTransform,
                    animationName: phase === "idle" ? "none" : covering ? "curtain-cover-spring" : "curtain-reveal-spring",
                    animationDuration: `${covering ? DOT_COVER_DURATION : DOT_REVEAL_DURATION}ms`,
                    animationTimingFunction: covering
                      ? "cubic-bezier(0.2, 0.9, 0.3, 1)"
                      : "cubic-bezier(0.6, 0, 0.9, 0.2)",
                    animationDelay: `${delay}ms`,
                    animationFillMode: "both",
                    opacity: phase === "idle" ? 0 : undefined,
                    transform: phase === "idle" ? scatteredTransform : undefined,
                  } as React.CSSProperties
                }
              />
            </div>
          );
        })}
      </div>
    </CurtainContext.Provider>
  );
}
