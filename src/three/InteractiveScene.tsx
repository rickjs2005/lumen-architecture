import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Color, type PointLight } from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Residence } from "./Residence";
import { Lights } from "./Lights";

export type RoomId = "sala" | "quarto" | "cozinha" | "piscina";

const MOODS: Record<RoomId, { color: string; intensity: number; pos: [number, number, number] }> = {
  sala: { color: "#ffd29a", intensity: 7, pos: [-0.4, 1.6, 1] },
  quarto: { color: "#b9c6e6", intensity: 5, pos: [0.9, 4.0, 1] },
  cozinha: { color: "#fff4e6", intensity: 8, pos: [-2.4, 1.6, 0.5] },
  piscina: { color: "#7fd0e0", intensity: 9, pos: [4.4, 1.2, 1.4] },
};

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
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [9, 5, 11], fov: 40 }}
      data-cursor="Explore"
    >
      <color attach="background" args={["#f0efea"]} />
      <Suspense fallback={null}>
        <Lights />
        <Mood room={room} />
        <Residence />
        <ContactShadows position={[0, 0.31, 0]} opacity={0.32} scale={40} blur={2.6} far={12} color="#1b1b1b" />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={7}
        maxDistance={20}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.1}
        autoRotate={!reduced}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}
