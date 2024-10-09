import { SubmitButton } from '@/components/common/submit-button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import logo from '@/public/icons/logo.svg'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SignUpWithGoogle, SignUpWithPassword } from '@/server/sign-up'

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center font-inter">
      <h2 className="text-[20px] font-medium">Create your personal account</h2>
      <h1 className="text-[44px] font-medium leading-10 text-purple-1">FUND FOR FOUND</h1>
      <Image src={logo} alt="logo" />
    </div>
  )
}
const GoogleSignUp = () => {
  return (
    <div>
      <form action={SignUpWithGoogle} method="post">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      </form>
    </div>
  )
}

const EmailSignUp = ({ searchParams }: { searchParams: { message: string } }) => {
  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <form className="text-foreground flex w-full flex-1 flex-col justify-center gap-2">
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
        <SubmitButton
          formAction={SignUpWithPassword}
          className="border-foreground/20 text-foreground mb-2 rounded-md border px-4 py-2"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>
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

export { Header, GoogleSignUp, EmailSignUp }
