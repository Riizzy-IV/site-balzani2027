// Case Edifício Central — Itatiba (Figma: [BAL] Novo Site › "Projeto - Edifício Central", node 422:1617)
// Medidas em px do frame de 1920 do Figma (viram "u" no CSS).

const img = (file) => `/img/cases/edificio-central/${file}`

export const CENTRAL = {
  slug: 'edificio-central',
  name: 'Edifício Central',
  hero: {
    src: img('hero.jpg'),
    logo: img('logo-hero.svg'),
    alt: 'Key visual Edifício Central: 80 m², 2 suítes, 2 varandas (1 gourmet). Viva o melhor de Itatiba em um só lugar: localização, vista incrível, projeto único e 100% residencial.',
  },
  intro: { top: 164, h: 600, textX: 548 },
  conceito: {
    title: ['Um projeto que une o privilégio de morar no centro, com sofisticação e exclusividade'],
    titleWidth: 396,
    text: [
      [
        'Comprar um apartamento no centro de Itatiba é ',
        { b: 'garantir praticidade total:' },
        ' acesso imediato a serviços e comércio, resolvendo a vida a pé. Mais que conveniência, ',
        { b: 'é um investimento estratégico' },
        '. A localização central assegura a valorização mais estável e a maior liquidez do seu patrimônio.',
        { b: ' É a escolha ideal para uma vida segura e eficiente.' },
      ],
    ],
    textWidth: 380,
  },
  feito: {
    title: ['Campanha', 'e enxoval completo'],
    columns: [
      { width: 204, bullets: { src: img('bullets.svg'), h: 89 }, items: ['Key Visual', 'Identidade Visual', 'Vídeo Conceito', 'Folder'] },
      { width: 120, bullets: { src: img('bullets.svg'), h: 89 }, items: ['Flyer', 'Outdoor', 'Tapume', 'Landing Page'] },
    ],
  },
  alinhamento: 'title',
  video: { src: null, poster: img('video-conceito-capa.jpg') },
  book: { src: img('book.jpg'), alt: 'Book do Edifício Central e páginas internas' },
  brandTop: 84,
  logos: [
    { src: img('logo-principal.svg'), w: 493, h: 114.158, box: 681, alt: 'Logo Edifício Central Itatiba' },
    { src: img('logo-versoes.svg'), w: 624, h: 662, alt: 'Versões do logo' },
  ],
  fonte: { family: 'Arboria', css: "'Arboria'", weights: ['Light', 'Medium', 'Bold'] },
  cores: {
    estilo: 'bloco',
    font: "'Arboria'",
    top: 137,
    overlap: 107,
    principal: { name: 'Verde Azulado', hex: '#003531', linhas: [['CMYK', '92/49/64/65'], ['RGB', '0/53/49'], ['HEX', '003531']] },
    demais: [
      { name: 'Verde Central', hex: '#0F595A', linhas: [['CMYK', '87/39/53/37'], ['RGB', '15/89/90'], ['HEX', '0F595A']] },
      { name: 'Azul Turquesa', hex: '#07AE9C', linhas: [['CMYK', '76/0/47/0'], ['RGB', '7/174/156'], ['HEX', '07AE9C']] },
      { name: 'Bege Dourado', hex: '#D7AF7B', linhas: [['CMYK', '16/32/55/4'], ['RGB', '215/175/123'], ['HEX', 'D7AF7B']] },
      { name: 'Off-white', hex: '#F6EFDD', dark: true, linhas: [['CMYK', '5/6/16/0'], ['RGB', '246/239/221'], ['HEX', 'F6EFDD']] },
    ],
  },
  destaque: { img: img('destaque.jpg'), alt: 'Sala de jantar integrada à varanda com vista para a cidade', h: 1237 },
  // o monitor está oculto no Figma: as telas sobem para não sobrar um vão em branco
  lp: {
    monitor: null,
    h: 2242,
    phone: { src: img('lp-celular.webp'), x: 1181, y: 104, w: 308 },
    tiles: [
      { src: img('lp-pagina.webp'), x: 263, y: 281, h: 1204, offset: 0, imgH: 2600 },
      { src: img('lp-pagina-2.webp'), x: 892, y: 916, h: 1024, offset: 1646.7, imgH: 2670.5 },
      { src: img('lp-pagina.webp'), x: 263, y: 1550, h: 942, offset: 1229.8, imgH: 2600 },
    ],
  },
  materiais: null,
  printTop: 370,
}
