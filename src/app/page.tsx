import Header from "@/components/Header";
import FigureHero from "@/components/FigureHero";
import Work from "@/components/Work";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <PageTransition>
        <main className="flex-1">
          <FigureHero />
          <Work />
        </main>
      </PageTransition>
    </>
  );
}
