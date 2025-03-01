import React from "react";
import { Step } from "../types/steps";
import { StepCircle } from "./StepCircle";

interface StepIndicatorProps {
  currentStep: number;
  steps: Step[];  
  showSubLabels?: boolean;  
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  steps,
  showSubLabels = false
}) => {
  const progressWidth = ((currentStep - 1) * (100 / (steps.length - 1))) + '%';

  return (
    <div className="flex-grow">
      <div className="flex items-center justify-center relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-light4 -translate-y-1/2" />
        <div className="flex justify-between w-full max-w-2xl px-4 relative">
          {steps.map((step, index) => (
            <StepCircle
              key={index}
              isActive={index + 1 <= currentStep}
              index={index + 1}
              label={step.subLabel}
              showSubLabel={showSubLabels}
            />
          ))}
        </div>
      </div>
    </div>
  );
};