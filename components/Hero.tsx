'use client'

import { useRef, useState } from 'react'
import { cases, type Case } from '@/lib/cases-data'

const palettes = [
  { bg: '#65AAC2', fg: '#FFFFFF' }, // Court blue
  { bg: '#ADBA5E', fg: '#1A1A1A' }, // Lime
  { bg: '#869A69', fg: '#FFFFFF' }, // Sage
  { bg: '#1A1A1A', fg: '#E7E5D7' }, // Charcoal
]

const testimonials = [
  {
    id: 't1',
    quote:
      'Nicolai byggede en hurtig og elegant hjemmeside til vores bistro på under to uger. Fantastisk pris-kvalitet.',
    author: 'Lokal Bistro',
  },
  {
    id: 't2',
    quote:
      'Professionel, ærlig og fokus på sikkerhed fra start til slut. Klart en der tager sit håndværk seriøst.',
    author: 'Den Sikre Håndværker',
  },
  {
    id: 't3',
    quote:
      'En moderne webshop fra dag ét — Stripe integreret, hurtig og nem at vedligeholde. Kan varmt anbefales.',
    author: 'E-handel Light',
  },
]

export default function Hero() {
  return (
    <section className="min-h-[100dvh] flex flex-col items-center pt-24 md:pt-28 pb-10 px-6 md:px-10">
      {/* Centered header */}
      <header className="text-center max-w-3xl mx-auto rise-in" style={{ animationDelay: '0.1s' }}>
        <p className="text-[11px] md:text-xs font-semibold tracking-[0.22em] uppercase text-[var(--color-fg-muted)]">
          Datamatiker-studerende fra EAMV Herning · Web design / Branding / Sikker arkitektur
        </p>
        <h1 className="mt-5 font-[family-name:var(--font-archivo-black)] text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[0.92] text-[var(--color-fg)]">
          Moderne web.
          <br />
          Bygget med AI.
        </h1>
        <p className="mt-5 text-sm md:text-base text-[var(--color-fg-muted)] leading-relaxed max-w-xl mx-auto">
          Lokale virksomheder vælger mig fordi det går stærkt, ser godt ud
          og er sikkert fra dag ét.
        </p>
      </header>

      {/* Card row */}
      <div className="w-full max-w-6xl mx-auto mt-10 md:mt-12">
        <div className="overflow-x-auto md:overflow-visible -mx-6 md:mx-0 px-6 md:px-0">
          <div className="flex gap-5 md:gap-6 md:justify-center md:w-full py-8">
            {cases.map((c, i) => (
              <FlipCard
                key={c.id}
                c={c}
                palette={palettes[i % palettes.length]}
                bobDelay={i * 0.7}
                riseDelay={0.25 + i * 0.08}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="w-full max-w-5xl mx-auto mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        {testimonials.map((t, i) => (
          <figure
            key={t.id}
            className="text-center md:text-left rise-in"
            style={{ animationDelay: `${0.6 + i * 0.1}s` }}
          >
            <blockquote className="text-sm leading-relaxed text-[var(--color-fg)]">
              <span aria-hidden="true" className="opacity-40">“</span>
              {t.quote}
              <span aria-hidden="true" className="opacity-40">”</span>
            </blockquote>
            <figcaption className="mt-3 text-[10px] uppercase tracking-[0.22em] font-semibold text-[var(--color-fg-muted)]">
              — {t.author}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function FlipCard({
  c,
  palette,
  bobDelay,
  riseDelay,
}: {
  c: Case
  palette: { bg: string; fg: string }
  bobDelay: number
  riseDelay: number
}) {
  const [flipped, setFlipped] = useState(false)
  const tiltRef = useRef<HTMLDivElement>(null)

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (flipped) return
    const el = tiltRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width // 0..1
    const y = (e.clientY - rect.top) / rect.height // 0..1
    const rotY = (x - 0.5) * 18 // -9..+9
    const rotX = (0.5 - y) * 14 // -7..+7
    el.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(1.04)`
  }

  function handleLeave() {
    const el = tiltRef.current
    if (!el) return
    el.style.transform = ''
  }

  return (
    <div
      className="rise-in shrink-0 w-[230px] md:w-[220px] lg:w-[240px]"
      style={{ animationDelay: `${riseDelay}s` }}
    >
      <div className="card-perspective aspect-[3/4] w-full">
        <div
          ref={tiltRef}
          className="tilt-wrap"
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          <div className="float-wrap" style={{ animationDelay: `${bobDelay}s` }}>
            <button
              type="button"
              onClick={() => setFlipped((f) => !f)}
              className={`flip-inner block text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] ${
                flipped ? 'flipped' : ''
              }`}
              aria-pressed={flipped}
            >
              {/* Front */}
              <div
                className="flip-face flex flex-col justify-between p-5"
                style={{ background: palette.bg, color: palette.fg }}
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] opacity-80">
                    {c.category}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">
                    {c.year}
                  </span>
                </div>
                <span className="font-[family-name:var(--font-archivo-black)] text-[5rem] md:text-[5.5rem] leading-none self-end">
                  {c.initials}
                </span>
                <span className="font-[family-name:var(--font-archivo-black)] text-base tracking-tight uppercase">
                  {c.title}
                </span>
              </div>

              {/* Back */}
              <div
                className="flip-face flip-back flex flex-col justify-between p-5"
                style={{ background: palette.fg, color: palette.bg }}
              >
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] opacity-70">
                    {c.category} · {c.year}
                  </span>
                  <h3 className="font-[family-name:var(--font-archivo-black)] text-xl md:text-2xl mt-2 leading-tight uppercase">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed">
                    {c.longDescription}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] uppercase tracking-[0.12em] px-2 py-1 border rounded-full"
                      style={{ borderColor: palette.bg }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
