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
          className="object-fill w-full "
          alt="brand banner"
        />
        <div className="flex items-end -m-16 mx-6 gap-4">
          <Image src={sampleImg} alt="brand image" />
          <h3 className="text-lg font-bold">{brand.name}</h3>
        </div>
      </div>
      <div className="p-4 mt-16">

      <p className="text-gray-600 mb-2">{brand.description}</p>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <strong>Country:</strong> {brand.country}
        </div>
        <div>
          <strong>Contributors:</strong> {brand.contributors}
        </div>
        <div>
          <strong>Money Raised:</strong> ${brand.moneyRaised.toLocaleString()}
        </div>
      </div>
      </div>
    </div>
  );
};
