'use client'

import { useState } from 'react'
import { cases, type Case } from '@/lib/cases-data'

const palettes = [
  { bg: '#65AAC2', fg: '#FFFFFF' }, // Court blue
  { bg: '#ADBA5E', fg: '#1A1A1A' }, // Lime
  { bg: '#869A69', fg: '#FFFFFF' }, // Sage
  { bg: '#1A1A1A', fg: '#E7E5D7' }, // Charcoal
]

const driftClasses = [
  'bubble-float-a',
  'bubble-float-b',
  'bubble-float-c',
  'bubble-float-d',
]

export default function Hero() {
  const [active, setActive] = useState<string | null>(null)

  // Take only the first 4 cases (placeholders, swap later)
  const items = cases.slice(0, 4)

  return (
    <section className="min-h-[100dvh] flex flex-col items-center justify-end pt-[60vh] md:pt-[55vh] pb-16 md:pb-24 px-6">
      {/* Tagline (sits below the morphing name) */}
      <p
        className="text-center text-sm md:text-base text-[var(--color-fg-muted)] max-w-md rise-in"
        style={{ animationDelay: '0.2s' }}
      >
        Datamatiker fra EAMV Herning. Bygger moderne web med AI og en
        passion for IT-sikkerhed.
      </p>

      {/* Bubbles */}
      <div
        className="bubbles-row mt-12 md:mt-16 w-full max-w-5xl flex flex-wrap items-center justify-center gap-5 md:gap-7 rise-in"
        style={{ animationDelay: '0.45s' }}
      >
        {items.map((c, i) => (
          <Bubble
            key={c.id}
            c={c}
            palette={palettes[i % palettes.length]}
            driftClass={driftClasses[i % driftClasses.length]}
            active={active === c.id}
            dimmed={active !== null && active !== c.id}
            onClick={() =>
              setActive((prev) => (prev === c.id ? null : c.id))
            }
          />
        ))}
      </div>
    </section>
  )
}

function Bubble({
  c,
  palette,
  driftClass,
  active,
  dimmed,
  onClick,
}: {
  c: Case
  palette: { bg: string; fg: string }
  driftClass: string
  active: boolean
  dimmed: boolean
  onClick: () => void
}) {
  const size = active ? 360 : dimmed ? 110 : 170
  const sizeMd = active ? 440 : dimmed ? 130 : 200

  return (
    <div
      className={driftClass}
      style={{
        animationPlayState: active ? 'paused' : undefined,
        opacity: dimmed ? 0.45 : 1,
        transition: 'opacity 0.6s ease',
      }}
    >
      <button
        type="button"
        onClick={onClick}
        className="rounded-full flex items-center justify-center text-center shrink-0 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-fg)]/20"
        style={{
          background: palette.bg,
          color: palette.fg,
          width: `clamp(${size}px, ${size}px, ${sizeMd}px)`,
          height: `clamp(${size}px, ${size}px, ${sizeMd}px)`,
          transition:
            'width 0.7s cubic-bezier(0.22, 1, 0.36, 1), height 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s ease',
        }}
        aria-pressed={active}
        aria-label={`${c.title} — ${active ? 'luk' : 'åbn detaljer'}`}
      >
        {active ? (
          <ExpandedContent c={c} />
        ) : (
          <span className="font-[family-name:var(--font-archivo-black)] text-2xl md:text-3xl tracking-tight">
            {c.initials}
          </span>
        )}
      </button>
    </div>
  )
}

function ExpandedContent({ c }: { c: Case }) {
  return (
    <div className="px-6 md:px-8 py-6 md:py-7 flex flex-col items-center gap-2 max-w-[88%]">
      <span className="text-[10px] uppercase tracking-[0.22em] opacity-70">
        {c.category} · {c.year}
      </span>
      <h3 className="font-[family-name:var(--font-archivo-black)] text-xl md:text-2xl leading-tight uppercase tracking-tight">
        {c.title}
      </h3>
      <p className="text-xs md:text-[13px] leading-relaxed mt-1 line-clamp-5">
        {c.longDescription}
      </p>
      <div className="flex flex-wrap gap-1 justify-center mt-2">
        {c.tags.slice(0, 4).map((t) => (
          <span
            key={t}
            className="text-[9px] uppercase tracking-[0.12em] px-2 py-0.5 rounded-full border border-current"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
