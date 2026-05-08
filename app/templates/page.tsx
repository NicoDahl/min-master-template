import Navigation from '@/components/Navigation'

export default function TemplatesPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 flex items-center justify-center px-6 py-32">
        <div className="text-center max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[var(--color-fg-muted)] mb-4">
            Sektion under opbygning
          </p>
          <h1 className="font-[family-name:var(--font-archivo-black)] text-5xl md:text-7xl tracking-tight leading-[0.9] text-[var(--color-fg)]">
            TEMPLATES
          </h1>
          <p className="mt-6 text-sm tracking-wider uppercase text-[var(--color-fg-muted)]">
            Klar-til-brug skabeloner for håndværkere, restauranter og webshops kommer snart.
          </p>
        </div>
      </main>
    </>
  )
}
