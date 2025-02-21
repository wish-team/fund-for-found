'use client'
import { Header, GoogleSignIn, Partition, EmailSignIn } from '@/components/pages/login'
import Select from '@/components/common/Select'
import Image from 'next/image'

const Page = () => {
  const options = ['Option 1', 'Option 2', 'Option 3']
  const handleChange = (value: string) => {
    console.log('Selected:', value)
  }

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
