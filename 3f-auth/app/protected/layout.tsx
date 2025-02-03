import { checkAuth } from '@/utils/auth'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  // This will redirect to login if user is not authenticated
  await checkAuth()

  return <>{children}</>
}
