// src/components/pages/creators/about/components/ImageUploader.tsx
import React, { useRef, useState } from 'react';
import { Button } from "@nextui-org/react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { useTranslation } from 'react-i18next';

interface ImageUploaderProps {
  currentImage: string;
  onImageChange: (imageUrl: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  currentImage, 
  onImageChange 
}) => {
  const { t } = useTranslation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImageUrl = reader.result as string;
        setImagePreview(newImageUrl);
        onImageChange(newImageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-4 relative">
      <img 
        src={imagePreview || currentImage} 
        alt={t('about.editor.imageUploader.currentImage')} 
        className="w-full h-64 object-cover rounded"
      />
      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden" 
        accept="image/*"
        onChange={handleImageUpload}
      />
      <Button 
        onClick={triggerFileInput}
        color="primary" 
        startContent={<HiOutlinePhotograph />}
        className="absolute bottom-2 right-2 bg-light3 border border-primary200 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
      >
        {t('about.editor.imageUploader.changeImage')}
      </Button>
    </div>
  );
};