export interface Case {
  id: string
  slug: string
  title: string
  category: string
  description: string
  longDescription: string
  tags: string[]
  year: string
  gradient: string
  initials: string
  isTemplate?: boolean
}

export const cases: Case[] = [
  {
    id: '1',
    slug: 'lokal-bistro',
    title: 'Lokal Bistro',
    category: 'Restaurant',
    description: 'Minimalistisk landing page med digitalt menukort og bordreservation integreret.',
    longDescription:
      'Bygget med Next.js og Supabase til at håndtere realtids bordreservationer. Fokus på mobilvenligt design og hurtig indlæsning. Inkluderer dynamisk menukort som ejeren kan opdatere selv via et simpelt dashboard.',
    tags: ['Next.js', 'Supabase', 'Tailwind', 'Framer Motion'],
    year: '2025',
    gradient: 'linear-gradient(135deg, #0f766e, #0891b2)',
    initials: 'LB',
  },
  {
    id: '2',
    slug: 'bella-cucina',
    title: 'Bella Cucina',
    category: 'Restaurant',
    description: 'Elegant italiensk restaurant med online booking og galleri over retter.',
    longDescription:
      'Et visuelt-drevet website til en autentisk italiensk restaurant. Stort billedgalleri med lazy loading, online booking via Supabase og integreret Google Maps. Bygget med performance og SEO for øje.',
    tags: ['Next.js', 'Tailwind', 'Google Maps API', 'SEO'],
    year: '2025',
    gradient: 'linear-gradient(135deg, #92400e, #b45309)',
    initials: 'BC',
  },
  {
    id: '3',
    slug: 'den-sikre-haandvaerker',
    title: 'Den Sikre Håndværker',
    category: 'Template · Håndværker',
    description: 'Klar skabelon til lokale håndværkere med tilbudsformular og kundeanmeldelser.',
    longDescription:
      'En komplet webskabelon designet specifikt til håndværkervirksomheder. Inkluderer kontaktformular, tilbudsberegner, referenceprojekter og automatisk svar-mail via Resend. Sikret mod spam og SQL-injection.',
    tags: ['Next.js', 'Resend', 'Supabase', 'GDPR'],
    year: '2025',
    gradient: 'linear-gradient(135deg, #1e3a5f, #2563eb)',
    initials: 'SH',
    isTemplate: true,
  },
  {
    id: '4',
    slug: 'ehandel-light',
    title: 'E-handel Light',
    category: 'Template · Webshop',
    description: 'Let og hurtig webshop-skabelon med betalingsintegration og lagerstyring.',
    longDescription:
      'En "batteries included" e-handels skabelon bygget til hastighed. Stripe integration, Supabase til ordre- og lagerstyring, og et simpelt admin panel. Perfekt til små lokale butikker der vil online hurtigt.',
    tags: ['Next.js', 'Stripe', 'Supabase', 'Admin panel'],
    year: '2025',
    gradient: 'linear-gradient(135deg, #4a044e, #86198f)',
    initials: 'EL',
    isTemplate: true,
  },
]
