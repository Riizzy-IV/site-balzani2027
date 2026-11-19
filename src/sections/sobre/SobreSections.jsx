import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LEADERS, img } from '../../data/home.js'
import { EMPRESARIOS, PILARES, SATISFACAO, simg } from '../../data/sobre.js'
import { Kicker } from '../../components/ui.jsx'
import CountUp from '../../components/CountUp.jsx'
import { prefersReducedMotion } from '../../lib/smoothScroll.js'

gsap.registerPlugin(ScrollTrigger)

/* ---------------- Hero ---------------- */

export function SobreHero() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.sobre-hero__media', { clipPath: 'inset(0 0 0 100%)', duration: 1.4, ease: 'power4.inOut' })
        .from('.sobre-hero__lead, .sobre-hero__accent > span', { y: 40, opacity: 0, duration: 0.9, stagger: 0.1 }, '-=0.9')
        .from('.sobre-hero__script', { x: 60, opacity: 0, duration: 1 }, '-=0.6')
        .from('.sobre-hero__bar', { scaleX: 0, transformOrigin: 'left', duration: 0.8 }, '-=0.7')
        .from('.sobre-hero__text', { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
        .from('.sobre-word', { yPercent: 40, opacity: 0, duration: 1.1, stagger: 0.15 }, '-=0.9')

      // ao rolar, as duas palavras BALZANI deslizam em sentidos opostos
      const st = { trigger: '.sobre-words', start: 'top bottom', end: 'bottom top', scrub: true }
      gsap.to('.sobre-word--white', { xPercent: -6, ease: 'none', scrollTrigger: st })
      gsap.to('.sobre-word--navy', { xPercent: 6, ease: 'none', scrollTrigger: { ...st } })
      gsap.to('.sobre-hero__media img', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="sobre-hero" id="top" ref={ref}>
      <div className="sobre-hero__bg" aria-hidden>
        <img className="sobre-hero__wave" src={img('bg-wave-hero.png')} alt="" />
      </div>

      {/* no Figma este espaço é um vídeo (fill de vídeo); a imagem é o quadro dele */}
      <div className="sobre-hero__media">
        <img src={simg('hero-tech.jpg')} alt="" />
      </div>

      <div className="sobre-hero__content container">
        <nav className="breadcrumb" aria-label="Você está em">
          <a href="/">HOME</a>
          <img src={simg('breadcrumb-sep.svg')} alt="" width="8.5" height="7.36396" />
          <span aria-current="page">SOBRE</span>
        </nav>

        <h1 className="sobre-hero__title">
          <span className="sobre-hero__lead">Nossa missão é clara:</span>
          <span className="sobre-hero__accent">
            <span>substituir o improviso por</span>
            <span>Inteligência</span>
          </span>
          <span className="sobre-hero__script">aplicada</span>
        </h1>
        <span className="gradient-bar sobre-hero__bar" aria-hidden />
        <p className="sobre-hero__text">
          Transformamos lançamentos imobiliários em operações de alta performance, onde o resultado é garantido
          por método, dados e domínio do negócio.
        </p>
      </div>

      <div className="sobre-words container" aria-hidden>
        <img className="sobre-word sobre-word--white" src={simg('balzani-white.svg')} alt="" />
        <img className="sobre-word sobre-word--navy" src={simg('balzani-navy.svg')} alt="" />
      </div>
    </section>
  )
}

/* ---------------- Propósito / Missão / Visão ---------------- */

export function Pilares() {
  return (
    <section className="pilares">
      <img className="sobre-line container" src={simg('line.svg')} alt="" aria-hidden />
      <div className="pilares__grid">
        {PILARES.map((p) => (
          <article key={p.title.join(' ')} className="pilar" data-reveal>
            <img className="pilar__icon" src={simg('logo-mark.svg')} alt="" width="85" height="88" />
            <h2 className="pilar__title">
              {p.title[0]}
              <br />
              {p.title[1]}
            </h2>
            <div className="pilar__body">
              <span className="pilar__bar" aria-hidden />
              <p>{p.text}</p>
            </div>
          </article>
        ))}
      </div>
      <img className="sobre-line container" src={simg('line.svg')} alt="" aria-hidden />
    </section>
  )
}

/* ---------------- Ao lado de grandes empresários ---------------- */

export function Empresarios() {
  return (
    <section className="empresarios">
      <div className="empresarios__head container">
        <h2 className="empresarios__title" data-reveal>
          <span className="empresarios__lead">Ao lado de</span>
          <span className="empresarios__accent">grandes</span>
          <span className="empresarios__script">empresários</span>
        </h2>
        <p className="empresarios__text" data-reveal>
          Estamos conectados aos <strong>maiores e mais influentes empresários do mercado</strong>, trazendo a
          cultura de excelência das grandes empresas para impulsionar os resultados dos nossos <strong>clientes.</strong>
        </p>
      </div>

      <div className="empresarios__grid container" data-reveal>
        {EMPRESARIOS.map((e) => (
          <figure key={e.name} className={`emp emp--${e.area}`}>
            <img
              src={e.image}
              alt={e.name}
              loading="lazy"
              className={e.crop ? 'is-cropped' : ''}
              style={e.crop && { height: e.crop.h, width: e.crop.w, left: e.crop.left, top: e.crop.top }}
            />
            <figcaption className={`emp__chip emp__chip--${e.chip}`}>{e.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Pesquisa de satisfação ---------------- */

export function Satisfacao() {
  return (
    <section className="satisfacao">
      <div className="satisfacao__media" aria-hidden>
        <img src={simg('tablet-93.png')} alt="" loading="lazy" data-parallax="0.06" />
      </div>

      <div className="satisfacao__inner container">
        <div className="satisfacao__copy" data-reveal>
          <Kicker className="satisfacao__kicker">Pesquisa de satisfação</Kicker>
          <p className="satisfacao__text">
            Conectamos <strong>incorporadoras</strong> e <strong>clientes</strong> por meio de dados e tecnologia,
            criando relacionamentos que geram valor e impulsionam resultados
          </p>
          <h2 className="satisfacao__title">
            <span>e nosso trabalho</span>
            <span className="satisfacao__script">fala por nós</span>
          </h2>
          <span className="gradient-bar satisfacao__bar" aria-hidden />
        </div>

        <p className="satisfacao__badge" data-reveal>
          {/* ícone do Figma (com blur) por baixo + cópia nítida que some só no canto superior esquerdo */}
          <span className="satisfacao__plus" aria-hidden>
            <img src={simg('plus-circle.svg')} alt="" width="82.5667" height="82.5667" />
            <img src={simg('plus-circle-crisp.svg')} alt="" width="82.5667" height="82.5667" />
          </span>
          <span>
            <CountUp to={SATISFACAO.avaliacoes} /> de avaliações positivas
          </span>
        </p>
        <p className="satisfacao__note">{SATISFACAO.nota}</p>
      </div>
    </section>
  )
}

/* ---------------- Lideranças (layout em escada, bio visível) ---------------- */

export function LideresSobre() {
  return (
    <section className="lideres">
      <div className="lideres__grid container">
        {LEADERS.map((l, i) => (
          <article key={l.first} className={`lider lider--${i + 1}`} data-reveal>
            <div className="lider__photo">
              <img
                src={l.photo}
                alt={`${l.first} ${l.last}`}
                className={l.crop ? 'is-cropped' : ''}
                style={l.crop && { height: l.crop.h, width: l.crop.w, left: l.crop.left, top: l.crop.top }}
              />
            </div>
            <div className="lider__name">
              <p className="lider__first">{l.first}</p>
              <p className="lider__last">{l.last}</p>
            </div>
            <p className="lider__role">{l.role}</p>
            <span className="gradient-bar lider__bar" aria-hidden />
            <p className="lider__bio">{l.bio}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
