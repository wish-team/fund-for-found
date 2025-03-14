import React from "react";
import { Tier } from "@/components/features/creators/contributors/types/tier";
import FAQSection from "../step1/components/FAQ";
import Contributer from "./Contributer";

interface Step2Props {
  tierDetails: Tier;
}

const Step2: React.FC<Step2Props> = ({ tierDetails }) => {
  return (
    <div className="grid sm:grid-cols-12 gap-4">
      <div className="sm:col-span-7">
        <Contributer tierDetails={tierDetails} />
      </div>
      <div className="sm:col-span-5">
        <FAQSection />
      </div>
    </div>
  );
};

export default Step2;
