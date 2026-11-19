import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../../lib/smoothScroll.js'
import { Kicker, PillButton } from '../../components/ui.jsx'
import { img } from '../../data/home.js'
import { simg } from '../../data/sobre.js'
import { IA_LOGOS, SERVICOS, svimg } from '../../data/servicos.js'

gsap.registerPlugin(ScrollTrigger)

/* ---------------- Hero: Visão estratégica + Inteligência humana + artificial ---------------- */

export function ServicosHero() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.sv-hero__lead', { y: 40, opacity: 0, duration: 0.9 })
        .from('.sv-hero__script', { x: 60, opacity: 0, duration: 1 }, '-=0.6')
        .from('.sv-hero__bar', { scaleX: 0, transformOrigin: 'left', duration: 0.8 }, '-=0.7')
        .from('.sv-hero__text', { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
        .from('.sv-hero__media', { clipPath: 'inset(0 0 100% 0 round 24px)', duration: 1.4, ease: 'power4.inOut' }, '-=0.9')

      // o olho desce devagar dentro da moldura enquanto a página rola
      gsap.to('.sv-hero__media img', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: '.sv-hero__media', start: 'top top', end: 'bottom top', scrub: true },
      })

      // bloco da IA: textos sobem e os logos entram um a um, depois flutuam
      const st = { trigger: '.sv-ia', start: 'top 75%', once: true }
      gsap.from('.sv-ia__areas, .sv-ia__script, .sv-ia__plus, .sv-ia__big > span', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: st,
      })
      gsap.from('.sv-logo', {
        scale: 0.6,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'back.out(1.6)',
        scrollTrigger: { ...st },
      })
      gsap.utils.toArray('.sv-logo').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 ? 14 : -14,
          duration: 2.6 + (i % 3) * 0.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.2,
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="sv-hero" id="top" ref={ref}>
      <div className="sv-hero__bg" aria-hidden>
        <img className="sv-hero__wave" src={img('bg-wave-hero.png')} alt="" />
      </div>

      <div className="sv-hero__content container">
        <nav className="breadcrumb" aria-label="Você está em">
          <a href="/">HOME</a>
          <img src={simg('breadcrumb-sep.svg')} alt="" width="8.5" height="7.36396" />
          <span aria-current="page">SERVIÇOS</span>
        </nav>

        <div className="sv-hero__head">
          <h1 className="sv-hero__title">
            <span className="sv-hero__lead">Visão</span>
            <span className="sv-hero__script">estratégica</span>
          </h1>
          <div className="sv-hero__side">
            <span className="gradient-bar sv-hero__bar" aria-hidden />
            <p className="sv-hero__text">
              Nosso objetivo é transformar o lançamento em um plano estruturado e não em uma sequência de ações
              isoladas
            </p>
          </div>
        </div>

        <div className="sv-hero__media">
          <img src={svimg('hero-olho.jpg')} alt="" />
        </div>
      </div>

      <div className="sv-ia">
        <div className="sv-ia__inner container">
          <p className="sv-ia__areas">
            <span className="sv-ia__areas-light">Estratégia / tecnologia</span>
            <br />
            conteúdo/ comercial performance / dados &amp;
          </p>
          <p className="sv-ia__script">criatividade</p>
          <span className="sv-ia__plus" aria-hidden>
            <img src={svimg('icon-plus.svg')} alt="" width="16" height="16" />
          </span>
          <h2 className="sv-ia__big">
            <span>inteligência humana+</span>
            <span className="sv-ia__artificial" style={{ backgroundImage: `url(${svimg('artificial-texture.jpg')})` }}>
              artificial
            </span>
          </h2>

          <div className="sv-ia__what">
            <Kicker>O que fazemos</Kicker>
            <h2 className="sv-ia__what-title">Criamos jornadas de ponta a ponta</h2>
            <p className="sv-ia__what-text">
              <strong>Estratégia e acompanhamento.</strong>
              <br />
              Onde estratégia, marketing e comercial atuam juntos para ajudar o incorporador a se posicionar,
              estabelecer, crescer e zerar seu estoque com nossos produtos e serviços.
            </p>
          </div>
        </div>

        <div className="sv-logos" aria-label="Ferramentas de IA que usamos">
          {IA_LOGOS.map((l) => (
            <span
              key={l.src}
              className={`sv-logo ${l.box ? `sv-logo--box ${l.box.split(' ').map((b) => `sv-logo--${b}`).join(' ')}` : ''} ${l.bordered ? 'sv-logo--bordered' : ''}`}
              style={{
                '--x': l.x,
                '--y': l.y - 1044,
                '--s': l.size,
                '--r': l.radius,
                '--i': l.inner ?? l.size,
              }}
            >
              <img className={l.flip ? 'is-flipped' : ''} src={svimg(l.src)} alt={l.alt} />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Serviços: Estratégia / Marketing / Comercial ---------------- */

export function ServicosLista() {
  return (
    <section className="sv-list" id="servicos">
      <img className="sv-list__lines" src={svimg('bg-lines.svg')} alt="" aria-hidden width="1164.6" height="1152.6" />

      <h2 className="sv-list__title" style={{ backgroundImage: `url(${svimg('servicos-title-texture.png')})` }}>
        SERVIÇOS
      </h2>

      <div className="sv-cards container">
        {SERVICOS.map((s) => (
          <article key={s.num} className="sv-card" data-reveal>
            {s.line && <img className="sv-card__line" src={svimg('line-h.svg')} alt="" aria-hidden />}
            <img className="sv-card__glow" src={svimg(s.glow)} alt="" aria-hidden />
            <div className="sv-card__info">
              <h3 className="sv-card__head">
                <span className="sv-card__num">{s.num}</span>
                <span className="sv-card__name">{s.title}</span>
              </h3>
              <p className="sv-card__text">{s.text}</p>
            </div>
            <ul className="sv-card__chips">
              {s.rows.map((row) => (
                <li key={row.join()} className="sv-card__row">
                  {row.map((c) => (
                    <span key={c} className="sv-chip">
                      {c}
                    </span>
                  ))}
                </li>
              ))}
            </ul>
          </article>
        ))}

        <div className="sv-cta" data-reveal>
          <p>Temos uma esteira completa de serviços para te atender</p>
          <PillButton href="#contato" className="sv-cta__btn">
            Entre em contato e saiba mais
          </PillButton>
        </div>
      </div>
    </section>
  )
}
