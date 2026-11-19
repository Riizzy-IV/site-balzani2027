// Conteúdo da página Sobre (Quem somos). Edite aqui textos e imagens sem mexer nos componentes.

export const simg = (file) => `/img/sobre/${file}`

export const PILARES = [
  {
    title: ['Nosso', 'propósito'],
    text: 'Existimos para transformar a forma como incorporadoras lançam, comunicam e vendem, com excelência, estratégia e performance.',
  },
  {
    title: ['Nossa', 'Missão'],
    text: 'Ajudar incorporadoras e construtoras a lançar e vender empreendimentos imobiliários.',
  },
  {
    title: ['Nossa', 'Visão'],
    text: 'Ser, até 2028, o maior e mais completo hub para o mercado imobiliário do Brasil.',
  },
]

// Galeria "Ao lado de grandes empresários". `crop` reproduz o enquadramento do Figma.
export const EMPRESARIOS = [
  {
    name: 'João Appolinário',
    image: simg('emp-joao.jpg'),
    area: 'joao',
    chip: 'top',
    crop: { h: '127.77%', w: '130.46%', left: '-11.21%', top: '-0.2%' },
  },
  {
    name: 'Luiza Trajano',
    image: simg('emp-luiza.jpg'),
    area: 'luiza',
    chip: 'top',
    crop: { h: '130.59%', w: '100%', left: '0', top: '-30.7%' },
  },
  { name: 'Semenzato', image: simg('emp-semenzato.jpg'), area: 'semenzato', chip: 'top' },
  {
    name: 'Sergio Zimerman',
    image: simg('emp-sergio.jpg'),
    area: 'sergio',
    chip: 'bottom',
    crop: { h: '117.76%', w: '101.2%', left: '-0.48%', top: '-10.05%' },
  },
  { name: 'G4 Educação', image: simg('emp-g4.jpg'), area: 'g4', chip: 'bottom' },
]

export const SATISFACAO = {
  avaliacoes: 75,
  nota: '*Pesquisa realizada trimestralmente',
}
