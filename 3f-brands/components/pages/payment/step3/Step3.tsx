import React from 'react';

import FaqStep3 from './components/FaqStep3';


const Step3: React.FC<Step3Props> = () => {
  return (
    <div className="grid sm:grid-cols-12 gap-4">
      <div className="sm:col-span-7">
        payment
      </div>
      <div className="sm:col-span-5">
        <FaqStep3 />
      </div>
    </div>
  );
};

export default Step3;