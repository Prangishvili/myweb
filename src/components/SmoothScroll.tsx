"use client";

import { useEffect } from "react";
import Lenis from "lenis";

let activeLenis: Lenis | null = null;

// ease-in-out: gentle accelerate then decelerate, reads as smooth over long
// distances — the main instance's ease-out-expo is too front-loaded for that.
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  if (activeLenis) {
    activeLenis.scrollTo(target, { duration: 1.6, easing: easeInOutCubic });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.15,
      touchMultiplier: 1.15,
    });
    activeLenis = lenis;

    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      requestAnimationFrame(() => scrollToSection(id));
    }

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (activeLenis === lenis) activeLenis = null;
    };
  }, []);

  return null;
}
