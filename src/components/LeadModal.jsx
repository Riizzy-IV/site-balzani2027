import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { LEAD_ENDPOINT, LEAD_STEPS } from '../data/lead.js'
import '../styles/lead.css'
import { prefersReducedMotion, setScrollLocked } from '../lib/smoothScroll.js'

const TOTAL = LEAD_STEPS.length
const EMPTY = { nome: '', telefone: '', email: '', site: '', perfil: '', vgv: '', previsao: '', empresa_url: '' }

/** (11) 99999-9999 */
function maskPhone(v) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

const VALIDATORS = {
  nome: (v) => (v.trim().length >= 3 ? '' : 'Informe seu nome'),
  telefone: (v) => (v.replace(/\D/g, '').length >= 10 ? '' : 'Telefone com DDD'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'E-mail inválido'),
  site: (v) => (v.trim().length >= 3 ? '' : 'Informe o site ou @ da empresa'),
  perfil: (v) => (v ? '' : 'Escolha uma opção'),
  vgv: (v) => (v ? '' : 'Escolha uma opção'),
  previsao: (v) => (v ? '' : 'Escolha uma opção'),
}

const stepFields = (s) => [...(s.fields || []).map((f) => f.name), ...(s.choices || []).map((c) => c.name)]

/** Abre o pop-up de qualquer lugar: links "#contato" ou window.dispatchEvent(new Event('lead:open')). */
export default function LeadModal() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [data, setData] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const rootRef = useRef(null)
  const cardRef = useRef(null)
  const lastFocus = useRef(null)

  // qualquer link "#contato" do site abre o formulário
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.('a[href="#contato"], a[href="/#contato"], [data-lead-open]')
      if (!a) return
      e.preventDefault()
      e.stopPropagation() // impede o Lenis de rolar até o rodapé
      lastFocus.current = a
      window.dispatchEvent(new Event('lead:open'))
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('click', onClick, true)
    window.addEventListener('lead:open', onOpen)
    // abre direto se a URL vier com #contato (ex.: link compartilhado)
    if (window.location.hash === '#contato') setOpen(true)
    return () => {
      window.removeEventListener('click', onClick, true)
      window.removeEventListener('lead:open', onOpen)
    }
  }, [])

  const statusRef = useRef(status)
  statusRef.current = status

  const close = useCallback(() => {
    const finish = () => {
      setOpen(false)
      lastFocus.current?.focus?.()
      // depois de enviado, a próxima abertura começa do zero
      if (statusRef.current === 'done') {
        setStep(0)
        setData(EMPTY)
        setErrors({})
        setStatus('idle')
      }
    }
    if (prefersReducedMotion() || !rootRef.current) return finish()
    gsap
      .timeline({ onComplete: finish })
      .to(cardRef.current, { y: 30, opacity: 0, duration: 0.25, ease: 'power2.in' })
      .to(rootRef.current, { opacity: 0, duration: 0.2 }, '<0.05')
  }, [])

  // abrir: trava rolagem, anima e foca o primeiro campo
  useLayoutEffect(() => {
    if (!open) return
    setScrollLocked(true, 'lead')
    if (!prefersReducedMotion()) {
      gsap.fromTo(rootRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'power3.out', delay: 0.05 },
      )
    }
    return () => setScrollLocked(false, 'lead')
  }, [open])

  // a altura do carrossel acompanha a etapa atual (senão as etapas curtas ficam com um vão embaixo)
  const viewportRef = useRef(null)
  useLayoutEffect(() => {
    const vp = viewportRef.current
    if (!open || !vp) return
    const fit = () => {
      const slide = vp.querySelector(`[data-step="${step}"]`)
      if (slide) vp.style.height = `${slide.offsetHeight}px`
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [open, step, errors, status])

  // foco no primeiro campo da etapa atual
  useEffect(() => {
    if (!open || status === 'done') return
    const t = setTimeout(() => {
      cardRef.current?.querySelector(`[data-step="${step}"] input, [data-step="${step}"] button.lead-chip`)?.focus({
        preventScroll: true,
      })
    }, 420)
    return () => clearTimeout(t)
  }, [open, step, status])

  // Esc fecha; Tab fica preso dentro do pop-up
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'Tab' && cardRef.current) {
        const els = [...cardRef.current.querySelectorAll('button, input, a[href]')].filter(
          (el) => !el.disabled && el.offsetParent !== null && !el.closest('[inert]'),
        )
        if (!els.length) return
        const first = els[0]
        const last = els[els.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  const set = (name, value) => {
    setData((d) => ({ ...d, [name]: name === 'telefone' ? maskPhone(value) : value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }))
  }

  const validate = (i) => {
    const errs = {}
    stepFields(LEAD_STEPS[i]).forEach((n) => {
      const msg = VALIDATORS[n]?.(data[n]) || ''
      if (msg) errs[n] = msg
    })
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const next = async () => {
    if (!validate(step)) {
      if (!prefersReducedMotion()) gsap.fromTo(cardRef.current, { x: -6 }, { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' })
      return
    }
    if (step < TOTAL - 1) return setStep(step + 1)
    await submit()
  }

  const submit = async () => {
    if (data.empresa_url) return setStatus('done') // honeypot: robôs preenchem o campo escondido
    setStatus('sending')
    const params = new URLSearchParams(window.location.search)
    const payload = {
      nome: data.nome.trim(),
      telefone: data.telefone,
      email: data.email.trim(),
      site: data.site.trim(),
      perfil: data.perfil,
      vgv: data.vgv,
      previsao: data.previsao,
      pagina: window.location.href,
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      enviado_em: new Date().toISOString(),
    }
    try {
      if (LEAD_ENDPOINT) {
        const r = await fetch(LEAD_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
      } else {
        console.warn('[LeadModal] LEAD_ENDPOINT vazio — contato NÃO foi enviado:', payload)
        await new Promise((r) => setTimeout(r, 700))
      }
      setStatus('done')
    } catch (err) {
      console.error('[LeadModal] falha no envio', err)
      setStatus('error')
    }
  }

  if (!open) return null

  // portal no <body>: o header (pai) ganha backdrop-filter ao rolar, o que prenderia o position:fixed dentro dele
  return createPortal(
    <div className="lead" ref={rootRef} data-lenis-prevent onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="lead__card" ref={cardRef} role="dialog" aria-modal="true" aria-labelledby="lead-title">
        <div className="lead__meta">
          <span>Fale com um consultor</span>
          <span className="lead__meta-status">
            <i aria-hidden /> sem compromisso
          </span>
        </div>

        {status === 'done' ? (
          <div className="lead__done" role="status">
            <span className="lead__done-icon" aria-hidden>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h2 id="lead-title" className="lead__title">
              Recebemos seus <em>dados</em>
            </h2>
            <p className="lead__sub">
              Obrigado, {data.nome.trim().split(' ')[0]}! Um consultor da Balzani vai entrar em contato com você em breve.
            </p>
            <button type="button" className="lead__btn lead__btn--primary" onClick={close}>
              Fechar
            </button>
          </div>
        ) : (
          <form
            className="lead__form"
            noValidate
            onSubmit={(e) => {
              e.preventDefault()
              next()
            }}
          >
            <h2 id="lead-title" className="lead__title">
              <em>4 perguntas</em> para acelerar o seu lançamento
            </h2>
            <p className="lead__sub">Preencha se você está à procura de aumentar suas vendas através da internet.</p>

            <div className="lead__progress" aria-hidden>
              {LEAD_STEPS.map((s, i) => (
                <span key={s.id} className={i <= step ? 'is-on' : ''} />
              ))}
              <b>
                {step + 1}/{TOTAL}
              </b>
            </div>

            {/* carrossel: cada etapa é um slide; só a etapa atual fica acessível */}
            <div className="lead__viewport" ref={viewportRef}>
              <div className="lead__track" style={{ transform: `translateX(${-step * 100}%)` }}>
                {LEAD_STEPS.map((s, i) => (
                  <fieldset key={s.id} className="lead__step" data-step={i} inert={i !== step ? '' : undefined} aria-hidden={i !== step}>
                    <legend className="lead__q">{s.title}</legend>

                    {s.fields?.map((f) => (
                      <label key={f.name} className={`lead-field ${data[f.name] ? 'has-value' : ''} ${errors[f.name] ? 'has-error' : ''}`}>
                        <input
                          type={f.type}
                          name={f.name}
                          value={data[f.name]}
                          autoComplete={f.autoComplete}
                          inputMode={f.type === 'tel' ? 'tel' : undefined}
                          onChange={(e) => set(f.name, e.target.value)}
                          aria-invalid={!!errors[f.name]}
                          placeholder=" "
                        />
                        <span className="lead-field__label">{f.label}</span>
                        {errors[f.name] && <span className="lead-field__error">{errors[f.name]}</span>}
                      </label>
                    ))}

                    {s.choices?.map((c) => (
                      <div key={c.name} className={`lead-choice ${errors[c.name] ? 'has-error' : ''}`} role="radiogroup" aria-label={c.label}>
                        <p className="lead-choice__label">{c.label}</p>
                        <div className={`lead-choice__opts ${c.grid ? 'is-grid' : ''}`}>
                          {c.options.map((o) => (
                            <button
                              key={o}
                              type="button"
                              role="radio"
                              aria-checked={data[c.name] === o}
                              className={`lead-chip ${data[c.name] === o ? 'is-on' : ''}`}
                              onClick={() => set(c.name, o)}
                            >
                              {o}
                            </button>
                          ))}
                        </div>
                        {errors[c.name] && <span className="lead-field__error">{errors[c.name]}</span>}
                      </div>
                    ))}
                  </fieldset>
                ))}
              </div>
            </div>

            {/* honeypot anti-spam: escondido de pessoas, robôs preenchem */}
            <input
              className="lead__hp"
              tabIndex={-1}
              autoComplete="off"
              name="empresa_url"
              value={data.empresa_url}
              onChange={(e) => set('empresa_url', e.target.value)}
              aria-hidden
            />

            {status === 'error' && (
              <p className="lead__alert" role="alert">
                Não conseguimos enviar agora. Tente de novo em instantes.
              </p>
            )}

            <div className="lead__actions">
              {step > 0 && (
                <button type="button" className="lead__btn lead__btn--ghost" onClick={() => setStep(step - 1)}>
                  ← Voltar
                </button>
              )}
              <button type="submit" className="lead__btn lead__btn--primary" disabled={status === 'sending'}>
                {status === 'sending' ? 'Enviando…' : step === TOTAL - 1 ? 'Enviar' : 'Continuar →'}
              </button>
            </div>
          </form>
        )}

        <button type="button" className="lead__close" onClick={close} aria-label="Fechar formulário">
          <span aria-hidden />
        </button>
      </div>
    </div>,
    document.body,
  )
}
