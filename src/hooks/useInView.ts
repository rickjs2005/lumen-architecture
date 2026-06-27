import { useEffect, useRef, useState } from "react";

/** Observa um elemento e diz se está na viewport (para pausar canvases 3D). */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  margin = "200px",
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return [ref, inView] as const;
}
