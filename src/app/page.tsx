import Header from "@/components/Header";
import FigureHero from "@/components/FigureHero";
// import About from "@/components/About";
import Work from "@/components/Work";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main className="flex-1">
        <FigureHero />
        {/* <About /> */}
        <Work />
      </main>
    </>
  );
}
