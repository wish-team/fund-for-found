import { Header, Google, Form } from '@/components/pages/login'

const Page = () => {
  return (
    <div>
      <Header  />
      <Google /> 
      <Form searchParams={{ message: '' }} />
    </div>
  )
}

export default Page
