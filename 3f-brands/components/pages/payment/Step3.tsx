import React from 'react';
import { Tier } from '@/components/pages/creators/contributors/types/tier';

interface Step3Props {
  tierDetails: Tier;
}

const Step3: React.FC<Step3Props> = ({ tierDetails }) => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Payment Confirmation</h2>
      
      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-medium text-green-700 mb-2">Payment Successful!</h3>
        <p className="text-gray-600 mb-2">Thank you for your purchase of {tierDetails.name}</p>
        <div className="text-lg">
          Amount Paid: <span className="font-semibold">${tierDetails.amount}</span>
        </div>
      </div>
      
      {/* Add additional confirmation details here */}
    </div>
  );
};

export default Step3;