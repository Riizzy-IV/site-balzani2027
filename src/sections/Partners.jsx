import { useEffect, useState } from 'react'
import { VIDEO, img } from '../data/home.js'
import { SectionHeading } from '../components/ui.jsx'

// `sobre` = texto do balão no hover/toque (mesmos textos da apresentação comercial)
const LOGOS = [
  {
    src: 'partner-neymar.svg',
    w: 288,
    h: 72,
    alt: 'Ecossistema Neymar Jr.',
    sobre:
      'Complexo esportivo e de lazer em Porto Belo (SC), com hotel, quadras e o espaço NJ Experience, dentro de um bairro planejado.',
  },
  {
    src: 'partner-inc.svg',
    w: 214,
    h: 89,
    alt: 'INC Empreendimentos',
    sobre:
      'A INC Empreendimentos é uma construtora e incorporadora brasileira fundada em 2008 na cidade de Juiz de Fora, Minas Gerais. Em 2018, a empresa foi listada na Bolsa de Valores (B3), sob o código de negociação INNC3.',
  },
  {
    src: 'partner-dialogo.svg',
    w: 303,
    h: 94,
    alt: 'Diálogo Engenharia',
    sobre:
      'Incorporadora paulistana fundada em 1987, com mais de 184 empreendimentos lançados, referência na Zona Leste de São Paulo.',
  },
  {
    src: 'partner-porte.svg',
    w: 248,
    h: 119.118,
    alt: 'Porte Engenharia e Urbanismo',
    sobre:
      'Há 35 anos transformando a Zona Leste de São Paulo; responsável pelo Platina 220, o prédio mais alto da cidade.',
  },
  {
    src: 'partner-ginco.svg',
    w: 266,
    h: 51,
    alt: 'Ginco Urbanismo',
    sobre:
      'Urbanizadora de Cuiabá (MT) especializada em condomínios horizontais fechados de alto padrão, como o Florais e o Ginco Zurique.',
  },
]

// versão clara (página Sobre): logos e linhas próprias do Figma
const LIGHT = {
  'partner-neymar.svg': ['/img/sobre/partner-neymar-dark.svg', 287.992, 72.0009],
  'partner-inc.svg': ['/img/sobre/partner-inc-dark.svg', 214, 89],
  'partner-dialogo.svg': ['/img/sobre/partner-dialogo-dark.svg', 303, 94],
  'partner-porte.svg': ['/img/sobre/partner-porte-dark.svg', 249, 119.118],
  'partner-ginco.svg': ['/img/sobre/partner-ginco-dark.svg', 266, 51],
}

export default function Partners({ theme = 'dark', showTopLine = true, showVideo = true }) {
  const [ativo, setAtivo] = useState(null)
  const light = theme === 'light'
  const hline = light ? '/img/sobre/partners-hline-light.svg' : img('partners-hline.svg')
  const vline = light ? '/img/sobre/partners-vline-light.svg' : img('partners-vline.svg')

  // toque/clique fora de um logo fecha o balão (telas touch)
  useEffect(() => {
    const fechar = () => setAtivo(null)
    window.addEventListener('click', fechar)
    return () => window.removeEventListener('click', fechar)
  }, [])

  return (
    <section className={`partners ${light ? 'partners--light' : ''}`} id="clientes">
      {showTopLine && <img className="partners__hline partners__hline--top" src={hline} alt="" aria-hidden />}

      <SectionHeading kicker="Parceiros" className="partners__heading">
        Não queremos clientes, queremos parceiros
      </SectionHeading>

      <div className="partners__grid" data-reveal>
        <img className="partners__vline partners__vline--1" src={vline} alt="" aria-hidden />
        <img className="partners__vline partners__vline--2" src={vline} alt="" aria-hidden />
        <img className="partners__hline partners__hline--mid" src={hline} alt="" aria-hidden />

        {LOGOS.map((l, i) => {
          const tipId = `partner-tip-${i}`
          const [src, w, h] = light ? LIGHT[l.src] : [img(l.src), l.w, l.h]
          return (
            <div key={l.src} className={`partners__cell partners__cell--${i % 2 === 0 ? 'l' : 'r'}`}>
              <div
                className={`partner ${ativo === i ? 'is-active' : ''}`}
                tabIndex={0}
                aria-describedby={tipId}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setAtivo(i)}
                onPointerLeave={(e) => e.pointerType === 'mouse' && setAtivo(null)}
                onFocus={() => setAtivo(i)}
                onBlur={() => setAtivo(null)}
                onClick={(e) => {
                  e.stopPropagation()
                  setAtivo((a) => (a === i ? null : i))
                }}
              >
                <img
                  className="partner__logo"
                  src={src}
                  alt={l.alt}
                  width={w}
                  height={h}
                  draggable={false}
                  style={{ width: `calc(var(--u) * ${w})` }}
                />
                <div className="partner__tip" id={tipId} role="tooltip" aria-hidden={ativo !== i}>
                  <p className="partner__tip-name">{l.alt}</p>
                  <p className="partner__tip-text">{l.sobre}</p>
                </div>
              </div>
            </div>
          )
        })}
        <div className="partners__cell partners__cell--stat">
          <p className="partners__stat-num">+170</p>
          <p className="partners__stat-label">incorporadoras atendidas</p>
        </div>
      </div>

      {showVideo && <VideoBox />}
    </section>
  )
}

/**
 * Vídeo do YouTube com "capa": mostra a thumbnail + botão play e só carrega
 * o player (youtube-nocookie) quando a pessoa clica — página mais leve.
 */
function VideoBox() {
  const [playing, setPlaying] = useState(false)
  const { youtubeId, title } = VIDEO

  return (
    <div className={`video-box container ${playing ? 'is-playing' : ''}`} data-reveal>
      {playing ? (
        <iframe
          className="video-box__frame"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button className="video-box__cover" onClick={() => setPlaying(true)} aria-label={`Assistir: ${title}`}>
          <img
            className="video-box__thumb"
            src={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`}
            alt=""
            loading="lazy"
            onError={(e) => {
              // nem todo vídeo tem a versão HD da thumbnail
              e.currentTarget.onerror = null
              e.currentTarget.src = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
            }}
          />
          <span className="video-box__play" aria-hidden />
        </button>
      )}
    </div>
  )
}
