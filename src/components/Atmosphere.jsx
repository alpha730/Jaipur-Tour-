import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { reducedMotion, scrollState } from '../lib/scroll'

// Warm dust motes caught in sunlight. Scrolling pushes them toward (or away from) the camera.
const FAR = -40
const NEAR = 4

function softDot() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  grad.addColorStop(0, 'rgba(255,240,210,1)')
  grad.addColorStop(0.35, 'rgba(255,214,150,0.45)')
  grad.addColorStop(1, 'rgba(255,200,120,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 64, 64)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function Motes({ count }) {
  const points = useRef()
  const map = useMemo(softDot, [])
  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18
      positions[i * 3 + 2] = FAR + Math.random() * (NEAR - FAR)
      seeds[i] = Math.random() * 100
    }
    return { positions, seeds }
  }, [count])

  const speed = useRef(0)
  useFrame((state, dt) => {
    dt = Math.min(dt, 0.05)
    const t = state.clock.elapsedTime
    speed.current = THREE.MathUtils.lerp(speed.current, 0.4 + THREE.MathUtils.clamp(scrollState.velocity * 0.8, -26, 26), 0.08)
    const arr = points.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      const s = seeds[i]
      arr[i * 3] += Math.sin(t * 0.3 + s) * 0.004
      arr[i * 3 + 1] += Math.cos(t * 0.25 + s) * 0.003 + 0.002
      arr[i * 3 + 2] += speed.current * dt
      if (arr[i * 3 + 2] > NEAR) arr[i * 3 + 2] = FAR
      else if (arr[i * 3 + 2] < FAR) arr[i * 3 + 2] = NEAR
      if (arr[i * 3 + 1] > 9) arr[i * 3 + 1] = -9
    }
    points.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial map={map} size={0.22} sizeAttenuation transparent opacity={0.5} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

export default function Atmosphere() {
  const small = typeof window !== 'undefined' && window.innerWidth < 760
  const count = reducedMotion ? 80 : small ? 220 : 480
  return (
    <div className="atmosphere" aria-hidden="true">
      <Canvas style={{ pointerEvents: 'none' }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: false }} camera={{ position: [0, 0, 8], fov: 60 }}>
        <Motes count={count} />
      </Canvas>
    </div>
  )
}
