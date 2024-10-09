import { Header, GoogleSignUp, EmailSignUp } from '@/components/pages/sign-up'

const Page = () => {
  return (
    <div>
      <Header />
      <GoogleSignUp />
      <EmailSignUp searchParams={{ message: '' }} />
    </div>
  )
}

export default Page
