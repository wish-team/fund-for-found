import React from 'react';
import { Tier } from '@/components/pages/creators/contributors/types/tier';

interface Step2Props {
  tierDetails: Tier;
}

const Step2: React.FC<Step2Props> = ({ tierDetails }) => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Review Your Order</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-medium mb-2">{tierDetails.name}</h3>
        <p className="text-gray-600 mb-2">{tierDetails.rewardDescription}</p>
        <div className="text-lg">
          Total Amount: <span className="font-semibold">${tierDetails.amount}</span>
        </div>
      </div>
      
      {/* Add additional review information here */}
    </div>
  );
};

export default Step2;