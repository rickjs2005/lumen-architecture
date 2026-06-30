import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { SERVICES } from "@/constants/site";
import { Reveal } from "@/components/anim/Reveal";
import { SplitText } from "@/components/anim/SplitText";
import { Img } from "@/components/Img";
import { EASE } from "@/constants/anim";
import styles from "./Services.module.scss";

const PANEL_W = 280;
const PANEL_H = 360;

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// ícones de linha, um por serviço (decorativos — aria-hidden no uso)
const ICONS = [
  // projeto arquitetônico — planta
  <svg key="plan" {...ICON_PROPS}>
    <polyline points="4 20 4 4 20 4" />
    <rect x="4" y="11" width="8" height="9" />
  </svg>,
  // gerenciamento de obra — grua
  <svg key="crane" {...ICON_PROPS}>
    <line x1="4" y1="20" x2="20" y2="20" />
    <line x1="7" y1="20" x2="7" y2="5" />
    <line x1="7" y1="6" x2="19" y2="9" />
    <line x1="16" y1="9" x2="16" y2="14" />
  </svg>,
  // interiores & marcenaria — cadeira
  <svg key="chair" {...ICON_PROPS}>
    <path d="M6 4v8a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V4" />
    <line x1="9" y1="15" x2="9" y2="20" />
    <line x1="15" y1="15" x2="15" y2="20" />
    <line x1="6" y1="9" x2="18" y2="9" />
  </svg>,
  // reforma & retrofit — martelo
  <svg key="hammer" {...ICON_PROPS}>
    <rect x="3.5" y="8.5" width="8" height="4" transform="rotate(-45 7.5 10.5)" />
    <line x1="11" y1="13" x2="19" y2="21" />
  </svg>,
  // consultoria & viabilidade — gráfico
  <svg key="chart" {...ICON_PROPS}>
    <line x1="4" y1="20" x2="20" y2="20" />
    <line x1="7" y1="20" x2="7" y2="11" />
    <line x1="12" y1="20" x2="12" y2="6" />
    <line x1="17" y1="20" x2="17" y2="14" />
  </svg>,
];

export function Services() {
  const [active, setActive] = useState<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 32, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 32, mass: 0.6 });

  useEffect(() => {
    setEnabled(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const onMove = (e: MouseEvent) => {
    if (!enabled || reduce) return;
    const maxX = window.innerWidth - PANEL_W - 24;
    const maxY = window.innerHeight - PANEL_H - 24;
    x.set(Math.min(maxX, e.clientX + 32));
    y.set(Math.max(24, Math.min(maxY, e.clientY - PANEL_H / 2)));
  };

  const service = active !== null ? SERVICES[active] : null;

  return (
    <section id="services" className={styles.section}>
      <div className={styles.head}>
        <Reveal>
          <p className={styles.eyebrow}>O que fazemos</p>
        </Reveal>
        <h2>
          <SplitText text="Serviços" />
        </h2>
        <Reveal delay={0.1}>
          <p className={styles.intro}>
            Do estudo inicial ao último detalhe de obra — um único time, da primeira planta à
            chave na mão.
          </p>
        </Reveal>
      </div>

      <div
        ref={listRef}
        className={styles.list}
        onMouseMove={onMove}
        onMouseLeave={() => setActive(null)}
      >
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.04}>
            <div
              className={`${styles.row} ${active === i ? styles.on : ""}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              tabIndex={0}
            >
              <div className={styles.index}>
                <span className={styles.icon} aria-hidden>
                  {ICONS[i % ICONS.length]}
                </span>
                <span className={styles.n}>{s.n}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {enabled && (
        <AnimatePresence>
          {service && (
            <m.div
              className={styles.preview}
              style={{ x: sx, y: sy }}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: EASE }}
              aria-hidden
            >
              <Img src={service.image} alt="" sizes={`${PANEL_W}px`} />
            </m.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
