import { useRef, type ReactNode } from "react";
import { m, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  cursor?: string;
};

/** Botão/link com atração magnética sutil ao cursor. */
export function MagneticButton({
  children,
  className,
  href,
  onClick,
  strength = 0.4,
  cursor,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: "inline-block" }}
    >
      {href ? (
        <a className={className} href={href} onClick={onClick} data-cursor={cursor}>
          {children}
        </a>
      ) : (
        <button type="button" className={className} onClick={onClick} data-cursor={cursor}>
          {children}
        </button>
      )}
    </m.div>
  );
}
