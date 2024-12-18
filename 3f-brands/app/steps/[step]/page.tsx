"use client";

import React from "react";
import { StepLayout } from "@/components/pages/start/step-indicator/components/StepLayout";
import Step3 from "@/components/pages/steps/Step3";
import Step4 from "@/components/pages/steps/Step4";
import Step1Form from "@/components/pages/steps/step1";
import Step2 from "@/components/pages/steps/step2";

interface PageProps {
  params: Promise<{
    step: string;
  }>;
}

const Index: React.FC<PageProps> = ({ params }) => {
  const resolvedParams = React.use(params);
  const currentStep = parseInt(resolvedParams.step, 10);

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <Step1Form />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <StepLayout currentStep={currentStep}>{renderStepComponent()}</StepLayout>
  );
};

export default Index;
