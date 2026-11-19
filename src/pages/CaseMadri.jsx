import CasePage from '../components/case/CasePage.jsx'
import { MADRI } from '../data/cases/madri.js'

export default function CaseMadri() {
  return (
    <CasePage
      data={MADRI}
      hero={
        // key visual: arte única do Figma com título, logo e chamada
        <section className="cs-hero" id="top">
          <h1 className="sr-only">Case Madri Condomínio Clube — um condomínio com lazer completo</h1>
          <img src={MADRI.hero.src} alt={MADRI.hero.alt} />
        </section>
      }
    />
  )
}
