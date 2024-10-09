import { SubmitButton } from '@/components/common/submit-button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import logo from '@/public/icons/logo.svg'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SignUpWithPassword } from '@/server/sign-up'

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center font-inter">
      <h2 className="text-[20px] md:text-[32px] font-medium">Create your personal account</h2>
      <h1 className="text-[32px] md:text-[44px] font-medium leading-10 text-purple-1 md:my-10 my-5">FUND FOR FOUND</h1>
      <Image src={logo} alt="logo" className="mb-10" />
    </div>
  )
}

const EmailSignUp = ({ searchParams }: { searchParams: { message: string } }) => {
  return (
    <form className="flex w-full flex-col gap-2">
      <LabelInputContainer>
        <Label htmlFor="firstname">First name</Label>
        <Input id="firstname" name="firstname" type="text" required />
      </LabelInputContainer>
      <LabelInputContainer>
        <Label htmlFor="lastname">Last name</Label>
        <Input id="lastname" name="lastname" type="text" required />
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
        className="my-2 w-full rounded-md bg-purple-1 px-4 py-2 text-white"
        pendingText="Creating account..."
      >
        Continue
      </SubmitButton>
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

export { Header, EmailSignUp }
