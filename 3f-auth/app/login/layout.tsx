export const metadata = {
  title: 'Login Page',
  description: 'Access your account securely with our login page.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-11/12 flex-col sm:w-7/12 md:w-5/12 lg:w-4/12">
      {children}
    </div>
  )
}
