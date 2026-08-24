import type { Metadata } from "next";
import Header from "@/components/Header";
import CaseStudy from "@/components/CaseStudy";
import { aisi } from "@/data/aisi";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: `${aisi.title}, Oto Prangi`,
  description: aisi.description,
};

export default function AisiPage() {
  return (
    <>
      <Header />
      <PageTransition>
        <main className="flex-1 pb-20">
          <CaseStudy
            description={aisi.description}
            hero={aisi.hero}
            images={aisi.images}
            projectTitle={aisi.title}
          />
        </main>
      </PageTransition>
    </>
  );
}
