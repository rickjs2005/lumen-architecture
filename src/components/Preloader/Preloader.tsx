import { useEffect, useRef, useState } from "react";
import styles from "./Preloader.module.scss";

/** Abertura cinematográfica — só na 1ª visita da sessão. Sem dependência de 3D. */
export function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  const lineRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem("lumen-intro") === "1";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      sessionStorage.setItem("lumen-intro", "1");
      setGone(true);
      return;
    }

    document.body.style.overflow = "hidden";
    const start = performance.now();
    const DUR = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DUR);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (lineRef.current) lineRef.current.style.transform = `scaleX(${eased})`;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const t1 = window.setTimeout(() => setDone(true), DUR + 350);
    const t2 = window.setTimeout(() => {
      setGone(true);
      document.body.style.overflow = "";
      sessionStorage.setItem("lumen-intro", "1");
    }, DUR + 1300);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`${styles.pre} ${done ? styles.done : ""}`} aria-hidden>
      <div className={styles.mark}>
        <span>
          Lumen<i>.</i>
        </span>
      </div>
      <div className={styles.bottom}>
        <span className={styles.line}>
          <i ref={lineRef} style={{ transform: "scaleX(0)" }} />
        </span>
        <span className={styles.count}>{count}</span>
      </div>
    </div>
  );
}
