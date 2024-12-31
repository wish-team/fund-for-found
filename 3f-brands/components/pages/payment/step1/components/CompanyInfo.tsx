import { memo } from "react";
import { CompanyLogo } from "./CompanyLogo";
import { CompanyInfoType } from "../types";
import { DEFAULT_IMAGE } from "@/components/pages/creators/contributors/utils/constants";

interface CompanyInfoProps {
  company: CompanyInfoType;
  className?: string;
}

export const CompanyInfo = memo(function CompanyInfo({ 
  company,
  className = ""
}: CompanyInfoProps) {
  return (
    <div className={`flex items-center gap-3 mb-4 ${className}`}>
      {company.tierImage ? (
        <img 
          src={company.tierImage} 
          alt={company.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
      ) : (
        <CompanyLogo name={company.name} />
      )}
      <div>
        <h3 className="text-base text-gray3 font-medium">{company.name}</h3>
        <p className="text-gray-500 text-sm">
          joined 3f on {company.joinDate}
        </p>
      </div>
    </div>
  );
});