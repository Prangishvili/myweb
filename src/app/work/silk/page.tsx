import type { Metadata } from "next";
import Header from "@/components/Header";
import CaseStudy from "@/components/CaseStudy";
import { silk } from "@/data/silk";

export const metadata: Metadata = {
  title: `${silk.title} — Oto Prangi`,
  description: silk.description,
};

export default function SilkPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <CaseStudy description={silk.description} hero={silk.hero} images={silk.images} />
      </main>
    </>
  );
}
