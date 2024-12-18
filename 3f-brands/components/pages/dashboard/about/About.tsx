import React from "react";
import { useStep2Form } from "../../steps/step2/hooks/useStep2Form";
import { ContentEditor } from "../../steps/step2/components/ContentEditor";
import { SocialInputField } from "../../steps/step2/components/SocialInputField";
import Title from "../../../shared/Title";
import { Button } from "@nextui-org/react";
import CreatorsTitle from "../../creators/title/CreatorsTitle";
import AboutPage from "../../creators/about-section/AboutPage";

const Step2: React.FC = () => {
  const { formData, updateContent, updateSocialLinks, submitForm } =
    useStep2Form();

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
      {/* <CreatorsTitle title="About" />
      <h3 className="text-gray3 py-2 font-bold">
      Tell people why they should be exited for backing your brand. tell about your story, your plan and any thing that may encourage them to contribute.
      </h3> */}
      {/* <ContentEditor onContentChange={updateContent} /> */}
      <AboutPage />

    </section>
  );
};

export default Step2;
