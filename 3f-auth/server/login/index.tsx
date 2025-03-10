'use server'

import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const SignInWithPassword = async (formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = await createClient()
  console.log(email, password)
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect('/login?message=Could not authenticate user')
  }
  console.log(data)
  return redirect('/protected')
}

const SignInWithGoogle = async () => {
  const origin = (await headers()).get('origin')
  const supabase = await createClient()
  const { data } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })
  if (data.url) {
    redirect(data.url)
  }
}

export { SignInWithPassword, SignInWithGoogle }
