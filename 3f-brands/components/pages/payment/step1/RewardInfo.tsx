import React from "react";
import { useRouter } from "next/navigation";
import { Tier, CompanyInfoType, AdminInfo } from "./types";
import { RewardCard } from "./components/RewardCard";
import { CompanyInfo as CompanyInfoComponent } from "./components/CompanyInfo";
import { AdminAvatar } from "./components/AdminAvatar";
import { NextStepButton } from "./components/NextStepButton";

interface RewardInfoProps {
  tierDetails: Tier;
}

const RewardInfo: React.FC<RewardInfoProps> = ({ tierDetails }) => {
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
    <div className="border rounded-xl">
      <div className="p-6 md:p-8">
        <h1 className="text-2xl border-b pb-4 text-primary text-center font-medium mb-8">
          Reward
        </h1>

        <RewardCard tier={tierDetails} />

        <div className="pt-8">
          <CompanyInfoComponent company={companyInfo} />
          <AdminAvatar admin={adminInfo} />
        </div>

        <NextStepButton onClick={handleNext} />
      </div>
    </div>
  );
};

export default RewardInfo;