import CasePage from '../components/case/CasePage.jsx'
import { CENTRAL } from '../data/cases/edificioCentral.js'

export default function CaseEdificioCentral() {
  const { hero } = CENTRAL
  return (
    <CasePage
      data={CENTRAL}
      hero={
        // arte do topo exportada do Figma + o logo (camada à parte, por cima da arte)
        <section className="ec-hero" id="top">
          <h1 className="sr-only">Case Edifício Central — Itatiba</h1>
          <img className="ec-hero__art" src={hero.src} alt={hero.alt} />
          <img className="ec-hero__logo" src={hero.logo} alt="Edifício Central Itatiba" width="325" height="73" />
        </section>
      }
    />
  )
}
