import CasePage from '../components/case/CasePage.jsx'
import { HELENA } from '../data/cases/helenaBay.js'

export default function CaseHelenaBay() {
  return (
    <CasePage
      data={HELENA}
      hero={
        // key visual: arte única do Figma com título, logo e chamada
        <section className="cs-hero" id="top">
          <h1 className="sr-only">Case Helena Bay Residence — um projeto para inspirar a vida</h1>
          <img src={HELENA.hero.src} alt={HELENA.hero.alt} />
        </section>
      }
    />
  )
}
