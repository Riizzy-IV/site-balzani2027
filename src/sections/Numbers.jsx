import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { NUMBERS, img } from '../data/home.js'
import { ESTADOS, MAP_H, MAP_W } from '../data/mapaBrasil.js'
import { CLIENTES_POR_ESTADO } from '../data/clientesPorEstado.js'
import { prefersReducedMotion } from '../lib/smoothScroll.js'
import { SectionHeading } from '../components/ui.jsx'
import CountUp from '../components/CountUp.jsx'

// Posições dos pinos sobre o mapa (px no frame do Figma, relativos ao mapa 752x771)
const PINS = [
  ['map-pin-s.svg', 585.5, 537.4, 23.3],
  ['map-pin-s.svg', 356.5, 491.4, 23.3],
  ['map-pin-s.svg', 452.8, 631.6, 23.3],
  ['map-pin-s.svg', 652.2, 204.7, 23.3],
  ['map-pin-l2.svg', 535.2, 178.7, 46.4285],
  ['map-pin-s.svg', 676.0, 257.3, 23.3],
  ['map-pin-s.svg', 720.1, 231.3, 23.3],
  ['map-pin-s.svg', 699.1, 205.0, 23.3],
  ['map-pin-s.svg', 713.1, 282.1, 23.3],
  ['map-pin-s.svg', 630.8, 487.9, 23.3],
  ['map-pin-l.svg', 382.8, 169.9, 46.4285],
  ['map-pin-m3.svg', 329.4, 339.0, 39.4204],
  ['map-pin-l.svg', 450.3, 396.0, 46.4285],
  ['map-pin-m1.svg', 184.9, 304.0, 40.2964],
  ['map-pin-l.svg', 410.9, 557.1, 46.4285],
  ['map-pin-l.svg', 393.3, 682.4, 46.4285],
  ['map-pin-l.svg', 478.3, 534.4, 46.4285],
  ['map-pin-m2.svg', 602.8, 335.5, 42.9245],
  ['map-pin-xl.svg', 524.7, 447.6, 56.9406],
]


// Anéis decorativos (px relativos ao grupo de 1515x1515 do Figma)
const RINGS = [
  ['ring-25.png', -12, -12, 1539.334],
  ['ring-24.png', 211.25, 211.25, 1092.833],
  ['ring-21.png', 356.01, 356.01, 803.304],
  ['ring-22.png', 469.63, 469.63, 576.068],
  ['ring-23.png', 560.92, 560.92, 393.495],
]
const DOTS = [
  ['ring-dot-a.svg', 817.29, 940.03, 6.88311],
  ['ring-dot-a.svg', 558.34, 749.33, 6.88311],
  ['ring-dot-b.svg', 465.86, 724.67, 14.8831],
  ['ring-dot-c.svg', 356.34, 673.49, 22.7233],
  ['ring-dot-b.svg', 717.69, 1034.36, 14.8831],
  ['ring-vector.svg', 333.3, 877, 0.813671],
]

const u = (n) => `calc(var(--u) * ${n})`

// versão clara (página Sobre): estados inativos em cinza, pinos com centro laranja e linhas entre os números
const pinSrc = (f, light) => (light ? `/img/sobre/${f.replace('map-pin-', 'pin-')}` : img(f))

export default function Numbers({ theme = 'dark' }) {
  const light = theme === 'light'
  const ref = useRef(null)
  const [active, setActive] = useState(null)

  // toque fora de um estado fecha o card (telas touch)
  useEffect(() => {
    const close = () => setActive(null)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [])

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      // pinos "acendem" um a um quando o mapa entra na tela e depois pulsam
      const pulse = gsap.to('.br-map__pin', {
        scale: 1.18,
        opacity: 0.85,
        duration: 1.5,
        ease: 'sine.inOut',
        paused: true,
        stagger: { each: 0.2, from: 'random', repeat: -1, yoyo: true },
      })
      gsap.from('.br-map__pin', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(2)',
        stagger: { each: 0.06, from: 'random' },
        scrollTrigger: { trigger: '.br-map', start: 'top 75%', once: true },
        onComplete: () => pulse.play(),
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className={`numbers ${light ? 'numbers--light' : ''}`} ref={ref}>
      {!light && (
        <div className="numbers__rings" aria-hidden data-parallax="0.08">
          {RINGS.map(([f, x, y, s]) => (
            <img key={f} src={img(f)} alt="" style={{ left: u(x), top: u(y), width: u(s), height: u(s) }} />
          ))}
          {DOTS.map(([f, x, y, s], i) => (
            <img key={i} src={img(f)} alt="" style={{ left: u(x), top: u(y), width: u(s), height: u(s) }} />
          ))}
        </div>
      )}

      <SectionHeading kicker="Nossos números" className="numbers__heading">
        Do planejamento ao sucesso do seu lançamento
      </SectionHeading>

      <div className="numbers__body container">
        <div className="br-map" data-reveal>
          {/* mapa inline (um path por estado) para o hover por estado, como na apresentação */}
          <svg
            className="br-map__img"
            viewBox={`0 0 ${MAP_W} ${MAP_H}`}
            role="img"
            aria-label="Mapa do Brasil com os estados onde atuamos"
          >
            {ESTADOS.map((e) => {
              const interactive = CLIENTES_POR_ESTADO[e.uf] != null
              return (
                <path
                  key={e.uf}
                  d={e.d}
                  fill={e.ativo ? '#2F79A8' : light ? '#B0B0B0' : '#EDEDED'}
                  className={`${interactive ? 'is-interactive' : ''} ${active === e.uf ? 'is-active' : ''}`}
                  onPointerEnter={interactive ? (ev) => ev.pointerType === 'mouse' && setActive(e.uf) : undefined}
                  onPointerLeave={interactive ? (ev) => ev.pointerType === 'mouse' && setActive(null) : undefined}
                  onClick={
                    interactive
                      ? (ev) => {
                          ev.stopPropagation()
                          setActive((a) => (a === e.uf ? null : e.uf))
                        }
                      : undefined
                  }
                >
                  <title>{e.nome}</title>
                </path>
              )
            })}
          </svg>
          {PINS.map(([f, x, y, s], i) => (
            <img
              key={i}
              className="br-map__pin"
              src={pinSrc(f, light)}
              alt=""
              style={{
                left: `${(x / MAP_W) * 100}%`,
                top: `${(y / MAP_H) * 100}%`,
                width: `${(s / MAP_W) * 100}%`,
              }}
            />
          ))}
        </div>

        <ul className="stats">
          {NUMBERS.map((n, i) => (
            <li key={n.label} className="stat" data-reveal>
              {light && i > 0 && <img className="stat__line" src="/img/sobre/stat-line.svg" alt="" aria-hidden />}
              <span className="stat__value">
                <img src={img('icon-plus.svg')} alt="+" width="22" height="23" />
                <span className="stat__num">
                  <CountUp to={n.value} decimals={n.decimals} suffix={n.suffix} thousands={n.thousands} />
                </span>
              </span>
              <span className="stat__label">{n.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
