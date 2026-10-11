import { photo } from '../data/itinerary'

// Circular India Post style cancellation mark.
function Postmark({ day, period, id }) {
  return (
    <svg className="postmark" viewBox="0 0 160 110" aria-hidden="true">
      <defs>
        <path id={id} d="M30,55 a32,32 0 1,1 64,0 a32,32 0 1,1 -64,0" />
      </defs>
      <circle cx="62" cy="55" r="44" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="62" cy="55" r="27" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <text fontSize="10.5" letterSpacing="2.2" fill="currentColor">
        <textPath href={`#${id}`}>JAIPUR · RAJASTHAN ·</textPath>
      </text>
      <text x="62" y="52" textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor">
        DAY {day}
      </text>
      <text x="62" y="66" textAnchor="middle" fontSize="7" letterSpacing="0.4" fill="currentColor">
        {period.toUpperCase()}
      </text>
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M104,${34 + i * 12} q10,-7 20,0 t20,0 t20,0`} fill="none" stroke="currentColor" strokeWidth="1.8" />
      ))}
    </svg>
  )
}

function Stamp({ src }) {
  return (
    <span className="stamp" aria-hidden="true">
      <span className="stamp-inner">
        <img src={photo(src)} alt="" loading="lazy" decoding="async" />
        <span className="stamp-text">
          <b>भारत</b> INDIA
        </span>
      </span>
    </span>
  )
}

export default function Postcard({ a, i, day }) {
  const flip = i % 2 === 1
  return (
    <article className={`postcard ${flip ? 'is-flip' : ''}`}>
      <figure className="pc-photo">
        <div className="pc-photo-frame">
          <img src={photo(a.photo)} alt={a.caption} loading="lazy" decoding="async" />
        </div>
        <figcaption>{a.caption}</figcaption>
      </figure>
      <div className="pc-back">
        <div className="pc-marks">
          <Postmark day={day.n} period={a.period} id={`pm-${day.n}-${i}`} />
          <Stamp src={day.hero.photo} />
        </div>
        <p className="pc-when">
          <b>{a.period}</b>
          <span>{a.time}</span>
        </p>
        <span className="pc-tag">{a.tag}</span>
        <h3>{a.title}</h3>
        <p className="pc-desc">{a.desc}</p>
        {a.options && (
          <ul className="pc-options">
            {a.options.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
