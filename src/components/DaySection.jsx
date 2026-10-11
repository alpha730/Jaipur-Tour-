import { memo, useMemo, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../lib/scroll'
import { deckleSheet } from '../lib/tear'
import { photo } from '../data/itinerary'
import TearGate from './TearGate'
import Postcard from './Postcard'

const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

function DayHero({ day }) {
  return (
    <div className="day-hero">
      <img className="day-hero-img" src={photo(day.hero.photo)} alt={day.hero.caption} loading={day.n === 1 ? 'eager' : 'lazy'} decoding="async" />
      <div className="day-hero-shade" />
      <div className="day-hero-copy">
        <p className="reveal kicker">
          <span className="dev">{day.hindi}</span>
          <span className="rule" />
          Day {day.n} of 8
        </p>
        <h2 className="reveal day-title">{day.title}</h2>
        <p className="reveal day-place">{day.place}</p>
        <p className="reveal day-tagline">{day.tagline}</p>
      </div>
      <p className="reveal photo-note">{day.hero.caption}</p>
      <div className="reveal scroll-cue">
        <span>The day, hour by hour</span>
        <i />
      </div>
    </div>
  )
}

function GateLabel({ day, first }) {
  if (first) {
    return (
      <>
        <div className="hero-copy">
          <p className="hero-dev">पधारो म्हारे देस</p>
          <p className="hero-kicker">Padharo Mhare Des · Welcome to Rajasthan</p>
          <h1>
            Jaipur
            <span>A Cultural Journey</span>
          </h1>
          <p className="hero-sub">Textiles, art &amp; heritage · 8 days, 7 nights</p>
        </div>
        <div className="gate-cue">
          <span>Scroll, and the Pink City opens</span>
          <i />
        </div>
        <p className="photo-note gate-note">{day.gate.caption}</p>
      </>
    )
  }
  return (
    <>
      <div className="gate-label">
        <span className="gate-num">{roman[day.n - 1]}</span>
        <p>Day {day.n}</p>
        <h3>{day.title}</h3>
      </div>
      <div className="gate-cue">
        <span>Scroll to tear open</span>
        <i />
      </div>
      <p className="photo-note gate-note">{day.gate.caption}</p>
    </>
  )
}

function DaySection({ day, first, onActive }) {
  const root = useRef(null)
  const intro = useRef(null)
  const sheet = useMemo(() => ({ outer: deckleSheet(day.n * 31), inner: deckleSheet(day.n * 31, { inset: 6 }) }), [day.n])

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: intro.current, start: 'top top', end: 'bottom bottom', scrub: 0.8 },
      })
      tl.to(q('.hero-copy, .gate-label, .gate-cue, .gate-note'), { opacity: 0, y: -40, duration: 0.1 }, 0)
        // The tear starts as a hairline crack, then rips apart.
        // Until the tear begins, show the unsplit photo so no seam is visible.
        .fromTo(q('.tear-half'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.001 }, 0.03)
        .set(q('.tear-whole'), { autoAlpha: 0 }, 0.031)
        .fromTo(q('.tear-rim'), { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.03)
        .to(q('.tear-half'), { filter: 'drop-shadow(0px 12px 28px rgba(0, 0, 0, 0.55))', duration: 0.08 }, 0.03)
        .to(q('.tear-left'), { xPercent: -3, rotateZ: -0.6, duration: 0.12, ease: 'power1.out' }, 0.04)
        .to(q('.tear-right'), { xPercent: 3, rotateZ: 0.6, duration: 0.12, ease: 'power1.out' }, 0.04)
        .to(q('.tear-left'), { xPercent: -62, rotateY: 24, rotateZ: -4, duration: 0.4, ease: 'power2.in' }, 0.16)
        .to(q('.tear-right'), { xPercent: 62, rotateY: -24, rotateZ: 4, duration: 0.4, ease: 'power2.in' }, 0.16)
        .to(q('.tear-gate'), { scale: 1.12, duration: 0.56, ease: 'power1.in' }, 0)
        .fromTo(q('.day-hero-img'), { scale: 1.3 }, { scale: 1.04, duration: 0.6, ease: 'power2.out' }, 0.12)
        .from(q('.reveal'), { y: 40, opacity: 0, stagger: 0.03, duration: 0.12, ease: 'power2.out' }, 0.58)
        .set(q('.tear-gate'), { autoAlpha: 0 }, 0.57)
        .to({}, { duration: 0.14 })

      gsap.fromTo(
        q('.tear-gate'),
        { filter: 'brightness(0.55)' },
        { filter: 'brightness(1)', ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top top', scrub: true } }
      )

      // On phones the cards rise straight up; a sideways start would overhang the screen.
      const slide = window.matchMedia('(max-width: 760px)').matches ? 0 : 80
      q('.postcard').forEach((el, i) => {
        gsap.from(el, {
          x: i % 2 ? slide : -slide,
          y: 60,
          rotate: i % 2 ? 4 : -4,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        })
        gsap.fromTo(
          el.querySelector('.pc-photo-frame img'),
          { yPercent: -7 },
          { yPercent: 7, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }
        )
      })

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => self.isActive && onActive(day.n),
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} id={`day-${day.n}`} className="day" style={{ '--ac': day.ac }} aria-label={`Day ${day.n}: ${day.title}`}>
      <div ref={intro} className="day-intro">
        <div className="stage">
          <DayHero day={day} />
          <TearGate src={day.gate.photo} seed={day.n * 17} eager={first} />
          <GateLabel day={day} first={first} />
        </div>
      </div>

      <div className="sheet" style={{ clipPath: sheet.outer }}>
        <div className="sheet-paper" style={{ clipPath: sheet.inner }}>
          <header className="sheet-head">
            <span className="dev">{day.hindi}</span>
            <h2>
              Day {day.n} <em>·</em> {day.place}
            </h2>
          </header>
          {day.activities.map((a, i) => (
            <Postcard key={a.title} a={a} i={i} day={day} />
          ))}
          {day.overnight && (
            <p className="overnight">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 3a9 9 0 1 0 6 15.5A7.5 7.5 0 0 1 15 3Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              <b>Overnight</b>
              <span>{day.overnight}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default memo(DaySection)
