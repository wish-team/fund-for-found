// /components/steps/Step1.tsx
import React from 'react';
import Title from '../shared/Title';

const Step1: React.FC = () => {
  return (
    <section className='py-8 text-start w-screen max-w-[1024px] '>
      <Title title='Basic Info' />
      <h3 className='text-gray3 py-2 font-bold'>Tell about your Brand/organization</h3>
      <p className='text-gray3 font-light'>Provide an overview of the brand or organization you want to register on 3F.</p>
    </section>
  );
};

export default Step1;
