import Link from 'next/link'
import Image from 'next/image'
import { SubmitButton } from '../common/submit-button'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { SignInWithPassword, SignInWithGoogle } from '@/server/login'
import logo from '@/public/icons/logo.svg'
import googleIcon from '@/public/icons/google.svg'

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center font-inter">
      <h1 className="my-5 text-[44px] font-medium leading-10 text-purple-1">FUND FOR FOUND</h1>
      <h2 className="text-[20px] font-medium">Create an account or sign in to start creating</h2>
      <Image src={logo} alt="logo" className="my-10" />
    </div>
  )
}

const GoogleSignIn = () => {
  return (
    <div>
      <form className="border-gray-4 flex w-full items-center justify-center gap-1 rounded-md border bg-gray-3 font-inter">
        <Image src={googleIcon} alt="googleIcon" />
        <SubmitButton
          formAction={SignInWithGoogle}
          pendingText="Continue with Google"
          className="text-[#717171]"
        >
          Continue with Google
        </SubmitButton>
      </form>
    </div>
  )
}

const Partition = () => {
  return (
    <div className="my-7 flex w-full flex-col items-center justify-center gap-2">
      <div className="flex w-full items-center justify-center gap-x-3 text-base text-gray-2">
        <div className="h-px flex-grow bg-gray-1"></div>
        or
        <div className="h-px flex-grow bg-gray-1"></div>
      </div>
    </div>
  )
}

const EmailSignIn = ({ searchParams }: { searchParams: { message: string } }) => {
  return (
    <form className="flex w-full flex-col gap-2">
      <LabelInputContainer>
        <Label htmlFor="email">Mobile number or email address</Label>
        <Input
          id="email"
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
          placeholder="•••••••••••"
          type="password"
          autoComplete="off"
          required
        />
      </LabelInputContainer>
      <Link href="forget-password">
        <h5 className="text-left font-inter text-sm font-light text-purple-1">
          Forget your password?
        </h5>
      </Link>

      <SubmitButton
        formAction={SignInWithPassword}
        className="my-2 w-full rounded-[4px] bg-purple-1 px-4 py-2 text-white"
        pendingText="Signing In..."
      >
        Continue
      </SubmitButton>
      <div className="flex flex-col gap-1 text-center">
        <h5>Don{"'"}t have one?</h5>
        <Link href="/sign-up" className="text-purple-1">
          Create an account
        </Link>
      </div>
      {searchParams?.message && (
        <p className="bg-foreground/10 text-foreground mt-4 p-4 text-center">
          {searchParams.message}
        </p>
      )}
    </form>
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

export { Header, GoogleSignIn, Partition, EmailSignIn }
