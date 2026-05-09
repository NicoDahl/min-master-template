'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cases, type Case } from '@/lib/cases-data'

const palettes = [
  { bg: '#65AAC2', fg: '#FFFFFF' },
  { bg: '#ADBA5E', fg: '#1A1A1A' },
  { bg: '#869A69', fg: '#FFFFFF' },
  { bg: '#1A1A1A', fg: '#E7E5D7' },
]

// Initial hero positions (% of viewport) — physics takes over from here
const HERO_POSITIONS = [
  { xPct: 0.18, yPct: 0.32 },
  { xPct: 0.82, yPct: 0.28 },
  { xPct: 0.24, yPct: 0.76 },
  { xPct: 0.78, yPct: 0.72 },
]

// Initial velocities (px/sec) — give each bubble a different drift direction
const INITIAL_VELOCITIES = [
  { vx: 26, vy: -18 },
  { vx: -22, vy: 16 },
  { vx: 19, vy: 24 },
  { vx: -25, vy: -20 },
]

// Carousel slots — fixed evenly-spaced positions, one per item.
// On desktop: a single row across the viewport.
// On mobile: a 2x2 grid.
const SLOTS_DESKTOP = [
  { xPct: 0.18, yPct: 0.6 },
  { xPct: 0.39, yPct: 0.6 },
  { xPct: 0.60, yPct: 0.6 },
  { xPct: 0.81, yPct: 0.6 },
]
const SLOTS_MOBILE = [
  { xPct: 0.28, yPct: 0.5 },
  { xPct: 0.72, yPct: 0.5 },
  { xPct: 0.28, yPct: 0.74 },
  { xPct: 0.72, yPct: 0.74 },
]

// Featured bubble visual treatment
const FEATURED_SCALE = 1.25
const QUIET_SCALE = 1.0
const QUIET_OPACITY = 0.55

const AUTO_ADVANCE_MS = 5500
const LERP = 0.16

export default function BubbleStage() {
  const items = cases.slice(0, 4)
  const [featured, setFeatured] = useState(0)
  const [paused, setPaused] = useState(false)
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const titleRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)
  const controlsRef = useRef<HTMLDivElement | null>(null)
  const stateRef = useRef(
    items.map(() => ({ x: 0, y: 0, s: 1, o: 1, init: false }))
  )
  // Hero physics — each bubble has its own position and velocity.
  // Fully driven inside the rAF loop, with elastic collisions wall+bubble.
  const physicsRef = useRef(
    items.map((_, i) => ({
      x: 0,
      y: 0,
      vx: INITIAL_VELOCITIES[i % INITIAL_VELOCITIES.length].vx,
      vy: INITIAL_VELOCITIES[i % INITIAL_VELOCITIES.length].vy,
      init: false,
    }))
  )
  const featuredRef = useRef(0)

  useEffect(() => {
    featuredRef.current = featured
  }, [featured])

  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => {
      setFeatured((i) => (i + 1) % items.length)
    }, AUTO_ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [paused, items.length])

  useEffect(() => {
    let raf = 0
    let prevT = performance.now()

    const tick = (now: number) => {
      const dt = Math.min(0.04, (now - prevT) / 1000)
      prevT = now
      const vh = window.innerHeight
      const vw = window.innerWidth
      const sy = window.scrollY
      const isMobile = vw < 768
      const slots = isMobile ? SLOTS_MOBILE : SLOTS_DESKTOP

      const travel = clamp((sy - 0.2 * vh) / (0.8 * vh), 0, 1)
      const fadeOut = clamp((sy - 1.95 * vh) / (0.4 * vh), 0, 1)

      const sectionIn = clamp((sy - 0.7 * vh) / (0.3 * vh), 0, 1)
      const sectionOut = clamp((sy - 1.85 * vh) / (0.3 * vh), 0, 1)
      const sectionVis = sectionIn * (1 - sectionOut)

      if (titleRef.current) titleRef.current.style.opacity = String(sectionVis)
      if (textRef.current) textRef.current.style.opacity = String(sectionVis)
      if (controlsRef.current) {
        controlsRef.current.style.opacity = String(sectionVis)
        controlsRef.current.style.pointerEvents =
          sectionVis > 0.4 ? 'auto' : 'none'
      }

      // ---- Hero physics ----
      const baseSize = clamp(0.16 * vw, 140, 210)
      const radius = baseSize / 2
      const pad = radius + 12 // keep bubbles fully inside viewport
      const phys = physicsRef.current

      // Initialize physics positions on first frame
      if (!phys[0].init) {
        phys.forEach((p, i) => {
          p.x = HERO_POSITIONS[i].xPct * vw
          p.y = HERO_POSITIONS[i].yPct * vh
          p.init = true
        })
      }

      // Only simulate while we're in / near the hero. Past travel ~0.5 the
      // bubbles are heading into the carousel and physics doesn't matter
      // visually — pausing avoids drift surprises when scrolling back up.
      const simulate = travel < 0.5

      if (simulate) {
        // Integrate position
        phys.forEach((p) => {
          p.x += p.vx * dt
          p.y += p.vy * dt

          // Wall bounces — clamp position and flip the relevant component
          if (p.x < pad) {
            p.x = pad
            p.vx = Math.abs(p.vx)
          } else if (p.x > vw - pad) {
            p.x = vw - pad
            p.vx = -Math.abs(p.vx)
          }
          if (p.y < pad) {
            p.y = pad
            p.vy = Math.abs(p.vy)
          } else if (p.y > vh - pad) {
            p.y = vh - pad
            p.vy = -Math.abs(p.vy)
          }
        })

        // Bubble-bubble elastic collisions (equal mass — swap normal velocity)
        for (let i = 0; i < phys.length; i++) {
          for (let j = i + 1; j < phys.length; j++) {
            const a = phys[i]
            const b = phys[j]
            const dx = b.x - a.x
            const dy = b.y - a.y
            const distSq = dx * dx + dy * dy
            const minDist = radius * 2
            if (distSq < minDist * minDist && distSq > 0.01) {
              const dist = Math.sqrt(distSq)
              const nx = dx / dist
              const ny = dy / dist

              // Push apart so they don't stick
              const overlap = minDist - dist
              const half = overlap * 0.5
              a.x -= nx * half
              a.y -= ny * half
              b.x += nx * half
              b.y += ny * half

              // Swap velocity along the contact normal — only if approaching
              const v1n = a.vx * nx + a.vy * ny
              const v2n = b.vx * nx + b.vy * ny
              if (v1n - v2n > 0) {
                const delta = v2n - v1n
                a.vx += delta * nx
                a.vy += delta * ny
                b.vx -= delta * nx
                b.vy -= delta * ny
              }
            }
          }
        }
      }

      const featNow = featuredRef.current

      stateRef.current.forEach((st, i) => {
        const el = refs.current[i]
        if (!el) return

        // Hero target = current physics position
        const heroX = phys[i].x
        const heroY = phys[i].y

        // Fixed carousel slot for this item
        const slot = slots[i]
        const isFeatured = i === featNow
        const slotScale = isFeatured ? FEATURED_SCALE : QUIET_SCALE
        const slotOpacity = isFeatured ? 1 : QUIET_OPACITY

        const carX = slot.xPct * vw
        const carY = slot.yPct * vh

        const tx = heroX + (carX - heroX) * travel
        const ty = heroY + (carY - heroY) * travel
        const ts = 1 + (slotScale - 1) * travel
        const slotOp = 1 + (slotOpacity - 1) * travel
        const baseOpacity = (1 - fadeOut) * slotOp

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
        el.style.pointerEvents = st.o > 0.15 ? 'auto' : 'none'
        el.style.zIndex = isFeatured ? '50' : '40'
      })

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [items])

  const next = () => setFeatured((i) => (i + 1) % items.length)
  const prev = () => setFeatured((i) => (i - 1 + items.length) % items.length)
  const goTo = (i: number) => setFeatured(i)

  const featuredCase = items[featured]

  return (
    <>
      {/* Cases section title (top-center) */}
      <div
        ref={titleRef}
        className="fixed top-[12%] md:top-[10%] left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center"
        style={{ opacity: 0, transition: 'opacity 0.4s ease' }}
      >
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--color-fg-muted)]">
          Mine cases
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-archivo-black)] text-3xl md:text-5xl tracking-tight uppercase text-[var(--color-fg)]">
          Et udvalg
        </h2>
      </div>

      {/* Featured-case text panel — centered above the bubble row */}
      <div
        ref={textRef}
        className="fixed top-[24%] md:top-[22%] left-1/2 -translate-x-1/2 z-30 pointer-events-none w-[88vw] max-w-2xl text-center"
        style={{ opacity: 0, transition: 'opacity 0.4s ease' }}
      >
        <CarouselText case_={featuredCase} index={featured} />
      </div>

      {/* Bubble layer */}
      <div
        className="fixed inset-0 z-30 pointer-events-none"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {items.map((c, i) => (
          <BubbleEl
            key={c.id}
            c={c}
            palette={palettes[i % palettes.length]}
            isFeatured={featured === i}
            onClick={() => {
              if (i !== featured) goTo(i)
            }}
            assignRef={(el) => {
              refs.current[i] = el
            }}
          />
        ))}
      </div>

      {/* Carousel controls */}
      <div
        ref={controlsRef}
        className="fixed bottom-[10%] md:bottom-[12%] left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 md:gap-4"
        style={{ opacity: 0, transition: 'opacity 0.4s ease' }}
      >
        <button
          type="button"
          onClick={prev}
          aria-label="Forrige case"
          className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[var(--color-fg)] text-[var(--color-bg)] flex items-center justify-center hover:bg-[var(--color-sage)] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 px-2">
          {items.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Gå til ${c.title}`}
              aria-current={featured === i}
              className="rounded-full transition-all"
              style={{
                width: featured === i ? '24px' : '8px',
                height: '8px',
                background:
                  featured === i ? 'var(--color-fg)' : 'var(--color-fg-muted)',
                opacity: featured === i ? 1 : 0.4,
              }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          aria-label="Næste case"
          className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[var(--color-fg)] text-[var(--color-bg)] flex items-center justify-center hover:bg-[var(--color-sage)] transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </>
  )
}

function CarouselText({ case_, index }: { case_: Case; index: number }) {
  return (
    <div key={index} className="carousel-text-enter">
      <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--color-fg-muted)]">
        {case_.category} · {case_.year}
      </p>
      <h3 className="mt-3 font-[family-name:var(--font-archivo-black)] text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95] text-[var(--color-fg)] uppercase">
        {case_.title}
      </h3>
      <p className="mt-3 md:mt-4 text-sm md:text-base leading-relaxed text-[var(--color-fg-muted)] max-w-xl mx-auto line-clamp-3">
        {case_.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
        {case_.tags.slice(0, 4).map((t) => (
          <span
            key={t}
            className="text-[10px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full border border-[var(--color-fg)]/30 text-[var(--color-fg)]"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function BubbleEl({
  c,
  palette,
  isFeatured,
  onClick,
  assignRef,
}: {
  c: Case
  palette: { bg: string; fg: string }
  isFeatured: boolean
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
        aria-label={`Vis ${c.title}`}
        aria-current={isFeatured}
        className="rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-fg)]/20"
        style={{
          width: 'clamp(140px, 16vw, 210px)',
          height: 'clamp(140px, 16vw, 210px)',
          background: palette.bg,
          color: palette.fg,
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          boxShadow: isFeatured
            ? '0 30px 60px -20px rgba(0,0,0,0.30)'
            : '0 8px 24px -8px rgba(0,0,0,0.18)',
          transition: 'box-shadow 0.4s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span className="font-[family-name:var(--font-archivo-black)] text-2xl md:text-3xl tracking-tight">
          {c.initials}
        </span>
      </button>
    </div>
  )
}

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v))
}
