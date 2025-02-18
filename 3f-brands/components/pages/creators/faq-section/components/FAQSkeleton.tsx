import React from "react";
import { Skeleton } from "@nextui-org/react";

export const FAQSkeleton = () => {
  return (
    <div className="w-full space-y-4">
      {[1, 2, 3].map((index) => (
        <div key={index} className="border rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <Skeleton className="w-3/4 h-6 rounded-lg" />
            <Skeleton className="w-6 h-6 rounded-full" />
          </div>
          <Skeleton className="w-full h-20 rounded-lg" />
          <div className="flex justify-between mt-2">
            <Skeleton className="w-24 h-8 rounded-lg" />
            <Skeleton className="w-24 h-8 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};
