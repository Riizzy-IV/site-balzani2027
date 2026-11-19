// Case Recanto do Tatuamunha — ACF Lucas (Figma: [BAL] Novo Site › "Projeto - ACF Lucas", node 422:2577)
// Medidas em px do frame de 1920 do Figma (viram "u" no CSS).

const img = (file) => `/img/cases/recanto-do-tatuamunha/${file}`

export const RECANTO = {
  slug: 'recanto-do-tatuamunha',
  name: 'Recanto do Tatuamunha',
  // topo montado em camadas: ver RecantoHero em pages/CaseRecanto.jsx
  hero: {
    fundo: img('hero-fundo.jpg'),
    paisagem: img('hero-paisagem.webp'),
    casal: img('hero-casal.webp'),
    faixa: img('hero-faixa.webp'),
    folha: img('hero-folha.webp'),
    folha2: img('hero-folha-2.webp'),
    folhas: img('hero-folhas.webp'),
    logo: img('hero-logo.svg'),
    overline: img('hero-overline.svg'),
    textura: img('hero-textura.svg'),
  },
  intro: { top: 164, h: 600, textX: 594 },
  conceito: {
    title: ['Um loteamento privilegiado em Porto de Pedras ao lado da natureza com tranquilidade'],
    titleWidth: 453,
    // no Figma a frase termina em vírgula; ajustado para ponto final
    text: [
      'Localizado na principal rua, ao lado do Riacho Tabatinga, próximo à praia e rodeado por um cenário de conveniência, o Recanto do Tatuamunha é o refúgio ideal para quem deseja fugir da rotina da cidade.',
    ],
    textWidth: 269,
  },
  feito: {
    title: ['Campanha', 'e enxoval completo'],
    columns: [
      { width: 204, bullets: { src: img('bullets.svg'), h: 89 }, items: ['Key Visual', 'Identidade Visual', 'Vídeo Conceito', 'Folder'] },
      { width: 220, gap: 0, bullets: { dot: img('dot.svg') }, items: ['Flyer', 'Outdoor', 'Tapume', 'Landing Page', 'Campanha de Tráfego Pago'] },
    ],
  },
  alinhamento: 'title',
  video: { src: null, poster: img('video-conceito-capa.jpg') },
  book: { src: img('book.jpg'), alt: 'Book do Recanto do Tatuamunha e páginas internas' },
  brandTop: 84,
  logos: [
    { src: img('logo-principal.svg'), w: 299, h: 286, box: 681, alt: 'Logo Recanto do Tatuamunha' },
    { src: img('logo-versoes.svg'), w: 624, h: 662, alt: 'Versões do logo' },
  ],
  fonte: { family: 'Outfit', css: "'Outfit'", weights: ['Light', 'Medium', 'Bold'] },
  cores: {
    estilo: 'bloco',
    font: "'Arboria'",
    top: 137,
    overlap: 107,
    principal: { name: 'Verde Escuro', hex: '#425A0E', linhas: [['CMYK', '71/42/100/36'], ['HEX', '425A0E']] },
    demais: [
      { name: 'Azul Escuro', hex: '#074882', linhas: [['CMYK', '100/79/23/7'], ['HEX', '074882']] },
      { name: 'Ciano', hex: '#2BA6C7', linhas: [['CMYK', '73/16/15/0'], ['HEX', '2BA6C7']] },
      { name: 'Verde Médio', hex: '#93BE19', linhas: [['CMYK', '48/5/100/0'], ['HEX', '93BE19']] },
      { name: 'Verde Claro', hex: '#C3D366', dark: true, linhas: [['CMYK', '27/4/76/0'], ['HEX', 'C3D366']] },
    ],
  },
  destaque: { img: img('destaque.jpg'), alt: 'Vista aérea do loteamento junto ao Riacho Tabatinga', h: 1237, shadow: true },
  lp: {
    monitor: null,
    h: 2242,
    phone: { src: img('lp-celular.webp'), x: 1181, y: 104, w: 308 },
    tiles: [
      { src: img('lp-pagina.webp'), x: 263, y: 281, h: 1204, offset: 0, imgH: 2600 },
      { src: img('lp-pagina-2.webp'), x: 892, y: 916, h: 1024, offset: 1646.7, imgH: 2670.5 },
      { src: img('lp-pagina.webp'), x: 263, y: 1550, h: 942, offset: 1118.7, imgH: 2600 },
    ],
  },
  materiais: null,
  printTop: 370,
}
