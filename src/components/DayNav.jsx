import { days } from '../data/itinerary'
import { scrollToY } from '../lib/scroll'

// Jump to the moment a day's gate has fully torn open.
function goToDay(n) {
  const intro = document.querySelector(`#day-${n} .day-intro`)
  if (!intro) return
  const top = intro.getBoundingClientRect().top + window.scrollY
  scrollToY(top + (intro.offsetHeight - window.innerHeight) * 0.9)
}

export default function DayNav({ active }) {
  return (
    <nav className="day-nav" aria-label="Days">
      {days.map((d) => (
        <button
          key={d.n}
          className={`day-dot ${d.n === active ? 'is-active' : ''}`}
          onClick={() => goToDay(d.n)}
          aria-label={`Day ${d.n}: ${d.title}`}
          aria-current={d.n === active ? 'step' : undefined}
        >
          <span className="day-dot-label">
            <b>{String(d.n).padStart(2, '0')}</b> {d.title}
          </span>
          <i />
        </button>
      ))}
    </nav>
  )
}
