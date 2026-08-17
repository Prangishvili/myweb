import type { Metadata } from "next";
import Header from "@/components/Header";
import CaseStudy from "@/components/CaseStudy";
import { silk } from "@/data/silk";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: `${silk.title} — Oto Prangi`,
  description: silk.description,
};

export default function SilkPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <PageTransition>
        <main className="flex-1 pb-20">
          <CaseStudy
            description={silk.description}
            appStore={silk.appStore}
            credits={silk.credits}
            hero={silk.hero}
            images={silk.images}
            projectTitle={silk.title}
          />
        </main>
      </PageTransition>
    </div>
  );
}
