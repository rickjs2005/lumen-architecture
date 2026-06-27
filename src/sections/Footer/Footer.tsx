import { NAV, STUDIO } from "@/constants/site";
import { Reveal } from "@/components/anim/Reveal";
import styles from "./Footer.module.scss";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <p className={styles.claim}>Arquitetura é a forma de viver a luz.</p>
        <div className={styles.cols}>
          <nav className={styles.col}>
            <p className={styles.k}>Navegar</p>
            {NAV.map((l) => (
              <a key={l.href} href={l.href} data-cursor="Abrir">{l.label}</a>
            ))}
          </nav>
          <div className={styles.col}>
            <p className={styles.k}>Contato</p>
            <a href={`mailto:${STUDIO.email}`} data-cursor="Abrir">{STUDIO.email}</a>
            <span>{STUDIO.phone}</span>
            <a href={STUDIO.instagram} target="_blank" rel="noopener noreferrer" data-cursor="Abrir">Instagram</a>
          </div>
        </div>
      </div>

      <Reveal className={styles.word} y={40}>
        <span>
          Lumen<i>.</i>
        </span>
      </Reveal>

      <div className={styles.bottom}>
        <span>© {year} {STUDIO.full}. Projeto fictício de portfólio.</span>
        <span>Belo Horizonte · BR</span>
      </div>
    </footer>
  );
}
