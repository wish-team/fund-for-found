import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";


interface BackButtonProps {
  currentStep: number;
}

export const BackButton: React.FC<BackButtonProps> = ({ currentStep }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    // Check if we're in the payment flow
    if (pathname.includes('/payment/')) {
      // Extract tierId from the current path
      const pathParts = pathname.split('/');
      const tierId = pathParts[pathParts.length - 2]; // Gets tierId from /payment/[tierId]/[step]
      
      if (currentStep === 1) {
        router.push("/"); // Or wherever you want to redirect from the first payment step
      } else {
        router.push(`/payment/${tierId}/${currentStep - 1}`);
      }
    } else {
      // Original steps flow
      if (currentStep === 1) {
        router.push("/");
      } else {
        router.push(`/steps/${currentStep - 1}`);
      }
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
      aria-label={currentStep === 1 ? "Go to home page" : "Go to previous step"}
    >
      <IoMdArrowRoundBack className="text-primary w-6 h-6 md:w-8 md:h-8" />
    </button>
  );
};