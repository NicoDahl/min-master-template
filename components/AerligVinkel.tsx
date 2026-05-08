'use client'

import { motion } from 'framer-motion'
import { Zap, ShieldCheck, Handshake } from 'lucide-react'

const cards = [
  {
    icon: Zap,
    title: 'Fart & Fremtid',
    body: 'Jeg bruger AI-værktøjer til at designe og kode hjemmesider. Det betyder, at du får et produkt af ekstremt høj kvalitet på den halve tid – og til en brøkdel af, hvad et traditionelt bureau tager.',
    accent: 'text-yellow-400',
    border: 'border-yellow-500/20',
    bg: 'bg-yellow-500/5',
  },
  {
    icon: ShieldCheck,
    title: 'Sikkerhed i Højsædet',
    body: 'Som Datamatiker-studerende på EAMV i Herning er min sande passion CyberSecurity. Din hjemmeside bliver ikke bare pæn; den bliver bygget på et sikkert og moderne fundament.',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/20',
    bg: 'bg-cyan-500/5',
  },
  {
    icon: Handshake,
    title: 'Win-Win',
    body: 'Når du køber en webløsning af mig, får du en moderne hjemmeside, mens du hjælper mig med at finpudse mine evner inden for sikker arkitektur og UI-design. Alle vinder.',
    accent: 'text-violet-400',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/5',
  },
]

export default function AerligVinkel() {
  return (
    <section id="mission" className="py-28 px-6">
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
            Den Ærlige Vinkel
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Hvorfor AI? Hvorfor mig?</h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`rounded-2xl border ${card.border} ${card.bg} p-7 flex flex-col gap-4 hover:border-opacity-60 transition-colors`}
              >
                <div className={`w-10 h-10 rounded-xl ${card.bg} border ${card.border} flex items-center justify-center`}>
                  <Icon size={20} className={card.accent} />
                </div>
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{card.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
