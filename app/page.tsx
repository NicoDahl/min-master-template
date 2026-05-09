import { Mail } from 'lucide-react'
import MorphingName from '@/components/MorphingName'
import MorphingPortrait from '@/components/MorphingPortrait'
import BubbleStage from '@/components/BubbleStage'
import KontaktPanel from '@/components/KontaktPanel'

export default function Home() {
  return (
    <>
      <MorphingName />
      <MorphingPortrait />
      <BubbleStage />

      <main>
        {/* Hero */}
        <section
          id="hero"
          className="h-[100dvh] flex items-end justify-center pb-16 md:pb-24 px-6 relative"
        >
          <p className="text-center text-sm md:text-base text-[var(--color-fg-muted)] max-w-md">
            Datamatiker fra EAMV Herning. Bygger moderne web med AI og en
            passion for IT-sikkerhed.
          </p>
        </section>

        {/* Cases — bubbles assemble into a carousel here. Visual content
            (text panel, bubble layer, prev/next/dots) is rendered by
            BubbleStage as a fixed overlay; this section just reserves the
            scroll dwell. 150dvh gives room for travel + carousel browsing
            + a clean fade-out before Om mig. */}
        <section
          id="cases"
          className="h-[150dvh] relative"
          aria-label="Cases-karussel"
        />

        {/* Om mig */}
        <section
          id="om-mig"
          className="bg-[var(--color-sage)] text-[var(--color-card)] py-20 md:py-28 px-6"
        >
          <div className="max-w-6xl mx-auto">
            <h2
              className="font-[family-name:var(--font-archivo-black)] tracking-tight lowercase"
              style={{
                fontSize: 'clamp(80px, 17vw, 240px)',
                lineHeight: 0.82,
              }}
            >
              <span className="block">om</span>
              <span className="flex items-end gap-3 md:gap-5">
                <span>mig.</span>
                {/* Portrait slot — the actual image is rendered by
                    <MorphingPortrait /> as a fixed overlay that lerps from
                    the hero into this exact box on scroll. We keep this span
                    so the heading layout reserves the right space. */}
                <span
                  data-portrait-slot
                  aria-hidden="true"
                  className="inline-block rounded-2xl md:rounded-3xl shrink-0 mb-[0.04em]"
                  style={{
                    width: 'clamp(72px, 11vw, 170px)',
                    height: 'clamp(72px, 11vw, 170px)',
                  }}
                />
              </span>
            </h2>

            <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5 md:gap-12 items-start max-w-4xl">
              <h3 className="font-[family-name:var(--font-archivo-black)] text-2xl md:text-3xl tracking-tight">
                rart at møde dig!
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-[var(--color-card)]/95">
                Hej, jeg hedder Nicolai. Jeg er 29 år gammel og bor i Holstebro.
                Lige nu læser jeg til datamatiker på 2. semester på EAMV i
                Herning, og min store passion er IT-sikkerhed. Mens jeg studerer,
                bygger jeg moderne hjemmesider med AI-værktøjer for lokale
                virksomheder — det giver mig hands-on erfaring med arkitektur,
                design og sikker hosting, og lader mig kombinere teori fra bøgerne
                med rigtige projekter.
              </p>
            </div>
          </div>
        </section>

        {/* Kontakt — same visual language as Om mig */}
        <section
          id="kontakt"
          className="bg-[var(--color-blue)] text-[var(--color-fg)] py-20 md:py-28 px-6"
        >
          <div className="max-w-6xl mx-auto">
            <h2
              className="font-[family-name:var(--font-archivo-black)] tracking-tight lowercase"
              style={{
                fontSize: 'clamp(80px, 17vw, 240px)',
                lineHeight: 0.82,
              }}
            >
              <span className="block">kon</span>
              <span className="flex items-end gap-3 md:gap-5">
                <span>takt.</span>
                <span
                  aria-hidden="true"
                  className="inline-flex items-center justify-center rounded-2xl md:rounded-3xl overflow-hidden mb-[0.04em] shrink-0 bg-[var(--color-lime)]"
                  style={{
                    width: 'clamp(72px, 11vw, 170px)',
                    height: 'clamp(72px, 11vw, 170px)',
                  }}
                >
                  <Mail
                    style={{
                      width: '52%',
                      height: '52%',
                      color: 'var(--color-fg)',
                    }}
                    strokeWidth={2.4}
                  />
                </span>
              </span>
            </h2>

            <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5 md:gap-12 items-start max-w-4xl">
              <h3 className="font-[family-name:var(--font-archivo-black)] text-2xl md:text-3xl tracking-tight">
                lad os tage en snak
              </h3>
              <p className="text-sm md:text-base leading-relaxed">
                Skriv til mig om dit projekt — eller bare en uforpligtende kop
                kaffe. Vælg fanen der passer dig bedst. Jeg svarer typisk inden
                for 24 timer.
              </p>
            </div>

            <KontaktPanel />
          </div>
        </section>
      </main>

      <footer className="bg-[var(--color-fg)] text-[var(--color-card)] px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] uppercase tracking-[0.22em]">
          <span>© {new Date().getFullYear()} Nicolai Dahl</span>
          <span className="opacity-70">Holstebro · Datamatiker · EAMV</span>
        </div>
      </footer>
    </>
  )
}

