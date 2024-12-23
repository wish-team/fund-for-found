import React from "react";
import Title from "../../../shared/Title";
import { FormStep1 } from "./components/FormStep1";



const Step1Form: React.FC = () => {
  return (
    <section className="pb-2 text-start mx-auto max-w-[1024px]">
      <Title title="Basic Info" />
      <h3 className="text-gray3 py-2 font-bold">
        Tell about your Brand/organization
      </h3>
      <p className="text-light1 text-justify font-light">
        Provide an overview of the brand or organization you want to register on
        3F.
      </p>
      <FormStep1 />
    </section>
  );
};

export default Step1Form;
