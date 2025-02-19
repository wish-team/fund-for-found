import React from "react";
import Image from "next/image";
import { useProfileStore } from "@/components/features/creators/profile-editor/store/profileStore";
import { getFirstLetter } from "@/components/features/creators/profile-editor/utils/imageUtils";

export const CompanyLogo: React.FC<{ name: string }> = ({ name }) => {
  const selectedImage = useProfileStore((state) => state.selectedImage);

  return (
    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary">
      {selectedImage ? (
        <Image
          src={selectedImage}
          alt="Company Logo"
          fill
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-2xl text-primary200 font-semibold">
            {getFirstLetter(name)}
          </span>
        </div>
      )}
    </div>
  );
};
