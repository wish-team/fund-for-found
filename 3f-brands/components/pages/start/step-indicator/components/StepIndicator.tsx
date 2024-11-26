import React from "react";
import { STEPS } from "../utils/constants";
import { StepCircle } from "./StepCircle";

interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
}) => {
  // Calculate progress width to reach exactly the current step
  const progressWidth = ((currentStep - 1) * (100 / (STEPS.length - 1))) + '%';

  return (
    <div className="flex-grow">
      <div className="flex items-center justify-center relative">
        {/* Progress bar background */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-light4 -translate-y-1/2" />

        {/* Step circles */}
        <div className="flex justify-between w-full max-w-2xl px-4 relative">
          {STEPS.map((step, index) => (
            <StepCircle
              key={index}
              isActive={index + 1 <= currentStep}
              index={index + 1}
              label={step.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;