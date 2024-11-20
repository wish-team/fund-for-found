import React from "react";
import { useStep2Form } from "./hooks/useStep2Form";
import { ContentEditor } from "./components/ContentEditor";
import { SocialInputField } from "./components/SocialInputField";
import Title from "../../../shared/Title";
import { Button } from "@nextui-org/react";

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
      <Title title="Detailed info" />
      <h3 className="text-gray3 py-2 font-bold">
        What is the primary mission or objective of your brand/organization?
      </h3>
      <p className="text-light1 font-light">
        Be more specific about it, as it will be published as your deck on the
        3F(150-300 characters). read more
      </p>

      <ContentEditor onContentChange={updateContent} />

      <h3 className="text-gray3 py-2 font-bold">
        Help your contributors find you faster (at least 3 options)
      </h3>
      <p className="text-light1 font-light pb-4">
        Connect your socials so the contributors get to know you better and find
        you faster.
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
          Add social link
        </Button>

        <Button
          onClick={handleSubmit}
          color="secondary"
          variant="solid"
          className="font-light my-4 px-12 bg-primary mb-1 text-white rounded-lg border border-light2 md:w-[250px] w-full"
        >
          Continue
        </Button>
      </section>
    </section>
  );
};

export default Step2;
