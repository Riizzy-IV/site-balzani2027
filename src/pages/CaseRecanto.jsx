import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import CasePage from '../components/case/CasePage.jsx'
import { prefersReducedMotion } from '../lib/smoothScroll.js'
import { RECANTO } from '../data/cases/recantoTatuamunha.js'

/* Topo do Recanto (como a landing page do cliente): foto aérea com degradê azul, casal, faixa colorida,
   folhas e o título "O espaço que você precisa para ter conexão com a vida" */
function RecantoHero() {
  const ref = useRef(null)
  const h = RECANTO.hero

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.rc-hero__casal', { x: 80, opacity: 0, duration: 1.2 })
        .from('.rc-hero__faixa', { clipPath: 'inset(0 100% 0 0)', duration: 1.4, ease: 'power3.inOut' }, '-=0.9')
        .from('.rc-hero__content > *', { y: 30, opacity: 0, duration: 0.8, stagger: 0.12 }, '-=1')
        .from('.rc-hero__folha, .rc-hero__folha2, .rc-hero__folhas', { scale: 0.6, opacity: 0, duration: 0.9, stagger: 0.1 }, '-=0.8')
      // as folhas balançam devagar
      gsap.to('.rc-hero__folha2 > div, .rc-hero__folhas > div', {
        y: 12,
        rotation: '+=6',
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.6,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="rc-hero" id="top" ref={ref}>
      <div className="rc-hero__bg" aria-hidden>
        <img src={h.fundo} alt="" />
      </div>
      <div className="rc-hero__paisagem" aria-hidden>
        <img src={h.paisagem} alt="" />
      </div>
      <div className="rc-hero__casal">
        <img src={h.casal} alt="Casal abraçado e sorrindo" />
      </div>
      <div className="rc-hero__faixa" aria-hidden>
        <img src={h.faixa} alt="" />
      </div>
      <img className="rc-hero__folha" src={h.folha} alt="" aria-hidden />
      <div className="rc-hero__folha2" aria-hidden>
        <div>
          <img src={h.folha2} alt="" />
        </div>
      </div>
      <div className="rc-hero__folhas" aria-hidden>
        <div>
          <img src={h.folhas} alt="" />
        </div>
      </div>

      <div className="rc-hero__content">
        <div className="rc-hero__overline">
          <img src={h.overline} alt="" width="29.796" height="18.337" />
          <span>
            LANÇAMENTO
            <i aria-hidden />
          </span>
        </div>
        <h1 className="rc-hero__title">
          <span className="rc-hero__lead">
            O espaço <b>que você precisa</b> para ter
          </span>
          <span className="rc-hero__script">conexão</span>
          <span className="rc-hero__vida">COM A VIDA</span>
        </h1>
        <img className="rc-hero__textura" src={h.textura} alt="" width="220.037" height="17.19" />
        <p className="rc-hero__metragem">
          <span>LOTES A PARTIR DE</span>
          <strong>200m²</strong>
        </p>
      </div>

      <img className="rc-hero__logo" src={h.logo} alt="Recanto do Tatuamunha" width="254" height="186" />
    </section>
  )
}

export default function CaseRecanto() {
  return <CasePage data={RECANTO} hero={<RecantoHero />} />
}
