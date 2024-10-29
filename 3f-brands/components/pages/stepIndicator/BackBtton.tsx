// components/BackButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

interface BackButtonProps {
  currentStep: number;
}

const BackButton: React.FC<BackButtonProps> = ({ currentStep }) => {
  const router = useRouter();

  const handleBack = () => {
    if (currentStep > 1) {
      router.push(`/steps/${currentStep - 1}`); // Navigate to the previous step
    }
  };

  return (
    <button onClick={handleBack} className="flex items-center ">
      <IoMdArrowRoundBack fontSize='39px' className="mr-2 text-primary" />
    </button>
  );
};

export default BackButton;
