import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import '../../styles/home.css'
import '../../styles/case.css'
import useReveal from '../../hooks/useReveal.js'
import { prefersReducedMotion } from '../../lib/smoothScroll.js'
import Header from '../Header.jsx'
import Footer from '../Footer.jsx'

// ícones e linhas comuns a todos os cases
const cimg = (file) => `/img/cases/${file}`

/* Antes/depois: arraste o puxador (ou use as setas do teclado) para comparar a imagem original com a aprimorada */
function Comparador({ antes, depois, alt }) {
  const ref = useRef(null)
  const [pos, setPos] = useState(47.86) // divisa do Figma (804 de 1680)
  const drag = useRef(false)

  const mover = (clientX) => {
    const r = ref.current.getBoundingClientRect()
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }

  // ao entrar na tela, o puxador passeia uma vez para mostrar que dá para arrastar
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const o = { v: 47.86 }
    const tl = gsap.timeline({ paused: true, onUpdate: () => !drag.current && setPos(o.v) })
    tl.to(o, { v: 70, duration: 0.9, ease: 'power2.inOut' })
      .to(o, { v: 28, duration: 1.2, ease: 'power2.inOut' })
      .to(o, { v: 47.86, duration: 0.9, ease: 'power2.inOut' })
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          tl.play()
          io.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(ref.current)
    return () => {
      io.disconnect()
      tl.kill()
    }
  }, [])

  return (
    <div
      className="cs-compare"
      ref={ref}
      data-reveal
      onPointerDown={(e) => {
        drag.current = true
        e.currentTarget.setPointerCapture(e.pointerId)
        mover(e.clientX)
      }}
      onPointerMove={(e) => drag.current && mover(e.clientX)}
      onPointerUp={() => (drag.current = false)}
      onPointerCancel={() => (drag.current = false)}
      style={{ '--pos': `${pos}%` }}
    >
      <img className="cs-compare__antes" src={antes} alt={`Imagem original: ${alt}`} draggable={false} />
      <div className="cs-compare__depois">
        <img src={depois} alt={`Imagem aprimorada: ${alt}`} draggable={false} />
      </div>
      <button
        className="cs-compare__handle"
        role="slider"
        aria-label="Comparar antes e depois"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 5))
          if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 5))
        }}
      >
        <img src={cimg('icon-compare.svg')} alt="" width="11.2222" height="18.8611" />
      </button>
    </div>
  )
}

/* Materiais impressos: carrossel com as setas laranja */
function Materiais({ slides }) {
  const [i, setI] = useState(0)
  const track = useRef(null)

  useLayoutEffect(() => {
    const t = track.current
    const slide = t.children[0]
    const gap = parseFloat(getComputedStyle(t).columnGap) || 0
    gsap.to(t, { x: -i * (slide.offsetWidth + gap), duration: 0.9, ease: 'power3.inOut' })
  }, [i])

  const ir = (d) => setI((v) => (v + d + slides.length) % slides.length)

  return (
    <div className="cs-mat">
      <div className="cs-mat__viewport">
        <div className="cs-mat__track" ref={track}>
          {slides.map((s) => (
            <div key={s.alt} className="cs-slide" aria-label={s.alt}>
              {s.layers.map((l) => (
                <img
                  key={l.src}
                  className={l.cover ? 'is-cover' : ''}
                  src={l.src}
                  alt={l.alt}
                  loading="lazy"
                  style={{ '--x': l.x, '--y': l.y, '--w': l.w, '--h': l.h }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {slides.length > 1 && (
        <div className="cs-mat__arrows">
          <button className="cs-arrow" onClick={() => ir(-1)} aria-label="Material anterior">
            <img src={cimg('icon-seta.svg')} alt="" width="13.549" height="16.5002" style={{ transform: 'rotate(-90deg)' }} />
          </button>
          <button className="cs-arrow" onClick={() => ir(1)} aria-label="Próximo material">
            <img src={cimg('icon-seta.svg')} alt="" width="13.549" height="16.5002" style={{ transform: 'rotate(90deg)' }} />
          </button>
        </div>
      )}
    </div>
  )
}

function Pill({ children }) {
  return (
    <span className="cs-pill">
      <span>
        {children}
        <img src={cimg('pill-seta.svg')} alt="" width="19.5" height="7.36396" />
      </span>
    </span>
  )
}

function Linhas({ lines }) {
  return lines.map((l, i) => (
    <span key={l}>
      {i > 0 && <br />}
      {l}
    </span>
  ))
}

function Midia({ src, poster, alt }) {
  if (src) return <video src={src} poster={poster} autoPlay muted loop playsInline />
  return poster ? <img src={poster} alt={alt || ''} loading="lazy" /> : null
}

/* texto com trechos em negrito: cada parágrafo é uma string ou uma lista de strings e { b: '...' } */
function Rico({ parts }) {
  if (typeof parts === 'string') return parts
  return parts.map((p, i) => (typeof p === 'string' ? <span key={i}>{p}</span> : <strong key={i}>{p.b}</strong>))
}
const chave = (parts) => (typeof parts === 'string' ? parts : parts.map((p) => p.b || p).join('')).slice(0, 24)

/* Redes sociais (Madri): posts do Instagram em cartões, como no Figma */
function RedesSociais({ redes }) {
  return (
    <section className="cs-social">
      <h2 className="cs-heading cs-heading--claro" data-reveal>
        Redes Sociais
      </h2>
      <div className="cs-social__grid container">
        {redes.posts.map((p, i) => (
          <article key={p} className="cs-post" data-reveal>
            <img className="cs-post__avatar" src={redes.avatar} alt="" width="34" height="34" />
            <span className="cs-post__user">{redes.usuario}</span>
            <img className="cs-post__mais" src={redes.icones.mais} alt="" width="15" height="3" />
            <img className="cs-post__img" src={p} alt={`Post ${i + 1} do ${redes.usuario}`} loading="lazy" />
            {redes.icones.acoes.map((a) => (
              <img key={a.src} className="cs-post__ic" src={a.src} alt="" width={a.w} height={a.h} style={{ '--x': a.x, '--w': a.w }} />
            ))}
          </article>
        ))}
      </div>
    </section>
  )
}

/* Cores em bloco (Madri, Central, Recanto): cor principal à esquerda e as demais empilhadas */
function CoresBloco({ cores }) {
  const Info = ({ c }) => (
    <div className="cs-bloco__info">
      <p>{c.name}</p>
      <div>
        {c.linhas.map(([k, v]) => (
          <p key={k}>
            <b>{k}:</b> {v}
          </p>
        ))}
      </div>
    </div>
  )
  return (
    <div className="cs-bloco" style={{ '--ct': cores.top, '--co': cores.overlap, '--cf': cores.font }} data-reveal>
      <div className="cs-bloco__main" style={{ background: cores.principal.hex }}>
        <p className="cs-bloco__title">
          Cores <span aria-hidden />
        </p>
        <Info c={cores.principal} />
      </div>
      <div className="cs-bloco__rows">
        {cores.demais.map((c) => (
          <div key={c.name} className={`cs-bloco__row ${c.dark ? 'is-dark' : ''}`} style={{ background: c.hex }}>
            <Info c={c} />
          </div>
        ))}
      </div>
    </div>
  )
}

/** Página de case: recebe os dados do case e o topo (hero) próprio de cada um.
 *  Seções opcionais (só aparecem se existirem nos dados): compare, redes, materiais, lp.monitor. */
export default function CasePage({ data, hero }) {
  const ref = useRef(null)
  useReveal(ref)
  const { conceito, feito, intro = {}, video, book, compare, redes, logos, fonte, cores, destaque, lp, materiais } = data
  const brandBg = data.brandBg || (compare ? 'compare' : 'white')

  return (
    <div
      className={`page page--case page--case-${data.slug} ${data.alinhamento === 'title' ? 'cs--alinha-titulo' : ''}`}
      ref={ref}
      style={{ '--font-cliente': `${fonte.css}, 'Red Hat Display', system-ui, sans-serif` }}
    >
      <Header />
      <main>
        {hero}

        <section
          className="cs-intro container"
          style={{ '--ix': intro.textX ?? 405, '--it': intro.top ?? 160, '--ih': intro.h ?? 596 }}
        >
          <div className="cs-intro__col" data-reveal>
            <Pill>CONCEITO</Pill>
            <h2 className="cs-intro__title" style={{ '--tiw': conceito.titleWidth ?? 253 }}>
              <Linhas lines={conceito.title} />
            </h2>
          </div>
          <div className="cs-intro__text" style={{ '--tw': conceito.textWidth, '--pg': conceito.gap ?? 16 }} data-reveal>
            {conceito.text.map((t) => (
              <p key={chave(t)}>
                <Rico parts={t} />
              </p>
            ))}
          </div>
          <div className="cs-intro__col" data-reveal>
            <Pill>O QUE FOI FEITO</Pill>
            <h2 className="cs-intro__title">
              <Linhas lines={feito.title} />
            </h2>
          </div>
          <div className="cs-intro__lists" data-reveal>
            {feito.columns.map((c) => (
              <div
                key={c.items[0]}
                className={`cs-intro__list ${c.bullets.dot ? 'cs-intro__list--dots' : ''}`}
                style={{ '--lw': c.width, '--lg': c.gap ?? 6 }}
              >
                {!c.bullets.dot && (
                  <img src={c.bullets.src} alt="" width="5" height={c.bullets.h} style={{ '--bh': c.bullets.h }} aria-hidden />
                )}
                <ul>
                  {c.items.map((t) => (
                    <li key={t}>
                      {c.bullets.dot && <img src={c.bullets.dot} alt="" width="5" height="5" aria-hidden />}
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <img className="cs-intro__line" src={cimg('linha.svg')} alt="" aria-hidden />
        </section>

        {/* sem vídeo nem capa (ex.: capa exportada toda preta), a faixa some em vez de virar um bloco preto */}
        {(video.src || video.poster) && (
          <section className="cs-video" aria-label="Vídeo conceito">
            <Midia src={video.src} poster={video.poster} />
          </section>
        )}

        <section
          className={`cs-book ${book.total ? 'cs-book--framed' : ''}`}
          style={
            book.total
              ? {
                  '--bg': book.bg,
                  '--top': book.top ?? 0,
                  '--bh': book.h,
                  '--total': book.total,
                  '--bw': book.w ?? 1920,
                  '--bih': book.imgH ?? 104.15,
                  '--bit': book.imgTop ?? 0,
                }
              : undefined
          }
        >
          <div className="cs-book__media">
            <img src={book.src} alt={book.alt} loading="lazy" />
          </div>
          {book.tag && <span className="cs-tag">{book.tag}</span>}
        </section>

        {redes && <RedesSociais redes={redes} />}

        <section className={`cs-brand cs-brand--${brandBg}`} style={{ '--bt': data.brandTop ?? 106 }}>
          {compare && (
            <>
              <h2 className="cs-heading" data-reveal>
                Aprimoramento de imagens
              </h2>
              <Comparador {...compare} />
            </>
          )}

          <div className="cs-logos" data-reveal>
            {logos.map((l) => (
              <span key={l.src} className="cs-logos__item" style={{ '--box': l.box || l.w }}>
                <img src={l.src} alt={l.alt} width={l.w} height={l.h} style={{ '--w': l.w }} />
              </span>
            ))}
          </div>

          <div className="cs-fonts" data-reveal>
            <p className="cs-fonts__family">
              <span>Família</span>
              <strong>{fonte.family}</strong>
            </p>
            <div className="cs-fonts__list">
              {fonte.weights.map((f) => (
                <p key={f} className={`cs-fonts__item cs-fonts__item--${f.toLowerCase()}`}>
                  <span>
                    {fonte.family} {f}
                  </span>
                  <span className="cs-fonts__sample">aAbBcCdDeEfFgGhHiIjJ0123456789</span>
                </p>
              ))}
            </div>
          </div>

          {cores.estilo === 'bloco' ? (
            <CoresBloco cores={cores} />
          ) : (
            <div
              className={`cs-colors cs-colors--${cores.estilo}`}
              style={{ '--cl': cores.left, '--cg': cores.gap, '--ct': cores.top, '--co': cores.overlap }}
              data-reveal
            >
              {cores.colunas.map((col, ci) => (
                <div key={ci} className="cs-colors__col">
                  {col.map((c) => (
                    <div
                      key={c.name}
                      className={`cs-color ${c.dark ? 'cs-color--dark' : ''}`}
                      style={{ '--h': c.h, '--w': c.w, background: c.bg || c.hex }}
                    >
                      {c.title && (
                        <p className="cs-color__title">
                          Cores <span aria-hidden />
                        </p>
                      )}
                      {cores.estilo === 'completo' ? (
                        <>
                          <p className={c.plain ? '' : 'cs-color__name'}>{c.name}</p>
                          <p>
                            <b>CYMK:</b> {c.cmyk}
                          </p>
                          <p className="cs-color__row">
                            <span>
                              <b>RGB:</b> {c.rgb}
                            </span>
                            <span>{c.hex}</span>
                          </p>
                        </>
                      ) : (
                        <p className="cs-color__row">
                          <span>{c.name}</span>
                          <span>{c.hex}</span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </section>

        <section
          className={`cs-destaque ${destaque.shadow ? 'cs-destaque--sombra' : ''}`}
          style={{ '--dh': destaque.h ?? 1098, '--dw': destaque.w ?? 100, '--dl': destaque.left ?? 0 }}
        >
          {destaque.img ? (
            <img src={destaque.img} alt={destaque.alt} loading="lazy" />
          ) : (
            <Midia src={destaque.video} poster={destaque.poster} alt={destaque.alt} />
          )}
        </section>

        <section className="cs-lp" aria-label="Landing page" style={{ '--lph': lp.h ?? 2980 }}>
          {lp.monitor && (
            <img className="cs-lp__monitor" src={lp.monitor} alt={`Landing page do ${data.name} em um monitor`} loading="lazy" />
          )}
          <img
            className="cs-lp__phone"
            src={lp.phone.src}
            alt={`Landing page do ${data.name} no celular`}
            loading="lazy"
            style={{ '--x': lp.phone.x, '--y': lp.phone.y ?? 863, '--w': lp.phone.w }}
          />
          {lp.tiles.map((t, i) => (
            <div
              key={i}
              className="cs-lp__tile"
              style={{ '--x': t.x, '--y': t.y, '--h': t.h, '--o': t.offset, '--ih': t.imgH }}
              data-reveal
            >
              <img src={t.src} alt={i === 0 ? `Seções da landing page do ${data.name}` : ''} loading="lazy" />
            </div>
          ))}
        </section>

        <section className={`cs-print ${materiais ? '' : 'cs-print--sem'}`} style={{ '--pt': data.printTop ?? 410 }}>
          {materiais && (
            <>
              <h2 className="cs-heading" data-reveal>
                Materiais impressos
              </h2>
              <Materiais slides={materiais} />
            </>
          )}
          <div className="container">
            <a className="cs-back" href="/#cases">
              <span className="cs-back__icon">
                <img src={cimg('icon-voltar.svg')} alt="" width="8.67133" height="10.5603" />
              </span>
              Voltar para os cases
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
