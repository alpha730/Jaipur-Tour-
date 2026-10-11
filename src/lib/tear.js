// Seeded jagged edges for torn-paper clip-paths.

function rng(seed) {
  let s = seed * 9301 + 49297
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

// Offsets (px) along an edge: a slow wander plus fine fibre jitter.
function edge(seed, steps, amp) {
  const r = rng(seed)
  const out = []
  let drift = 0
  for (let i = 0; i <= steps; i++) {
    drift += (r() - 0.5) * amp * 0.9
    drift *= 0.82
    out.push(drift + (r() - 0.5) * amp * 0.5)
  }
  return out
}

const px = (v) => `${v.toFixed(1)}px`

// Vertical tear down the middle. `rim` widens the edge to show the white paper fibre.
export function verticalTear(seed, { steps = 46, amp = 22 } = {}) {
  const o = edge(seed, steps, amp)
  const fib = edge(seed + 7, steps, 6)
  const pt = (i, extra) => `calc(50% + ${px(o[i] + extra)}) ${((i / steps) * 100).toFixed(2)}%`
  const leftEdge = (rim) => o.map((_, i) => pt(i, rim ? 4 + Math.abs(fib[i]) * 1.3 : 0))
  const rightEdge = (rim) => o.map((_, i) => pt(i, rim ? -(4 + Math.abs(fib[i]) * 1.3) : 0))
  return {
    left: `polygon(0 0, ${leftEdge(false).join(', ')}, 0 100%)`,
    leftRim: `polygon(0 0, ${leftEdge(true).join(', ')}, 0 100%)`,
    right: `polygon(100% 0, ${rightEdge(false).join(', ')}, 100% 100%)`,
    rightRim: `polygon(100% 0, ${rightEdge(true).join(', ')}, 100% 100%)`,
  }
}

// A sheet with deckle edges top and bottom. `inset` pulls the edge inward for the inner layer.
export function deckleSheet(seed, { steps = 60, amp = 14, depth = 28, inset = 0 } = {}) {
  const top = edge(seed, steps, amp)
  const bot = edge(seed + 13, steps, amp)
  const x = (i) => `${((i / steps) * 100).toFixed(2)}%`
  const t = top.map((v, i) => `${x(i)} ${px(depth + v + inset)}`)
  const b = bot.map((v, i) => `${x(i)} calc(100% - ${px(depth + v + inset)})`).reverse()
  return `polygon(${t.join(', ')}, ${b.join(', ')})`
}
