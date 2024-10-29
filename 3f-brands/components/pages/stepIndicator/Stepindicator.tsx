'use client';

import StepCircle from './StepCircle';

const steps: string[] = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="flex flex-grow items-center justify-center pb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center min-w-20">
          <StepCircle isActive={index + 1 <= currentStep} index={index + 1} />
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
