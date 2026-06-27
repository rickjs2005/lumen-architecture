import { m } from "framer-motion";
import { Reveal } from "@/components/anim/Reveal";
import { SplitText } from "@/components/anim/SplitText";
import { EASE } from "@/constants/anim";
import styles from "./About.module.scss";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.6, ease: EASE, delay: i * 0.18 },
      opacity: { duration: 0.2, delay: i * 0.18 },
    },
  }),
};

export function About() {
  return (
    <section id="about" className={styles.about}>
      <Reveal>
        <p className={styles.eyebrow}>O estúdio</p>
      </Reveal>
      <h2 className={styles.lead}>
        <SplitText text="Desenhamos com" /> <em><SplitText text="luz, proporção" delay={0.1} /></em> <SplitText text="e silêncio." delay={0.2} />
      </h2>

      <div className={styles.grid}>
        <div className={styles.cols}>
          <Reveal>
            <p>
              <strong>Lumen</strong> é um estúdio de arquitetura contemporânea. Trabalhamos do
              conceito à obra, com uma obsessão por como a luz entra, atravessa e repousa em cada
              ambiente.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Linhas retas, vãos generosos e materiais honestos. Cada projeto começa por uma
              pergunta simples: <strong>como se vive aqui?</strong> — e termina num espaço que
              parece inevitável.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className={styles.drawing}>
          <m.svg
            viewBox="0 0 400 300"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15%" }}
          >
            {/* terreno */}
            <m.line x1="20" y1="250" x2="380" y2="250" variants={draw} custom={0} />
            {/* volume base */}
            <m.polyline points="60,250 60,150 220,150 220,250" variants={draw} custom={1} />
            {/* volume superior em balanço */}
            <m.polyline points="140,150 140,80 320,80 320,170 220,170" variants={draw} custom={2} />
            {/* laje cobertura */}
            <m.line x1="120" y1="80" x2="360" y2="80" variants={draw} custom={3} />
            {/* pilar */}
            <m.line x1="320" y1="80" x2="320" y2="250" variants={draw} custom={4} />
            {/* fachada de vidro (linhas) */}
            <m.line x1="90" y1="150" x2="90" y2="250" variants={draw} custom={5} />
            <m.line x1="120" y1="150" x2="120" y2="250" variants={draw} custom={5} />
            <m.line x1="150" y1="150" x2="150" y2="250" variants={draw} custom={5} />
            <m.line x1="185" y1="150" x2="185" y2="250" variants={draw} custom={5} />
            {/* sol / detalhe dourado */}
            <m.path className={styles.accent} d="M300 40 a18 18 0 1 0 0.1 0" variants={draw} custom={6} />
            {/* raios */}
            <m.line className={styles.accent} x1="300" y1="10" x2="300" y2="0" variants={draw} custom={6} />
          </m.svg>
        </Reveal>
      </div>
    </section>
  );
}
