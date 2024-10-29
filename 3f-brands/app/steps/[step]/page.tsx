'use client';

import React from 'react';
import StepIndicator from "@/components/pages/stepIndicator/Stepindicator";
import BackButton from "@/components/pages/stepIndicator/BackBtton"; 

interface IndexProps {
  params: Promise<{
    step: string;
  }>;
}

const Index: React.FC<IndexProps> = ({ params }) => {
  const { step } = React.use(params); // Unwrap the params

  const currentStep = parseInt(step, 10);

  return (
    <>
      <div className='flex items-center shadow w-screen px-12'>
        <BackButton currentStep={currentStep} /> 
        <StepIndicator currentStep={currentStep} />
      </div>
      
      <h1>{`This is Step ${currentStep}`}</h1>
    </>
  );
};

export default Index;
