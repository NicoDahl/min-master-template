import { Mail, Phone, ExternalLink } from 'lucide-react'
import MorphingName from '@/components/MorphingName'
import BubbleStage from '@/components/BubbleStage'

export default function Home() {
  return (
    <>
      <MorphingName />
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

        {/* Cases overview — bubbles assemble into rotating circle here */}
        <section
          id="cases"
          className="h-[100dvh] flex items-center justify-center px-6 relative"
          aria-label="Cases-overblik"
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
                <span
                  aria-label="Portræt af Nicolai (placeholder)"
                  role="img"
                  className="inline-block rounded-2xl md:rounded-3xl overflow-hidden mb-[0.04em] shrink-0"
                  style={{
                    width: 'clamp(72px, 11vw, 170px)',
                    height: 'clamp(72px, 11vw, 170px)',
                    background:
                      'linear-gradient(135deg, #2A2A2A 0%, #5A5A55 60%, #869A69 100%)',
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
              <div className="text-sm md:text-base leading-relaxed">
                <p className="mb-6">
                  Skriv til mig om dit projekt — eller bare en uforpligtende kop
                  kaffe. Jeg svarer typisk inden for 24 timer.
                </p>
                <ul className="flex flex-col gap-3">
                  <ContactLink
                    icon={<Mail className="w-4 h-4" />}
                    href="mailto:kontakt@nicolaidahl.dk"
                    label="kontakt@nicolaidahl.dk"
                  />
                  <ContactLink
                    icon={<Phone className="w-4 h-4" />}
                    href="tel:+4500000000"
                    label="+45 XX XX XX XX"
                  />
                  <ContactLink
                    icon={<ExternalLink className="w-4 h-4" />}
                    href="https://www.linkedin.com/"
                    label="LinkedIn"
                    external
                  />
                </ul>
              </div>
            </div>
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

function ContactLink({
  icon,
  href,
  label,
  external = false,
}: {
  icon: React.ReactNode
  href: string
  label: string
  external?: boolean
}) {
  return (
    <li>
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="inline-flex items-center gap-3 hover:underline underline-offset-4"
      >
        <span className="w-9 h-9 rounded-full bg-[var(--color-fg)] text-[var(--color-blue)] inline-flex items-center justify-center shrink-0">
          {icon}
        </span>
        <span>{label}</span>
      </a>
    </li>
  )
}
