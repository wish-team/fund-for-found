import Link from 'next/link'
import Image from 'next/image'
import { SubmitButton } from '../common/submit-button'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { SignInWithPassword, SignInWithGoogle } from '@/server/login'
import logo from '@/public/icons/logo.svg'

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center font-inter">
      <h1 className="text-[44px] font-medium leading-10 text-purple-1">FUND FOR FOUND</h1>
      <h2 className="text-[20px] font-medium">Create an account or sign in to start creating</h2>
      <Image src={logo} alt="logo" />
    </div>
  )
}

const GoogleSignIn = () => {
  return (
    <div>
      <button
        onClick={SignInWithGoogle}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Sign in with Google
      </button>
    </div>
  )
}

const EmailSignIn = ({ searchParams }: { searchParams: { message: string } }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2 px-8 sm:max-w-md">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <div className="flex w-full items-center justify-center gap-x-3 text-base text-gray-2">
          <div className="h-px flex-grow bg-gray-1"></div>
          or
          <div className="h-px flex-grow bg-gray-1"></div>
        </div>
      </div>
      <form className="text-foreground flex w-full flex-col items-center justify-center gap-2">
        <LabelInputContainer>
          <Label htmlFor="Email">Mobile number or email address</Label>
          <Input
            name="email"
            className="border border-purple-2"
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
          formAction={SignInWithPassword}
          className="mb-2 w-full rounded-[4px] bg-purple-1 px-4 py-2 text-white"
          pendingText="Signing In..."
        >
          Continue
        </SubmitButton>
        <h2>Dont have one?</h2>
        <Button asChild>
          <Link href="/sign-up" className="text-purple-1">
            Create an account
          </Link>
        </Button>
        {searchParams?.message && (
          <p className="bg-foreground/10 text-foreground mt-4 p-4 text-center">
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

export { Header, GoogleSignIn, EmailSignIn }
