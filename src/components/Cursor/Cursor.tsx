import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";
import styles from "./Cursor.module.scss";

/**
 * Cursor personalizado. Lê o atributo data-cursor do elemento sob o ponteiro
 * (ou usa "Abrir" para links/botões). Desktop apenas.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 45, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 600, damping: 45, mass: 0.3 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);
    document.body.classList.add("has-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor], a, button",
      );
      if (!el) {
        setActive(false);
        setLabel("");
        return;
      }
      setActive(true);
      const explicit = el.getAttribute("data-cursor");
      setLabel(explicit ?? "Abrir");
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = active ? (label ? 92 : 40) : 8;

  return (
    <m.div
      className={styles.cursor}
      style={{ x: sx, y: sy }}
      aria-hidden
    >
      <m.span
        className={styles.dot}
        animate={{ width: size, height: size }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      >
        {active && label}
      </m.span>
    </m.div>
  );
}
