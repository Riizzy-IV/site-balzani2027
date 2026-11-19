// Case Madri Condomínio Clube (Figma: [BAL] Novo Site › "Projeto - Real Madrid", node 422:1433)
// Medidas em px do frame de 1920 do Figma (viram "u" no CSS).

const img = (file) => `/img/cases/madri/${file}`

export const MADRI = {
  slug: 'madri',
  name: 'Madri Condomínio Clube',
  hero: {
    src: img('hero.jpg'),
    alt: 'Key visual Madri Condomínio Clube: um condomínio com lazer completo, com preço que cabe no seu bolso, 2 dorms 42 m², Minha Casa Minha Vida',
  },
  conceito: {
    title: ['Um novo conceito de viver bem em Ourinhos'],
    text: [
      'Localizado na Rua Edwin Hasligner, em Ourinhos, o empreendimento está em uma cidade que une tranquilidade, boa estrutura e qualidade de vida. Com comércio ativo, serviços essenciais e fácil mobilidade, Ourinhos oferece tudo para uma rotina prática e confortável.',
      'A proximidade com o Atacadão reforça a conveniência do endereço, pensado para quem valoriza bem-estar, acessibilidade e um dia a dia mais simples.',
    ],
    textWidth: 396,
    // no Figma os dois parágrafos vêm colados (um só bloco de texto); 12 = a entrelinha que o corte de texto tira
    gap: 12,
  },
  feito: {
    title: ['Campanha', 'e enxoval completo'],
    columns: [
      { width: 187, bullets: { src: img('bullets.svg'), h: 89 }, items: ['Key Visual', 'Identidade Visual', 'Vídeo Conceito', 'Folder'] },
      { width: 230, bullets: { src: img('bullets.svg'), h: 89 }, items: ['Outdoor', 'Tapume', 'Landing Page', 'Campanha de Tráfego Pago'] },
    ],
  },
  alinhamento: 'title',
  // vídeo conceito: preenchimento de vídeo no Figma (não exportável); a capa exportada é 100% preta,
  // então a faixa fica oculta até o .mp4 chegar (informe em src)
  video: { src: null, poster: null },
  book: { src: img('book.jpg'), alt: 'Folder e book do Madri Condomínio Clube', bg: '#eaeaea', h: 1068, total: 1068, w: 1632, imgH: 114.15, imgTop: -7.87 },
  redes: {
    usuario: 'madri.condominioclube',
    avatar: img('avatar.webp'),
    posts: [img('post-1.jpg'), img('post-2.jpg'), img('post-3.jpg'), img('post-4.jpg')],
    icones: {
      mais: img('ic-mais.svg'),
      acoes: [
        { src: img('ic-1.svg'), x: 33, w: 22, h: 19 },
        { src: img('ic-3.svg'), x: 70, w: 19, h: 19 },
        { src: img('ic-2.svg'), x: 102, w: 18, h: 19 },
        { src: img('ic-4.svg'), x: 296, w: 16, h: 19 },
      ],
    },
  },
  brandBg: 'gray',
  brandTop: 285,
  logos: [
    { src: img('logo-principal.svg'), w: 681, h: 183.886, alt: 'Logo Madri Condomínio Clube' },
    { src: img('logo-versoes.svg'), w: 624, h: 662, alt: 'Versões do logo em branco e preto' },
  ],
  fonte: { family: 'Poppins', css: "'Poppins'", weights: ['Light', 'Medium', 'Bold'] },
  cores: {
    estilo: 'bloco',
    font: "'Poppins'",
    top: 143,
    overlap: 107,
    principal: { name: 'Azul Royal', hex: '#1F1E5B', linhas: [['CMYK', '100/98/22/34'], ['RGB', '31/30/91'], ['HEX', '1F1E5B']] },
    demais: [
      // no Figma o RGB do amarelo repete o do azul (31/30/91); aqui vai o valor correto de #FBAA19
      { name: 'Amarelo Canário', hex: '#FBAA19', linhas: [['CMYK', '0/38/100/0'], ['RGB', '251/170/25'], ['HEX', 'FBAA19']] },
      { name: 'Cinza Escuro', hex: '#434343', linhas: [['CMYK', '67/60/59/44'], ['RGB', '67/67/67'], ['HEX', '434343']] },
      { name: 'Cinza médio', hex: '#727376', linhas: [['CMYK', '57/48/45/12'], ['RGB', '115/116/119'], ['HEX', '727376']] },
      { name: 'white', hex: '#FFFFFF', dark: true, linhas: [['CMYK', '0/0/0/0'], ['RGB', '255/255/255'], ['HEX', 'FFFFFF']] },
    ],
  },
  // a imagem é mais larga que a tela (2200 px, deslocada 138 px para a esquerda)
  destaque: { img: img('destaque.jpg'), alt: 'Piscina do Madri Condomínio Clube', h: 1237, w: 114.583, left: -7.1875 },
  // o espaço do monitor está vazio no Figma: as telas sobem para não sobrar um vão em branco
  lp: {
    monitor: null,
    h: 2220,
    phone: { src: img('lp-celular.webp'), x: 1181, y: 127, w: 308 },
    tiles: [
      { src: img('lp-pagina.webp'), x: 263, y: 304, h: 1204, offset: 0, imgH: 2600 },
      { src: img('lp-pagina.webp'), x: 892, y: 939, h: 1024, offset: 788, imgH: 2600 },
      { src: img('lp-pagina-2.webp'), x: 263, y: 1573, h: 942, offset: 1657.5, imgH: 2600 },
    ],
  },
  // materiais impressos: no Figma o carrossel ainda tem os do Léman/Helena (sobra do modelo) — fica de fora
  materiais: null,
  printTop: 400,
}
