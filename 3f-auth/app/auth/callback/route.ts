'use server'

import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error && data?.session) {
      // Forward the session data to your backend
      await fetch(`${process.env.NESTJS_API_URL}/auth/store-tokens`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessToken: data.session.access_token,
          refreshToken: data.session.refresh_token,
          user: data.session.user,
        }),
        credentials: 'include', // if needed for cookie passing
      })
      // Then redirect to your front-end page
      return NextResponse.redirect(`${origin}${next}`)
    } else {
      // handle error
      return NextResponse.redirect(`${origin}/auth/auth-code-error`)
    }
  }
}
