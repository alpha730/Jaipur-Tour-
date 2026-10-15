import { memo, useMemo, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../lib/scroll'
import { deckleSheet } from '../lib/tear'
import { photo } from '../data/itinerary'
import ZoomCollage from './ZoomCollage'
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
        <span>Scroll to step into the day</span>
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
      const items = q('.zc-item')
      // Each item zooms from scale 1 (collage) to its own factor k (gone off-screen, or
      // filling the stage for the main photo).
      const zoomIn = (at, dur) =>
        items.forEach((el) => tl.to(el, { scale: +el.dataset.k, duration: dur, ease: 'power2.in' }, at))

      tl.to(q('.hero-copy, .gate-label, .gate-cue, .gate-note'), { opacity: 0, y: -40, duration: 0.1 }, first ? 0.02 : 0)
      if (first) {
        // Day 1 opens on Hawa Mahal filling the screen: pull back to reveal the collage,
        // let Hawa Mahal give way to the day's photo, then dive into it.
        items.forEach((el) => tl.fromTo(el, { scale: +el.dataset.k }, { scale: 1, duration: 0.28, ease: 'power2.out' }, 0.04))
        tl.to(q('.zc-lead'), { opacity: 0, duration: 0.08 }, 0.34)
        zoomIn(0.44, 0.3)
        tl.set(q('.zoom-collage'), { autoAlpha: 0 }, 0.74)
          .from(q('.reveal'), { y: 40, opacity: 0, stagger: 0.025, duration: 0.1, ease: 'power2.out' }, 0.74)
      } else {
        zoomIn(0.08, 0.5)
        tl.set(q('.zoom-collage'), { autoAlpha: 0 }, 0.58)
          .from(q('.reveal'), { y: 40, opacity: 0, stagger: 0.03, duration: 0.12, ease: 'power2.out' }, 0.58)
      }
      tl.to({}, { duration: 0.12 })

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
          <ZoomCollage
            main={day.hero.photo}
            lead={first ? day.gate.photo : null}
            others={first ? day.collage : [...day.activities.map((a) => a.photo), day.gate.photo]}
            eager={first}
          />
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
