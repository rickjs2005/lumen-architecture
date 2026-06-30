import { m, useReducedMotion } from "framer-motion";
import { STUDIO, whatsappLink } from "@/constants/site";
import styles from "./WhatsAppButton.module.scss";

const MESSAGE = "Olá! Vim pelo site e gostaria de um orçamento para o meu projeto.";

/** Atalho fixo de WhatsApp — canal de menor fricção para captar contato. */
export function WhatsAppButton() {
  const reduce = useReducedMotion();

  return (
    <m.a
      href={whatsappLink(MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.fab}
      aria-label={`Conversar no WhatsApp com ${STUDIO.full}`}
      data-cursor="Conversar"
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.6 }}
      whileHover={reduce ? undefined : { scale: 1.08 }}
      whileTap={reduce ? undefined : { scale: 0.94 }}
    >
      <span className={styles.ring} aria-hidden />
      <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden fill="currentColor">
        <path d="M16.04 4C9.4 4 4 9.37 4 16c0 2.36.68 4.55 1.86 6.4L4 28l5.78-1.82A11.94 11.94 0 0 0 16.04 28C22.67 28 28 22.63 28 16S22.67 4 16.04 4Zm0 21.8c-2.05 0-3.96-.6-5.55-1.62l-.4-.25-3.95 1.24 1.28-3.83-.26-.4a9.7 9.7 0 0 1-1.55-5.27c0-5.4 4.43-9.78 9.86-9.78 5.43 0 9.86 4.38 9.86 9.78s-4.43 9.78-9.86 9.78Zm5.4-7.33c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.04-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.18-.24-.58-.48-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.75-.71 2-1.4.25-.69.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    </m.a>
  );
}
