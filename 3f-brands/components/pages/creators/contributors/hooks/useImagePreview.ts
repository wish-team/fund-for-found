import { useState } from "react";

export const useImagePreview = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const resetImagePreview = () => {
    setImagePreview(null);
  };

  return { imagePreview, handleImageChange, resetImagePreview };
};
