import { Suspense, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls, PerformanceMonitor } from "@react-three/drei";
import { Color, Vector3, type PointLight } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useAdaptiveDpr } from "@/hooks/useAdaptiveDpr";
import { Residence } from "./Residence";
import { Lights } from "./Lights";

export type RoomId = "sala" | "quarto" | "cozinha" | "piscina";

const MOODS: Record<RoomId, { color: string; intensity: number; pos: [number, number, number] }> = {
  sala: { color: "#ffd29a", intensity: 7, pos: [-0.4, 1.6, 1] },
  quarto: { color: "#b9c6e6", intensity: 5, pos: [0.9, 4.0, 1] },
  cozinha: { color: "#fff4e6", intensity: 8, pos: [-2.4, 1.6, 0.5] },
  piscina: { color: "#7fd0e0", intensity: 9, pos: [4.4, 1.2, 1.4] },
};

// posição de câmera + ponto de foco por ambiente (alinhado à mobília em House.tsx)
const ROOM_VIEWS: Record<RoomId, { pos: [number, number, number]; target: [number, number, number] }> = {
  sala: { pos: [-0.6, 2.2, 8.3], target: [-0.6, 1.0, 1.0] },
  quarto: { pos: [0.9, 4.3, 8.3], target: [0.9, 3.3, 0.8] },
  // ângulo alto e lateral: olha por cima do sofá até o canto da cozinha
  cozinha: { pos: [2.5, 3.6, 5.5], target: [-2.2, 0.9, -1.5] },
  // aborda pelo lado oposto da piscina, olhando por cima das espreguiçadeiras
  piscina: { pos: [10.5, 4.2, 1.5], target: [4.4, 0.43, 1.4] },
};

/** Move a câmera e o alvo dos controles até o ambiente selecionado. */
function RoomCameraRig({
  room,
  controlsRef,
}: {
  room: RoomId;
  controlsRef: RefObject<OrbitControlsImpl | null>;
}) {
  const { camera } = useThree();
  const reduced = usePrefersReducedMotion();
  const nextPos = useRef(new Vector3());
  const nextLook = useRef(new Vector3());

  useFrame((_, delta) => {
    const view = ROOM_VIEWS[room];
    nextPos.current.set(...view.pos);
    nextLook.current.set(...view.target);
    const d = reduced ? 1 : Math.min(1, delta * 1.6);
    camera.position.lerp(nextPos.current, d);
    const controls = controlsRef.current;
    if (controls) {
      controls.target.lerp(nextLook.current, d);
      controls.update();
    }
  });

  return null;
}

function Mood({ room }: { room: RoomId }) {
  const light = useRef<PointLight>(null);
  const target = useRef(new Color(MOODS[room].color));
  const reduced = usePrefersReducedMotion();

  useFrame((_, delta) => {
    if (!light.current) return;
    const m = MOODS[room];
    target.current.set(m.color);
    // a11y: reduced-motion aplica o mood instantâneo (sem transição contínua)
    const d = reduced ? 1 : Math.min(1, delta * 2);
    light.current.color.lerp(target.current, d);
    light.current.intensity += (m.intensity - light.current.intensity) * d;
    light.current.position.x += (m.pos[0] - light.current.position.x) * d;
    light.current.position.y += (m.pos[1] - light.current.position.y) * d;
    light.current.position.z += (m.pos[2] - light.current.position.z) * d;
  });

  return <pointLight ref={light} distance={9} decay={2} castShadow />;
}

export function InteractiveScene({ room, active }: { room: RoomId; active: boolean }) {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  // dpr segue o fps real (mesma estratégia da cena do hero)
  const { dpr, onPerf } = useAdaptiveDpr(isMobile ? 0.85 : 0.6, isMobile ? 1.3 : 1.6);
  const controlsRef = useRef<OrbitControlsImpl>(null);
  return (
    <Canvas
      shadows
      dpr={dpr}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [9, 5, 11], fov: 40 }}
      data-cursor="Explore"
    >
      <PerformanceMonitor ms={200} iterations={6} step={0.2} onChange={onPerf} />
      <color attach="background" args={["#f0efea"]} />
      <Suspense fallback={null}>
        <Lights />
        <Mood room={room} />
        <Residence />
        <ContactShadows
          position={[0, 0.31, 0]}
          opacity={0.32}
          scale={40}
          blur={2.6}
          far={12}
          resolution={isMobile ? 512 : 1024}
          color="#1b1b1b"
        />
      </Suspense>
      <RoomCameraRig room={room} controlsRef={controlsRef} />
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={6.5}
        maxDistance={20}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.1}
        autoRotate={!reduced}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}
