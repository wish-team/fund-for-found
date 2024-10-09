import { Header, GoogleSignIn, EmailSignIn } from '@/components/pages/login'

const Page = () => {
  return (
    <div>
      <Header />
      <GoogleSignIn />
      <EmailSignIn searchParams={{ message: '' }} />
    </div>
  )}

export default Page
