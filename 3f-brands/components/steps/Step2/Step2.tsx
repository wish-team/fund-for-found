// /components/steps/Step1.tsx
import React from 'react';
import Title from '../../shared/Title';
import AddSocialBtn from './AddSocialBtn';
import Editor from '../../shared/editor/Editor';

const Step1: React.FC = () => {
  return (
    <section className='py-8 text-start w-screen max-w-[1024px] '>
      <Title title='Detailed info' />
      <h3 className='text-gray3 py-2 font-bold'>What is the primary mission or objective of your brand/organization?</h3>
      <p className='text-light1 font-light'>Be more specific about it, as it will be published as your deck on the 3F(150-300 characters). read more</p>
      <Editor />
      <h3 className='text-gray3 py-2 font-bold'>Help your contributors find you faster (at least 3 options)</h3>
      <p className='text-light1 font-light pb-4'>Connect your socials so the contributors get to know you better and find you faster. </p>
      <AddSocialBtn />
    </section>
  );
};

export default Step1;