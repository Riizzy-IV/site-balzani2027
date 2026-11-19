import { useRef } from 'react'
import '../styles/home.css'
import '../styles/sobre.css'
import '../styles/servicos.css'
import useReveal from '../hooks/useReveal.js'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Cases from '../sections/Cases.jsx'
import Formulas from '../sections/Formulas.jsx'
import Partners from '../sections/Partners.jsx'
import { ServicosHero, ServicosLista } from '../sections/servicos/ServicosSections.jsx'

export default function Servicos() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <div className="page page--servicos" ref={ref}>
      <Header />
      <main>
        <ServicosHero />
        <div className="band band--a sv-band-a">
          <ServicosLista />
          {/* cases, fórmulas e parceiros: as mesmas seções da home */}
          <Cases />
        </div>
        <div className="sv-band-b">
          <Formulas />
          <Partners showTopLine={false} showVideo={false} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
