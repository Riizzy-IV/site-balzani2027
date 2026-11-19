import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import CasePage from '../components/case/CasePage.jsx'
import { prefersReducedMotion } from '../lib/smoothScroll.js'
import { LEMAN } from '../data/cases/lemanView.js'

/* Topo do Léman: fundo aquarelado, o prédio emoldurado no centro e as duas frases nas laterais */
function LemanHero() {
  const ref = useRef(null)
  const { fundo, moldura, predio, esquerda, direita } = LEMAN.hero

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.lv-hero__frame', { y: 60, opacity: 0, duration: 1.2 })
        .from('.lv-hero__left > span, .lv-hero__right', { y: 24, opacity: 0, duration: 0.9, stagger: 0.12 }, '-=0.7')
      // o quadro desce um pouco mais devagar que a página
      gsap.to('.lv-hero__frame', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="lv-hero" id="top" ref={ref}>
      <h1 className="sr-only">Case Léman View — essencialmente único</h1>
      <div className="lv-hero__bg" aria-hidden>
        <img src={fundo} alt="" />
      </div>
      <div className="lv-hero__frame">
        <img className="lv-hero__moldura" src={moldura} alt="" aria-hidden />
        <div className="lv-hero__predio">
          <img src={predio} alt="Ilustração em aquarela da torre do Léman View" />
        </div>
      </div>
      <div className="lv-hero__texts container">
        <p className="lv-hero__left">
          <span className="lv-hero__gold">{esquerda[0]}</span>
          <span>{esquerda[1]}</span>
        </p>
        <p className="lv-hero__right">
          {direita.map((l, i) => (
            <span key={l}>
              {i > 0 && <br />}
              {l}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

export default function CaseLemanView() {
  return <CasePage data={LEMAN} hero={<LemanHero />} />
}
