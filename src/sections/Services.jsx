import { useState } from 'react'
import { SERVICES, img } from '../data/home.js'
import { ChevronList, Kicker } from '../components/ui.jsx'

export default function Services() {
  const [open, setOpen] = useState(0)

  return (
    <section className="services" id="servicos">
      <div className="services__inner container">
        <div className="services__intro" data-reveal>
          <Kicker>Nossos serviços</Kicker>
          <h2 className="services__title">
            Um grupo especializado{' '}
            <br />
            em entregar soluções 360°{' '}
            <br />
            para incorporadoras
          </h2>
        </div>

        <div className="accordion" data-reveal>
          {SERVICES.map((s, i) => {
            const isOpen = open === i
            const panelId = `service-panel-${s.number}`
            return (
              <div key={s.number} className={`accordion__item ${isOpen ? 'is-open' : ''}`}>
                {i > 0 && (
                  <img
                    className="accordion__sep"
                    src={img(i === 1 ? 'line-service-sep-a.svg' : 'line-service-sep-b.svg')}
                    alt=""
                  />
                )}
                <button
                  className="accordion__head"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="accordion__label">
                    {/* blur progressivo: camada nítida à esquerda, desfocada à direita */}
                    <span className="accordion__num" aria-hidden>
                      <span className="accordion__num-sharp">{s.number}</span>
                      <span className="accordion__num-blur">{s.number}</span>
                    </span>
                    <span className="accordion__name">{s.title}</span>
                  </span>
                  <span className="accordion__toggle" aria-hidden>
                    <span className="accordion__chevron">
                      <img src={img(isOpen ? 'chevron-up.svg' : 'chevron-down.svg')} alt="" />
                    </span>
                  </span>
                </button>
                <div className="accordion__panel" id={panelId} role="region">
                  <div className="accordion__panel-inner">
                    {s.items.length > 0 && (
                      <div
                        className="accordion__list"
                        style={{
                          '--list-w': s.listWidth ? `calc(var(--u) * ${s.listWidth})` : '100%',
                          '--list-gap': `calc(var(--u) * ${s.gap ?? 12})`,
                        }}
                      >
                        <ChevronList
                          items={s.items}
                          chevron="chevron-orange.svg"
                          line={s.line ?? 'line-service.svg'}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
