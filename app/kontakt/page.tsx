import Navigation from '@/components/Navigation'
import KontaktForm from '@/components/KontaktForm'
import { Mail, Phone, Clock } from 'lucide-react'

export default function KontaktPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-[100dvh] flex items-center justify-center px-6 py-32 md:py-28">
        <div className="w-full max-w-5xl bg-[var(--color-card)] rounded-3xl p-6 md:p-10 shadow-sm">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-stretch">
            {/* Form panel */}
            <div className="bg-[var(--color-blue)] rounded-2xl p-6 md:p-8">
              <KontaktForm />
            </div>

            {/* Info panel */}
            <div className="flex flex-col justify-center px-1 md:px-2 py-2">
              <span className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-[var(--color-lime)] text-[var(--color-fg)] text-[10px] font-semibold tracking-[0.2em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-fg)]" />
                Book et opkald
              </span>

              <h1 className="mt-5 font-[family-name:var(--font-archivo-black)] text-3xl md:text-4xl lg:text-5xl leading-[0.95] tracking-tight text-[var(--color-fg)]">
                Lad os bygge
                <br />
                noget sammen.
              </h1>

              <p className="mt-4 text-sm md:text-[15px] text-[var(--color-fg-muted)] leading-relaxed max-w-md">
                Skriv hvad du har på hjerte — om det er en ny hjemmeside, en
                template eller bare en uforpligtende snak. Jeg svarer typisk
                inden for 24 timer.
              </p>

              <div className="mt-7 flex flex-col gap-3.5">
                <ContactRow
                  icon={<Phone className="w-4 h-4" />}
                  label="+45 XX XX XX XX"
                />
                <ContactRow
                  icon={<Mail className="w-4 h-4" />}
                  label="kontakt@nicolaidahl.dk"
                />
                <ContactRow
                  icon={<Clock className="w-4 h-4" />}
                  label="Man–fre · 09:00 – 17:00"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

function ContactRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-9 h-9 rounded-full bg-[var(--color-fg)] text-[var(--color-bg)] flex items-center justify-center shrink-0">
        {icon}
      </span>
      <span className="text-sm text-[var(--color-fg)]">{label}</span>
    </div>
  )
}
