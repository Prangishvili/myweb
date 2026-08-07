import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { showreel } from "@/data/content";

export const metadata: Metadata = {
  title: "Motion Works — Oto Prangi",
};

export default function MotionWorksPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="hidden">
          <Hero />
        </div>
        <div className="grid grid-cols-2 gap-2.5 px-2.5 pt-24 pb-2.5 sm:grid-cols-4 sm:gap-5 sm:px-5 sm:pt-28 sm:pb-5">
          {showreel.map((src) => (
            <div key={src} className="relative aspect-square overflow-hidden bg-black">
              <video
                src={src}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
