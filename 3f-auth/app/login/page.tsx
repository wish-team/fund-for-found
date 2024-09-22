/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { SubmitButton } from './submit-button'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  const signIn = async (formData: FormData) => {
    'use server'

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

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      {/* <Link
        href="/"
        className="group absolute left-8 top-8 flex items-center rounded-md bg-btn-background px-4 py-2 text-sm text-foreground no-underline hover:bg-btn-background-hover"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link> */}
      <div>
        sign in with google
      </div>
      <div className="text-gray-2 flex items-center justify-center gap-x-3 text-base">
        <div className="bg-gray-1 h-px flex-grow"></div>
        or
        <div className="bg-gray-1 h-px flex-grow"></div>
      </div>
      <form className="flex w-full flex-1 flex-col items-center justify-center gap-2 text-foreground">
        <LabelInputContainer>
          <Label htmlFor="Email">Mobile number or email address</Label>
          <Input
            name="email"
            className="border-purple-2 border"
            placeholder="e.g., 09120000000 or yourname@yahoo.com"
            type="email"
            autoComplete="false"
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
        <SubmitButton
          formAction={signIn}
          className="bg-purple-1 mb-2 w-full rounded-[4px] px-4 py-2 text-white"
          pendingText="Signing In..."
        >
          Continue
        </SubmitButton>
        <h2>Don't have one?</h2>
        <Button asChild>
          <Link href="/sign-up" className="text-purple-1">
            Create an account
          </Link>
        </Button>
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
