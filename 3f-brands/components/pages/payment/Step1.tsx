import React from 'react';
import { Tier } from '@/components/pages/creators/contributors/types/tier'; // Adjust import path as needed

interface Step1Props {
  tierDetails: Tier;
}

const Step1: React.FC<Step1Props> = ({ tierDetails }) => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-2">{tierDetails.name}</h2>
        <p className="text-gray-600">{tierDetails.rewardDescription}</p>
        <div className="mt-4 text-lg">
          Amount: <span className="text-primary font-semibold">${tierDetails.amount}</span>
        </div>
      </div>
      
      {/* Add your payment form components here */}
      <div className="space-y-6">
        <h3 className="text-xl font-medium">Payment Details</h3>
        {/* Add payment form fields */}
      </div>
    </div>
  );
};

export default Step1;