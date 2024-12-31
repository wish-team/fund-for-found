import React from "react";
import { Tier } from "@/components/pages/creators/contributors/types/tier";
import RewardInfo from "./components/RewardInfo";
import FAQSection from "./components/FAQ";

interface Step1Props {
  tierDetails: Tier;
}

const Step1: React.FC<Step1Props> = ({ tierDetails }) => {
  return (
    <div className="grid sm:grid-cols-12 gap-4">
      <div className="sm:col-span-7">
        <RewardInfo tierDetails={tierDetails} />
      </div>
      <div className="sm:col-span-5">
        <FAQSection />
      </div>
    </div>
  );
};

export default Step1;
