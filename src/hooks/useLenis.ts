import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth scroll (Lenis) sincronizado com o GSAP ScrollTrigger:
 * o Lenis dirige o rAF e emite o scroll, o ScrollTrigger atualiza junto.
 * Respeita prefers-reduced-motion (sai sem ativar o smooth).
 */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Recalcula posições do ScrollTrigger após o load e quando imagens
    // lazy terminam de carregar (evita desalinhamento de pins/triggers).
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const lazyTimer = window.setTimeout(refresh, 800);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(lazyTimer);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}
