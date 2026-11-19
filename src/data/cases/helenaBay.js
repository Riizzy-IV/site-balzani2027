// Case Helena Bay Residence (Figma: [BAL] Novo Site › "Projeto - Helena Beiço", node 422:1261)
// Medidas em px do frame de 1920 do Figma (viram "u" no CSS).

const img = (file) => `/img/cases/helena-bay/${file}`

export const HELENA = {
  slug: 'helena-bay',
  name: 'Helena Bay Residence',
  hero: {
    src: img('key-visual.jpg'),
    alt: 'Key visual Helena Bay Residence: um projeto para inspirar a vida, 1 a 3 suítes, 59 a 112 m², Praia de Santa Helena - ES',
  },
  conceito: {
    title: ['Um projeto para inspirar a vida'],
    // TODO cliente: o Figma ainda traz lorem ipsum neste texto
    text: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in mollis urna, eu ultricies lacus. Nam non finibus erat. Integer non felis eu ligula faucibus tempor. Nunc vel lorem rhoncus, venenatis ligula sit amet, gravida neque. Sed suscipit nec quam vitae auctor. Mauris vel semper tortor, ut sodales odio. Donec fermentum ante velit, vestibulum laoreet nibh finibus non. Nam eu metus id lorem volutpat viverra. Maecenas vestibulum porttitor libero. Curabitur scelerisque vel dolor id vehicula.',
      'Phasellus vel dolor suscipit, luctus arcu quis, consequat urna. Duis tincidunt volutpat lacus, nec tempor quam vulputate a. Morbi fermentum ex id pellentesque euismod. Quisque ultrices, dolor a congue lacinia, magna risus fringilla mauris, eget ultricies eros nulla vitae turpis. Phasellus porttitor odio urna. Sed lobortis accumsan volutpat. Phasellus eros ante, maximus a finibus commodo, ornare et ipsum.',
    ],
    textWidth: 428,
  },
  feito: {
    title: ['Campanha', 'e enxoval completo'],
    columns: [
      {
        width: 209,
        bullets: { src: img('bullets.svg'), h: 257 },
        items: [
          'Key Visual',
          'Identidade Visual',
          'Vídeo Conceito',
          'Folder',
          'Flyer',
          'Outdoor',
          'Tapume',
          'Landing Page',
          'Aprimoramento de Imagens',
          'Campanha de Tráfego Pago',
        ],
      },
    ],
  },
  // texto e lista começam na altura do botão (Helena) ou do título (Léman)
  alinhamento: 'pill',
  // vídeo conceito: no Figma é um preenchimento de vídeo (não exportável). Coloque o .mp4 em
  // public/img/cases/helena-bay/ e informe aqui, ex.: src: img('video-conceito.mp4')
  // a capa exportada do Figma é um quadro 100% preto: sem vídeo, a faixa fica oculta
  video: { src: null, poster: null },
  book: { src: img('book.jpg'), alt: 'Book do empreendimento Helena Bay e páginas internas', tag: 'Book' },
  compare: { antes: img('antes.jpg'), depois: img('depois.jpg'), alt: 'piscina' },
  logos: [
    { src: img('logo-principal.svg'), w: 681, h: 288, alt: 'Logo Helena Bay Residence' },
    { src: img('logo-versoes.svg'), w: 624, h: 662, alt: 'Versões do logo em branco e preto' },
  ],
  fonte: { family: 'Bluer Nue', css: "'Blauer Nue'", weights: ['Light', 'Medium', 'Bold'] },
  cores: {
    estilo: 'completo', // nome + CMYK + RGB + hex, título "Cores" no primeiro card
    left: 0,
    gap: 12.73,
    top: 67,
    overlap: 134.5,
    colunas: [
      [
        { name: 'Bay Blue', cmyk: '81/46/27/11', rgb: '51/110/144', hex: '#336E90', w: 674.545, h: 575.455, title: true },
        { name: 'Sky Blue', cmyk: '65/26/17/2', rgb: '92/156/188', hex: '#5C9CBC', w: 674.545, h: 241.818 },
      ],
      [
        { name: 'Ochre', cmyk: '27/36/54/14', rgb: '179/149/114', hex: '#B39572', w: 546.364, h: 575.455 },
        { name: 'Sand', cmyk: '15/25/35/2', rgb: '219/192/167', hex: '#DBC0A7', w: 546.364, h: 241.818 },
      ],
      [
        { name: 'Crimson Red', cmyk: '36/89/67/56', rgb: '100/34/38', hex: '#642226', w: 433.636, h: 442.727 },
        { name: 'White', cmyk: '0/0/0/0', rgb: '255/255/255', hex: '#FFFFFF', w: 433.636, h: 181.818, dark: true, plain: true },
        { name: 'Black', cmyk: '100/100/100/100', rgb: '0/0/0', hex: '#000000', bg: '#242423', w: 433.636, h: 181.818, plain: true },
      ],
    ],
  },
  destaque: { img: img('rooftop.jpg'), alt: 'Perspectiva do rooftop do Helena Bay à noite' },
  lp: {
    monitor: img('lp-monitor.jpg'),
    phone: { src: img('lp-celular.webp'), x: 1292, w: 312 },
    // a landing page longa é uma imagem só, mostrada em 4 recortes
    tiles: [
      { src: img('lp-pagina.webp'), x: 263, y: 1064, h: 1204, offset: 0, imgH: 4096 },
      { src: img('lp-pagina.webp'), x: 892, y: 1205, h: 1024, offset: 1213, imgH: 4096 },
      { src: img('lp-pagina.webp'), x: 263, y: 2333, h: 942, offset: 2222, imgH: 4096 },
      { src: img('lp-pagina.webp'), x: 892, y: 2275, h: 915, offset: 3181, imgH: 4096 },
    ],
  },
  // cada slide: camadas posicionadas (px do slide de 1459x816)
  materiais: [
    {
      alt: 'Folder',
      layers: [
        { src: img('folder-dentro.webp'), alt: 'Folder Helena Bay aberto', x: 33, y: 4.86, w: 995.326, h: 652.371 },
        { src: img('folder-fora.webp'), alt: 'Folder Helena Bay, lado externo', x: 463.58, y: 218.51, w: 961.551, h: 592.111 },
      ],
    },
    { alt: 'Flyer', layers: [{ src: img('flyer.webp'), alt: 'Flyer Helena Bay', x: 68.61, y: -87.75, w: 1320.916, h: 990.9 }] },
    { alt: 'Outdoor', layers: [{ src: img('outdoor.webp'), alt: 'Outdoor Helena Bay', x: 0, y: -4.33, w: 1459, h: 820.67 }] },
  ],
}
