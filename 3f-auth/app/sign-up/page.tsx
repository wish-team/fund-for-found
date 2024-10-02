import Link from 'next/link'
import { headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { SubmitButton } from '../login/submit-button'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  const signUp = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient()
    console.log()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })
    console.log(error)

    if (error) {
      console.log(error)
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/login?message=Check email to continue sign in process')
  }

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <form className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground">
        <LabelInputContainer>
          <Label htmlFor="firstname">First name</Label>
          <Input id="firstname" name="firstname" placeholder="Amirhosein" type="text" required />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="example@example.com"
            type="email"
            autoComplete="off"
            required
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="••••••••"
            type="password"
            autoComplete="off"
            required
          />
        </LabelInputContainer>
        {/* <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        /> */}
        <SubmitButton
          formAction={signIn}
          // className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing In..."
        >
          Sign In
        </SubmitButton>
        Dont have one?
        <SubmitButton
          formAction={signUp}
          className="mb-2 rounded-md border border-foreground/20 px-4 py-2 text-foreground"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={cn('flex w-full flex-col space-y-2', className)}>{children}</div>
}
