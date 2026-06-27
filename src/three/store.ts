// Ponte entre o scroll (DOM/ScrollTrigger) e o loop de render do R3F.
// Objeto mutável lido por useFrame — sem causar re-render.
export const journey = {
  /** 0 → 1 ao longo da seção da jornada da câmera (fachada → piscina). */
  progress: 0,
};
