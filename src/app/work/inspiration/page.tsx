import type { Metadata } from "next";
import Header from "@/components/Header";
import ProjectSlider from "@/components/ProjectSlider";
import { CDN_BASE } from "@/data/cdn";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Inspiration, Oto Prangi",
};

export default function InspirationPage() {
  return (
    <>
      <Header />
      <PageTransition>
        <main className="flex-1">
          <div className="flex flex-col gap-2.5 px-2 pt-24 pb-20 sm:gap-5 sm:px-5 sm:pt-28">
            <video
              src={`${CDN_BASE}/work/showreel/Inspiration%20Creating.mp4`}
              autoPlay
              muted
              loop
              playsInline
              className="aspect-[1920/1200] w-full object-cover"
            />
            <video
              src={`${CDN_BASE}/work/showreel/Inspiration%20Themes.mp4`}
              autoPlay
              muted
              loop
              playsInline
              className="aspect-[1920/1200] w-full object-cover"
            />
          </div>
          <ProjectSlider currentProjectTitle="Inspiration" />
        </main>
      </PageTransition>
    </>
  );
}
