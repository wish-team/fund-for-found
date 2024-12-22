"use client";

import React, { Suspense } from "react";
import { StepLayout } from "@/components/pages/start/step-indicator/components/StepLayout";

// Pre-load step components
const Step1Form = React.lazy(() => import("@/components/pages/steps/step1"));
const Step2 = React.lazy(() => import("@/components/pages/steps/step2"));
const Step3 = React.lazy(() => import("@/components/pages/steps/Step3"));
const Step4 = React.lazy(() => import("@/components/pages/steps/Step4"));

interface PageProps {
  params: Promise<{
    step: string;
  }>;
}

const Index: React.FC<PageProps> = ({ params }) => {
  const resolvedParams = React.use(params);
  const currentStep = parseInt(resolvedParams.step, 10);

  const renderStepComponent = () => {
    const StepComponent = (() => {
      switch (currentStep) {
        case 1:
          return Step1Form;
        case 2:
          return Step2;
        case 3:
          return Step3;
        case 4:
          return Step4;
        default:
          return () => <div>Step not found</div>;
      }
    })();

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <StepComponent />
      </Suspense>
    );
  };

  return (
    <StepLayout currentStep={currentStep}>{renderStepComponent()}</StepLayout>
  );
};

export default Index;
