"use client";

import { Skeleton } from "@nextui-org/react";

export const HomePageSkeleton = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar Skeleton */}
      <div className="w-full border-b">
        <div className="h-[64px] max-w-[1024px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Skeleton className="h-8 w-24 rounded-lg" />

          {/* Nav Items - Desktop */}
          <div className="hidden sm:flex items-center gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-4 w-20 rounded-lg" />
            ))}
          </div>

          {/* Search and Auth */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-40 rounded-lg hidden sm:block" />{" "}
            {/* Search */}
            <Skeleton className="h-10 w-24 rounded-lg" /> {/* Auth Button */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="flex flex-col px-6 md:p-6">
          <main className="flex items-center flex-col gap-3">
            {/* Title Section */}
            <div className="w-[320px] md:w-[640px] lg:w-[768px] xl:w-[1024px] text-left pt-8">
              <Skeleton className="h-8  rounded-lg mb-4" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>

            {/* Card Section */}
            <section className="my-8 shadow-shadow1 rounded-2xl flex flex-col items-center h-[380px] w-[320px] bg-white">
              <div className="py-8">
                <Skeleton className="w-[88px] h-[88px] rounded-lg" />
              </div>
              <div className="px-8 flex flex-col items-center w-full">
                <div className="w-full text-left">
                  <Skeleton className="h-8 w-full rounded-lg mb-2" />
                  <Skeleton className="h-16 w-full rounded-lg" />
                </div>
                <Skeleton className="h-10 w-[280px] rounded-lg my-4" />
                <Skeleton className="h-6 w-24 rounded-lg" />
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Footer Skeleton */}
      <footer className="bg-light4 w-full rounded-t-3xl mt-20">
        <div className="max-w-6xl mx-auto py-16 px-4 ps-16">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Footer Columns */}
            {[1, 2, 3].map((col) => (
              <div key={col} className="space-y-4">
                <Skeleton className="h-6 w-32 rounded-lg" />
                <div className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <Skeleton key={item} className="h-4 w-40 rounded-lg" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="border-t mt-8 py-4">
          <div className="flex flex-wrap justify-center items-center gap-6">
            <Skeleton className="h-10 w-32 rounded-lg" />{" "}
            {/* Language Selector */}
            <div className="hidden md:flex gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-4 w-24 rounded-lg" />
              ))}
            </div>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-6 w-6 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
