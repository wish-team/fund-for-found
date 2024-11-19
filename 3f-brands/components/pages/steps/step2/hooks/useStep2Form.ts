import { useState } from "react";
import { Step2FormData, SocialInputData } from "../types";

export const useStep2Form = () => {
  const [formData, setFormData] = useState<Step2FormData>({
    mission: "",
    socialLinks: [],
  });

  const updateMission = (content: string) => {
    setFormData((prev) => ({ ...prev, mission: content }));
  };

  const addSocialLink = (socialLink: SocialInputData) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, socialLink],
    }));
  };

  const removeSocialLink = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((link) => link.id !== id),
    }));
  };

  const updateSocialLink = (id: number, data: Partial<SocialInputData>) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link) =>
        link.id === id ? { ...link, ...data } : link
      ),
    }));
  };

  return {
    formData,
    updateMission,
    addSocialLink,
    removeSocialLink,
    updateSocialLink,
  };
};
