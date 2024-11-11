import React from "react";
import { Tier } from "../types/tier";
import { PreviewCard } from "./PreviewCard";

interface TierListProps {
  tiers: Tier[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export const TierList: React.FC<TierListProps> = ({
  tiers,
  onEdit,
  onDelete,
}) => (
  <div className="flex-1 min-w-0">
    <div className="flex flex-col md:flex-row md:overflow-x-auto gap-6">
      {tiers.map((tier, index) => (
        <div key={index} className="w-full md:w-80 md:flex-none">
          <PreviewCard
            data={tier}
            onEdit={onEdit}
            onDelete={onDelete}
            index={index}
          />
        </div>
      ))}
    </div>
  </div>
);
