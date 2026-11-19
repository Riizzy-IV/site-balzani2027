import { useRef } from 'react'
import '../styles/home.css'
import '../styles/sobre.css'
import useReveal from '../hooks/useReveal.js'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Partners from '../sections/Partners.jsx'
import Numbers from '../sections/Numbers.jsx'
import Leaders from '../sections/Leaders.jsx'
import { Empresarios, Pilares, Satisfacao, SobreHero } from '../sections/sobre/SobreSections.jsx'

export default function Sobre() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <div className="page page--sobre" ref={ref}>
      <Header />
      <main>
        <SobreHero />
        <div className="sobre-light">
          <Pilares />
          <Partners theme="light" showTopLine={false} showVideo={false} />
          <Empresarios />
          <Numbers theme="light" />
        </div>
        <Satisfacao />
        {/* lideranças iguais às da home: alinhadas e com a mesma animação de rolagem */}
        <Leaders />
      </main>
      <Footer />
    </div>
  )
}
