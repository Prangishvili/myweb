import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MotionWorkVideo from "@/components/MotionWorkVideo";
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
        <div className="grid grid-cols-3 gap-2 px-2 pt-20 pb-2 sm:gap-2.5 sm:px-2.5 sm:pb-2.5">
          {showreel.map((src) => (
            <MotionWorkVideo key={src} src={src} />
          ))}
        </div>
      </main>
    </>
  );
}
