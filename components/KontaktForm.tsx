'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function KontaktForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError(null)

    const fd = new FormData(e.currentTarget)
    const payload = {
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      service: String(fd.get('service') ?? '').trim(),
      message: String(fd.get('message') ?? '').trim(),
    }

    if (!payload.name || !payload.email) {
      setStatus('error')
      setError('Navn og e-mail er påkrævet.')
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(await res.text())
      setStatus('sent')
      e.currentTarget.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Noget gik galt.')
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Field label="Dit navn" name="name" placeholder="Fornavn Efternavn" required />
      <Field label="Din e-mail" name="email" type="email" placeholder="dig@eksempel.dk" required />
      <SelectField
        label="Hvad er du interesseret i?"
        name="service"
        options={[
          { value: '', label: 'Vælg en service' },
          { value: 'website', label: 'Ny hjemmeside' },
          { value: 'template', label: 'Template' },
          { value: 'security', label: 'Sikkerhedsrådgivning' },
          { value: 'andet', label: 'Andet / snak' },
        ]}
      />
      <Field
        label="Besked (valgfri)"
        name="message"
        placeholder="Fortæl kort om dit projekt"
        textarea
      />

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-fg)] text-[var(--color-bg)] px-6 py-3 text-sm font-semibold tracking-wide hover:bg-black transition-colors disabled:opacity-60"
      >
        <Send className="w-4 h-4" />
        {status === 'sending' ? 'Sender…' : 'Send besked'}
      </button>

      {status === 'sent' && (
        <p className="text-sm text-[var(--color-fg)] bg-white/40 rounded-lg px-3 py-2">
          Tak! Jeg vender tilbage hurtigst muligt.
        </p>
      )}
      {status === 'error' && error && (
        <p className="text-sm text-red-900 bg-red-100/60 rounded-lg px-3 py-2">{error}</p>
      )}
    </form>
  )
}

function Field({
  label,
  name,
  placeholder,
  type = 'text',
  required = false,
  textarea = false,
}: {
  label: string
  name: string
  placeholder?: string
  type?: string
  required?: boolean
  textarea?: boolean
}) {
  const base =
    'w-full rounded-lg bg-white/90 text-[var(--color-fg)] px-4 py-2.5 text-sm outline-none placeholder:text-[var(--color-fg-muted)]/60 focus:bg-white focus:ring-2 focus:ring-[var(--color-fg)]/20 transition'
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold tracking-wider uppercase text-white/90">
        {label}
      </span>
      {textarea ? (
        <textarea name={name} placeholder={placeholder} rows={3} className={base} />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={base}
        />
      )}
    </label>
  )
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string
  name: string
  options: { value: string; label: string }[]
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold tracking-wider uppercase text-white/90">
        {label}
      </span>
      <select
        name={name}
        defaultValue=""
        className="w-full rounded-lg bg-white/90 text-[var(--color-fg)] px-4 py-2.5 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-fg)]/20 transition appearance-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%231A1A1A' d='M6 8L0 0h12z'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 14px center',
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.value === ''}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}
