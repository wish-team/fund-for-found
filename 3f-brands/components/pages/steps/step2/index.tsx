import React from "react";
import { useTranslation } from "react-i18next";
import { useStep2Form } from "./hooks/useStep2Form";
import { SocialInputField } from "./components/SocialInputField";
import Title from "../../../shared/Title";
import { Button } from "@nextui-org/react";
import AboutPage from "../../creators/about-section/AboutPage";

const Step2: React.FC = () => {
  const { t } = useTranslation();
  const { formData, updateSocialLinks, submitForm } = useStep2Form();

  const handleSocialInputAdd = () => {
    const newId = Date.now();
    updateSocialLinks([
      ...formData.socialLinks,
      { id: newId, platform: "instagram", url: "http://instagram.com/" },
    ]);
  };

  const handleSocialInputRemove = (id: number) => {
    updateSocialLinks(formData.socialLinks.filter((link) => link.id !== id));
  };

  const handleSocialInputChange = (
    id: number,
    platform: string,
    url: string
  ) => {
    updateSocialLinks(
      formData.socialLinks.map((link) =>
        link.id === id ? { ...link, platform, url } : link
      )
    );
  };

  const handleSubmit = async () => {
    try {
      await submitForm();
      // Handle successful submission
    } catch (error) {
      // Handle error
    }
  };

  return (
    <section className="py-8 text-start max-w-[1024px]">
      <Title title={t('step2.title')} />
      <h3 className="text-gray3 py-2 font-bold">
        {t('step2.mission.title')}
      </h3>
      <p className="text-light1 font-light">
        {t('step2.mission.description')}
      </p>
      <AboutPage />

      <h3 className="text-gray3 pb-2 pt-8 font-bold">
        {t('step2.social.title')}
      </h3>
      <p className="text-light1 font-light pb-4">
        {t('step2.social.description')}
      </p>

      {formData.socialLinks.map((link) => (
        <SocialInputField
          key={link.id}
          id={link.id}
          onRemove={handleSocialInputRemove}
          onChange={handleSocialInputChange}
        />
      ))}
      <section className="flex flex-col w-full">
        <Button
          onClick={handleSocialInputAdd}
          color="primary"
          variant="bordered"
          className="bg-light4 font-light rounded-lg border border-light2 md:w-[250px] w-full"
        >
          {t('step2.buttons.addSocial')}
        </Button>

        <Button
          onClick={handleSubmit}
          color="secondary"
          variant="solid"
          className="font-light my-4 px-12 bg-primary mb-1 text-white rounded-lg border border-light2 md:w-[250px] w-full"
        >
          {t('step2.buttons.continue')}
        </Button>
      </section>
    </section>
  );
};

export default Step2;