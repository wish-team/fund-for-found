import { Skeleton } from "@nextui-org/react";

export const ExploreSkeleton = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="border rounded-3xl p-8 shadow">
        {/* Search and Country Filter Skeleton */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Skeleton className="w-full md:w-2/3 h-12 rounded-lg" />
            <Skeleton className="w-full md:w-1/3 h-12 rounded-lg" />
          </div>
        </div>

        {/* Category Dropdowns Skeleton */}
        <div className="w-full grid md:grid-cols-5 gap-4 mb-6">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-10 rounded-lg" />
          ))}
        </div>

        {/* Active Filters Skeleton */}
        <div className="flex gap-2 flex-wrap">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="w-24 h-8 rounded-full" />
          ))}
        </div>
      </div>

      {/* Brand Cards Grid Skeleton */}
      <div className="mt-8">
        <Skeleton className="w-48 h-8 mb-4" /> {/* "Brands" title */}
        <Skeleton className="w-32 h-6 mb-4" /> {/* "Found X brands" text */}

        <div className="hidden md:grid md:grid-cols-3 gap-4 mb-6">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="border rounded-lg overflow-hidden shadow-md bg-white">
              <Skeleton className="w-full h-[200px]" /> {/* Banner image */}
              <div className="flex items-end -m-16 mx-6 gap-4">
                <Skeleton className="w-[100px] h-[100px] rounded-lg" /> {/* Profile image */}
                <Skeleton className="w-32 h-6" /> {/* Brand name */}
              </div>
              <div className="p-4 mt-16">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {[...Array(3)].map((_, tagIndex) => (
                    <Skeleton key={tagIndex} className="w-16 h-6 rounded-full" />
                  ))}
                </div>
                {/* Info grid */}
                <div className="grid grid-cols-2 gap-2">
                  {[...Array(3)].map((_, infoIndex) => (
                    <Skeleton key={infoIndex} className="h-6" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slider Skeleton */}
        <div className="block md:hidden">
          <div className="overflow-hidden">
            <div className="flex gap-4">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="w-[80vw] flex-shrink-0">
                  <div className="border rounded-lg overflow-hidden shadow-md bg-white">
                    <Skeleton className="w-full h-[200px]" />
                    <div className="flex items-end -m-16 mx-6 gap-4">
                      <Skeleton className="w-[100px] h-[100px] rounded-lg" />
                      <Skeleton className="w-32 h-6" />
                    </div>
                    <div className="p-4 mt-16">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {[...Array(3)].map((_, tagIndex) => (
                          <Skeleton key={tagIndex} className="w-16 h-6 rounded-full" />
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[...Array(3)].map((_, infoIndex) => (
                          <Skeleton key={infoIndex} className="h-6" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center mt-6">
          <div className="hidden md:flex gap-2">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="w-10 h-10 rounded-full" />
            ))}
          </div>
          <div className="flex md:hidden gap-4 items-center">
            <Skeleton className="w-8 h-8" /> {/* Prev button */}
            <Skeleton className="w-24 h-6" /> {/* Page info */}
            <Skeleton className="w-8 h-8" /> {/* Next button */}
          </div>
        </div>
      </div>
    </div>
  );
};
