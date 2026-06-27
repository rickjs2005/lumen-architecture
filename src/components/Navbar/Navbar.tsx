import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { NAV, STUDIO } from "@/constants/site";
import { MagneticButton } from "@/components/anim/MagneticButton";
import styles from "./Navbar.module.scss";

export function Navbar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <m.header
      className={`${styles.header} ${solid ? styles.solid : ""}`}
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <div className={styles.inner}>
        <a href="#top" className={styles.brand} aria-label={`${STUDIO.full} — início`}>
          {STUDIO.name}
          <i aria-hidden />
        </a>

        <nav className={styles.links} aria-label="Navegação principal">
          {NAV.map((l) => (
            <a key={l.href} href={l.href} className={styles.link} data-cursor="Abrir">
              {l.label}
            </a>
          ))}
        </nav>

        <MagneticButton href="#contact" className={styles.cta} cursor="Abrir" strength={0.3}>
          Iniciar projeto
        </MagneticButton>
      </div>
    </m.header>
  );
}
