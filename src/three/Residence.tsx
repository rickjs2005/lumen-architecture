import { Suspense } from "react";
import { useGLTF } from "@react-three/drei";
import { House } from "./House";
import { SceneBoundary } from "@/components/SceneBoundary";

/**
 * Pipeline de modelo GLB com fallback gracioso para a casa procedural.
 *
 * Para usar um modelo real: baixe um .glb de residência (ex.: Sketchfab CC0),
 * salve em `public/models/residence.glb` e troque a constante abaixo para
 * "/models/residence.glb". Draco/Meshopt são resolvidos automaticamente.
 * Se o arquivo faltar ou falhar, cai na casa procedural — nada quebra.
 */
const RESIDENCE_GLB: string | null = null;

type Props = { glass?: "premium" | "simple" };

function GltfModel({ url }: { url: string }) {
  const { scene } = useGLTF(url, true);
  // ajuste escala/posição conforme o modelo escolhido
  return <primitive object={scene} />;
}

export function Residence({ glass = "simple" }: Props) {
  if (!RESIDENCE_GLB) return <House glass={glass} />;
  return (
    <SceneBoundary fallback={<House glass={glass} />}>
      <Suspense fallback={<House glass={glass} />}>
        <GltfModel url={RESIDENCE_GLB} />
      </Suspense>
    </SceneBoundary>
  );
}
