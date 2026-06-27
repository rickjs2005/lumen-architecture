import { useState } from "react";
import { STUDIO } from "@/constants/site";
import { Reveal } from "@/components/anim/Reveal";
import { SplitText } from "@/components/anim/SplitText";
import styles from "./Contact.module.scss";

export function Contact() {
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true); // sem backend — apenas feedback
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <Reveal>
            <p className={styles.eyebrow}>Contato</p>
          </Reveal>
          <h2>
            <SplitText text="Vamos construir" /> <br />
            <SplitText text="o seu lugar." delay={0.15} />
          </h2>

          <div className={styles.info}>
            <div>
              <p className={styles.k}>E-mail</p>
              <a className={styles.v} href={`mailto:${STUDIO.email}`} data-cursor="Abrir">{STUDIO.email}</a>
            </div>
            <div>
              <p className={styles.k}>Telefone</p>
              <span className={styles.v}>{STUDIO.phone}</span>
            </div>
            <div>
              <p className={styles.k}>Estúdio</p>
              <span className={styles.v}>{STUDIO.address}</span>
            </div>
          </div>

          <div className={styles.map} aria-hidden>
            <span className={styles.pin} />
            <span className={styles.label}>Lumen — 19°55′S 43°56′O</span>
          </div>
        </div>

        <Reveal delay={0.1}>
          <form className={styles.form} onSubmit={submit}>
            <div className={styles.field}>
              <label htmlFor="nome">Nome</label>
              <input id="nome" name="nome" type="text" placeholder="Como podemos chamá-lo?" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">E-mail</label>
              <input id="email" name="email" type="email" placeholder="voce@email.com" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="msg">Projeto</label>
              <textarea id="msg" name="msg" placeholder="Conte-nos sobre o lugar que você imagina." required />
            </div>

            {sent ? (
              <p className={styles.sent}>✦ Recebido. Entraremos em contato em breve.</p>
            ) : (
              <button type="submit" className={styles.submit} data-cursor="Abrir">
                <span>Enviar mensagem →</span>
              </button>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
