import { lazy, Suspense } from "react";
import { useLenis } from "@/hooks/useLenis";
import { Cursor } from "@/components/Cursor/Cursor";
import { Seo } from "@/components/Seo";
import { Preloader } from "@/components/Preloader/Preloader";
import { Grain } from "@/components/Grain";
import { Navbar } from "@/components/Navbar/Navbar";
import { Hero } from "@/sections/Hero/Hero";
import { About } from "@/sections/About/About";
import { Projects } from "@/sections/Projects/Projects";
import { Process } from "@/sections/Process/Process";
import { Materials } from "@/sections/Materials/Materials";
import { Stats } from "@/sections/Stats/Stats";
import { Testimonials } from "@/sections/Testimonials/Testimonials";
import { Contact } from "@/sections/Contact/Contact";
import { Footer } from "@/sections/Footer/Footer";

// 3D abaixo da dobra: carregado sob demanda (code splitting).
const Interactive = lazy(() =>
  import("@/sections/Interactive/Interactive").then((m) => ({ default: m.Interactive })),
);

export default function App() {
  useLenis();

  return (
    <>
      <Seo />
      <a href="#main" className="skip-link">
        Pular para o conteúdo
      </a>
      <Preloader />
      <Grain />
      <Cursor />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Projects />
        <Process />
        <Suspense fallback={<div style={{ height: "70vh" }} />}>
          <Interactive />
        </Suspense>
        <Materials />
        <Stats />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
