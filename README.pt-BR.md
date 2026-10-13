[English](README.md) | **Português**

# Lumen Architecture

Site institucional de um escritório de arquitetura **fictício**, feito como peça de portfólio da MilWeb. A marca, os projetos, as estatísticas, os depoimentos e os contatos são ilustrativos (e-mail em domínio `.example`, telefone e WhatsApp inválidos); as fotos vêm do Unsplash.

> **Tipo:** demo comercial / portfólio (marca fictícia) · **Demo:** https://lumen-architecture-drab.vercel.app

![Hero com a casa 3D](docs/screenshots/hero.webp)

## Funcionalidades

- Página única com uma casa 3D gerada por código (sem modelo externo) em que a câmera percorre os ambientes conforme a rolagem.
- Segunda cena 3D interativa: arrastar para girar, zoom e seleção de ambiente (sala, quarto, cozinha, piscina).
- Seções de estúdio, serviços, projetos (com modal e galeria), processo, materiais, estatísticas animadas, depoimentos e contato.
- Cenas 3D carregadas sob demanda, com imagem de reserva quando o WebGL falha e DPR adaptativo conforme o desempenho.
- Respeita `prefers-reduced-motion` na câmera; rolagem suave com Lenis; preloader, cursor personalizado e botão de WhatsApp.
- Formulário de contato apenas visual (sem backend: só mostra o feedback de envio).
- Metadados SEO e JSON-LD com `react-helmet-async`.

![Seção de serviços](docs/screenshots/services.webp)

## Stack

- Vite 6, React 19, TypeScript 5
- three, @react-three/fiber, @react-three/drei e @react-three/postprocessing
- GSAP (ScrollTrigger), Framer Motion e Lenis
- SCSS Modules (sem Tailwind)
- react-helmet-async (metadados)
- Vitest + Testing Library (unitários) e Playwright (smoke e2e)
- ESLint e Prettier

## Como rodar

Pré-requisitos: Node.js 22 (usado na CI) e npm. O `.npmrc` do repositório liga `legacy-peer-deps`, necessário para instalar as dependências com React 19.

```bash
npm ci
npm run dev         # http://localhost:5173
```

Não há variáveis de ambiente.

## Scripts

| Script | O que faz |
| --- | --- |
| `npm run dev` | servidor de desenvolvimento do Vite |
| `npm run build` | typecheck (`tsc -b`) + build de produção em `dist/` |
| `npm run preview` | serve o build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc -b --noEmit` |
| `npm test` | Vitest |
| `npm run e2e` | Playwright (faz build e sobe o preview na porta 4173; requer navegadores do Playwright instalados) |
| `npm run format` / `format:check` | Prettier |

## Estrutura

```
src/
  sections/    seções da página (Hero, About, Services, Projects, ...)
  components/  navbar, cursor, preloader, modal, botões e animações
  three/       cenas 3D (casa procedural, câmera, luzes, cena interativa)
  hooks/       Lenis, viewport, DPR adaptativo, movimento reduzido
  constants/   conteúdo do site (fictício)
  styles/      tokens e estilos globais em SCSS
public/models/ instruções para trocar a casa procedural por um .glb
e2e/           testes Playwright
```

## Limitações

- Sem backend: o formulário de contato não envia dados.
- O conteúdo está fixo em `src/constants/site.ts` e só em português.
- Os chunks de 3D passam de 500 kB minificados (aviso do Vite no build).
- `npm run format:check` aponta arquivos fora do padrão do Prettier (pendência anterior a esta revisão).

## Créditos

Fotos: Unsplash (carregadas por URL de `images.unsplash.com`). Fontes: Cormorant Garamond e Manrope, via Google Fonts. A casa 3D é modelada em código no próprio projeto.

## Segurança

Veja [SECURITY.md](SECURITY.md).

## Licença

Ainda não há licença definida; todos os direitos reservados ao autor.
