import Navigation from '@/components/Navigation'
import CaseOrbit from '@/components/CaseOrbit'
import { cases } from '@/lib/cases-data'

export const metadata = {
  title: 'Cases – Nicolai Dahl',
  description: 'Udforsk mine webprojekter og skabeloner.',
}

export default function CasesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen grid-bg pt-24 pb-16 px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-4">
          <p className="text-xs font-mono tracking-widest text-cyan-500 uppercase mb-3">
            Cases & Skabeloner
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Mit Arbejde</h1>
          <p className="text-slate-400 text-sm">
            Hover over eller klik på en case for at læse om projektet.
          </p>
        </div>

        {/* Orbit */}
        <CaseOrbit cases={cases} />

        {/* Case count */}
        <p className="text-center text-xs text-slate-700 font-mono mt-2">
          {cases.length} projekter · {cases.filter((c) => c.isTemplate).length} skabeloner
        </p>
      </main>

      <footer className="border-t border-slate-800/60 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <span className="font-mono">© {new Date().getFullYear()} Nicolai Dahl</span>
          <a href="/" className="text-slate-500 hover:text-slate-300 transition-colors text-xs font-mono">
            ← Tilbage til forsiden
          </a>
        </div>
      </footer>
    </>
  )
}
