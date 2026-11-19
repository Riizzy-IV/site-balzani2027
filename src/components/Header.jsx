import { useEffect, useState } from 'react'
import { NAV, img } from '../data/home.js'
import { PillButton } from './ui.jsx'
import { setScrollLocked } from '../lib/smoothScroll.js'
import { isCurrent, resolveHref } from '../lib/nav.js'
import LeadModal from './LeadModal.jsx'

const HEADER_LINKS = NAV.filter((n) => ['Sobre', 'Serviços', 'Cases', 'Clientes'].includes(n.label))

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setScrollLocked(open, 'menu')
    return () => setScrollLocked(false, 'menu')
  }, [open])

  // abrir o pop-up de contato fecha o menu mobile
  useEffect(() => {
    const onLead = () => setOpen(false)
    window.addEventListener('lead:open', onLead)
    return () => window.removeEventListener('lead:open', onLead)
  }, [])

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <img className="header__bg" src={img('header-bg.png')} alt="" aria-hidden />
      <div className="header__inner container">
        <a href={resolveHref('/#top')} className="header__logo" aria-label="Balzani — início">
          <img src={img('logo-balzani.svg')} alt="Balzani" width="143" height="27" />
        </a>
        <nav className="header__nav" aria-label="Principal">
          {HEADER_LINKS.map((l) => (
            <a
              key={l.href}
              href={resolveHref(l.href)}
              aria-current={isCurrent(l.href) ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <PillButton href="#contato" className="header__cta header__cta--mobile" onClick={() => setOpen(false)}>
            Vamos conversar
          </PillButton>
        </nav>
        <PillButton href="#contato" className="header__cta">
          Vamos conversar
        </PillButton>
        <button
          className="header__burger"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>
      {/* o Header está em todas as páginas, então o pop-up de contato vive aqui */}
      <LeadModal />
    </header>
  )
}
