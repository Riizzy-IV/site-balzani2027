import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { CASES, img } from '../data/home.js'

gsap.registerPlugin(Draggable, InertiaPlugin)

function CaseImage({ c }) {
  return (
    <div className={`case-card__media ${c.crop ? 'case-card__media--shadow' : ''}`}>
      <img
        className={`case-card__img ${c.crop ? 'case-card__img--crop' : ''}`}
        src={c.image}
        alt={c.name}
        draggable={false}
        style={c.crop && { height: c.crop.h, width: c.crop.w, left: c.crop.left, top: c.crop.top }}
      />
    </div>
  )
}

export default function Cases() {
  const [index, setIndex] = useState(0)
  const trackRef = useRef(null)
  const dragRef = useRef(null)
  const indexRef = useRef(0)
  const draggedAt = useRef(0)
  indexRef.current = index

  // distância entre um card e o próximo (largura + espaço)
  const step = () => {
    const track = trackRef.current
    const card = track.children[0]
    return card.offsetWidth + (parseFloat(getComputedStyle(track).columnGap) || 0)
  }
  const bounds = () => ({ minX: -(CASES.length - 1) * step(), maxX: 0 })

  // arrastar com o mouse/dedo (com inércia), parando sempre num case
  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    const [drag] = Draggable.create(track, {
      type: 'x',
      inertia: true,
      bounds: bounds(),
      edgeResistance: 0.85,
      dragClickables: true, // o card é um link: dá para começar a arrastar em cima dele
      minimumMovement: 6,
      zIndexBoost: false, // padrão do Draggable joga a fileira na frente de tudo e esconde o botão laranja
      cursor: 'grab',
      activeCursor: 'grabbing',
      snap: { x: (v) => Math.round(v / step()) * step() },
      onDragEnd() {
        draggedAt.current = Date.now()
      },
      onThrowComplete() {
        setIndex(Math.min(CASES.length - 1, Math.max(0, Math.round(-this.x / step()))))
      },
    })
    dragRef.current = drag

    const onResize = () => {
      drag.applyBounds(bounds())
      gsap.set(track, { x: -indexRef.current * step() })
      drag.update()
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      drag.kill()
    }
  }, [])

  // botão laranja / fim do arraste: alinha no case atual
  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    gsap.to(track, {
      x: -index * step(),
      duration: 0.9,
      ease: 'power3.inOut',
      overwrite: true,
      onComplete: () => dragRef.current?.update(),
    })
  }, [index])

  // depois de arrastar, o "clique" que o navegador dispara ao soltar não deve abrir o case
  const onClickCapture = (e) => {
    if (Date.now() - draggedAt.current < 350 || dragRef.current?.isDragging || dragRef.current?.isThrowing) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const next = () => setIndex((i) => (i + 1) % CASES.length)

  return (
    <section className="cases" id="cases">
      <h2 className="cases__title" style={{ backgroundImage: `url(${img('cases-title-texture.png')})` }}>
        NOSSOS CASES
      </h2>

      <div className="cases__viewport">
        <div className="cases__track" ref={trackRef} onClickCapture={onClickCapture}>
          {CASES.map((c, i) => (
            <article key={c.name} className={`case-card ${i === index ? 'is-active' : ''}`} data-reveal>
              {/* cases com página própria abrem ao clicar na foto ou no nome */}
              {c.href ? (
                <a className="case-card__link" href={c.href} aria-label={`Ver o case ${c.name}`}>
                  <CaseImage c={c} />
                </a>
              ) : (
                <CaseImage c={c} />
              )}
              <div className="case-card__info">
                <h3>{c.href ? <a href={c.href}>{c.name}</a> : c.name}</h3>
                <p>{c.text}</p>
              </div>
            </article>
          ))}
        </div>

        <button className="cases__next" onClick={next} aria-label="Próximo case">
          <span className="cases__next-icon">
            <img src={img('icon-swap.svg')} alt="" />
          </span>
        </button>
      </div>
    </section>
  )
}
