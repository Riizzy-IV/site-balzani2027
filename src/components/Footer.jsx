import { useState } from 'react'
import { CONTACT, NAV, img } from '../data/home.js'
import { Kicker } from './ui.jsx'
import { isCurrent, resolveHref } from '../lib/nav.js'

function Newsletter() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: integrar com o CRM / ferramenta de e-mail marketing
    setSent(true)
    e.currentTarget.reset()
  }

  return (
    <form className="newsletter container" onSubmit={onSubmit} data-reveal>
      <span className="newsletter__panel" aria-hidden />
      <div className="newsletter__content">
        <p className="newsletter__title">
          <img src={img('icon-newsletter.svg')} alt="" width="40" height="40" />
          {sent ? 'Obrigado! Você está inscrito.' : 'Fique por dentro das notícias'}
        </p>
        <label className="newsletter__field">
          <span className="sr-only">Nome</span>
          <input type="text" name="nome" placeholder="nome" required autoComplete="name" />
        </label>
        <label className="newsletter__field">
          <span className="sr-only">E-mail</span>
          <input type="email" name="email" placeholder="e-mail" required autoComplete="email" />
        </label>
        <button type="submit" className="newsletter__submit">
          <img src={img('icon-send.svg')} alt="" width="46.7126" height="46.7126" />
          <span>enviar</span>
        </button>
      </div>
    </form>
  )
}

export default function Footer() {
  return (
    <footer className="footer" id="contato">
      <Newsletter />
      <div className="footer__body container">
        <div className="footer__main" data-reveal>
          <div className="footer__head">
            <Kicker className="footer__kicker">
              Nossa missão é clara: substituir o improviso por inteligência aplicada
            </Kicker>
            <h2 className="footer__title">
              vamos
              <br />
              conversar?
            </h2>
          </div>
          <div className="footer__social">
            <a className="social-chip" href={CONTACT.instagram.url} target="_blank" rel="noreferrer">
              <span className="social-chip__icon social-chip__icon--ig">
                <img src={img('icon-instagram.svg')} alt="" />
              </span>
              {CONTACT.instagram.handle}
            </a>
            <a className="social-chip" href={CONTACT.linkedin.url} target="_blank" rel="noreferrer">
              <span className="social-chip__icon social-chip__icon--in">
                <img src={img('icon-linkedin.svg')} alt="" />
              </span>
              {CONTACT.linkedin.handle}
            </a>
            <a className="social-chip social-chip--filled" href="#contato">
              <span className="social-chip__icon social-chip__icon--wa">
                <img src={img('icon-whatsapp.svg')} alt="" />
              </span>
              entre em contato
            </a>
          </div>
          <img className="footer__line" src={img('footer-line.svg')} alt="" />
          <a className="footer__address" href={CONTACT.mapsUrl} target="_blank" rel="noreferrer">
            <img src={img('icon-map-pin.svg')} alt="" width="24" height="24" />
            {CONTACT.address}
          </a>
        </div>

        <img className="footer__vline" src={img('footer-vline.svg')} alt="" aria-hidden />

        <nav className="footer__nav" aria-label="Rodapé">
          {NAV.map((n, i) => (
            <div key={n.href} className="footer__nav-row">
              {i > 0 && (
                <img
                  className="footer__nav-line"
                  src={img(i === 1 ? 'footer-nav-line-first.svg' : 'footer-nav-line.svg')}
                  alt=""
                />
              )}
              <a href={resolveHref(n.href)} aria-current={isCurrent(n.href) ? 'page' : undefined}>
                <img src={img('bullet.svg')} alt="" width="7" height="7" />
                {n.label}
              </a>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  )
}
