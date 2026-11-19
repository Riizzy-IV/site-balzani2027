// Case Léman View (Figma: [BAL] Novo Site › "Projeto - Limão do Viu", node 422:2899)
// Medidas em px do frame de 1920 do Figma (viram "u" no CSS).

const img = (file) => `/img/cases/leman-view/${file}`

export const LEMAN = {
  slug: 'leman-view',
  name: 'Léman View',
  // topo montado (fundo + moldura com o prédio + frases): ver LemanHero em pages/CaseLemanView.jsx
  hero: {
    fundo: img('hero-fundo.jpg'),
    moldura: img('hero-moldura.webp'),
    predio: img('hero-predio.webp'),
    esquerda: ['ESSENCIALMENTE', 'ÚNICO'],
    // quebras de linha como no Figma (a fonte substituta tem outra largura)
    direita: ['O NOVO', 'MARCO QUE', 'REDEFINE', 'O HORIZONTE', 'DE RIBEIRÃO.'],
  },
  conceito: {
    title: ['O bem-estar', 'para seus dias.', 'Um privilégio', 'para sua vida'],
    text: [
      'Ribeirão Preto combina a força econômica de uma metrópole com a qualidade de vida do interior, destacando-se como um polo de saúde e educação de referência nacional. A cidade oferece uma infraestrutura de alto padrão, com shoppings de luxo e gastronomia pulsante, sem abrir mão de parques arborizados e segurança. É o destino ideal para quem busca prosperidade no agronegócio e tecnologia, vivendo em uma das cidades com os melhores índices de bem-estar do Brasil.',
    ],
    textWidth: 396,
  },
  feito: {
    title: ['Campanha', 'e enxoval completo'],
    columns: [
      {
        width: 187,
        bullets: { src: img('bullets-1.svg'), h: 89 },
        items: ['Key Visual', 'Identidade Visual', 'Vídeo Conceito', 'Folder'],
      },
      {
        width: 260,
        bullets: { src: img('bullets-2.svg'), h: 117 },
        items: ['Outdoor, Cavalete e Windbanner', 'Tapume', 'Landing Page', 'Aprimoramento de Imagens', 'Campanha de Tráfego Pago'],
      },
    ],
  },
  alinhamento: 'title',
  // vídeos: preenchimentos de vídeo no Figma (não exportáveis); a capa é o quadro exportado do Figma.
  // Coloque os .mp4 em public/img/cases/leman-view/ e informe aqui.
  video: { src: null, poster: img('video-conceito-capa.jpg') },
  book: { src: img('books.jpg'), alt: 'Book do Léman View e materiais de papelaria', bg: 'linear-gradient(to bottom, #eaeaea calc(var(--u) * 1068), #fff calc(var(--u) * 1068))', top: 31, h: 1037, total: 1080 },
  compare: { antes: img('antes.jpg'), depois: img('depois.jpg'), alt: 'lounge' },
  logos: [
    { src: img('logo-principal.svg'), w: 457, h: 109, box: 681, alt: 'Logo Léman View' },
    { src: img('logo-versoes.svg'), w: 624, h: 662, alt: 'Versões do logo em branco e preto' },
  ],
  fonte: { family: 'Gibson', css: "'Gibson'", weights: ['Light', 'Medium', 'Bold'] },
  cores: {
    estilo: 'simples', // só nome + hex
    left: 8,
    gap: 12,
    top: 79,
    overlap: 139,
    colunas: [
      [
        { name: 'Bay Blue', hex: '#011F3B', w: 670, h: 571 },
        { name: 'Sky Blue', hex: '#004F98', w: 670, h: 241 },
      ],
      [
        { name: 'Dark Gold', hex: '#A07F37', w: 541, h: 571 },
        { name: 'Light Gold', hex: '#D7BD81', w: 541, h: 241 },
      ],
      [
        { name: 'Crimson Red', hex: '#6D0007', w: 430, h: 439 },
        { name: 'White', hex: '#FFFFFF', w: 430, h: 181, dark: true },
        { name: 'Black', hex: '#000000', bg: '#242423', w: 430, h: 181 },
      ],
    ],
  },
  destaque: { video: null, poster: img('video-piscina-capa.jpg'), alt: 'Piscina do Léman View ao entardecer' },
  lp: {
    monitor: img('lp-monitor.jpg'),
    phone: { src: img('lp-celular.webp'), x: 1294, w: 308 },
    tiles: [
      { src: img('lp-pagina.webp'), x: 263, y: 1064, h: 1204, offset: 0, imgH: 3681 },
      { src: img('lp-pagina.webp'), x: 892, y: 1205, h: 1024, offset: 1328.6, imgH: 3681 },
      { src: img('lp-pagina-2.webp'), x: 263, y: 2333, h: 942, offset: 1369.7, imgH: 3681 },
      { src: img('lp-pagina.webp'), x: 892, y: 2275, h: 915, offset: 2766.4, imgH: 3681 },
    ],
  },
  // No Figma, os slides 2 e 3 ainda são o flyer e o outdoor do Helena Bay (sobra do modelo); ficou só o do Léman
  materiais: [
    { alt: 'Folder e flyers', layers: [{ src: img('materiais.jpg'), alt: 'Folder, flyer e lâmina do Léman View', x: 0, y: 0, w: 1459, h: 816, cover: true }] },
  ],
}
