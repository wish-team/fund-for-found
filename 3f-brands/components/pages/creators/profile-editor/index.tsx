import React, { useState } from 'react';
import { ProfileImage } from './components/ProfileImage';
import { EditProfileModal } from './components/EditProfileModal';
import { useProfileImage } from './hooks/useProfileImage';

const ProfileEditor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const title = 'Wish Work';
  
  const { selectedImage, tempImage, setTempImage, saveImage } = useProfileImage(title);

  const handleOpenModal = () => {
    setTempImage(selectedImage);
    setIsOpen(true);
  };

  const handleSave = () => {
    if (tempImage !== selectedImage) {
      saveImage(tempImage);
    }
    setIsOpen(false);
  };

  const handleReset = () => {
    setTempImage(null);
  };

  const handleModalOpenChange = (open: boolean) => {
    if (!open) {
      setTempImage(selectedImage);
    }
    setIsOpen(open);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-3">
        <ProfileImage
          image={selectedImage}
          title={title}
          onEditClick={handleOpenModal}
        />
        <h2 className="text-xl font-semibold text-gray3 ps-2">{title}</h2>
      </div>

      <EditProfileModal
        isOpen={isOpen}
        onOpenChange={handleModalOpenChange}
        tempImage={tempImage}
        title={title}
        onSave={handleSave}
        onReset={handleReset}
        onImageUpload={setTempImage}
      />
    </div>
  );
};

export default ProfileEditor;