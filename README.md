# Lumen Architecture

Site institucional de um escritório de arquitetura fictício, feito como peça de portfólio da MilWeb. O escritório, os projetos e os depoimentos são ilustrativos; as fotos vêm do Unsplash.

É uma página única com uma casa 3D gerada por código (sem modelo externo) em que a câmera percorre os ambientes conforme a rolagem, uma segunda cena 3D interativa e seções de sobre, projetos, serviços, processo, materiais, estatísticas, depoimentos e contato. As cenas 3D carregam sob demanda e têm imagem de reserva quando o WebGL falha.

## Stack

- Vite 6, React 19, TypeScript
- three, @react-three/fiber, @react-three/drei e @react-three/postprocessing
- GSAP (ScrollTrigger), Framer Motion e Lenis
- SCSS Modules (sem Tailwind)
- react-helmet-async (metadata)
- Vitest + Testing Library (unitários) e Playwright (smoke e2e)

## Como rodar

O `.npmrc` do repositório liga `legacy-peer-deps`, necessário para instalar as dependências com React 19.

```bash
npm install
npm run dev         # http://localhost:5173
npm run build       # typecheck (tsc -b) + build de produção em dist/
npm run preview     # serve o build
npm run lint
npm run typecheck
npm test            # Vitest
npm run e2e         # Playwright
npm run format      # Prettier
```

Não há variáveis de ambiente.
