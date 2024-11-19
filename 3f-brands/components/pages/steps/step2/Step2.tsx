import { useRouter } from "next/router";
import Title from "../../../shared/Title";
import Editor from "../../../shared/editor/Editor";
import { useStep2Form } from "./hooks/useStep2Form";
import { AddSocialBtn } from "./components/AddSocialBtn";
import { SocialInput } from "./components/SocialInput";
import { submitStep2Data } from "./api/step2Api";
import { SOCIAL_MEDIA_OPTIONS } from "./utils/constants";

const Step2: React.FC = () => {
  const router = useRouter();
  const {
    formData,
    updateMission,
    addSocialLink,
    removeSocialLink,
    updateSocialLink,
  } = useStep2Form();

  const handleAddSocial = () => {
    const newSocialLink = {
      id: Date.now(),
      platform: SOCIAL_MEDIA_OPTIONS[0].key,
      url: SOCIAL_MEDIA_OPTIONS[0].baseUrl,
    };
    addSocialLink(newSocialLink);
  };

  const handleSubmit = async () => {
    try {
      await submitStep2Data(formData);
      router.push("/steps/3");
    } catch (error) {
      console.error("Failed to submit form:", error);
      // Handle error (show toast, etc.)
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
        3F (150-300 characters). read more
      </p>
      <Editor onChange={updateMission} value={formData.mission} />

      <h3 className="text-gray3 py-2 font-bold">
        Help your contributors find you faster (at least 3 options)
      </h3>
      <p className="text-light1 font-light pb-4">
        Connect your socials so the contributors get to know you better and find
        you faster.
      </p>

      <AddSocialBtn onAdd={handleAddSocial}>
        {formData.socialLinks.map((link) => (
          <SocialInput
            key={link.id}
            id={link.id}
            value={link}
            onUpdate={updateSocialLink}
            onRemove={removeSocialLink}
          />
        ))}
      </AddSocialBtn>

      <button
        onClick={handleSubmit}
        className="font-light my-4 px-12 bg-primary mb-1 text-white rounded-lg border border-light2 w-[250px]"
      >
        Continue
      </button>
    </section>
  );
};

export default Step2;
