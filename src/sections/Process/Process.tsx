import { useRef } from "react";
import { m, useScroll, useSpring, useTransform } from "framer-motion";
import { PROCESS } from "@/constants/site";
import { Reveal } from "@/components/anim/Reveal";
import { SplitText } from "@/components/anim/SplitText";
import styles from "./Process.module.scss";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 80%"],
  });
  const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 120,
    damping: 30,
  });

  return (
    <section id="process" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <Reveal>
            <p className={styles.eyebrow}>Como trabalhamos</p>
          </Reveal>
          <h2>
            <SplitText text="Processo criativo" />
          </h2>
        </div>

        <div ref={ref} className={styles.timeline}>
          <div className={styles.track}>
            <m.span className={styles.fill} style={{ scaleY }} />
          </div>

          {PROCESS.map((s) => (
            <div key={s.n} className={styles.step}>
              <span className={styles.dot} />
              <Reveal>
                <span className={styles.n}>{s.n}</span>
              </Reveal>
              <Reveal delay={0.08}>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
