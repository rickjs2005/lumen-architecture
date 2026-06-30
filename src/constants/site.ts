// ── Conteúdo do site (fictício, para portfólio) ─────────────────────

/** URL Unsplash em alta, otimizada. */
export const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const STUDIO = {
  name: "Lumen",
  full: "Lumen Architecture",
  tagline: "Arquitetura contemporânea — luz, matéria e precisão.",
  email: "studio@lumen.archi",
  phone: "+55 31 4000-0000",
  whatsapp: "5531940000000",
  address: "Rua das Acácias, 240 — Belo Horizonte, BR",
  instagram: "https://instagram.com",
};

export const whatsappLink = (text: string) =>
  `https://wa.me/${STUDIO.whatsapp}?text=${encodeURIComponent(text)}`;

export const NAV = [
  { label: "Estúdio", href: "#about" },
  { label: "Serviços", href: "#services" },
  { label: "Projetos", href: "#projects" },
  { label: "Processo", href: "#process" },
  { label: "Materiais", href: "#materials" },
  { label: "Contato", href: "#contact" },
] as const;

export type Service = {
  n: string;
  title: string;
  desc: string;
  image: string;
};

export const SERVICES: Service[] = [
  {
    n: "01",
    title: "Projeto arquitetônico",
    desc: "Concepção completa — do estudo de viabilidade ao executivo, com compatibilização entre todas as disciplinas.",
    image: img("1600585154340-be6161a56a0c", 1000),
  },
  {
    n: "02",
    title: "Gerenciamento de obra",
    desc: "Acompanhamento técnico semanal, cronograma físico-financeiro e controle de qualidade até a entrega.",
    image: img("1486406146926-c627a92ad1ab", 1000),
  },
  {
    n: "03",
    title: "Interiores & Marcenaria",
    desc: "Projeto de interiores integrado à arquitetura, com marcenaria sob medida e curadoria de materiais.",
    image: img("1493809842364-78817add7ffb", 1000),
  },
  {
    n: "04",
    title: "Reforma & Retrofit",
    desc: "Requalificação de imóveis existentes — estrutura, instalações e linguagem — sem perder o caráter original.",
    image: img("1502672260266-1c1ef2d93688", 1000),
  },
  {
    n: "05",
    title: "Consultoria & Viabilidade",
    desc: "Leitura de terreno, potencial construtivo e estimativa de investimento antes de iniciar o projeto.",
    image: img("1448630360428-65456885c650", 1000),
  },
];

export type Project = {
  id: string;
  title: string;
  city: string;
  year: string;
  area: string;
  category: string;
  image: string;
  /** imagens adicionais (detalhes/materiais) exibidas na galeria do modal */
  gallery: string[];
  blurb: string;
};

export const PROJECTS: Project[] = [
  { id: "casa-horizonte", title: "Casa Horizonte", city: "São Paulo", year: "2024", area: "640 m²", category: "Residencial", image: img("1600585154340-be6161a56a0c"), gallery: [img("1610701596007-11502861dcfa", 1000), img("1503328427499-d92d1ac3d174", 1000)], blurb: "Uma residência aberta à paisagem, onde lajes longas filtram o sol da tarde e enquadram a linha do horizonte. A vida acontece entre o concreto e o jardim." },
  { id: "pavilhao-luz", title: "Pavilhão Luz", city: "Lisboa", year: "2023", area: "1.200 m²", category: "Cultural", image: img("1512917774080-9991f1c4c750"), gallery: [img("1518709268805-4e9042af9f23", 1000), img("1604147706283-d7119b5b822c", 1000)], blurb: "Espaço expositivo que captura a luz atlântica por lanternins altos. A estrutura recua para que a obra e a claridade sejam as protagonistas." },
  { id: "villa-margem", title: "Villa Margem", city: "Comporta", year: "2024", area: "880 m²", category: "Residencial", image: img("1580587771525-78b9dba3b914"), gallery: [img("1610701596007-11502861dcfa", 1000), img("1517245386807-bb43f82c33c4", 1000)], blurb: "Casa de veraneio assente sobre a duna, em madeira e cal. Os ambientes deslizam para fora, dissolvendo o limite entre interior e areal." },
  { id: "atrio-norte", title: "Átrio Norte", city: "Copenhague", year: "2022", area: "3.400 m²", category: "Corporativo", image: img("1486406146926-c627a92ad1ab"), gallery: [img("1503328427499-d92d1ac3d174", 1000), img("1518709268805-4e9042af9f23", 1000)], blurb: "Sede corporativa organizada em torno de um átrio iluminado por cima. Circulações generosas e materiais sóbrios convidam ao encontro." },
  { id: "casa-pedra", title: "Casa Pedra", city: "Atenas", year: "2023", area: "520 m²", category: "Residencial", image: img("1449157291145-7efd050a4d0e"), gallery: [img("1604147706283-d7119b5b822c", 1000), img("1610701596007-11502861dcfa", 1000)], blurb: "Volume de pedra local encravado na encosta, fresco no verão grego. Pátios internos trazem sombra, água e o aroma das oliveiras." },
  { id: "galeria-branca", title: "Galeria Branca", city: "Cidade do México", year: "2024", area: "1.900 m²", category: "Cultural", image: img("1518005020951-eccb494ad742"), gallery: [img("1503328427499-d92d1ac3d174", 1000), img("1518709268805-4e9042af9f23", 1000)], blurb: "Galeria de arte contemporânea em paredes brancas contínuas e piso de cimento queimado. A luz zenital varia a exposição ao longo do dia." },
];

export type Material = {
  name: string;
  note: string;
  desc: string;
  image: string;
};

export const MATERIALS: Material[] = [
  { name: "Madeira", note: "Carvalho · Freijó", desc: "Calidez tátil que envelhece com a luz e marca o tempo da casa.", image: img("1610701596007-11502861dcfa") },
  { name: "Concreto", note: "Aparente · Liso", desc: "Massa e silêncio. A estrutura assumida como acabamento.", image: img("1503328427499-d92d1ac3d174") },
  { name: "Vidro", note: "Baixo ferro", desc: "Dissolve o limite entre dentro e fora — a paisagem entra.", image: img("1518709268805-4e9042af9f23") },
  { name: "Aço", note: "Corten · Negro", desc: "Linhas finas, vãos longos. Precisão que desaparece na leveza.", image: img("1517245386807-bb43f82c33c4") },
  { name: "Pedra Natural", note: "Travertino", desc: "Geologia doméstica: textura, veio e permanência.", image: img("1604147706283-d7119b5b822c") },
];

export type Step = { n: string; title: string; desc: string };

export const PROCESS: Step[] = [
  { n: "01", title: "Conceito", desc: "Da implantação ao gesto. Diagramas, referências e a ideia que organiza tudo." },
  { n: "02", title: "Planta", desc: "Fluxos, luz e proporção. O desenho técnico que vira espaço habitável." },
  { n: "03", title: "Modelagem", desc: "Estudo tridimensional de massa, sombra e materialidade em tempo real." },
  { n: "04", title: "Construção", desc: "Detalhamento, canteiro e acompanhamento — o desenho à prova do real." },
  { n: "05", title: "Entrega", desc: "Ajuste fino de luz e atmosfera. A casa pronta para ser vivida." },
];

export type Stat = { value: number; suffix?: string; label: string };

export const STATS: Stat[] = [
  { value: 128, suffix: "+", label: "Projetos" },
  { value: 94, label: "Clientes" },
  { value: 17, label: "Prêmios" },
  { value: 11, label: "Países" },
];

export type Testimonial = { quote: string; name: string; role: string; avatar: string };

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "A Lumen entendeu a luz da nossa casa antes de nós. Cada ambiente parece ter sido desenhado para uma hora exata do dia.",
    name: "Helena Castro",
    role: "Cliente · Casa Horizonte",
    avatar: img("1494790108377-be9c29b29330", 200),
  },
  {
    quote:
      "Rigor e poesia na mesma planta. O pavilhão virou referência da cidade — e funciona impecavelmente.",
    name: "Tomás Vieira",
    role: "Diretor · Fundação Cultural",
    avatar: img("1500648767791-00dcc994a43e", 200),
  },
  {
    quote:
      "Trabalho do conceito à obra com uma clareza rara. Sair do estúdio com um modelo 3D que vira realidade é outro nível.",
    name: "Marina Lopes",
    role: "Incorporadora",
    avatar: img("1438761681033-6461ffad8d80", 200),
  },
];

export const META = {
  url: "https://lumen.archi",
  ogImage: img("1600585154340-be6161a56a0c", 1200),
};
