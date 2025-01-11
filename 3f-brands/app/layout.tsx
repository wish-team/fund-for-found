import "./globals.css";
import { Suspense } from "react";
import NavigationBar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import { Providers } from "./providers";
import Loader from "@/components/shared/loader/Loader";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3001";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "found for fund",
  description:
    "where brands and individuals are committed to offering you ongoing support",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <Providers>
          {/* The LanguageProvider is now moved to Providers component */}
          <Suspense fallback={<Loader />}>
            <NavigationBar />
          </Suspense>

          <main className="flex flex-col items-center min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
              <Suspense fallback={<Loader />}>{children}</Suspense>
            </div>
          </main>

          <Suspense fallback={<Loader />}>
            <Footer />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}