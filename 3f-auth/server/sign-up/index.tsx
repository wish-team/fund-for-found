'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

const SignUpWithPassword = async (formData: FormData) => {
  const supabase = await createClient()
  const structureFormData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      emailRedirectTo: 'http://localhost:3000',
    },
  }

  const { error } = await supabase.auth.signUp(structureFormData)

  if (error) {
    redirect('/error')
  }
  revalidatePath('/', 'layout')
  redirect('/')
}

export { SignUpWithPassword }
