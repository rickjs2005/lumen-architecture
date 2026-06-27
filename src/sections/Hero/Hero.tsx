import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journey } from "@/three/store";

import { useInView } from "@/hooks/useInView";
import { SplitText } from "@/components/anim/SplitText";
import { SceneBoundary } from "@/components/SceneBoundary";
import { img } from "@/constants/site";
import { EASE } from "@/constants/anim";
import styles from "./Hero.module.scss";

const Scene = lazy(() => import("@/three/Scene").then((m) => ({ default: m.Scene })));

const PHASES = ["Fachada", "Entrada", "Sala", "Escada", "Varanda", "Piscina"];

// Poster estático (mesmo enquadramento do fallback) mostrado já no first paint.
// Fica atrás do <Scene>; quando o 3D monta e renderiza, cobre o poster.
const posterStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundImage: `linear-gradient(to bottom, rgba(248,248,246,0.15), rgba(248,248,246,0.8)), url(${img("1600585154340-be6161a56a0c", 1800)})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const heroFallback = <div style={posterStyle} />;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [canvasRef, inView] = useInView<HTMLDivElement>("300px");
  const [phase, setPhase] = useState(0);
  const [mountScene, setMountScene] = useState(false);
  const barRef = useRef<HTMLElement>(null);

  // Adia a montagem do canvas 3D para depois do primeiro paint (LCP/TBT).
  useEffect(() => {
    // timeout garante a montagem mesmo se o navegador nunca ficar "idle"
    // (a página tem rAF contínuo do Lenis).
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setMountScene(true), {
        timeout: 1200,
      });
      const t = window.setTimeout(() => setMountScene(true), 1300);
      return () => {
        window.cancelIdleCallback(id);
        window.clearTimeout(t);
      };
    }
    const t = window.setTimeout(() => setMountScene(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        journey.progress = self.progress;
        if (barRef.current) barRef.current.style.transform = `scaleY(${self.progress})`;
        const idx = Math.min(PHASES.length - 1, Math.floor(self.progress * PHASES.length));
        setPhase((p) => (p !== idx ? idx : p));
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section id="top" ref={sectionRef} className={styles.hero}>
      <div className={styles.sticky}>
        <div ref={canvasRef} className={styles.canvas}>
          <div aria-hidden style={posterStyle} />
          {mountScene && (
            <SceneBoundary fallback={heroFallback}>
              <Suspense fallback={null}>
                <Scene active={inView} />
              </Suspense>
            </SceneBoundary>
          )}
        </div>

        <div className={styles.meta}>
          <span>Est. 2009 — Belo Horizonte</span>
          <span>19° 55′ S · 43° 56′ O</span>
        </div>

        <div className={styles.overlay}>
          <AnimatePresence mode="wait">
            {phase === 0 ? (
              <m.div
                key="headline"
                className={styles.headline}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, filter: "blur(6px)", y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <p className={styles.eyebrow}>Arquitetura contemporânea</p>
                <h1>
                  <SplitText text="Espaços de" on="mount" />
                  <br />
                  <em>
                    <SplitText text="luz e matéria" on="mount" delay={0.2} />
                  </em>
                </h1>
                <div className={styles.sub}>
                  <p>
                    Projetamos residências e lugares públicos onde estrutura, luz natural e
                    paisagem se tornam uma só ideia.
                  </p>
                  <a href="#projects" className={styles.discover} data-cursor="Abrir">
                    Descobrir projetos <span>→</span>
                  </a>
                </div>
              </m.div>
            ) : (
              <m.div
                key={`phase-${phase}`}
                className={styles.phase}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className={styles.pi}>
                  {String(phase + 1).padStart(2, "0")} — Percurso
                </p>
                <p className={styles.pn}>{PHASES[phase]}</p>
              </m.div>
            )}
          </AnimatePresence>
        </div>

        <div className={styles.progress}>
          <i ref={barRef} style={{ transform: "scaleY(0)" }} />
        </div>

        {phase === 0 && (
          <div className={styles.scrollHint}>
            Scroll
            <i />
          </div>
        )}
      </div>
    </section>
  );
}
