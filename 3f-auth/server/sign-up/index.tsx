'use server'
import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const SignUpWithGoogle = async () => {
  const origin = headers().get('origin')
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (data.url) {
    redirect(data.url) // use the redirect API for your server framework
  }
}

const SignUpWithPassword = async (formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
}

export { SignUpWithGoogle, SignUpWithPassword }
