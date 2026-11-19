// Conteúdo da página Serviços (Figma: [BAL] Novo Site › Serviços, node 882:1931)

export const svimg = (file) => `/img/servicos/${file}`

// Logos de IA flutuando ao lado de "Inteligência humana + artificial".
// x/y/size em px do frame de 1920 (posição absoluta dentro da seção); `box` = cartão com fundo e respiro.
export const IA_LOGOS = [
  { src: 'ia-seedance.png', alt: 'Seedance', x: 1148, y: 1021, size: 124, box: 'white', inner: 108.304, radius: 25.114 },
  { src: 'ia-m.png', alt: '', x: 1366, y: 1030, size: 200, radius: 32 },
  { src: 'ia-chatgpt.png', alt: 'ChatGPT', x: 1631, y: 1157, size: 124, box: 'white bordered', inner: 89.9, radius: 19.84 },
  { src: 'ia-squiggle.png', alt: '', x: 1600, y: 1357, size: 200, radius: 32 },
  { src: 'ia-gemini.png', alt: 'Gemini', x: 1547, y: 1613, size: 124, box: 'white bordered', inner: 83.08, radius: 19.84, flip: true },
  { src: 'ia-kling.png', alt: 'Kling AI', x: 1069, y: 1638, size: 125, box: 'black', inner: 65, radius: 20 },
  { src: 'ia-claude.png', alt: 'Claude', x: 1272, y: 1663, size: 200, radius: 32, bordered: true },
]

// Cada linha de `rows` é uma fileira de chips (algumas fileiras têm dois chips lado a lado no Figma)
export const SERVICOS = [
  {
    num: '01',
    title: 'estratégia',
    text: 'Definimos, planejamos e organizamos todas as etapas e estruturas da estratégia de lançamento e relacionamento',
    glow: 'card-glow-1.svg',
    rows: [
      ['Definição do Objetivo do Lançamento'],
      ['Planejamento de etapas, ações, e principais marcos'],
      ['Elaboração de um cronograma estratégico'],
      ['Estratégia de posicionamento e comunicação'],
      ['Definição da Estratégia Comercial'],
      ['Planejamento de comissão, bonificação e premiação'],
      ['Estratégia de relacionamento com imobiliárias'],
    ],
  },
  {
    num: '02',
    title: 'marketing',
    text: 'Definimos, planejamos e organizamos todas as etapas e estruturas da estratégia de lançamento e relacionamento',
    glow: 'card-glow-2.svg',
    line: true,
    rows: [
      ['Branding, logotipo e manuais'],
      ['Landing page e sites'],
      ['Book do empreendimento'],
      ['Mídia offline (material gráfico)'],
      ['Vídeo conceito', 'Social media'],
      ['Desenvolvimento de criativos'],
      ['Campanhas e tráfego pago'],
    ],
  },
  {
    num: '03',
    title: 'comercial',
    text: 'Definimos, planejamos e organizamos todas as etapas e estruturas da estratégia de lançamento e relacionamento',
    glow: 'card-glow-2.svg',
    line: true,
    rows: [
      ['Desenvolvimento e estruturação da área comercial'],
      ['Cliente oculto', 'Implementação de CRM'],
      ['Treinamento e acompanhamento semanal com especialista comercial'],
      ['Diagnóstico da operação comercial atual'],
      ['Definição de metas e indicadores de performance'],
      ['Estruturação do processo de atendimento do lead'],
    ],
  },
]
