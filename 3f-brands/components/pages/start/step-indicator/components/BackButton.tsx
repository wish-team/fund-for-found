import React from "react";
import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

interface BackButtonProps {
  currentStep: number;
}

export const BackButton: React.FC<BackButtonProps> = ({ currentStep }) => {
  const router = useRouter();

  const handleBack = () => {
    if (currentStep === 1) {
      router.push("/");
    } else {
      router.push(`/steps/${currentStep - 1}`);
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
