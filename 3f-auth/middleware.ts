import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createClient } from '@/utils/supabase/server'

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Create Supabase client
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Define public routes that don't require authentication
  const publicRoutes = ['/login', '/sign-up', '/forget-password', '/auth/callback']
  const isPublicRoute = publicRoutes.includes(path)

  // Redirect logic
  if (!user && !isPublicRoute) {
    // Redirect unauthenticated users to login page
    return Response.redirect(new URL('/login', request.url))
  }

  if (user && isPublicRoute) {
    // Redirect authenticated users to protected page
    return Response.redirect(new URL('/protected', request.url))
  }

  return await updateSession(request)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
