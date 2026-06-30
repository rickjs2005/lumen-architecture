import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import type { Group, Mesh } from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Vidro: transmissão real (premium, só no hero desktop) ou reflexo barato. */
function GlassMat({ premium }: { premium: boolean }) {
  if (premium) {
    return (
      <MeshTransmissionMaterial
        samples={2}
        resolution={128}
        transmission={1}
        thickness={0.5}
        roughness={0.08}
        ior={1.3}
        chromaticAberration={0.03}
        color="#dfe9ec"
      />
    );
  }
  return (
    <meshStandardMaterial
      color="#aebfc4"
      roughness={0.05}
      metalness={0.9}
      transparent
      opacity={0.42}
    />
  );
}

/**
 * Residência contemporânea procedural (sem GLB externo): volumes de concreto,
 * fachada de vidro, lajes em balanço, piscina e vegetação mínima.
 */
export function House({ glass = "simple" }: { glass?: "premium" | "simple" }) {
  const premiumGlass = glass === "premium";
  const water = useRef<Mesh>(null);
  const glow = useRef<Group>(null);
  const reduced = usePrefersReducedMotion();

  useFrame((state) => {
    // a11y: respeita prefers-reduced-motion — mantém água e glow estáticos
    // (valores de repouso já definidos no JSX: opacity 0.55, glow.y 1.4).
    if (reduced) return;

    const t = state.clock.elapsedTime;
    // água com leve respiração
    if (water.current) {
      const m = water.current.material as { opacity?: number };
      if (m.opacity !== undefined) m.opacity = 0.55 + Math.sin(t * 0.8) * 0.05;
    }
    // luz interna pulsa muito de leve (vida)
    if (glow.current) glow.current.position.y = 1.4 + Math.sin(t * 0.6) * 0.03;
  });

  return (
    <group position={[0, 0, 0]}>
      {/* terreno */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#eceae4" roughness={1} />
      </mesh>

      {/* base / platô */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[9, 0.3, 6.4]} />
        <meshStandardMaterial color="#dcdad2" roughness={0.9} />
      </mesh>

      {/* pavimento térreo (concreto branco) — face frontal (+z) invisível: a
          fachada é só vidro, para a sala/cozinha ficarem visíveis de fora */}
      <mesh position={[-0.4, 1.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.6, 2.5, 4.8]} />
        <meshStandardMaterial attach="material-0" color="#f3f1ec" roughness={0.78} />
        <meshStandardMaterial attach="material-1" color="#f3f1ec" roughness={0.78} />
        <meshStandardMaterial attach="material-2" color="#f3f1ec" roughness={0.78} />
        <meshStandardMaterial attach="material-3" color="#f3f1ec" roughness={0.78} />
        <meshStandardMaterial attach="material-4" visible={false} />
        <meshStandardMaterial attach="material-5" color="#f3f1ec" roughness={0.78} />
      </mesh>

      {/* fachada de vidro (frente, z+) — cobre toda a abertura da face frontal */}
      <mesh position={[-0.4, 1.45, 2.45]}>
        <boxGeometry args={[6.5, 2.4, 0.06]} />
        <GlassMat premium={premiumGlass} />
      </mesh>

      {/* montantes verticais da fachada */}
      {[-2.6, -1.3, 0, 1.3].map((x) => (
        <mesh key={x} position={[x - 0.4, 1.5, 2.48]} castShadow>
          <boxGeometry args={[0.06, 2.1, 0.08]} />
          <meshStandardMaterial color="#2c2c2c" roughness={0.5} metalness={0.3} />
        </mesh>
      ))}

      {/* caixilhos horizontais (moldura fina sup./inf.) da fachada térrea */}
      {[0.48, 2.52].map((y) => (
        <mesh key={y} position={[-0.4, y, 2.48]} castShadow>
          <boxGeometry args={[6.34, 0.07, 0.1]} />
          <meshStandardMaterial color="#222" roughness={0.45} metalness={0.4} />
        </mesh>
      ))}
      {/* batentes verticais laterais da fachada térrea */}
      {[-3.62, 2.82].map((x) => (
        <mesh key={x} position={[x, 1.5, 2.48]} castShadow>
          <boxGeometry args={[0.08, 2.1, 0.1]} />
          <meshStandardMaterial color="#222" roughness={0.45} metalness={0.4} />
        </mesh>
      ))}

      {/* pavimento superior em balanço — face frontal (+z) invisível: o
          quarto fica visível de fora através do vidro */}
      <mesh position={[0.9, 4.0, -0.1]} castShadow receiveShadow>
        <boxGeometry args={[5.4, 2.3, 4.4]} />
        <meshStandardMaterial attach="material-0" color="#ece9e2" roughness={0.8} />
        <meshStandardMaterial attach="material-1" color="#ece9e2" roughness={0.8} />
        <meshStandardMaterial attach="material-2" color="#ece9e2" roughness={0.8} />
        <meshStandardMaterial attach="material-3" color="#ece9e2" roughness={0.8} />
        <meshStandardMaterial attach="material-4" visible={false} />
        <meshStandardMaterial attach="material-5" color="#ece9e2" roughness={0.8} />
      </mesh>

      {/* vidro do superior — cobre toda a abertura da face frontal */}
      <mesh position={[0.9, 4.0, 2.1]}>
        <boxGeometry args={[5.3, 2.2, 0.05]} />
        <GlassMat premium={premiumGlass} />
      </mesh>
      {/* caixilhos do rasgo superior (moldura fina sup./inf.) */}
      {[3.38, 4.82].map((y) => (
        <mesh key={y} position={[0.9, y, 2.07]} castShadow>
          <boxGeometry args={[5.1, 0.06, 0.09]} />
          <meshStandardMaterial color="#222" roughness={0.45} metalness={0.4} />
        </mesh>
      ))}
      {/* peitoril/chumbada sob o rasgo superior */}
      <mesh position={[0.9, 3.34, 2.12]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 0.1, 0.22]} />
        <meshStandardMaterial color="#d9d6ce" roughness={0.85} />
      </mesh>

      {/* laje de cobertura (fina, em balanço) */}
      <mesh position={[0.7, 5.32, 0]} castShadow>
        <boxGeometry args={[7.4, 0.16, 5.4]} />
        <meshStandardMaterial color="#e7e4dd" roughness={0.85} />
      </mesh>

      {/* laje intermediária / pala da entrada */}
      <mesh position={[-0.4, 2.78, 1.4]} castShadow>
        <boxGeometry args={[7.0, 0.14, 2.6]} />
        <meshStandardMaterial color="#e2dfd7" roughness={0.85} />
      </mesh>

      {/* pilar de canto (aço escuro) */}
      <mesh position={[2.5, 2.7, 2.2]} castShadow>
        <boxGeometry args={[0.16, 5.3, 0.16]} />
        <meshStandardMaterial color="#222" roughness={0.4} metalness={0.4} />
      </mesh>

      {/* guarda-corpo fino (aço escuro) na varanda da pala de entrada */}
      <group position={[-0.4, 0, 2.66]}>
        {/* corrimão superior */}
        <mesh position={[0, 3.42, 0]} castShadow>
          <boxGeometry args={[6.9, 0.05, 0.05]} />
          <meshStandardMaterial color="#222" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* travessa inferior */}
        <mesh position={[0, 2.96, 0]} castShadow>
          <boxGeometry args={[6.9, 0.04, 0.04]} />
          <meshStandardMaterial color="#222" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* balaústres verticais */}
        {[-3.2, -2.3, -1.4, -0.5, 0.4, 1.3, 2.2, 3.1].map((x) => (
          <mesh key={x} position={[x, 3.2, 0]} castShadow>
            <boxGeometry args={[0.03, 0.5, 0.03]} />
            <meshStandardMaterial color="#222" roughness={0.4} metalness={0.5} />
          </mesh>
        ))}
      </group>

      {/* piso interno (madeira) do pavimento térreo */}
      <mesh position={[-0.4, 0.31, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6.3, 4.5]} />
        <meshStandardMaterial color="#b08b5e" roughness={0.9} />
      </mesh>

      {/* ───── mobília interna (vista pela fachada / fases sala-escada) ───── */}
      <group>
        {/* tapete */}
        <mesh position={[-1.5, 0.33, 1.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[2.6, 1.7]} />
          <meshStandardMaterial color="#ccc3b0" roughness={1} />
        </mesh>
        {/* sofá — assento + encosto + braços */}
        <mesh position={[-1.5, 0.5, 1.35]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.34, 0.78]} />
          <meshStandardMaterial color="#8c8478" roughness={0.95} />
        </mesh>
        <mesh position={[-1.5, 0.82, 1.66]} castShadow>
          <boxGeometry args={[2.0, 0.5, 0.16]} />
          <meshStandardMaterial color="#8c8478" roughness={0.95} />
        </mesh>
        {[-2.42, -0.58].map((x) => (
          <mesh key={x} position={[x, 0.6, 1.35]} castShadow>
            <boxGeometry args={[0.16, 0.42, 0.78]} />
            <meshStandardMaterial color="#7d766b" roughness={0.95} />
          </mesh>
        ))}
        {/* mesa de centro */}
        <mesh position={[-1.5, 0.44, 0.5]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.07, 0.56]} />
          <meshStandardMaterial color="#5e4d38" roughness={0.7} />
        </mesh>
        <mesh position={[-1.5, 0.32, 0.5]} castShadow>
          <boxGeometry args={[0.8, 0.18, 0.38]} />
          <meshStandardMaterial color="#4a3d2c" roughness={0.7} />
        </mesh>

        {/* mesa de jantar + cadeiras */}
        <mesh position={[1.1, 0.74, -0.1]} castShadow receiveShadow>
          <boxGeometry args={[1.7, 0.07, 0.85]} />
          <meshStandardMaterial color="#5e4d38" roughness={0.7} />
        </mesh>
        <mesh position={[1.1, 0.42, -0.1]} castShadow>
          <boxGeometry args={[0.5, 0.66, 0.5]} />
          <meshStandardMaterial color="#4a3d2c" roughness={0.7} />
        </mesh>
        {[-0.6, 0.6].map((dz) => (
          <mesh key={dz} position={[1.1, 0.45, -0.1 + dz]} castShadow>
            <boxGeometry args={[0.45, 0.85, 0.08]} />
            <meshStandardMaterial color="#3a342c" roughness={0.85} />
          </mesh>
        ))}

        {/* bancada de cozinha (fundo) */}
        <mesh position={[-2.2, 0.74, -1.85]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 0.86, 0.55]} />
          <meshStandardMaterial color="#3a3631" roughness={0.6} metalness={0.2} />
        </mesh>
        <mesh position={[-2.2, 1.18, -1.85]} castShadow>
          <boxGeometry args={[2.4, 0.04, 0.57]} />
          <meshStandardMaterial color="#d9d6ce" roughness={0.4} />
        </mesh>

        {/* cama (pavimento superior, vista pelo rasgo de vidro) */}
        <mesh position={[0.4, 3.04, 0.7]} castShadow receiveShadow>
          <boxGeometry args={[1.9, 0.3, 1.5]} />
          <meshStandardMaterial color="#e6e1d6" roughness={0.95} />
        </mesh>
        <mesh position={[0.4, 3.3, -0.02]} castShadow>
          <boxGeometry args={[1.9, 0.55, 0.12]} />
          <meshStandardMaterial color="#9a8a6e" roughness={0.9} />
        </mesh>
      </group>

      {/* espreguiçadeiras + arbustos junto à piscina */}
      {[0.6, 2.2].map((z) => (
        <mesh key={z} position={[5.7, 0.32, 1.4 - 0.8 + z - 1.4]} castShadow receiveShadow>
          <boxGeometry args={[0.62, 0.12, 1.5]} />
          <meshStandardMaterial color="#cfc7b6" roughness={0.95} />
        </mesh>
      ))}
      {[
        [2.0, -1.7],
        [6.2, 2.7],
      ].map(([x, z], i) => (
        <mesh key={`shrub-${i}`} position={[x, 0.5, z]} castShadow>
          <icosahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial color="#5b6b50" roughness={1} flatShading />
        </mesh>
      ))}

      {/* murete baixo de concreto delimitando o deck/piscina */}
      <mesh position={[4.2, 0.5, -1.2]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 0.7, 0.14]} />
        <meshStandardMaterial color="#ece9e2" roughness={0.9} />
      </mesh>

      {/* escada externa (degraus para o platô) */}
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} position={[-4.1, 0.12 + i * 0.16, 1.6 - i * 0.34]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.16, 0.5]} />
          <meshStandardMaterial color="#d8d5cd" roughness={0.95} />
        </mesh>
      ))}

      {/* deck de madeira */}
      <mesh position={[4.2, 0.18, 1.4]} receiveShadow>
        <boxGeometry args={[5.2, 0.12, 5.4]} />
        <meshStandardMaterial color="#b08b5e" roughness={0.85} />
      </mesh>

      {/* piscina (rebaixo) — acima do nível do deck (y top 0.24): senão a
          madeira do deck cobre toda a piscina e a água nunca aparece */}
      <mesh position={[4.4, 0.34, 1.4]} receiveShadow>
        <boxGeometry args={[3.6, 0.16, 2.2]} />
        <meshStandardMaterial color="#0f3b44" roughness={0.2} metalness={0.2} />
      </mesh>
      {/* água */}
      <mesh ref={water} position={[4.4, 0.43, 1.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.4, 2.0]} />
        <meshStandardMaterial color="#5fa9b8" roughness={0.08} metalness={0.6} transparent opacity={0.55} />
      </mesh>

      {/* brilho interno quente — na parede de fundo (não mais bloqueando a
          vista da sala agora que a fachada de vidro está aberta) */}
      <group ref={glow} position={[-0.4, 1.4, 0]}>
        <pointLight color="#ffd9a0" intensity={6} distance={7} decay={2} />
        <mesh position={[0, 0, -2.35]}>
          <planeGeometry args={[4, 1.1]} />
          <meshStandardMaterial color="#ffcf95" emissive="#ffb45e" emissiveIntensity={0.5} toneMapped={false} />
        </mesh>
      </group>

      {/* vegetação mínima (árvores baixas) */}
      {[
        [-5.4, -2.2],
        [6.4, -1.4],
        [-6.2, 2.6],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.7, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.1, 1.4, 6]} />
            <meshStandardMaterial color="#7a6a52" roughness={1} />
          </mesh>
          <mesh position={[0, 1.7, 0]} castShadow>
            <icosahedronGeometry args={[0.7, 0]} />
            <meshStandardMaterial color="#5b6b50" roughness={1} flatShading />
          </mesh>
        </group>
      ))}
    </group>
  );
}
