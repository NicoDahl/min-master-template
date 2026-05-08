'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Layers } from 'lucide-react'
import { cases } from '@/lib/cases-data'

export default function CasesGrid() {
  return (
    <section id="cases" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <p className="text-xs font-mono tracking-widest text-cyan-500 uppercase mb-3">
              Cases & Skabeloner
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Mit Arbejde</h2>
          </div>
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
          >
            Se alle cases
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={`/cases/${c.slug}`} className="group block rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-600 transition-all duration-300 bg-slate-900/40">
                {/* Thumbnail */}
                <div className="relative overflow-hidden h-52">
                  <div
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                    style={{ background: c.gradient }}
                  />
                  {/* Initials overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-bold text-white/20 select-none font-mono">
                      {c.initials}
                    </span>
                  </div>
                  {/* Template badge */}
                  {c.isTemplate && (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full border border-white/10 text-xs text-white/70">
                      <Layers size={11} />
                      Skabelon
                    </div>
                  )}
                  {/* Arrow */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={14} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-xs text-slate-500 font-mono mb-1">{c.category} · {c.year}</p>
                  <h3 className="text-white font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{c.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
