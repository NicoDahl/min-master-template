import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import AerligVinkel from '@/components/AerligVinkel'
import CasesGrid from '@/components/CasesGrid'
import Skills from '@/components/Skills'
import OmMig from '@/components/OmMig'
import Kontakt from '@/components/Kontakt'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <AerligVinkel />
        <CasesGrid />
        <Skills />
        <OmMig />
        <Kontakt />
      </main>
      <footer className="border-t border-slate-800/60 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <span className="font-mono">© {new Date().getFullYear()} Nicolai Dahl</span>
          <span className="font-mono text-xs">Bygget med Next.js · Tailwind · Supabase</span>
        </div>
      </footer>
    </>
  )
}
