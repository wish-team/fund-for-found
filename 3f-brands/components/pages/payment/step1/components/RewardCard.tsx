import { memo } from "react";
import { Tier } from "../types";

interface RewardCardProps {
  tier: Tier;
  className?: string;
}

export const RewardCard = memo(function RewardCard({ 
  tier,
  className = ""
}: RewardCardProps) {
  return (
    <div className={`grid sm:grid-cols-12 gap-4 items-center ${className}`}>
      <div className="sm:col-span-7">
        <p className="text-gray-500 text-sm text-justify leading-relaxed">
          {tier.rewardDescription}
        </p>
      </div>
      <div className="bg-purple-50 rounded-2xl p-6 flex text-primary200 items-center sm:col-span-5 justify-center">
        <h2 className="text-3xl text-primary/40 font-medium">{tier.name}</h2>
      </div>
    </div>
  );
});