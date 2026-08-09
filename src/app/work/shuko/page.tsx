import type { Metadata } from "next";
import Header from "@/components/Header";
import CaseStudy from "@/components/CaseStudy";
import { shuko } from "@/data/shuko";

export const metadata: Metadata = {
  title: `${shuko.title} — Oto Prangi`,
  description: shuko.description,
};

export default function ShukoPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pb-20">
        <CaseStudy description={shuko.description} hero={shuko.hero} images={shuko.images} projectTitle={shuko.title} />
      </main>
    </>
  );
}
