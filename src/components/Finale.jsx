import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/scroll'
import { days, photo, trip } from '../data/itinerary'
import credits from '../data/credits.json'
import { deckleSheet } from '../lib/tear'

const edge = deckleSheet(97)

// Human-readable label for each photo slot, in page order.
function creditRows() {
  const rows = []
  for (const d of days) {
    rows.push([`Day ${d.n} gate`, d.gate.photo], [`Day ${d.n}`, d.hero.photo])
    d.activities.forEach((a) => rows.push([`Day ${d.n} · ${a.tag}`, a.photo]))
  }
  rows.push(['Farewell', 'finale'])
  return rows.filter(([, key]) => credits[key])
}

export default function Finale() {
  const root = useRef(null)
  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      gsap.fromTo(q('.finale-bg img'), { scale: 1.2 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top top', scrub: true } })
      gsap.from(q('.fin-reveal'), {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: q('.finale-top')[0], start: 'top 60%' },
      })
      q('.quote').forEach((el) => {
        gsap.from(el, { y: 60, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } })
      })
    },
    { scope: root }
  )

  return (
    <footer ref={root} className="finale">
      <div className="finale-top">
        <div className="finale-bg">
          <img src={photo('finale')} alt="Hawa Mahal lit at night" loading="lazy" decoding="async" />
        </div>
        <div className="finale-copy">
          <p className="fin-reveal finale-dev">खम्मा घणी</p>
          <h2 className="fin-reveal">Khamma Ghani</h2>
          <p className="fin-reveal finale-sub">A Rajasthani farewell. Till the Pink City calls you back.</p>
        </div>
      </div>

      <div className="finale-paper" style={{ clipPath: edge }}>
        <div className="quotes">
          {trip.quotes.map((qt) => (
            <figure key={qt.source} className="quote">
              {qt.original && <p className="quote-original">{qt.original}</p>}
              <blockquote>{qt.text}</blockquote>
              <figcaption>{qt.source}</figcaption>
            </figure>
          ))}
        </div>
        <p className="finale-conclusion">{trip.conclusion}</p>
        <a className="download-btn" href={trip.pdf} download>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3v12m0 0-5-5m5 5 5-5M4 20h16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>
            Download the itinerary
            <small>PDF · 8 days with clickable contents &amp; map links</small>
          </span>
        </a>

        <details className="credits">
          <summary>Photography credits</summary>
          <p>All photographs are from Wikimedia Commons and are used under the licences shown.</p>
          <ul>
            {creditRows().map(([label, key]) => {
              const c = credits[key]
              return (
                <li key={key}>
                  <span>{label}</span>
                  <a href={c.source} target="_blank" rel="noreferrer">
                    {c.title}
                  </a>
                  <span>
                    {c.artist || 'Unknown author'} ·{' '}
                    {c.licenseUrl ? (
                      <a href={c.licenseUrl} target="_blank" rel="noreferrer">
                        {c.license}
                      </a>
                    ) : (
                      c.license
                    )}
                  </span>
                </li>
              )
            })}
          </ul>
        </details>
      </div>
    </footer>
  )
}
