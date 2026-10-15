import { memo } from 'react'
import { photo } from '../data/itinerary'

// The day's photos laid out as a collage around the main (hero) photo. Every item is a
// full-stage layer scaled from the stage centre, so items farther out fly off-screen faster.
// The main photo sits in a 25% × 25% box, so at scale 4 it exactly fills the stage and
// lines up with the day hero underneath. x, y are the item centre's offset from the stage
// centre, in % of the stage.
export const MAIN_SCALE = 4
const SLOTS = [
  { w: 25, h: 25, x: 27.5, y: 0, k: 5 },
  { w: 20, h: 45, x: -25, y: -10, k: 6 },
  { w: 35, h: 30, x: 5, y: -30, k: 5 },
  { w: 30, h: 25, x: -22.5, y: 27.5, k: 8 },
  { w: 20, h: 25, x: 5, y: 27.5, k: 6 },
  { w: 15, h: 15, x: 25, y: 22.5, k: 9 },
]

function Item({ src, w, h, x, y, k, eager, children, className = '' }) {
  return (
    <div className={`zc-item ${className}`} data-k={k}>
      <div className="zc-frame" style={{ width: `${w}%`, height: `${h}%`, left: `${50 + x - w / 2}%`, top: `${50 + y - h / 2}%` }}>
        <img src={photo(src)} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" />
        {children}
      </div>
    </div>
  )
}

function ZoomCollage({ main, lead, others, eager }) {
  return (
    <div className="zoom-collage" aria-hidden="true">
      {others.slice(0, SLOTS.length).map((src, i) => (
        <Item key={src} src={src} {...SLOTS[i]} eager={eager} />
      ))}
      <Item src={main} w={25} h={25} x={0} y={0} k={MAIN_SCALE} eager={eager} className="zc-main">
        {lead && <img className="zc-lead" src={photo(lead)} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : 'auto'} />}
      </Item>
    </div>
  )
}

export default memo(ZoomCollage)
