import type { Metadata } from "next";
import Header from "@/components/Header";
import CaseStudy from "@/components/CaseStudy";
import { tomorrow } from "@/data/tomorrow";

export const metadata: Metadata = {
  title: `${tomorrow.title} — Oto Prangi`,
  description: tomorrow.description,
};

export default function TomorrowPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pb-20">
        <CaseStudy
          description={tomorrow.description}
          hero={tomorrow.hero}
          images={tomorrow.images}
          projectTitle={tomorrow.title}
        />
      </main>
    </>
  );
}
