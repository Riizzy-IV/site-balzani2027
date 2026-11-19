import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { img } from '../data/home.js'
import { PillButton } from '../components/ui.jsx'
import CountUp from '../components/CountUp.jsx'

const FACES = [
  { src: 'face-1.png', name: 'Porte' },
  { src: 'face-2.png', name: 'INC Empreendimentos' },
  { src: 'face-3.png', name: 'Diálogo Engenharia' },
]

export default function Hero() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero__logo3d', { opacity: 0, scale: 0.9, duration: 1.4 })
        .from('.hero__title > span', { y: 50, opacity: 0, duration: 1, stagger: 0.12 }, '-=1.1')
        .from('.hero__bottom > *, .hero__more', { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.6')
      // flutuação contínua do Z 3D
      gsap.to('.hero__logo3d', {
        y: -16,
        rotate: 1.5,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
      // ícone do mouse no "Veja mais"
      gsap.to('.hero__more img', { y: 3, duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      // parallax ao rolar: logo sobe mais devagar e o texto some
      gsap.to('.hero__logo3d-wrap', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero__content', {
        yPercent: -12,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero__bg" aria-hidden>
        <img className="hero__wave" src={img('bg-wave-hero.png')} alt="" />
        <img className="hero__lines" src={img('hero-lines.svg')} alt="" width="962.6" height="952.6" />
        <div className="hero__logo3d-wrap">
          <img className="hero__logo3d" src={img('hero-logo-3d.png')} alt="" />
        </div>
      </div>

      <div className="hero__content container">
        <h1 className="hero__title">
          <span>
            <strong>Nós somos o maior </strong>
          </span>
          <span>Hub de soluções imobiliárias do Brasil</span>
        </h1>

        <div className="hero__bottom">
          <div className="hero__proof">
            {/* hover igual ao da apresentação: logos se afastam, a focada sobe com anel laranja + nome */}
            <div className="hero__faces">
              {FACES.map((f) => (
                <span key={f.src} className="face" tabIndex={0}>
                  <img src={img(f.src)} alt={f.name} width="62.195" height="62.195" />
                  <span className="face__tip" role="tooltip">
                    {f.name}
                  </span>
                </span>
              ))}
            </div>
            <p className="hero__proof-text">
              <strong>
                +<CountUp to={170} duration={2} /> projetos
              </strong>{' '}
              entregues
              <br />
              para incorporadoras e construtoras
            </p>
          </div>
          <PillButton href="#contato">Entre em contato e saiba mais</PillButton>
        </div>

        <a href="#quem-somos" className="hero__more">
          Veja mais
          <img src={img('icon-mouse.svg')} alt="" width="17.5" height="21.5" />
        </a>
      </div>
    </section>
  )
}
