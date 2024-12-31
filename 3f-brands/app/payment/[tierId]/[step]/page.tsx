// app/payment/[tierId]/[step]/page.tsx
"use client";

import React, { Suspense, useEffect, useState } from "react";
import { StepLayout } from "@/components/pages/start/step-indicator/components/StepLayout";
import { Step } from "@/components/pages/start/step-indicator/types/steps";
import { Tier } from "@/components/pages/creators/contributors/types/tier";

interface PaymentComponentProps {
  tierDetails: Tier;
}

// Pre-load payment step components
const PaymentInfo = React.lazy(
  () => import("@/components/pages/payment/step1/Step1")
);
const Review = React.lazy(() => import("@/components/pages/payment/Step2"));
const Confirmation = React.lazy(
  () => import("@/components/pages/payment/Step3")
);

const PAYMENT_STEPS: Step[] = [
  { label: "Step 1", path: "/payment/1", subLabel: "Payment Details" },
  { label: "Step 2", path: "/payment/2", subLabel: "Review Order" },
  { label: "Step 3", path: "/payment/3", subLabel: "Confirmation" },
];

interface PageProps {
  params: Promise<{
    tierId: string;
    step: string;
  }>;
}

const PaymentPage = ({ params }: PageProps) => {
  const [tierDetails, setTierDetails] = useState<Tier | null>(null);
  const resolvedParams = React.use(params);
  const currentStep = parseInt(resolvedParams.step, 10);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const savedTiers = localStorage.getItem("tiers");
      if (savedTiers) {
        const tiers: Tier[] = JSON.parse(savedTiers);
        const currentTier = tiers.find(
          (tier) => tier.id === resolvedParams.tierId
        );
        if (currentTier) {
          setTierDetails(currentTier);
        }
      }
    }
  }, [resolvedParams.tierId]);

  const renderStepComponent = () => {
    if (!tierDetails) {
      return <div>Loading tier details...</div>;
    }

    const StepComponent = (() => {
      switch (currentStep) {
        case 1:
          return () => <PaymentInfo tierDetails={tierDetails} />;
        case 2:
          return () => <Review tierDetails={tierDetails} />;
        case 3:
          return () => <Confirmation tierDetails={tierDetails} />;
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
    <StepLayout
      currentStep={currentStep}
      steps={PAYMENT_STEPS}
      showSubLabels={true}
    >
      {renderStepComponent()}
    </StepLayout>
  );
};

export default PaymentPage;
