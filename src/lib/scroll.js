import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
// Mobile browsers resize the viewport as the address bar shows and hides; don't re-layout for that.
ScrollTrigger.config({ ignoreMobileResize: true })

export const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Shared scroll state read by the 3D scene every frame.
export const scrollState = { velocity: 0, progress: 0 }

let lenis = null
const tick = (time) => lenis?.raf(time * 1000)

export function startSmoothScroll() {
  if (lenis) return lenis
  lenis = new Lenis({ lerp: reducedMotion ? 1 : 0.085, wheelMultiplier: 0.9 })
  lenis.on('scroll', (l) => {
    scrollState.velocity = l.velocity
    scrollState.progress = l.progress
    ScrollTrigger.update()
  })
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function stopSmoothScroll() {
  gsap.ticker.remove(tick)
  lenis?.destroy()
  lenis = null
}

export function scrollToY(y) {
  if (lenis) lenis.scrollTo(y, { duration: 2.4 })
  else window.scrollTo({ top: y, behavior: 'smooth' })
}

export { gsap, ScrollTrigger }
