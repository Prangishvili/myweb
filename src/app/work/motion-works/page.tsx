import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MotionWorksGrid from "@/components/MotionWorksGrid";
import { showreel } from "@/data/content";

export const metadata: Metadata = {
  title: "Motion Works — Oto Prangi | Motion Design & Animation",
  description:
    "Curated collection of motion design and animation work showcasing digital product design, user interface animations, and creative motion graphics.",
};

export default function MotionWorksPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="hidden">
          <Hero />
        </div>
        <MotionWorksGrid showreel={showreel} />
      </main>
    </>
  );
}
