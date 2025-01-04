import React from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface ContributeButtonProps {
  tierId: string;
  preview?: boolean;
}

export const ContributeButton: React.FC<ContributeButtonProps> = ({
  tierId,
  preview,
}) => {
  const router = useRouter();

  if (preview) {
    return (
      <Button
        color="primary"
        className="w-full bg-primary text-white rounded-lg mt-4"
        disabled
      >
        Contribute
      </Button>
    );
  }

  return (
    <Button
      color="primary"
      className="w-full bg-primary text-white rounded-lg mt-4"
      onClick={() => router.push(`/payment/${tierId}/1`)} // Updated route
    >
      Contribute
    </Button>
  );
};