'use server'
import { createClient } from '@/utils/supabase/server'

const SignUpWithPassword = async (formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
}

export { SignUpWithPassword }
