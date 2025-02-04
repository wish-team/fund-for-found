import { useState } from "react";
import { Step2FormData, SocialInput } from "../types";

export const useStep2Form = () => {
  const [formData, setFormData] = useState<Step2FormData>({
    socialLinks: [],
  });

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
    updateSocialLinks,
    submitForm,
  };
};