'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight, Layers } from 'lucide-react'
import type { Case } from '@/lib/cases-data'

interface Props {
  cases: Case[]
  initialSlug?: string
}

const RADIUS = 240
const ITEM_SIZE = 88
const CONTAINER = 700

export default function CaseOrbit({ cases, initialSlug }: Props) {
  const [activeId, setActiveId] = useState<string | null>(
    initialSlug ? (cases.find((c) => c.slug === initialSlug)?.id ?? null) : null
  )
  const orbitRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  const pauseOrbit = useCallback(() => {
    orbitRef.current?.classList.add('animate-orbit-paused')
  }, [])

  const resumeOrbit = useCallback(() => {
    orbitRef.current?.classList.remove('animate-orbit-paused')
  }, [])

  const activeCase = cases.find((c) => c.id === activeId)

  return (
    <div className="relative flex items-center justify-center w-full py-10">
      {/* Outer decorative rings */}
      <div
        className="absolute rounded-full border border-slate-700/20"
        style={{ width: CONTAINER + 80, height: CONTAINER + 80 }}
      />
      <div
        className="absolute rounded-full border border-slate-700/10"
        style={{ width: CONTAINER + 160, height: CONTAINER + 160 }}
      />

      {/* Orbit container */}
      <div
        className="relative animate-orbit"
        ref={orbitRef}
        style={{ width: CONTAINER, height: CONTAINER }}
        onMouseEnter={pauseOrbit}
        onMouseLeave={() => {
          resumeOrbit()
        }}
      >
        {/* Orbit track ring */}
        <div
          className="absolute rounded-full border border-slate-700/40"
          style={{
            width: RADIUS * 2,
            height: RADIUS * 2,
            left: CONTAINER / 2 - RADIUS,
            top: CONTAINER / 2 - RADIUS,
          }}
        />

        {/* Center glow */}
        <div
          className="absolute animate-pulse-glow"
          style={{
            width: 12,
            height: 12,
            left: CONTAINER / 2 - 6,
            top: CONTAINER / 2 - 6,
            borderRadius: '50%',
            background: '#06b6d4',
            boxShadow: '0 0 32px 8px rgba(6,182,212,0.25)',
          }}
        />

        {/* Case nodes */}
        {cases.map((c, i) => {
          const angle = (i / cases.length) * 2 * Math.PI - Math.PI / 2
          const cx = CONTAINER / 2 + RADIUS * Math.cos(angle)
          const cy = CONTAINER / 2 + RADIUS * Math.sin(angle)
          const isActive = activeId === c.id

          return (
            <div
              key={c.id}
              ref={(el) => {
                if (el) itemRefs.current.set(c.id, el)
                else itemRefs.current.delete(c.id)
              }}
              className="absolute animate-orbit-counter"
              style={{
                width: ITEM_SIZE,
                height: ITEM_SIZE,
                left: cx - ITEM_SIZE / 2,
                top: cy - ITEM_SIZE / 2,
              }}
            >
              <motion.button
                onClick={() => setActiveId(isActive ? null : c.id)}
                animate={{ scale: isActive ? 1.25 : 1 }}
                whileHover={{ scale: isActive ? 1.25 : 1.18 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                className={`w-full h-full rounded-full flex flex-col items-center justify-center cursor-pointer relative overflow-hidden transition-shadow ${
                  isActive
                    ? 'ring-2 ring-white/30 shadow-[0_0_28px_rgba(255,255,255,0.15)]'
                    : 'ring-1 ring-white/10 hover:ring-white/20'
                }`}
                style={{ background: c.gradient }}
                aria-label={c.title}
              >
                <span className="text-white font-bold text-lg leading-none select-none">
                  {c.initials}
                </span>
                {c.isTemplate && (
                  <Layers size={10} className="text-white/60 mt-0.5" />
                )}
              </motion.button>
            </div>
          )
        })}
      </div>

      {/* Info box — centered over the orbit, outside the rotating div */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {activeCase && (
            <motion.div
              key={activeCase.id}
              initial={{ opacity: 0, scale: 0.88, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 8 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className="pointer-events-auto bg-[#0d1117]/95 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6 w-72 shadow-2xl glow-cyan relative"
            >
              {/* Close */}
              <button
                onClick={() => setActiveId(null)}
                className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <X size={13} />
              </button>

              {/* Gradient swatch */}
              <div
                className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center text-white font-bold text-sm"
                style={{ background: activeCase.gradient }}
              >
                {activeCase.initials}
              </div>

              <p className="text-xs text-cyan-400 font-mono mb-1">{activeCase.category} · {activeCase.year}</p>
              <h3 className="text-white font-bold text-lg mb-2 leading-snug">{activeCase.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{activeCase.longDescription}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {activeCase.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a
                href={`/cases/${activeCase.slug}`}
                className="inline-flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
              >
                Se case <ArrowUpRight size={13} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
