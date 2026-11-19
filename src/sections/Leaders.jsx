import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LEADERS } from '../data/home.js'
import { SectionHeading } from '../components/ui.jsx'
import { prefersReducedMotion } from '../lib/smoothScroll.js'

gsap.registerPlugin(ScrollTrigger)

export default function Leaders() {
  const [open, setOpen] = useState(null)
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const section = ref.current
    const mm = gsap.matchMedia()

    // Desktop: a seção trava na tela e os sócios entram um de cada vez conforme a rolagem
    mm.add('(min-width: 901px)', () => {
      const cards = gsap.utils.toArray('.leader', section)
      gsap.set(cards, { autoAlpha: 0, y: 120, scale: 0.94 })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out', duration: 1 },
        scrollTrigger: {
          trigger: section,
          // centraliza a seção quando ela cabe na tela; senão trava pelo topo
          start: () => (section.offsetHeight > window.innerHeight ? 'top top' : 'center center'),
          end: () => `+=${window.innerHeight * 1.6}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      cards.forEach((card, i) => {
        tl.to(card, { autoAlpha: 1, y: 0, scale: 1 }, i * 0.9)
          .from(card.querySelector('.leader__name'), { x: -40, duration: 0.8 }, i * 0.9 + 0.25)
          .from(card.querySelectorAll('.leader__role, .leader__bar'), { autoAlpha: 0, y: 12, duration: 0.6 }, i * 0.9 + 0.45)
      })
      tl.to({}, { duration: 0.4 }) // pequena pausa com os três visíveis antes de destravar
    })

    // Mobile: cards empilhados, cada um aparece ao entrar na tela
    mm.add('(max-width: 900px)', () => {
      gsap.utils.toArray('.leader', section).forEach((card) => {
        gsap.from(card, {
          autoAlpha: 0,
          y: 60,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%', once: true },
        })
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section className="leaders" ref={ref}>
      <SectionHeading kicker="Nossas lideranças" className="leaders__heading">
        Quem está por trás das estratégias mais eficazes do mercado
      </SectionHeading>

      <div className="leaders__grid container">
        {LEADERS.map((l, i) => {
          const isOpen = open === i
          const bioId = `leader-bio-${i}`
          return (
            <article key={l.first} className={`leader ${isOpen ? 'is-open' : ''}`}>
              <div className="leader__photo">
                <img
                  src={l.photo}
                  alt={`${l.first} ${l.last}`}
                  className={l.crop ? 'is-cropped' : ''}
                  style={l.crop && { height: l.crop.h, width: l.crop.w, left: l.crop.left, top: l.crop.top }}
                />
                {/* bio do Figma (frames Guilherme / Enzo / Carlos): cobre a foto ao clicar no + */}
                <div className="leader__bio" id={bioId} aria-hidden={!isOpen}>
                  <p>{l.bio}</p>
                </div>
                <button
                  className="leader__toggle"
                  aria-expanded={isOpen}
                  aria-controls={bioId}
                  aria-label={isOpen ? `Fechar bio de ${l.first}` : `Ler bio de ${l.first} ${l.last}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span aria-hidden />
                </button>
              </div>
              <div className="leader__name">
                <p className="leader__first">{l.first}</p>
                <p className="leader__last">{l.last}</p>
              </div>
              <p className="leader__role">{l.role}</p>
              <span className="gradient-bar leader__bar" aria-hidden />
            </article>
          )
        })}
      </div>
    </section>
  )
}
