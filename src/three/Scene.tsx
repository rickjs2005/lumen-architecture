import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, SoftShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Lights } from "./Lights";
import { House } from "./House";
import { CameraRig } from "./CameraRig";

/** Cena 3D de fundo do hero. `active` controla o frameloop (perf fora da viewport). */
export function Scene({ active }: { active: boolean }) {
  const isMobile = useIsMobile();
  return (
    <Canvas
      shadows
      dpr={isMobile ? [1, 1.3] : [1, 1.6]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0.5, 3, 16], fov: 38, near: 0.1, far: 120 }}
      data-cursor="Explore"
    >
      <color attach="background" args={["#f8f8f6"]} />
      <fog attach="fog" args={["#f8f8f6", 20, 52]} />

      <Suspense fallback={null}>
        {/* sombras de contato suaves (PCSS) só no desktop — caro p/ GPU mobile */}
        {!isMobile && <SoftShadows size={26} samples={8} focus={0.7} />}
        <Lights />
        <House glass={isMobile ? "simple" : "premium"} />
        <ContactShadows
          position={[0, 0.31, 0]}
          opacity={0.34}
          scale={44}
          blur={2.6}
          far={12}
          resolution={isMobile ? 512 : 1024}
          color="#1b1b1b"
        />
        {/* Bloom desligado no mobile para aliviar a GPU */}
        {!isMobile && (
          <EffectComposer>
            <Bloom
              intensity={0.55}
              luminanceThreshold={0.9}
              luminanceSmoothing={0.3}
              mipmapBlur
            />
          </EffectComposer>
        )}
      </Suspense>

      <CameraRig />
    </Canvas>
  );
}
