import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import FigureHero from "@/components/FigureHero";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Page not found, Oto Prangi",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <PageTransition>
        <main className="flex-1">
          <FigureHero
            scattered
            captionPosition="center"
            height="full"
            caption={
              <>
                404 — lost in the work.
                <br />
                <Link href="/" className="pointer-events-auto underline underline-offset-4 hover:opacity-60">
                  Back to home
                </Link>
              </>
            }
          />
        </main>
      </PageTransition>
    </>
  );
}
