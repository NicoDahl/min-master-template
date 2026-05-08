'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Phone, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Kontakt() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="kontakt" className="py-28 px-6 border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-mono tracking-widest text-cyan-500 uppercase mb-3">Kontakt</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Skal vi opgradere din digitale tilstedeværelse?
          </h2>
          <p className="mt-4 text-slate-400 max-w-lg mx-auto text-sm">
            Udfyld formularen eller kontakt mig direkte. Jeg vender tilbage inden for 24 timer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 font-mono">Navn</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="Dit navn"
                  className="w-full bg-slate-900/60 border border-slate-700 focus:border-cyan-500/60 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 font-mono">E-mail</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="din@email.dk"
                  className="w-full bg-slate-900/60 border border-slate-700 focus:border-cyan-500/60 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-500 mb-1.5 font-mono">Besked</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                placeholder="Hvad kan jeg hjælpe dig med?"
                className="w-full bg-slate-900/60 border border-slate-700 focus:border-cyan-500/60 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm outline-none transition-colors resize-none"
              />
            </div>

            {/* Status feedback */}
            {status === 'success' && (
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle size={16} />
                Besked sendt! Jeg vender tilbage snarest.
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} />
                Noget gik galt. Prøv igen eller skriv direkte.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="self-start inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold rounded-xl transition-colors text-sm"
            >
              <Send size={15} />
              {status === 'sending' ? 'Sender...' : 'Send besked'}
            </button>
          </motion.form>

          {/* Direct contact info */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-5 pt-2"
          >
            <h3 className="text-white font-semibold">Direkte kontakt</h3>

            {[
              {
                icon: Mail,
                label: 'E-mail',
                value: 'hej@nicolaidahl.dk',
                href: 'mailto:hej@nicolaidahl.dk',
              },
              {
                icon: Phone,
                label: 'Telefon',
                value: '+45 XX XX XX XX',
                href: 'tel:+4500000000',
              },
              {
                icon: ExternalLink,
                label: 'LinkedIn',
                value: '/in/nicolai-dahl',
                href: 'https://linkedin.com/in/nicolai-dahl',
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-800 hover:border-slate-600 bg-slate-900/30 hover:bg-slate-900/60 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/10 transition-colors">
                  <Icon size={16} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="text-sm text-slate-200">{value}</p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
