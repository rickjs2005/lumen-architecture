import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { journey } from "./store";

type Key = { pos: [number, number, number]; look: [number, number, number] };

// Keyframes da jornada cinematográfica: fachada → entrada → sala → escada → varanda → piscina
const KEYS: Key[] = [
  { pos: [0.5, 3.0, 16], look: [0, 2.4, 0] }, // fachada (afastado)
  { pos: [-0.4, 2.0, 7.5], look: [-0.4, 1.8, 0] }, // entrada
  { pos: [-0.4, 1.7, 2.6], look: [-0.4, 1.7, -2] }, // sala (interior)
  { pos: [-3.2, 2.2, 2.4], look: [-1, 1.4, 0] }, // escada
  { pos: [1.2, 4.6, 6.5], look: [0.9, 4.0, 0] }, // varanda (superior)
  { pos: [5.5, 3.2, 7.5], look: [4.4, 0.5, 1.4] }, // piscina
];

function sample(t: number, out: Vector3, key: "pos" | "look") {
  const clamped = Math.min(0.9999, Math.max(0, t));
  const seg = clamped * (KEYS.length - 1);
  const i = Math.floor(seg);
  const f = seg - i;
  const a = KEYS[i][key];
  const b = KEYS[Math.min(KEYS.length - 1, i + 1)][key];
  // smoothstep para suavizar a transição entre keyframes
  const e = f * f * (3 - 2 * f);
  out.set(
    a[0] + (b[0] - a[0]) * e,
    a[1] + (b[1] - a[1]) * e,
    a[2] + (b[2] - a[2]) * e,
  );
}

/** Move a câmera pela jornada conforme journey.progress, com floating/parallax. */
export function CameraRig() {
  const { camera, pointer } = useThree();
  const targetPos = useRef(new Vector3());
  const targetLook = useRef(new Vector3());
  const lookAt = useRef(new Vector3());
  const reduced = usePrefersReducedMotion();

  useFrame((_, delta) => {
    const d = Math.min(1, delta * 2.2); // damping estável independente do FPS

    sample(journey.progress, targetPos.current, "pos");
    sample(journey.progress, targetLook.current, "look");

    // parallax sutil seguindo o ponteiro (floating camera).
    // a11y: desativado em prefers-reduced-motion — só a jornada por scroll.
    if (!reduced) {
      targetPos.current.x += pointer.x * 0.5;
      targetPos.current.y += pointer.y * 0.3;
    }

    camera.position.lerp(targetPos.current, d);
    lookAt.current.lerp(targetLook.current, d);
    camera.lookAt(lookAt.current);
  });

  return null;
}
