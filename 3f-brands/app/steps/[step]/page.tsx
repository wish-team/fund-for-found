"use client";

// import React from "react";
// import StepIndicator from "@/components/pages/stepIndicator/Stepindicator";
// import BackButton from "@/components/pages/stepIndicator/BackBtton";

// // step components
// import Step1 from "@/components/steps/step1/Step1";
// import Step2 from "@/components/steps/Step2/Step2";
// import Step3 from "@/components/steps/Step3";
// import Step4 from "@/components/steps/Step4";

// interface IndexProps {
//   params: Promise<{
//     step: string;
//   }>;
// }

// const Index: React.FC<IndexProps> = ({ params }) => {
//   const { step } = React.use(params); // Unwrap the params

//   const currentStep = parseInt(step, 10);

//   // Function to render the appropriate component based on the current step
//   const renderStepComponent = () => {
//     switch (currentStep) {
//       case 1:
//         return <Step1 />;
//       case 2:
//         return <Step2 />;
//       case 3:
//         return <Step3 />;
//       case 4:
//         return <Step4 />;
//       default:
//         return <h1>Step not found</h1>; // Fallback for invalid steps
//     }
//   };

//   return (
//     <section>
//       <article className="flex items-center border-b">
//         <BackButton currentStep={currentStep} />
//         <StepIndicator currentStep={currentStep} />
//       </article>
      
//       {/* {renderStepComponent()}{" "} */}
//       {/* Render the component based on the current step */}
//     </section>
//   );
// };

// export default Index;




import React from 'react';
import { StepLayout } from '@/components/pages/start/step-indicator/components/StepLayout';
import Step1 from '@/components/steps/step1/Step1';
import Step2 from '@/components/steps/Step2/Step2';
import Step3 from '@/components/steps/Step3';
import Step4 from '@/components/steps/Step4';

interface PageProps {
  params: Promise<{
    step: string;
  }>;
}

const Index: React.FC<PageProps> = ({ params }) => {
  const resolvedParams = React.use(params); // Unwrap the Promise
  const currentStep = parseInt(resolvedParams.step, 10);

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
        return <div>Step not found</div>;
    }
  };

  return (
    <StepLayout currentStep={currentStep}>
      {renderStepComponent()}
    </StepLayout>
  );
};

// Add "use client" directive since we're using React.use
export default Index;
