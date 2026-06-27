import { useState } from "react";
import { AnimatePresence, m, type Variants } from "framer-motion";
import { TESTIMONIALS } from "@/constants/site";
import { EASE } from "@/constants/anim";
import styles from "./Testimonials.module.scss";

const slide: Variants = {
  enter: (d: number) => ({ opacity: 0, x: d >= 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d >= 0 ? -60 : 60 }),
};

export function Testimonials() {
  const [[i, dir], setI] = useState<[number, number]>([0, 0]);
  const n = TESTIMONIALS.length;
  const go = (d: number) => setI(([cur]) => [(cur + d + n) % n, d]);
  const t = TESTIMONIALS[i];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Vozes</span>

        <div className={styles.viewport}>
          <AnimatePresence mode="wait" custom={dir}>
            <m.figure
              key={i}
              className={styles.slide}
              custom={dir}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: EASE }}
            >
              <blockquote>“{t.quote}”</blockquote>
              <figcaption className={styles.who}>
                <img src={t.avatar} alt={t.name} loading="lazy" />
                <span className={styles.name}>
                  <span className={styles.n}>{t.name}</span>
                  <span className={styles.r}>{t.role}</span>
                </span>
              </figcaption>
            </m.figure>
          </AnimatePresence>
        </div>

        <div className={styles.controls}>
          <button onClick={() => go(-1)} aria-label="Anterior">←</button>
          <div className={styles.dots}>
            {TESTIMONIALS.map((_, k) => (
              <button
                key={k}
                aria-label={`Depoimento ${k + 1}`}
                className={k === i ? styles.on : ""}
                onClick={() => setI([k, k > i ? 1 : -1])}
              />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Próximo">→</button>
        </div>
      </div>
    </section>
  );
}
