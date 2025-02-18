import React from "react";

export const TierSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse border rounded-lg overflow-hidden shadow-sm w-full">
      <div className="h-12 bg-gray-200" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-36 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
        <div className="h-10 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export const TierListSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((key) => (
        <TierSkeleton key={key} />
      ))}
    </div>
  );
};
