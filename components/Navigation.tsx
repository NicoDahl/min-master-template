'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const links = [
  { label: 'Mission', href: '/#mission' },
  { label: 'Cases', href: '/#cases' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Om', href: '/#om' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030712]/90 backdrop-blur-md border-b border-slate-800/60'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <span className="w-7 h-7 rounded-md bg-cyan-500 flex items-center justify-center text-xs font-bold text-black group-hover:bg-cyan-400 transition-colors">
            N
          </span>
          <span className="font-semibold text-white tracking-tight">
            Nicolai Dahl
            <span className="text-slate-500 font-normal text-sm ml-1">– Tech & Security</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#kontakt"
            className="ml-3 px-4 py-2 text-sm font-medium bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg transition-colors"
          >
            Kontakt
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Åbn menu"
        >
          <span
            className={`block w-5 h-0.5 bg-slate-400 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-5 h-0.5 bg-slate-400 transition-all ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-5 h-0.5 bg-slate-400 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#030712]/95 backdrop-blur-md px-6 py-4 flex flex-col gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-slate-300 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#kontakt"
            onClick={() => setMenuOpen(false)}
            className="mt-2 py-2 px-4 text-center font-medium bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg transition-colors"
          >
            Kontakt
          </Link>
        </div>
      )}
    </nav>
  )
}
