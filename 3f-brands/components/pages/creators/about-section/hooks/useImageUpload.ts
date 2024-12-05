// src/components/pages/creators/about/hooks/useImageUpload.ts
import { useState, useRef, useCallback } from "react";

export const useImageUpload = (
  onImageSelected?: (imageUrl: string) => void
) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newImageUrl = reader.result as string;
          setImagePreview(newImageUrl);
          onImageSelected?.(newImageUrl);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageSelected]
  );

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return {
    imagePreview,
    fileInputRef,
    handleImageUpload,
    triggerFileInput,
    setImagePreview,
  };
};
