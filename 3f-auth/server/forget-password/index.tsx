'use server'
import { createClient } from '@/utils/supabase/server'

const ResetPassword = async (formData: FormData) => {
  const email = formData.get('email') as string
  const supabase = await createClient()
  const { data, error } = await supabase.auth.resetPasswordForEmail(email)
  console.log(data)
  console.log(error)
}

export { ResetPassword }
