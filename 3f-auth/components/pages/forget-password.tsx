import Link from 'next/link'
import Image from 'next/image'
import SubmitButton from '../common/SubmitButton'
import LabelInputContainer from '../common/LabelInputContainer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ResetPassword } from '@/server/forget-password'
import lock from '@/public/icons/lock.svg'

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center font-inter">
      <Image src={lock} alt="logo" className="my-8" />
      <h1 className="my-5 text-[32px] font-medium leading-10 text-purple-1">
        Trouble with logging in?
      </h1>
      <p className="text-[16px] font-inter font-medium">
        Enter your email address or phone number and we{"'"}ll send you a link to get back into your
        account.
      </p>
    </div>
  )
}

const ResetForm = () => {
  return (
    <form className="flex w-full flex-col gap-2 mt-32 md:mt-16">
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
      <SubmitButton
        formAction={ResetPassword}
        className="my-2 w-full rounded-[4px] bg-purple-1 px-4 py-2 text-white"
        pendingText="Sending email..."
      >
        Continue
      </SubmitButton>
    </form>
  )
}

const CreateOption = () => {
  return (
    <div className="flex flex-col gap-1 text-center text-inter">
      <Link href="/sign-up" className="text-purple-1">
        Create an account
      </Link>
      <Link href="/login" className="text-sm font-medium ">back to login</Link>
    </div>
  )
}

export { Header, ResetForm, CreateOption }
