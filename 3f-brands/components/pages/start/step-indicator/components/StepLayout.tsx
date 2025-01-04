import React from 'react';
import { BackButton } from './BackButton';
import { StepIndicator } from './StepIndicator';
import { Step } from '../types/steps';

interface StepLayoutProps {
  currentStep: number;
  steps: Step[];  // Add this new prop
  showSubLabels?: boolean;  // Add this new prop
  children: React.ReactNode;
}

export const StepLayout: React.FC<StepLayoutProps> = ({ 
  currentStep, 
  steps,
  showSubLabels = false,
  children 
}) => {
  return (
    <section>
      <article className="border-b py-4">
        <div className="flex items-center gap-4">
          <BackButton currentStep={currentStep} />
          <StepIndicator 
            currentStep={currentStep} 
            steps={steps}
            showSubLabels={showSubLabels}
          />
        </div>
      </article>
      <div className="mt-8">
        {children}
      </div>
    </section>
  );
};