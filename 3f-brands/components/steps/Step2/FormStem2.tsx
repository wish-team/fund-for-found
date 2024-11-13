// components/BrandForm.tsx

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import Link from "next/link";


interface FormData {
  shortSummary: string;
  impact: string;
  story: string;
}

interface FormStep2Props {
  children: React.ReactNode;
}

const BrandForm: React.FC<FormStep2Props> = ({ children }) => {
  const { register, handleSubmit } = useForm<FormData>();

  
  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {children}
      <Link href="/steps/3">
          <Button
            color="secondary"
            variant="solid"
            className="font-light my-4 px-12 bg-primary mb-1 text-white rounded-lg border border-light2 w-[250px]"
          >
            Continue
          </Button>
        </Link>
    </form>
  );
};

export default BrandForm;
