import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import { workProcessDocs } from "@/data/workProcess";

export const metadata: Metadata = {
  title: "Work Process, Oto Prangi",
  robots: { index: false, follow: false },
};

export default function WorkProcessPage() {
  return (
    <div>
      <Header />
      <PageTransition>
        <main className="flex-1 px-[0.7rem] pt-28 pb-20 sm:pt-32">
          <h1 className="mb-12 font-serif text-[28px] font-semibold sm:text-[48px]">Work Process</h1>
          <ul className="flex flex-col gap-6">
            {workProcessDocs.map((doc) => (
              <li key={doc.slug}>
                <Link
                  href={`/work-process/${doc.slug}`}
                  className="font-serif text-xl font-semibold hover:opacity-60 sm:text-2xl"
                >
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </PageTransition>
    </div>
  );
}
