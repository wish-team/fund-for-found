import { useState, useEffect } from 'react';

// Add a custom event for profile image updates
const PROFILE_IMAGE_UPDATE = 'profileImageUpdate';

export const useProfileImage = (initialTitle: string) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [tempImage, setTempImage] = useState<string | null>(null);

  // Listen for profile image updates
  useEffect(() => {
    const handleImageUpdate = () => {
      const savedImage = localStorage.getItem('profileImage');
      setSelectedImage(savedImage);
    };

    // Initial load
    handleImageUpdate();

    // Listen for updates
    window.addEventListener(PROFILE_IMAGE_UPDATE, handleImageUpdate);
    return () => {
      window.removeEventListener(PROFILE_IMAGE_UPDATE, handleImageUpdate);
    };
  }, []);

  const saveImage = (image: string | null) => {
    setSelectedImage(image);
    if (image) {
      localStorage.setItem('profileImage', image);
    } else {
      localStorage.removeItem('profileImage');
    }
    // Dispatch event to notify other components
    window.dispatchEvent(new Event(PROFILE_IMAGE_UPDATE));
  };

  return {
    selectedImage,
    tempImage,
    setTempImage,
    saveImage,
  };
};