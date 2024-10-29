'use client';

import Stepindicator from "@/components/pages/stepIndicator/Stepindicator";

// app/steps/[step]/page.jsx
const Index = ({ params }) => {
  const { step } = params; // Access the step parameter from params

  return (
    <div>
      <Stepindicator currentStep={parseInt(step, 10)} />
      <h1>{`This is Step ${step}`}</h1>
      {/* Add your content for the step here */}
    </div>
  );
};

export default Index;

