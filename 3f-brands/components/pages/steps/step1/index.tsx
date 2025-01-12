import React from "react";
import Title from "../../../shared/Title";
import { FormStep1 } from "./components/FormStep1";
import { useTranslation } from "react-i18next";



const Step1Form: React.FC = () => {
  const {t} = useTranslation()
  return (
    <section className="pb-2 text-start mx-auto max-w-[1024px]">
      <Title titleKey="step1.title" title="Basic Info" />
      <h3 className="text-gray3 py-2 font-bold">
        {t("step1.subTitle")}
      </h3>
      <p className="text-light1 text-justify font-light">
        {t("step1.description")}
      </p>
      <FormStep1 />
    </section>
  );
};

export default Step1Form;
