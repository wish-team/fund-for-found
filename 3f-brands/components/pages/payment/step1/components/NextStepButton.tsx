import { memo } from "react";
import { Button } from "@nextui-org/react";
import { FaArrowRight } from "react-icons/fa6";

interface NextStepButtonProps {
  onClick: () => void;
  className?: string;
  isLoading?: boolean;
}

export const NextStepButton = memo(function NextStepButton({ 
  onClick,
  className = "",
  isLoading = false
}: NextStepButtonProps) {
  return (
    <div className={`flex justify-center mt-8 ${className}`}>
      <Button
        onPress={onClick}
        className="bg-primary text-white px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-colors"
        isLoading={isLoading}
        disabled={isLoading}
      >
        <span>Next step</span>
        <FaArrowRight aria-hidden="true" />
      </Button>
    </div>
  );
});