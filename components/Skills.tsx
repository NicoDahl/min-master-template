'use client'

import { motion } from 'framer-motion'
import { Monitor, Database, ShieldCheck } from 'lucide-react'

const categories = [
  {
    icon: Monitor,
    title: 'Frontend & Design',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/20',
    bg: 'bg-cyan-500/5',
    items: [
      { name: 'Next.js', level: 90 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Framer Motion', level: 78 },
      { name: 'AI UI-generation (v0 / Lovable)', level: 85 },
      { name: 'TypeScript', level: 80 },
    ],
  },
  {
    icon: Database,
    title: 'Backend & Databaser',
    accent: 'text-blue-400',
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/5',
    items: [
      { name: 'Supabase', level: 82 },
      { name: 'PostgreSQL', level: 72 },
      { name: 'REST API\'er', level: 80 },
      { name: 'Resend (e-mail)', level: 75 },
      { name: 'Vercel / Edge Functions', level: 78 },
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Sikkerhed & Datalogi',
    accent: 'text-violet-400',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/5',
    items: [
      { name: 'C# & OOP (EAMV)', level: 75 },
      { name: 'GDPR-compliance', level: 80 },
      { name: 'Sikker hosting (Cloudflare)', level: 78 },
      { name: 'Input validation & XSS-beskyttelse', level: 82 },
      { name: 'CyberSecurity (under uddannelse)', level: 68 },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6 border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-mono tracking-widest text-cyan-500 uppercase mb-3">
            Kompetencer
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Skills & Værktøjskasse</h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm">
            Det fulde stack – fra pixel til database, med sikkerhed som rød tråd.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, ci) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: ci * 0.12 }}
                className={`rounded-2xl border ${cat.border} ${cat.bg} p-7`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-9 h-9 rounded-lg ${cat.bg} border ${cat.border} flex items-center justify-center`}>
                    <Icon size={18} className={cat.accent} />
                  </div>
                  <h3 className="text-white font-semibold text-sm">{cat.title}</h3>
                </div>

                <div className="flex flex-col gap-4">
                  {cat.items.map((item, ii) => (
                    <div key={item.name}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-slate-300 text-xs">{item.name}</span>
                        <span className={`text-xs font-mono ${cat.accent}`}>{item.level}%</span>
                      </div>
                      <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: ci * 0.1 + ii * 0.06, ease: 'easeOut' }}
                          className={`h-full rounded-full`}
                          style={{ background: `var(--tw-gradient-stops, currentColor)` }}
                        >
                          <div
                            className="h-full w-full rounded-full"
                            style={{
                              background: cat.accent.includes('cyan')
                                ? '#06b6d4'
                                : cat.accent.includes('blue')
                                ? '#3b82f6'
                                : '#8b5cf6',
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
