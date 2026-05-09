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

// Hero scatter positions (% of viewport)
const HERO_POSITIONS = [
  { xPct: 0.16, yPct: 0.32 },
  { xPct: 0.84, yPct: 0.26 },
  { xPct: 0.22, yPct: 0.78 },
  { xPct: 0.80, yPct: 0.72 },
]

/**
 * Carousel slot definitions. Slot 0 is the featured (large) bubble,
 * slot 1/2 are the queue cards trailing to its right (shrinking),
 * slot 3 is the off-screen-right "hidden" position. Items rotate
 * through these slots as featuredIndex advances.
 */
type Slot = { xPct: number; yPct: number; scale: number; opacity: number }
const SLOTS_DESKTOP: Slot[] = [
  { xPct: 0.62, yPct: 0.5, scale: 1.55, opacity: 1 },
  { xPct: 0.80, yPct: 0.5, scale: 0.9, opacity: 0.75 },
  { xPct: 0.93, yPct: 0.5, scale: 0.65, opacity: 0.4 },
  { xPct: 1.08, yPct: 0.5, scale: 0.5, opacity: 0 },
]
const SLOTS_MOBILE: Slot[] = [
  { xPct: 0.5, yPct: 0.5, scale: 1.7, opacity: 1 },
  { xPct: 0.78, yPct: 0.5, scale: 0.85, opacity: 0.6 },
  { xPct: 0.95, yPct: 0.5, scale: 0.6, opacity: 0.3 },
  { xPct: 1.12, yPct: 0.5, scale: 0.5, opacity: 0 },
]

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
  const featuredRef = useRef(0)

  useEffect(() => {
    featuredRef.current = featured
  }, [featured])

  // Auto-advance — pauses on hover over the bubble layer
  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => {
      setFeatured((i) => (i + 1) % items.length)
    }, AUTO_ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [paused, items.length])

  // Position rAF loop
  useEffect(() => {
    let raf = 0
    const startT = performance.now()

    const tick = (now: number) => {
      const elapsed = (now - startT) / 1000
      const vh = window.innerHeight
      const vw = window.innerWidth
      const sy = window.scrollY
      const isMobile = vw < 768
      const slots = isMobile ? SLOTS_MOBILE : SLOTS_DESKTOP

      const travel = clamp((sy - 0.2 * vh) / (0.8 * vh), 0, 1)
      const fadeOut = clamp((sy - 1.45 * vh) / (0.4 * vh), 0, 1)

      // Title / text / controls visibility — match the cases section dwell
      const sectionIn = clamp((sy - 0.7 * vh) / (0.3 * vh), 0, 1)
      const sectionOut = clamp((sy - 1.4 * vh) / (0.3 * vh), 0, 1)
      const sectionVis = sectionIn * (1 - sectionOut)

      if (titleRef.current) titleRef.current.style.opacity = String(sectionVis)
      if (textRef.current) textRef.current.style.opacity = String(sectionVis)
      if (controlsRef.current) {
        controlsRef.current.style.opacity = String(sectionVis)
        controlsRef.current.style.pointerEvents = sectionVis > 0.4 ? 'auto' : 'none'
      }

      const featNow = featuredRef.current

      stateRef.current.forEach((st, i) => {
        const el = refs.current[i]
        if (!el) return

        // hero scatter (with subtle drift)
        const driftX = Math.sin(elapsed * 0.55 + i * 1.7) * 10
        const driftY = Math.cos(elapsed * 0.45 + i * 1.3) * 14
        const heroX = HERO_POSITIONS[i].xPct * vw + driftX * (1 - travel)
        const heroY = HERO_POSITIONS[i].yPct * vh + driftY * (1 - travel)

        // carousel slot for this item
        const slotIdx = (i - featNow + items.length) % items.length
        const slot = slots[slotIdx]
        const carX = slot.xPct * vw
        const carY = slot.yPct * vh

        const tx = heroX + (carX - heroX) * travel
        const ty = heroY + (carY - heroY) * travel
        const ts = 1 + (slot.scale - 1) * travel
        const slotOpacity = 1 + (slot.opacity - 1) * travel
        const baseOpacity = (1 - fadeOut) * slotOpacity

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
        el.style.zIndex = slotIdx === 0 ? '50' : `${40 - slotIdx}`
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
      {/* Cases section title (top) */}
      <div
        ref={titleRef}
        className="fixed top-[18%] md:top-[14%] left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center"
        style={{ opacity: 0, transition: 'opacity 0.4s ease' }}
      >
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--color-fg-muted)]">
          Mine cases
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-archivo-black)] text-3xl md:text-5xl tracking-tight uppercase text-[var(--color-fg)]">
          Et udvalg
        </h2>
      </div>

      {/* Text panel — left side (desktop) / above bubble (mobile) */}
      <div
        ref={textRef}
        className="fixed left-6 md:left-[6vw] top-1/2 -translate-y-1/2 z-30 pointer-events-none w-[88vw] md:w-[40vw] max-w-md md:max-w-lg"
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
        className="fixed bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 md:gap-4"
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
    <div
      key={index}
      className="carousel-text-enter"
    >
      <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--color-fg-muted)]">
        {case_.category} · {case_.year}
      </p>
      <h3 className="mt-3 font-[family-name:var(--font-archivo-black)] text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[0.92] text-[var(--color-fg)] uppercase">
        {case_.title}
      </h3>
      <p className="mt-4 text-sm md:text-base leading-relaxed text-[var(--color-fg-muted)] line-clamp-5">
        {case_.longDescription}
      </p>
      <div className="mt-5 flex flex-wrap gap-1.5">
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
          width: 'clamp(96px, 14vw, 160px)',
          height: 'clamp(96px, 14vw, 160px)',
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
        <span className="font-[family-name:var(--font-archivo-black)] text-xl md:text-2xl tracking-tight">
          {c.initials}
        </span>
      </button>
    </div>
  )
}

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v))
}
