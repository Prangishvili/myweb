import type { Metadata } from "next";
import Header from "@/components/Header";
import CaseStudy from "@/components/CaseStudy";
import { ray } from "@/data/ray";

export const metadata: Metadata = {
  title: `${ray.title} — Oto Prangi`,
  description: ray.description,
};

export default function RayPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pb-20">
        <CaseStudy
          description={ray.description}
          credits={ray.credits}
          hero={ray.hero}
          images={ray.images}
          projectTitle={ray.title}
        />
      </main>
    </>
  );
}
