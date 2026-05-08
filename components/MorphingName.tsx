'use client'

import { useEffect, useState } from 'react'

const HERO_FONT_PX = 112 // base size when in hero
const FINAL_SCALE = 0.2  // ~22px when locked in nav
const MORPH_RANGE_VH = 0.55 // morph completes after 55% of viewport scrolled

export default function MorphingName() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      const max = window.innerHeight * MORPH_RANGE_VH
      const next = Math.min(1, Math.max(0, window.scrollY / max))
      setProgress(next)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Anchor the element at top:0 and translate Y from "hero center" → "nav slot"
  // At progress=0: top = 50vh - HERO_FONT_PX/2 (visually centered)
  // At progress=1: top = 14px (small padding from top)
  const scale = 1 + (FINAL_SCALE - 1) * progress
  const top = `calc((1 - ${progress}) * (50dvh - ${HERO_FONT_PX / 2}px) + ${progress} * 14px)`

  return (
    <div
      className="fixed left-1/2 z-50 pointer-events-none text-[var(--color-fg)] font-[family-name:var(--font-archivo-black)] tracking-tight"
      style={{
        top,
        fontSize: `${HERO_FONT_PX}px`,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        transform: `translate(-50%, 0) scale(${scale.toFixed(4)})`,
        transformOrigin: '50% 0%',
      }}
      aria-label="Nicolai Dahl"
    >
      NICOLAI&nbsp;DAHL
    </div>
  )
}
