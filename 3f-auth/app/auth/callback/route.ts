import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Error exchanging code for session:', error.message)
      return NextResponse.redirect(`${origin}/auth/auth-code-error`)
    }

    if (data) {
      // Log the access token for debugging purposes
      console.log('Access token:', data.session)

      // Optionally, set a secure cookie with the token (or session)
      const response = NextResponse.redirect(`${origin}${next}`)
      response.cookies.set('access_token', data.session?.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      })
      return response
    }
  }

  console.error('OAuth code is missing or invalid.')
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
