'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

const SignUpWithPassword = async (formData: FormData) => {
  const supabase = await createClient()
  const structureFormData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  console.log(formData.get('firstname'))
  const { error } = await supabase.auth.signUp({
    ...structureFormData,
    options: {
      emailRedirectTo: 'http://localhost:3000',
      data: {
        username: formData.get('firstname') as string,
      },
    },
  })

  if (error) {
    redirect('/error')
  }
  revalidatePath('/', 'layout')
  redirect('/')
}

export { SignUpWithPassword }
