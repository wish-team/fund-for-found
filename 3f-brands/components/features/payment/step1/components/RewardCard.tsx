import React from "react";
import { RewardTier } from "../types";
import { DEFAULT_IMAGE } from "@/components/features/creators/contributors/utils/constants";

interface RewardCardProps {
  tier: RewardTier;
}

export const RewardCard: React.FC<RewardCardProps> = ({ tier }) => {
  return (
    <div className="grid md:grid-cols-12 items-center gap-2">
      <div className="md:col-span-8 space-y-4">
        <div className="text-gray-500">
          <h2 className="text-xl text-gray4 font-extrabold">{tier.name}</h2>
          <h4 className="font-semibold">
            <span className="text-light1">Amount: </span>
            <span className="text-primary200">${tier.amount}</span>
          </h4>
        </div>
        <p className="text-gray-600 font-light text-sm">
          {tier.rewardDescription}
        </p>
      </div>
      <div className="md:col-span-4 ">
        <img
          src={tier.imagePreview || DEFAULT_IMAGE}
          alt={`${tier.name} tier`}
          className="w-full h-48 object-cover rounded-lg"
          loading="lazy"
        />
      </div>
    </div>
  );
};
