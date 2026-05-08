'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
})

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden"
    >
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-radial-[at_50%_30%] from-cyan-950/30 via-transparent to-transparent pointer-events-none" />

      {/* Cyan glow blob */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-3xl rounded-full pointer-events-none animate-pulse-glow" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-16">
        {/* Eyebrow badge */}
        <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 mb-8">
          <span className="px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono tracking-widest uppercase">
            Webudvikling · AI · CyberSecurity
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          Moderne Webudvikling.{' '}
          <br className="hidden sm:block" />
          <span className="text-cyan-400 text-glow-cyan">Bygget med AI.</span>
          <br className="hidden sm:block" />
          Sikret med sund fornuft.
        </motion.h1>

        {/* Sub headline */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Jeg kombinerer de nyeste AI-teknologier med klassisk datalogi for at bygge lynhurtige
          hjemmesider for virksomheder, mens jeg uddanner mig til fremtidens IT-sikkerhedsekspert.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/#cases"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_0_24px_rgba(6,182,212,0.4)]"
          >
            Se mine cases
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/#kontakt"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-medium rounded-xl transition-all duration-200 hover:bg-white/5"
          >
            <MessageCircle size={16} />
            Lad os tage en snak
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-20 flex flex-col items-center gap-2 text-slate-600"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-slate-600 animate-bounce" />
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        </motion.div>
      </div>
    </section>
  )
}
