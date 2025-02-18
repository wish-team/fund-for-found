import { redirect } from 'next/navigation'

export default function Home() {
  // When someone visits /
  redirect('/login')
}
