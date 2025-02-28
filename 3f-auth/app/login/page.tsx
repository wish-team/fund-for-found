'use client'
import { Header, GoogleSignIn, Partition, EmailSignIn } from '@/components/pages/login'

const Page = () => {
  return (
    <div>
      <Header />
      <GoogleSignIn />
      <Partition />
      <EmailSignIn searchParams={{ message: '' }} />
    </div>
  )
}

export default Page
