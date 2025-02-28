import Link from 'next/link'
import Step from './Step'
import React from "react";

export default function SignUpUserSteps() {
  return (
    <div>
      <h2>Sign Up User Steps</h2>
      <p>
        Don&apos;t forget to fill in all the required fields during the sign-up process.
      </p>
      <ol className="flex flex-col gap-6">
        <Step title="Sign up your first user">
          <p>
            Head over to the{' '}
            <Link href="/login" className="font-bold text-foreground/80 hover:underline">
              Login
            </Link>{' '}
            page and sign up your first user. It's okay if this is just you for now. Your awesome idea
            will have plenty of users later!
          </p>
        </Step>
      </ol>
    </div>
  )
}
