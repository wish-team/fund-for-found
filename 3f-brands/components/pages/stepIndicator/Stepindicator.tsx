'use client';

import StepCircle from './StepCircle';

const steps: string[] = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center shadow w-screen pb-4">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <StepCircle isActive={index + 1 <= currentStep} index={index + 1} />
          <div className="text-center">{step}</div>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
