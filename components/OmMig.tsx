'use client'

import { motion } from 'framer-motion'
import { MapPin, GraduationCap, Target } from 'lucide-react'

export default function OmMig() {
  return (
    <section id="om" className="py-28 px-6 border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900 border border-slate-800">
              {/* Placeholder graphic */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-slate-700">
                <div className="w-24 h-24 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                  <span className="text-4xl font-bold text-slate-600">N</span>
                </div>
                <p className="text-sm text-slate-600 font-mono">Dit billede her</p>
              </div>
              {/* Decorative corner accent */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-2xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-500/40 rounded-br-2xl pointer-events-none" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 shadow-xl">
              <p className="text-xs text-slate-500 font-mono">Currently</p>
              <p className="text-sm text-white font-semibold">2. semester, EAMV</p>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="text-xs font-mono tracking-widest text-cyan-500 uppercase mb-3">
                Bag Skærmen
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Om Mig</h2>
            </div>

            <p className="text-slate-300 leading-relaxed">
              Jeg er 29 år gammel, bor i Holstebro, og er i gang med mit 2. semester som
              Datamatiker på EAMV i Herning. Min rejse ind i IT startede med en fascination af,
              hvordan teknologi kan forme og sikre den digitale verden – fra kode der kører på
              millisekunder til systemer der holder angribere ude.
            </p>

            <p className="text-slate-400 leading-relaxed text-sm">
              I dag er mit mål skarpt: Jeg vil være specialist i IT-sikkerhed. At bygge og sikre
              hjemmesider for lokale virksomheder er min måde at koble teori fra bøgerne sammen
              med den virkelige verden – og skabe reel værdi undervejs.
            </p>

            {/* Details */}
            <div className="flex flex-col gap-3 pt-2">
              {[
                { icon: MapPin, text: 'Holstebro, Danmark' },
                { icon: GraduationCap, text: 'Datamatiker · EAMV Herning · 2. semester' },
                { icon: Target, text: 'Mål: IT-sikkerhedsspecialist' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-slate-400 text-sm">
                  <Icon size={15} className="text-cyan-500 shrink-0" />
                  {text}
                </div>
              ))}
            </div>

            {/* LinkedIn / contact */}
            <div className="pt-2 flex gap-3">
              <a
                href="https://linkedin.com/in/nicolai-dahl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-sm rounded-xl transition-all hover:bg-white/5"
              >
                LinkedIn
              </a>
              <a
                href="/#kontakt"
                className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400 text-sm rounded-xl transition-all"
              >
                Skriv til mig
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
