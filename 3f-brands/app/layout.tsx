// app/layout.tsx
import "./globals.css";
import { Suspense } from "react";
import NavigationBar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import { Providers } from "./providers";
import Loader from "@/components/shared/loader/Loader";
import { FontLoader } from "@/utils/i18n";
import dynamic from "next/dynamic";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3001";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "found for fund",
  manifest: './manifest.ts',
  themeColor: '#000000',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  icons: {
    apple: '/icons/icon-192x192.png',
  },
  description:
    "where brands and individuals are committed to offering you ongoing support",
};

// Lazy load non-critical components
const FooterSkeleton = dynamic(
  () => import("@/components/shared/footer/FooterSkeleton"),
  {
    loading: () => <div className="w-full h-24 bg-gray-100 animate-pulse" />,
  }
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <Providers>
          <FontLoader />
          <Suspense fallback={<Loader />}>
            <NavigationBar />
          </Suspense>

          <main className="flex flex-col items-center md:min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
              <Suspense fallback={<Loader />}>{children}</Suspense>
            </div>
          </main>

          <Suspense fallback={<FooterSkeleton />}>
            <Footer />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
