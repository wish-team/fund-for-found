import { type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Create Supabase client with the request
  const supabase = createClient(request)

  // Fetch the user
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error('Error fetching user:', error)
    return new Response('Internal Server Error', { status: 500 })
  }

  if (!data) {
    console.error('No data returned from getUser')
    return new Response('Internal Server Error', { status: 500 })
  }

  const user = data.user

  const publicRoutes = ['/login', '/sign-up', '/forget-password', '/auth/callback']
  const isPublicRoute = publicRoutes.includes(path)

  if (!user && !isPublicRoute) {
    return Response.redirect(new URL('/login', request.url))
  }

  if (user && isPublicRoute) {
    return Response.redirect(new URL('/protected', request.url))
  }

  return new Response(null, { status: 200 }) // Return OK response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
