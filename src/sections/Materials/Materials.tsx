import { useRef } from "react";
import { m, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { MATERIALS, type Material } from "@/constants/site";
import { Reveal } from "@/components/anim/Reveal";
import { SplitText } from "@/components/anim/SplitText";
import { Img } from "@/components/Img";
import styles from "./Materials.module.scss";

function Card({ material }: { material: Material }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div className={styles.card}>
      <m.div
        ref={ref}
        className={styles.inner}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: rx, rotateY: ry }}
      >
        <Img src={material.image} alt={material.name} sizes="(max-width:768px) 92vw, 20vw" />
        <div className={styles.grad} />
        <div className={styles.body}>
          <p className={styles.note}>{material.note}</p>
          <h3>{material.name}</h3>
          <p>{material.desc}</p>
        </div>
      </m.div>
    </div>
  );
}

export function Materials() {
  return (
    <section id="materials" className={styles.section}>
      <div className={styles.head}>
        <div>
          <Reveal>
            <p className={styles.eyebrow}>Matéria</p>
          </Reveal>
          <h2>
            <SplitText text="Materiais" />
          </h2>
        </div>
        <Reveal delay={0.1}>
          <p>Poucos materiais, bem resolvidos. A textura como linguagem do projeto.</p>
        </Reveal>
      </div>

      <div className={styles.grid}>
        {MATERIALS.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.06}>
            <Card material={m} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
