"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";
import { RewardTier, CompanyInfoType, AdminInfo } from "../types";
import { RewardCard } from "./RewardCard";
import { CompanyInfo as CompanyInfoComponent } from "./CompanyInfo";
import { AdminAvatar } from "./AdminAvatar";
import { NextStepButton } from "./NextStepButton";

interface RewardInfoProps {
  tierDetails: RewardTier;
  className?: string;
}

const RewardInfo = memo(function RewardInfo({ 
  tierDetails,
  className = ""
}: RewardInfoProps) {
  const router = useRouter();

  const companyInfo: CompanyInfoType = {
    name: "Wish work",
    joinDate: "oct 2024"
  };

  const adminInfo: AdminInfo = {
    name: "Amirhossein shirani",
    role: "Admin"
  };

  const handleNext = () => {
    router.push(`/payment/${tierDetails.id}/2`);
  };

  return (
    <div className={`border rounded-xl ${className}`}>
      <div className="p-6 md:p-8">
        <h1 className="text-2xl border-b pb-4 text-primary text-center font-medium mb-8">
          Reward
        </h1>

        <RewardCard tier={tierDetails} />

        <div className="">
          <CompanyInfoComponent company={companyInfo} />
          <AdminAvatar admin={adminInfo} />
        </div>

        <NextStepButton onClick={handleNext} />
      </div>
    </div>
  );
});

export default RewardInfo;