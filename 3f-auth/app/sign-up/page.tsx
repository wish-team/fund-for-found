import { Header, EmailSignUp } from '@/components/pages/sign-up'
import { GoogleSignIn, Partition } from '@/components/pages/login'

const Page = () => {
  return (
    <div>
      <Header />
      <GoogleSignIn />
      <Partition />
      <EmailSignUp searchParams={{ message: '' }} />
    </div>
  )
}

export default Page
