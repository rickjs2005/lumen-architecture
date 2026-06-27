Modelos 3D (GLB)
================

Para usar um modelo de residência REAL na seção "Gire a casa":

1. Baixe um .glb (ex.: Sketchfab → filtro "Downloadable" + licença CC0/CC-BY).
   Prefira modelos com compressão Draco/Meshopt (mais leves).
2. Salve aqui como:  residence.glb
3. Em src/three/Residence.tsx, troque:
       const RESIDENCE_GLB: string | null = null;
   por:
       const RESIDENCE_GLB: string | null = "/models/residence.glb";

Pronto — o modelo carrega com Suspense e, se faltar/falhar, cai
automaticamente na casa procedural (fallback). Ajuste escala/posição
no componente GltfModel conforme o modelo escolhido.
