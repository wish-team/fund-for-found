'use server'

import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

function setCookie(response: NextResponse, name: string, value: string) {
  response.cookies.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'none',
  })
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Error during exchangeCodeForSession:', error.message)
      return NextResponse.redirect(`${origin}/auth/auth-code-error`)
    }

    if (data?.session) {
      const response = NextResponse.redirect(`${origin}${next}`)

      setCookie(response, 'access_token', data.session.access_token)
      setCookie(response, 'refresh_token', data.session.refresh_token)

      return response
    }
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }
}
