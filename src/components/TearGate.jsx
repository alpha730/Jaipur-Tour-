import { memo, useMemo } from 'react'
import { photo } from '../data/itinerary'
import { verticalTear } from '../lib/tear'

// A full-bleed photograph split down a jagged tear into two halves. Each half is the
// photo clipped to its side, over a slightly wider cream layer that shows as the torn fibre.
function TearGate({ src, seed, eager }) {
  const clip = useMemo(() => verticalTear(seed), [seed])
  const img = (
    <img src={photo(src)} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : 'auto'} />
  )
  return (
    <div className="tear-gate" aria-hidden="true">
      <div className="tear-photo tear-whole">{img}</div>
      <div className="tear-half tear-left">
        <div className="tear-rim" style={{ clipPath: clip.leftRim }} />
        <div className="tear-photo" style={{ clipPath: clip.left }}>
          {img}
        </div>
      </div>
      <div className="tear-half tear-right">
        <div className="tear-rim" style={{ clipPath: clip.rightRim }} />
        <div className="tear-photo" style={{ clipPath: clip.right }}>
          {img}
        </div>
      </div>
    </div>
  )
}

export default memo(TearGate)
