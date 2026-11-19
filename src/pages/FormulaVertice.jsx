import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/home.css'
import '../styles/sobre.css'
import '../styles/vertice.css'
import useReveal from '../hooks/useReveal.js'
import { prefersReducedMotion } from '../lib/smoothScroll.js'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { Kicker } from '../components/ui.jsx'
import { simg } from '../data/sobre.js'

gsap.registerPlugin(ScrollTrigger)

// LP da Fórmula Vértice (Figma: [BAL] Novo Site › "Fórmula Vértice", node 902:2654). Medidas em px do frame de 1920.
const v = (file) => `/img/vertice/${file}`

// grade de linhas do topo (posições do Figma): verticais (x), horizontais (y) e duas diagonais (centro)
const LINHAS_V = [348, 439, 559, 650, 717, 808, 1029, 1120, 1218, 1309, 1375, 1466, 1654, 1708, 1799]
const LINHAS_H = [681.5, 767.5, 971.5, 1057.5]
const LINHAS_D = [
  [225.16, 653.49],
  [310.55, 684.95],
]

const OBJETIVOS = ['vender rápido', 'ganhar escala', 'gerar caixa']

const PILARES = [
  {
    n: '01',
    t: 'estratégia',
    d: 'Definimos, planejamos e organizamos todas as etapas e estruturas da estratégia de lançamento e relacionamento',
    w: 392,
  },
  {
    n: '02',
    t: 'marketing',
    d: 'Desde a criação do conceito da campanha/​empreendimento, desenvolvimento do enxoval de lançamento e campanhas digitais, com foco em performance e dados.',
    w: 494,
  },
  {
    n: '03',
    t: 'comercial',
    d: 'Definição e estruturação comercial, desde a definição de metas, indicadores, treinamentos e acompanhamento da equipe e leads.',
    w: 388,
  },
]

const PASSOS = [
  'Construímos toda a estratégia comercial e de vendas do lançamento.',
  'Definimos o posicionamento.',
  'Estruturamos o cronograma.',
  'Planejamos cada etapa da campanha.',
  'E desenhamos um evento de lançamento pensado para gerar desejo, percepção de valor e resultado.',
]

const MARKETING = ['Conceito', 'Branding', 'Materiais Impressos', 'Mídia Digital', 'Vídeo Conceito', 'Criativos', 'Performance', 'Campanhas']

const COMERCIAL = [
  'Desenvolvimento e estruturação da área comercial',
  'Cliente oculto',
  'Implementação de CRM',
  'Treinamento e acompanhamento semanal com especialista comercial',
  'Diagnóstico da operação comercial atual',
  'Definição de metas e indicadores de performance',
  'Estruturação do processo de atendimento do lead',
]

export default function FormulaVertice() {
  const ref = useRef(null)
  useReveal(ref)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      // entrada do topo: o título sobe em blocos, o "vértice" desliza e os objetivos aparecem em sequência
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.fv-display > span', { yPercent: 30, opacity: 0, duration: 1, stagger: 0.12 })
        .from('.fv-hero__lead, .fv-descer', { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.5')
        .from('.fv-objetivo', { y: 30, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.4')

      // grade e brilhos se mexem devagar com a rolagem
      gsap.to('.fv-mesh', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: '.fv-intro', start: 'top top', end: '+=1400', scrub: true },
      })
      gsap.from('.fv-ampulheta', {
        scaleY: 0.5,
        opacity: 0,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.fv-ampulheta', start: 'top 85%', once: true },
      })

      // "CONECTADO > INTEGRADO": as duas palavras se encontram e o botão gira
      gsap.from('.fv-conecta__a', { x: -60, opacity: 0, duration: 0.9, scrollTrigger: { trigger: '.fv-conecta', start: 'top 80%', once: true } })
      gsap.from('.fv-conecta__b', { x: 60, opacity: 0, duration: 0.9, scrollTrigger: { trigger: '.fv-conecta', start: 'top 80%', once: true } })
      gsap.from('.fv-conecta__btn', { rotation: -180, scale: 0.4, opacity: 0, duration: 0.9, ease: 'back.out(1.6)', scrollTrigger: { trigger: '.fv-conecta', start: 'top 80%', once: true } })

      // palavras em cursiva entram da esquerda
      gsap.utils.toArray('.fv-script').forEach((el) => {
        gsap.from(el, { x: -50, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
      })
      // a foto da equipe sobe devagar
      gsap.to('.fv-foto__img img', {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: { trigger: '.fv-foto', start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div className="page page--vertice" ref={ref}>
      <Header />
      <main>
        {/* ---------- topo + metodologia (fundo azul contínuo) ---------- */}
        <section className="fv-intro" id="top">
          <div className="fv-deco" aria-hidden>
            <img className="fv-brilho-hero" src={v('brilho-hero.svg')} alt="" />
            <img className="fv-mesh" src={v('mesh.svg')} alt="" />
            <div className="fv-linhas">
              {LINHAS_V.map((x) => (
                <img key={x} className="fv-linha fv-linha--v" src={v('linha-v.svg')} alt="" style={{ '--x': x }} />
              ))}
              {LINHAS_H.map((y) => (
                <img key={y} className="fv-linha fv-linha--h" src={v('linha-h.svg')} alt="" style={{ '--y': y }} />
              ))}
              {LINHAS_D.map(([x, y]) => (
                <img key={x} className="fv-linha fv-linha--d" src={v('linha-d.svg')} alt="" style={{ '--x': x, '--y': y }} />
              ))}
            </div>
            <img className="fv-brilho-titulo" src={v('brilho-titulo.svg')} alt="" />
            <img className="fv-ampulheta" src={v('brilho-ampulheta.svg')} alt="" />
          </div>

          <nav className="breadcrumb fv-breadcrumb" aria-label="Você está em">
            <a href="/">HOME</a>
            <img src={simg('breadcrumb-sep.svg')} alt="" width="8.5" height="7.36396" />
            <a href="/servicos/">SERVIÇOS</a>
            <img src={simg('breadcrumb-sep.svg')} alt="" width="8.5" height="7.36396" />
            <span aria-current="page">FÓRMULA VÉRTICE</span>
          </nav>

          <h1 className="fv-display">
            <span>fór</span>
            <span>mula</span>
            <span className="fv-display__vertice" style={{ backgroundImage: 'url(/img/servicos/artificial-texture.jpg)' }}>
              vértice
            </span>
          </h1>

          <a className="fv-descer" href="#metodologia" aria-label="Ver a metodologia">
            <img src={v('btn-descer.svg')} alt="" width="111" height="60" />
          </a>

          <p className="fv-hero__lead">
            Todo incorporador entra em um lançamento com a <b>mesma expectativa:</b>
          </p>
          <ul className="fv-objetivos">
            {OBJETIVOS.map((o) => (
              <li key={o} className="fv-objetivo">
                <img src={v('ic-grafico.svg')} alt="" width="27.2222" height="27.2222" />
                {o}
              </li>
            ))}
          </ul>

          <div className="fv-realidade">
            <h2>Mas a realidade do mercado é outra.</h2>
            <p>
              Porque no mercado imobiliário, não basta ter um bom produto.
              <br />
              Sem estratégia, até grandes empreendimentos fracassam.
            </p>
          </div>

          <img className="fv-logo" src={v('logo-formula-vertice.svg')} alt="Fórmula Vértice by Balzani" width="439" height="185" id="metodologia" />

          <h2 className="fv-metodo">
            Uma metodologia validada para transformar lançamentos imobiliários em operações de alta performance.
          </h2>
          <p className="fv-hub">
            Enquanto o mercado entrega serviços isolados… A Balzani construiu
            <br />
            <b>o maior hub de soluções para o mercado imobiliário do Brasil.</b>
          </p>

          <div className="fv-pilares">
            {PILARES.map((p, i) => (
              <article key={p.n} className={`fv-pilar fv-pilar--${i + 1}`} data-reveal>
                <span className="fv-pilar__n">{p.n}</span>
                <h3 className="fv-pilar__t">{p.t}</h3>
                <p className="fv-pilar__d" style={{ '--pw': p.w }}>
                  {p.d}
                </p>
              </article>
            ))}
          </div>

          <img className="fv-sep fv-sep--1" src={v('linha-1680-escura.svg')} alt="" aria-hidden />

          <div className="fv-conecta">
            <p className="fv-conecta__label">tudo está...</p>
            <div className="fv-conecta__box">
              <span className="fv-conecta__a">conectado</span>
              {/* botão redondo em CSS: como imagem, o navegador não aplica o desfoque de fundo nem o anel nítido do Figma */}
              <span className="fv-conecta__btn" aria-hidden>
                <svg viewBox="0 0 76.4 76.4" width="76.4" height="76.4" fill="none">
                  <path
                    d="M34.6513 46.12L41.1712 39.6C41.9412 38.83 41.9412 37.57 41.1712 36.8L34.6513 30.28"
                    stroke="#FF611B"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="fv-conecta__b">integrado</span>
            </div>
            <p className="fv-conecta__fim">
              ...tudo pensado para uma <b>única coisa</b>
            </p>
          </div>

          <div className="fv-vender">
            <img className="fv-vender__traco fv-vender__traco--esq" src={v('traco-142.svg')} alt="" aria-hidden />
            <p className="fv-vender__lead">vender</p>
            <p className="fv-vender__script fv-script">empreendimentos</p>
            <img className="fv-vender__traco fv-vender__traco--dir" src={v('traco-142.svg')} alt="" aria-hidden />
          </div>

          <div className="fv-como">
            <div className="fv-como__head" data-reveal>
              <Kicker>Como funciona</Kicker>
              <h2>
                O primeiro passo para um lançamento de sucesso é a definição de uma <em>estratégia eficiente.</em>
              </h2>
            </div>
            <ul className="fv-como__lista" data-reveal>
              {PASSOS.map((p) => (
                <li key={p}>
                  <img src={v('ic-triangulo.svg')} alt="" width="14.0007" height="7.64251" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="fv-foto">
            <div className="fv-foto__glow" aria-hidden>
              <img src={v('foto-equipe.jpg')} alt="" />
            </div>
            <div className="fv-foto__img">
              <img src={v('foto-equipe.jpg')} alt="Equipe da Balzani trabalhando no escritório" />
            </div>
          </div>
        </section>

        {/* ---------- marketing, comercial e dados (fundo branco) ---------- */}
        <section className="fv-branco">
          <div className="fv-mkt" data-reveal>
            <h2>
              Depois, o <em>marketing</em> entra para construir desejo. Unimos estratégia, criatividade e performance para
              transformar empreendimentos em cases de sucesso.
            </h2>
            <ul className="fv-tags">
              {MARKETING.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>

          <div className="fv-com">
            <div className="fv-com__head">
              <h2>Mas o lançamento não se vende sozinho. Por isso estruturamos toda a</h2>
              <p className="fv-com__script fv-script">operação comercial</p>
              <span className="gradient-bar fv-com__bar" aria-hidden />
            </div>
            <ul className="fv-com__lista" data-reveal>
              {COMERCIAL.map((c) => (
                <li key={c}>
                  <img src={v('ic-seta-circulo.svg')} alt="" width="54.2333" height="54.2333" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <img className="fv-sep fv-sep--2" src={v('linha-1680-clara.svg')} alt="" aria-hidden />

          <div className="fv-dados">
            <h2 className="fv-dados__lead">
              <img src={v('ic-triangulo-g-esq.svg')} alt="" width="24" height="14" className="is-esq" />
              E por trás de toda grande operação
              <img src={v('ic-triangulo-g-dir.svg')} alt="" width="24" height="14" className="is-dir" />
            </h2>
            <p className="fv-dados__script fv-script">existem dados</p>
            <p className="fv-dados__pill">Porque campanhas de lançamento sem dados… não são nada.</p>
            <p className="fv-dados__texto">
              Analisamos métricas, cruzamos informações entre o marketing e vendas e tomamos decisões baseadas em
              performance real.
              <br />
              <b>Sem achismo. Sem improviso.</b>
            </p>
          </div>

          <div className="fv-card" data-reveal>
            <span className="fv-card__bar" aria-hidden />
            <h2>
              A <em>Fórmula Vértice</em> foi criada para incorporadores{' '}
              <br />e construtores que querem previsibilidade.
            </h2>
            <p>Um método validado para acelerar vendas e transformar lançamentos em cases de sucesso.</p>
          </div>
        </section>

        {/* ---------- chamada final ---------- */}
        <section className="fv-final">
          <h2 data-reveal>Seu próximo lançamento pode seguir dois caminhos:</h2>
          <p className="fv-final__caminhos" data-reveal>
            Mais um empreendimento tentando vender{' '}
            <br />
            <b>ou o próximo grande case do mercado imobiliário.</b>
          </p>
          <a className="fv-final__cta" href="#contato" data-reveal>
            <img src={v('ic-consultor.svg')} alt="" width="32" height="32" />
            Fale com um dos nossos consultores
          </a>
        </section>
      </main>
      <Footer />
    </div>
  )
}
