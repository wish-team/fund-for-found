// components/BrandForm.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import {  Textarea, Card} from '@nextui-org/react';

interface FormData {
  shortSummary: string;
  impact: string;
  story: string;
}

interface FormStep2Props {
  children: React.ReactNode;
}

const BrandForm: React.FC<FormStep2Props> = ({children}) => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    
      <form onSubmit={handleSubmit(onSubmit)}>
        {children}
      </form>
    
  );
};

export default BrandForm;
