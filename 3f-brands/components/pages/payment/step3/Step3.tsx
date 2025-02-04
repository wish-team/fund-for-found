import React from 'react';
import FaqStep3 from './components/FaqStep3';
import FiatCurrency from './components/FiatCurrency';

const Step3 = () => {
  return (
    <div className="grid sm:grid-cols-12 gap-4 my-6">
      <div className="sm:col-span-7 border rounded-lg shadow">
        <FiatCurrency />
      </div>
      <div className="sm:col-span-5">
        <FaqStep3 />
      </div>
    </div>
  );
};

export default Step3;