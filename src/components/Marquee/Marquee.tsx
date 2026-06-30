import styles from "./Marquee.module.scss";

const WORDS = ["Arquitetura", "Luz", "Matéria", "Estrutura", "Paisagem", "Precisão"];

/** Faixa editorial em loop — reforço de identidade, puramente decorativo. */
export function Marquee() {
  const content = WORDS.join(" — ") + " — ";

  return (
    <div className={styles.marquee} aria-hidden>
      <div className={styles.track}>
        <span>{content}</span>
        <span>{content}</span>
      </div>
    </div>
  );
}
