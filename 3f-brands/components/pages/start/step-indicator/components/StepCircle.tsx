import React from "react";

interface StepCircleProps {
  isActive: boolean;
  index: number;
  label: string;
}

export const StepCircle: React.FC<StepCircleProps> = ({
  isActive,
  index,
  label,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`
          w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10
          rounded-full
          flex items-center justify-center
          transition-colors duration-200
          ${isActive ? "bg-primary text-white" : "bg-light4 text-light1"}
          text-sm sm:text-base md:text-lg
        `}
      >
        {index}
      </div>
    </div>
  );
};
