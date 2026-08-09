import Header from "@/components/Header";
import FigureHero from "@/components/FigureHero";
import About from "@/components/About";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <FigureHero />
        <About />
        <Work />
      </main>
    </>
  );
}
