import MorphingName from '@/components/MorphingName'
import BubbleStage from '@/components/BubbleStage'

export default function Home() {
  return (
    <>
      <MorphingName />
      <BubbleStage />

      <main>
        {/* Hero — name is the morphing element, scattered bubbles overlay */}
        <section
          id="hero"
          className="h-[100dvh] flex items-end justify-center pb-16 md:pb-24 px-6 relative"
        >
          <p className="text-center text-sm md:text-base text-[var(--color-fg-muted)] max-w-md">
            Datamatiker fra EAMV Herning. Bygger moderne web med AI og en
            passion for IT-sikkerhed.
          </p>
        </section>

        {/* Cases overview — bubbles assemble into rotating circle here */}
        <section
          id="cases"
          className="h-[100dvh] flex items-center justify-center px-6 relative"
          aria-label="Cases-overblik"
        >
          {/* The orbit and centered title are rendered by BubbleStage as a
              fixed overlay — this section just reserves the scroll space */}
        </section>

        {/* Om mig — placeholder ready for next round */}
        <section
          id="om-mig"
          className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-24 border-t border-[var(--color-fg)]/10"
        >
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--color-fg-muted)] mb-4">
            Sektion under opbygning
          </p>
          <h2 className="font-[family-name:var(--font-archivo-black)] text-4xl md:text-6xl tracking-tight uppercase text-[var(--color-fg)]">
            Om mig
          </h2>
          <p className="mt-5 text-sm md:text-base text-[var(--color-fg-muted)] max-w-xl text-center">
            Her bygger vi historien om Nicolai — EAMV, vejen ind i IT, og
            ambitionen om at blive specialist i IT-sikkerhed.
          </p>
        </section>

        {/* Kontakt — placeholder */}
        <section
          id="kontakt"
          className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-24 border-t border-[var(--color-fg)]/10"
        >
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--color-fg-muted)] mb-4">
            Sektion under opbygning
          </p>
          <h2 className="font-[family-name:var(--font-archivo-black)] text-4xl md:text-6xl tracking-tight uppercase text-[var(--color-fg)]">
            Kontakt
          </h2>
          <p className="mt-5 text-sm md:text-base text-[var(--color-fg-muted)] max-w-xl text-center">
            Formular og direkte kontaktinfo bygges i næste runde.
          </p>
        </section>
      </main>

      <footer className="border-t border-[var(--color-fg)]/10 px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] uppercase tracking-[0.22em] text-[var(--color-fg-muted)]">
          <span>© {new Date().getFullYear()} Nicolai Dahl</span>
          <span>Holstebro · Datamatiker · EAMV</span>
        </div>
      </footer>
    </>
  )
}
