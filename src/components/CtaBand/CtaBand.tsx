import { Reveal } from "@/components/anim/Reveal";
import { SplitText } from "@/components/anim/SplitText";
import { MagneticButton } from "@/components/anim/MagneticButton";
import { whatsappLink } from "@/constants/site";
import styles from "./CtaBand.module.scss";

/** Faixa de conversão recorrente — chamada forte logo após o portfólio. */
export function CtaBand() {
  return (
    <section className={styles.band} aria-label="Chamada para orçamento">
      <div className={styles.inner}>
        <Reveal>
          <p className={styles.eyebrow}>Gostou do que viu?</p>
        </Reveal>
        <h2>
          <SplitText text="Vamos desenhar" />
          <br />
          <em>
            <SplitText text="o seu projeto." delay={0.1} />
          </em>
        </h2>
        <Reveal delay={0.15} className={styles.actions}>
          <MagneticButton href="#contact" className={styles.primary} cursor="Abrir">
            Solicitar orçamento →
          </MagneticButton>
          <a
            href={whatsappLink("Olá! Vi o portfólio da Lumen e quero conversar sobre um projeto.")}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
            data-cursor="Abrir"
          >
            Falar no WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
