'use client'

import { useState } from 'react'
import { Mail, Phone, ExternalLink, Send, Check } from 'lucide-react'

type Tab = 'message' | 'info'
type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function KontaktPanel() {
  const [tab, setTab] = useState<Tab>('message')

  return (
    <div className="mt-12 md:mt-16">
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Kontakt"
        className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-10"
      >
        <TabButton
          active={tab === 'message'}
          onClick={() => setTab('message')}
          id="kontakt-tab-message"
          panelId="kontakt-panel-message"
        >
          Skriv en besked
        </TabButton>
        <TabButton
          active={tab === 'info'}
          onClick={() => setTab('info')}
          id="kontakt-tab-info"
          panelId="kontakt-panel-info"
        >
          Direkte kontakt
        </TabButton>
      </div>

      {/* Active panel — re-keyed so the entrance animation plays on tab switch */}
      <div
        key={tab}
        role="tabpanel"
        id={tab === 'message' ? 'kontakt-panel-message' : 'kontakt-panel-info'}
        aria-labelledby={
          tab === 'message' ? 'kontakt-tab-message' : 'kontakt-tab-info'
        }
        className="kontakt-panel-enter max-w-4xl"
      >
        {tab === 'message' ? <MessageForm /> : <ContactInfo />}
      </div>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  children,
  id,
  panelId,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  id: string
  panelId: string
}) {
  return (
    <button
      type="button"
      role="tab"
      id={id}
      aria-selected={active}
      aria-controls={panelId}
      onClick={onClick}
      className="px-5 py-2.5 rounded-full text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-fg)]/40"
      style={{
        background: active ? 'var(--color-lime)' : 'transparent',
        color: 'var(--color-fg)',
        border: active ? '2px solid var(--color-lime)' : '2px solid var(--color-fg)',
      }}
    >
      {children}
    </button>
  )
}

function MessageForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    setError(null)

    const fd = new FormData(form)
    const firstName = String(fd.get('firstName') ?? '').trim()
    const lastName = String(fd.get('lastName') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const message = String(fd.get('message') ?? '').trim()
    const consent = Boolean(fd.get('consent'))

    if (!firstName || !email || !message) {
      setStatus('error')
      setError('Udfyld fornavn, email og besked.')
      return
    }
    if (!consent) {
      setStatus('error')
      setError('Du skal give samtykke for at jeg må kontakte dig.')
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email,
          message,
        }),
      })
      if (!res.ok) throw new Error(await res.text())
      setStatus('sent')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Noget gik galt — prøv igen.')
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-12 gap-y-7 md:gap-y-8"
    >
      {/* Left column: name + email + consent */}
      <div className="flex flex-col gap-7 md:gap-8">
        <LineField name="firstName" label="Fornavn" required />
        <LineField name="lastName" label="Efternavn" />
        <LineField name="email" type="email" label="Email" required />

        <label className="flex items-start gap-3 mt-1 text-xs leading-relaxed cursor-pointer text-[var(--color-fg)]/90">
          <input
            type="checkbox"
            name="consent"
            className="mt-0.5 w-4 h-4 accent-[var(--color-lime)] cursor-pointer"
          />
          <span>
            Jeg giver Nicolai lov til at kontakte mig på denne e-mail.
          </span>
        </label>
      </div>

      {/* Right column: message + send */}
      <div className="flex flex-col">
        <LineField
          name="message"
          label="Skriv din besked her"
          textarea
          required
          rows={6}
        />

        <div className="mt-auto pt-6 md:pt-8 flex flex-col gap-3">
          {status === 'sent' && (
            <p className="text-xs inline-flex items-center gap-2 text-[var(--color-fg)]">
              <Check className="w-4 h-4" />
              Tak — jeg vender tilbage hurtigst muligt.
            </p>
          )}
          {status === 'error' && error && (
            <p className="text-xs text-red-950/90">{error}</p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="self-end inline-flex items-center gap-2 rounded-full bg-[var(--color-fg)] text-[var(--color-bg)] px-6 py-3 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[var(--color-sage)] hover:text-white transition-colors disabled:opacity-60"
          >
            {status === 'sending' ? 'Sender…' : 'Send'}
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </form>
  )
}

function LineField({
  label,
  name,
  type = 'text',
  required = false,
  textarea = false,
  rows = 4,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  textarea?: boolean
  rows?: number
}) {
  const inputClass =
    'w-full bg-transparent border-0 border-b border-[var(--color-fg)]/40 focus:border-[var(--color-fg)] outline-none py-2 text-base text-[var(--color-fg)] placeholder:text-[var(--color-fg)]/40 transition-colors resize-none'

  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--color-fg)]/80">
        {label}
        {required && <span className="text-[var(--color-fg)]"> *</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={rows}
          className={inputClass}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          className={inputClass}
        />
      )}
    </label>
  )
}

function ContactInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5 md:gap-12 items-start">
      <p className="text-sm md:text-base leading-relaxed text-[var(--color-fg)]/90 max-w-md">
        Foretrækker du at række ud direkte? Du finder mig på email, telefon
        og LinkedIn — vælg det der passer dig bedst.
      </p>

      <ul className="flex flex-col gap-4 md:gap-5">
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
        className="inline-flex items-center gap-3 text-[var(--color-fg)] hover:underline underline-offset-4"
      >
        <span className="w-9 h-9 rounded-full bg-[var(--color-fg)] text-[var(--color-blue)] inline-flex items-center justify-center shrink-0">
          {icon}
        </span>
        <span>{label}</span>
      </a>
    </li>
  )
}
