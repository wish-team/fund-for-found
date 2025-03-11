import React from "react";
import { Brand } from "../types/brand";
import sampleImg from "../../../../app/images/explore/Frame 26086687.svg";
import brandBanner from "../../../../app/images/explore/Frame 26086295.svg";
import Image from "next/image";

interface BrandCardProps {
  brand: Brand;
}

export const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-white">
      <div className="">
        <Image
          src={brandBanner}
          className="object-fill w-full"
          alt="brand banner"
          width={400}
          height={200}
          priority
        />
        <div className="flex items-end -m-16 mx-6 gap-4">
          <div className="w-[100px] h-[100px] relative">
            <Image 
              src={sampleImg}
              alt={`${brand.brand_name} logo`}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
          <h3 className="text-lg font-bold">{brand.brand_name}</h3>
        </div>
      </div>
      <div className="p-4 mt-16">
      <div className="flex flex-wrap gap-2 mb-4">
        {brand.brand_tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
            {tag}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <strong>Country:</strong> {brand.brand_country}
        </div>
        <div>
          <strong>Contributors:</strong> {brand.total_contributions}
        </div>
        <div>
          <strong>Money Raised:</strong> ${brand.total_contributed_amount.toLocaleString()}
        </div>
      </div>
      </div>
    </div>
  );
};
