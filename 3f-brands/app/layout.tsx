import { GeistSans } from "geist/font/sans";
import "./globals.css";
import NavigationBar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import { Providers } from "./providers";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <Providers>
          <NavigationBar />
          <main className=" flex flex-col items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
              {children}
            </div>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
