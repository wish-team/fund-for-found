'use server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const SignInWithPassword = async (formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect('/login?message=Could not authenticate user')
  }

  return redirect('/protected')
}

const SignInWithGoogle = async () => {
  const supabase = createClient()
  const provider = 'google'
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
  })

  if (error) {
    return redirect('/login?message=Could not authenticate user')
  }

  return redirect('/protected')
}

export { SignInWithPassword, SignInWithGoogle }
