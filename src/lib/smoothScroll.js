import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis = null

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const headerOffset = () => -(document.querySelector('.header')?.offsetHeight ?? 0)

/**
 * Inicia o Lenis (rolagem suave) sincronizado com o ticker do GSAP,
 * para que os ScrollTriggers acompanhem exatamente a posição suavizada.
 */
export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return lenis

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // links âncora (#servicos etc.) rolam suave, descontando o header fixo
    anchors: { offset: headerOffset(), duration: 1.4 },
  })

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  return lenis
}

function raf(time) {
  lenis?.raf(time * 1000)
}

export function destroySmoothScroll() {
  if (!lenis) return
  gsap.ticker.remove(raf)
  lenis.destroy()
  lenis = null
}

export const getLenis = () => lenis

/**
 * Trava/destrava a rolagem (menu mobile, pop-up de contato...).
 * `owner` identifica quem pediu: a rolagem só volta quando ninguém mais estiver travando.
 */
const scrollLocks = new Set()
export function setScrollLocked(locked, owner = 'default') {
  if (locked) scrollLocks.add(owner)
  else scrollLocks.delete(owner)
  const any = scrollLocks.size > 0
  if (lenis) {
    if (any) lenis.stop()
    else lenis.start()
  }
  document.documentElement.style.overflow = any ? 'hidden' : ''
}

/** Rola até um alvo (seletor, elemento ou número). */
export function scrollToTarget(target) {
  if (lenis) {
    lenis.scrollTo(target, { offset: headerOffset(), duration: 1.4 })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  el?.scrollIntoView?.({ block: 'start' })
}
