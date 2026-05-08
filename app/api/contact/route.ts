import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Manglende felter' }, { status: 400 })
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Ugyldig e-mail' }, { status: 400 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    // Supabase not configured yet — log and return success for development
    console.log('[Contact form]', { name, email, message })
    return NextResponse.json({ ok: true })
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  const { error } = await supabase.from('contact_messages').insert({
    name,
    email,
    message,
    created_at: new Date().toISOString(),
  })

  if (error) {
    console.error('[Contact form] Supabase error:', error)
    return NextResponse.json({ error: 'Kunne ikke gemme besked' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
