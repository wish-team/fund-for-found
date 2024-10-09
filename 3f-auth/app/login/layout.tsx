export const metadata = {
  title: 'login page',
  description: 'logineheeh',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col min-h-screen lg:w-1/4 md:w-1/3 sm:w-1/2  w-11/12 mx-auto   ">{children}</div>
}
