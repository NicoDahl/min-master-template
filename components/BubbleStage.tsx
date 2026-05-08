'use client'

import { useEffect, useRef, useState } from 'react'
import { cases, type Case } from '@/lib/cases-data'

const palettes = [
  { bg: '#65AAC2', fg: '#FFFFFF' },
  { bg: '#ADBA5E', fg: '#1A1A1A' },
  { bg: '#869A69', fg: '#FFFFFF' },
  { bg: '#1A1A1A', fg: '#E7E5D7' },
]

// Hero scatter positions (% of viewport)
const HERO_POSITIONS = [
  { xPct: 0.16, yPct: 0.32 },
  { xPct: 0.84, yPct: 0.26 },
  { xPct: 0.22, yPct: 0.78 },
  { xPct: 0.80, yPct: 0.72 },
]

// Initial angles in the orbit (degrees, 0=right, 90=down)
const ORBIT_START = [-90, 0, 90, 180]

const REVOLUTION_SECONDS = 26 // one full rotation
const LERP = 0.18

export default function BubbleStage() {
  const items = cases.slice(0, 4)
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const titleRef = useRef<HTMLDivElement | null>(null)
  const stateRef = useRef(
    items.map(() => ({ x: 0, y: 0, s: 1, o: 1, init: false }))
  )
  const activeRef = useRef<string | null>(null)
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    let raf = 0
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000
      const vh = window.innerHeight
      const vw = window.innerWidth
      const sy = window.scrollY
      const isMobile = vw < 768

      const orbitR = isMobile
        ? Math.min(150, vw * 0.34)
        : Math.min(240, vw * 0.22)

      // travel: 0 (hero) → 1 (assembled in cases). starts at 0.2vh, completes at 1.0vh
      const travel = clamp((sy - 0.2 * vh) / (0.8 * vh), 0, 1)
      // fadeOut: kicks in as user scrolls past cases (heroH = 1vh, casesH ≈ 1vh)
      const fadeOut = clamp((sy - 1.7 * vh) / (0.4 * vh), 0, 1)

      // Title visibility: visible only while in cases section
      const titleIn = clamp((sy - 0.6 * vh) / (0.4 * vh), 0, 1)
      const titleOut = clamp((sy - 1.6 * vh) / (0.4 * vh), 0, 1)
      const titleOpacity = titleIn * (1 - titleOut)
      if (titleRef.current) {
        titleRef.current.style.opacity = String(titleOpacity)
      }

      const orbitSpeed = activeRef.current ? 0 : 1 / REVOLUTION_SECONDS
      const orbitDeg = elapsed * orbitSpeed * 360

      const cx = vw / 2
      const cy = vh / 2

      stateRef.current.forEach((st, i) => {
        const el = refs.current[i]
        if (!el) return

        const isActive = items[i].id === activeRef.current
        const isOtherActive = activeRef.current !== null && !isActive

        // hero scatter target (with subtle drift, attenuated as travel increases)
        const driftX = Math.sin(elapsed * 0.55 + i * 1.7) * 10
        const driftY = Math.cos(elapsed * 0.45 + i * 1.3) * 14
        const heroX = HERO_POSITIONS[i].xPct * vw + driftX * (1 - travel)
        const heroY = HERO_POSITIONS[i].yPct * vh + driftY * (1 - travel)

        // orbit target
        const angle = ORBIT_START[i] + orbitDeg
        const rad = (angle * Math.PI) / 180
        const orbX = cx + Math.cos(rad) * orbitR
        const orbY = cy + Math.sin(rad) * orbitR

        let tx: number, ty: number, ts: number
        if (isActive) {
          tx = cx
          ty = cy
          ts = isMobile ? 2.4 : 2.7
        } else {
          tx = heroX + (orbX - heroX) * travel
          ty = heroY + (orbY - heroY) * travel
          ts = isOtherActive ? 0.8 : 1
        }
        const baseOpacity = isActive ? 1 : (1 - fadeOut) * (isOtherActive ? 0.35 : 1)

        if (!st.init) {
          st.x = tx
          st.y = ty
          st.s = ts
          st.o = baseOpacity
          st.init = true
        } else {
          st.x += (tx - st.x) * LERP
          st.y += (ty - st.y) * LERP
          st.s += (ts - st.s) * LERP
          st.o += (baseOpacity - st.o) * LERP
        }

        el.style.transform = `translate(${st.x.toFixed(2)}px, ${st.y.toFixed(2)}px) translate(-50%, -50%) scale(${st.s.toFixed(3)})`
        el.style.opacity = st.o.toFixed(3)
        el.style.pointerEvents = st.o > 0.1 ? 'auto' : 'none'
        el.style.zIndex = isActive ? '50' : '40'
      })

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [items])

  return (
    <>
      {/* Floating "Mine cases" label that fades in over the orbit */}
      <div
        ref={titleRef}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none text-center"
        style={{ opacity: 0, transition: 'opacity 0.4s ease' }}
      >
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--color-fg-muted)]">
          Klik en boble
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-archivo-black)] text-3xl md:text-5xl tracking-tight uppercase text-[var(--color-fg)]">
          Mine cases
        </h2>
      </div>

      {/* Bubble layer */}
      <div className="fixed inset-0 z-30 pointer-events-none">
        {items.map((c, i) => (
          <BubbleEl
            key={c.id}
            c={c}
            palette={palettes[i % palettes.length]}
            isActive={active === c.id}
            isOtherActive={active !== null && active !== c.id}
            onClick={() =>
              setActive((prev) => (prev === c.id ? null : c.id))
            }
            assignRef={(el) => {
              refs.current[i] = el
            }}
          />
        ))}
      </div>
    </>
  )
}

function BubbleEl({
  c,
  palette,
  isActive,
  isOtherActive,
  onClick,
  assignRef,
}: {
  c: Case
  palette: { bg: string; fg: string }
  isActive: boolean
  isOtherActive: boolean
  onClick: () => void
  assignRef: (el: HTMLDivElement | null) => void
}) {
  return (
    <div
      ref={assignRef}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        willChange: 'transform, opacity',
      }}
    >
      <button
        type="button"
        onClick={onClick}
        aria-pressed={isActive}
        aria-label={`${c.title} — ${isActive ? 'luk' : 'åbn detaljer'}`}
        className="rounded-full flex items-center justify-center text-center cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-fg)]/20"
        style={{
          background: palette.bg,
          color: palette.fg,
          width: 'clamp(96px, 14vw, 150px)',
          height: 'clamp(96px, 14vw, 150px)',
          border: 'none',
          padding: 0,
          overflow: 'hidden',
          transition: 'box-shadow 0.4s ease',
          boxShadow: isActive
            ? '0 30px 60px -20px rgba(0,0,0,0.25)'
            : '0 8px 24px -8px rgba(0,0,0,0.15)',
        }}
      >
        {isActive ? (
          <ExpandedContent c={c} />
        ) : (
          <span className="font-[family-name:var(--font-archivo-black)] text-xl md:text-2xl tracking-tight">
            {c.initials}
          </span>
        )}
      </button>
    </div>
  )
}

function ExpandedContent({ c }: { c: Case }) {
  return (
    <div className="px-5 py-4 flex flex-col items-center gap-1.5 max-w-[88%]">
      <span className="text-[8px] uppercase tracking-[0.22em] opacity-70">
        {c.category} · {c.year}
      </span>
      <h3 className="font-[family-name:var(--font-archivo-black)] text-sm md:text-base leading-tight uppercase tracking-tight">
        {c.title}
      </h3>
      <p className="text-[9px] md:text-[10px] leading-relaxed mt-0.5 line-clamp-5">
        {c.longDescription}
      </p>
    </div>
  )
}

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v))
}
