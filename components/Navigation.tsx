'use client'

import Link from 'next/link'
import { useState } from 'react'

const links = [
  { label: 'Cases', href: '/cases' },
  { label: 'Templates', href: '/templates' },
  { label: 'Om mig', href: '/om-mig' },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="px-6 md:px-10 py-6 md:py-7 flex items-center justify-between">
        <Link
          href="/"
          className="font-[family-name:var(--font-archivo-black)] text-2xl md:text-3xl tracking-tight leading-none text-[var(--color-fg)] hover:opacity-80 transition-opacity"
        >
          NICOLAI&nbsp;DAHL
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--color-fg)] hover:opacity-60 transition-opacity"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            className="px-5 py-2.5 rounded-full bg-[var(--color-fg)] text-[var(--color-bg)] text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[var(--color-sage)] hover:text-white transition-colors"
          >
            Kontakt mig
          </Link>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Åbn menu"
        >
          <span
            className={`block w-6 h-[2px] bg-[var(--color-fg)] transition-transform ${
              open ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-[var(--color-fg)] my-1.5 transition-opacity ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-[var(--color-fg)] transition-transform ${
              open ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--color-fg)]/15 px-6 py-6 flex flex-col gap-4 bg-[var(--color-bg)]">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-1 text-[var(--color-fg)] uppercase tracking-[0.18em] text-xs font-semibold"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            onClick={() => setOpen(false)}
            className="mt-2 py-3 px-4 rounded-full text-center bg-[var(--color-fg)] text-[var(--color-bg)] uppercase tracking-[0.18em] text-xs font-semibold"
          >
            Kontakt mig
          </Link>
        </div>
      )}
    </nav>
  )
}
