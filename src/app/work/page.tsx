import type { Metadata } from "next";
import Header from "@/components/Header";
import Work from "@/components/Work";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Work — Oto Prangi | Product Design & Design Systems",
  description:
    "Portfolio of product design work including design systems, digital products, and user experiences. View case studies and design projects.",
};

export default function WorkPage() {
  return (
    <>
      <Header />
      <PageTransition>
        <main className="flex-1 pt-20">
          <Work />
        </main>
      </PageTransition>
    </>
  );
}
