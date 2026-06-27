import { m, useReducedMotion } from "framer-motion";
import { EASE } from "@/constants/anim";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** anima ao entrar na viewport (padrão) ou imediatamente no mount */
  on?: "view" | "mount";
};

/** Revelação por máscara, palavra a palavra (clip-up). Mantém o fluxo inline. */
export function SplitText({ text, className, delay = 0, stagger = 0.05, on = "view" }: Props) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const anim = {
    initial: { y: reduce ? 0 : "110%" },
    target: { y: 0 },
  };

  return (
    <span className={className} aria-label={text} style={{ display: "inline" }}>
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          <m.span
            style={{ display: "inline-block", willChange: "transform" }}
            initial={anim.initial}
            {...(on === "view"
              ? { whileInView: anim.target, viewport: { once: true } }
              : { animate: anim.target })}
            transition={{ duration: 0.85, ease: EASE, delay: delay + i * stagger }}
          >
            {w}
          </m.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
