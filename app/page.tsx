import MorphingName from '@/components/MorphingName'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <>
      <MorphingName />
      <main>
        <Hero />

        {/* Cases section — placeholder, builds in next iteration */}
        <section
          id="cases"
          className="min-h-[60vh] flex items-center justify-center px-6 py-24 border-t border-[var(--color-fg)]/10"
        >
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[var(--color-fg-muted)]">
            Cases-sektion bygges i næste runde
          </p>
        </section>
      </main>
    </>
  )
}
