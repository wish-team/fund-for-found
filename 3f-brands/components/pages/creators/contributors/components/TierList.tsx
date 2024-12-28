
import React from "react";
import { Tier } from "../types/tier";
import { PreviewCard } from "./PreviewCard";

interface TierListProps {
  tiers: Tier[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  layout?: 'horizontal' | 'vertical';
  className?: string;
}

export const TierList: React.FC<TierListProps> = ({
  tiers,
  onEdit,
  onDelete,
  layout = 'horizontal',
  className = '',
}) => {
  // Base classes that are always applied
  const containerBaseClasses = "flex-1 min-w-0";
  
  // Layout-specific classes
  const layoutClasses = {
    horizontal: "flex flex-col md:flex-row md:overflow-x-auto",
    vertical: "grid grid-cols-1 lg:grid-cols-2 "
  };

  // Card wrapper classes based on layout
  const cardWrapperClasses = {
    horizontal: "w-full md:w-80 md:flex-none",
    vertical: "w-full mt-4"
  };

  return (
    <div className={containerBaseClasses}>
      <div className={`${layoutClasses[layout]} gap-6 ${className}`}>
        {tiers.map((tier, index) => (
          <div key={index} className={cardWrapperClasses[layout]}>
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
};