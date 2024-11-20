import { useState } from "react";
import { Step2FormData, EditorData, SocialInput } from "../types";

export const useStep2Form = () => {
  const [formData, setFormData] = useState<Step2FormData>({
    content: {} as EditorData,
    socialLinks: [],
  });

  const updateContent = (content: EditorData) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const updateSocialLinks = (links: SocialInput[]) => {
    setFormData((prev) => ({ ...prev, socialLinks: links }));
  };

  const submitForm = async () => {
    try {
      const response = await fetch("/api/steps/2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      return await response.json();
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };

  return {
    formData,
    updateContent,
    updateSocialLinks,
    submitForm,
  };
};
