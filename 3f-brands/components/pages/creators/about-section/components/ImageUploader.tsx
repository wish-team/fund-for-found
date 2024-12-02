// src/components/pages/creators/about/components/ImageUploader.tsx
import React, { useRef, useState } from 'react';
import { Button } from "@nextui-org/react";
import { HiOutlinePhotograph } from "react-icons/hi";

interface ImageUploaderProps {
  currentImage: string;
  onImageChange: (imageUrl: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  currentImage, 
  onImageChange 
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image upload
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

  // Trigger file input when button is clicked
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-4 relative">
      <img 
        src={imagePreview || currentImage} 
        alt="Current Image" 
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
        Change Image
      </Button>
    </div>
  );
};