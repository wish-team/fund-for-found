import React from 'react';
import { BackButton } from './BackButton';
import { StepIndicator } from './StepIndicator';

interface StepLayoutProps {
  currentStep: number;
  children: React.ReactNode;
}

export const StepLayout: React.FC<StepLayoutProps> = ({ currentStep, children }) => {
  return (
    <section >
      <article className="border-b py-4">
        <div className="flex items-center gap-4">
          <BackButton currentStep={currentStep} />
          <StepIndicator currentStep={currentStep} />
        </div>
      </article>
      <div className="mt-8">
        {children}
      </div>
    </section>
  );
};