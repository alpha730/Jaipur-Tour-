import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { days } from './data/itinerary'
import { gsap, ScrollTrigger, startSmoothScroll, stopSmoothScroll } from './lib/scroll'
import DaySection from './components/DaySection'
import DayNav from './components/DayNav'
import Finale from './components/Finale'

const Atmosphere = lazy(() => import('./components/Atmosphere'))

export default function App() {
  const [active, setActive] = useState(1)
  const bar = useRef(null)
  const onActive = useCallback((n) => setActive(n), [])

  useEffect(() => {
    startSmoothScroll()
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return stopSmoothScroll
  }, [])

  useGSAP(() => {
    gsap.to(bar.current, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })
  })

  return (
    <>
      <header className="brand">
        <b>Jaipur</b>
        <span>A Cultural Journey · 8 Days</span>
      </header>
      <div className="progress" aria-hidden="true">
        <span ref={bar} />
      </div>
      <DayNav active={active} />

      <main>
        {days.map((d, i) => (
          <DaySection key={d.n} day={d} first={i === 0} onActive={onActive} />
        ))}
      </main>
      <Finale />

      <Suspense fallback={null}>
        <Atmosphere />
      </Suspense>
    </>
  )
}
