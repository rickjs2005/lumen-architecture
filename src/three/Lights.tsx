import { Environment, Lightformer } from "@react-three/drei";

/**
 * Luz natural: sol direcional com sombras suaves + ambiente procedural
 * (lightformers) para reflexos no vidro/água — sem HDRI de rede.
 */
export function Lights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#fdf6ea", "#cfcabc", 0.5]} />

      <directionalLight
        position={[8, 12, 6]}
        intensity={2.4}
        color="#fff4e0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0002}
        shadow-camera-near={1}
        shadow-camera-far={40}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
      />

      <Environment resolution={256}>
        <Lightformer intensity={1.1} position={[0, 6, 8]} scale={[12, 6, 1]} color="#fff" />
        <Lightformer intensity={0.7} position={[-8, 3, 2]} scale={[6, 8, 1]} color="#f3ead8" />
        <Lightformer intensity={0.5} position={[8, 4, -4]} scale={[6, 6, 1]} color="#dfe6ea" />
      </Environment>
    </>
  );
}
