'use client'

import { useEffect, useRef } from 'react'

const PORTRAIT_SRC = '/nicolai.jpg'

/**
 * Renders a single fixed-position portrait that starts large and centered
 * in the hero (sitting behind the morphing name) and smoothly lerps down
 * + shrinks into the [data-portrait-slot] element inside the Om mig
 * heading as the user scrolls.
 *
 * Opacity dips to 0 while passing through the cases section so it doesn't
 * compete visually with the bubble carousel.
 */
export default function MorphingPortrait() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0

    const tick = () => {
      const el = ref.current
      const slot = document.querySelector<HTMLElement>('[data-portrait-slot]')
      if (!el || !slot) {
        raf = requestAnimationFrame(tick)
        return
      }

      const vh = window.innerHeight
      const vw = window.innerWidth
      const sy = window.scrollY

      // Hero anchor — viewport center, sized to feel like a quiet
      // background figure behind the name
      const heroSize = Math.min(vw * 0.46, vh * 0.6, 540)
      const heroX = vw / 2
      const heroY = vh * 0.5

      // Slot anchor — wherever the placeholder is in the Om mig heading
      const slotRect = slot.getBoundingClientRect()
      const slotSize = Math.min(slotRect.width, slotRect.height)
      const slotX = slotRect.left + slotRect.width / 2
      const slotY = slotRect.top + slotRect.height / 2

      // Position progress 0..1 over scrollY 0..2.4vh — the journey from
      // hero center down into the Om mig slot. Eased so the portrait
      // decelerates as it docks into the slot.
      const progress = clamp(sy / (2.4 * vh), 0, 1)
      const eased = 1 - Math.pow(1 - progress, 2)

      const x = heroX + (slotX - heroX) * eased
      const y = heroY + (slotY - heroY) * eased
      const size = heroSize + (slotSize - heroSize) * eased

      // Opacity routing — full in hero, fade off through cases (so the
      // bubbles own that section), then fade back in as it lands
      let opacity: number
      if (sy < 0.65 * vh) {
        opacity = 1
      } else if (sy < 1.05 * vh) {
        opacity = 1 - clamp((sy - 0.65 * vh) / (0.4 * vh), 0, 1)
      } else if (sy < 2.0 * vh) {
        opacity = 0
      } else if (sy < 2.4 * vh) {
        opacity = clamp((sy - 2.0 * vh) / (0.4 * vh), 0, 1)
      } else {
        opacity = 1
      }

      // Round the corners proportionally so a big hero portrait reads
      // soft and the small slot image still looks like a tile
      const radius = clamp(size * 0.06, 16, 32)

      el.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) translate(-50%, -50%)`
      el.style.width = `${size.toFixed(2)}px`
      el.style.height = `${size.toFixed(2)}px`
      el.style.opacity = opacity.toFixed(3)
      el.style.borderRadius = `${radius.toFixed(2)}px`

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={ref}
      className="fixed left-0 top-0 z-30 pointer-events-none overflow-hidden shadow-xl"
      style={{
        // Gradient fallback shows if /nicolai.jpg isn't on disk yet
        background:
          'linear-gradient(135deg, #2A2A2A 0%, #5A5A55 60%, #869A69 100%)',
      }}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={PORTRAIT_SRC}
        alt="Nicolai Dahl"
        className="w-full h-full object-cover"
        onError={(e) => {
          // Hide broken image so the gradient fallback shows
          ;(e.target as HTMLImageElement).style.display = 'none'
        }}
      />
    </div>
  )
}

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v))
}
