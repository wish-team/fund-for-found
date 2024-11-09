import { useState, useEffect } from 'react';
import { ProfileImage } from '../types';

export const useProfileImage = (initialTitle: string) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [tempImage, setTempImage] = useState<string | null>(null);

  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setSelectedImage(savedImage);
    }
  }, []);

  const saveImage = (image: string | null) => {
    setSelectedImage(image);
    if (image) {
      localStorage.setItem('profileImage', image);
    } else {
      localStorage.removeItem('profileImage');
    }
  };

  return {
    selectedImage,
    tempImage,
    setTempImage,
    saveImage,
  };
};