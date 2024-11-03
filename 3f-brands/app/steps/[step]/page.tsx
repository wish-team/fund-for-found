"use client";

import React from "react";
import StepIndicator from "@/components/pages/stepIndicator/Stepindicator";
import BackButton from "@/components/pages/stepIndicator/BackBtton";

// Import your step components
import Step1 from "@/components/steps/step1/Step1";
import Step2 from "@/components/steps/Step2/Step2";
import Step3 from "@/components/steps/Step3";
import Step4 from "@/components/steps/Step4";

interface IndexProps {
  params: Promise<{
    step: string;
  }>;
}

const Index: React.FC<IndexProps> = ({ params }) => {
  const { step } = React.use(params); // Unwrap the params

  const currentStep = parseInt(step, 10);

  // Function to render the appropriate component based on the current step
  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      default:
        return <h1>Step not found</h1>; // Fallback for invalid steps
    }
  };

  return (
    <>
      <div className="flex items-center shadow w-screen px-12">
        <BackButton currentStep={currentStep} />
        <StepIndicator currentStep={currentStep} />
      </div>
      {renderStepComponent()}{" "}
      {/* Render the component based on the current step */}
    </>
  );
};

export default Index;
