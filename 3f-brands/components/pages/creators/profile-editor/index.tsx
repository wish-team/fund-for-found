import React, { useState } from 'react';
import { ProfileImage } from './components/ProfileImage';
import { EditProfileModal } from './components/EditProfileModal';
import { useProfileStore } from './store/profileStore';

const ProfileEditor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const title = 'Wish Work';
  
  const { selectedImage, tempImage, setTempImage, saveImage } = useProfileStore();

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
          title={title}
          onEditClick={handleOpenModal}
        />
        <h2 className="md:text-xl text-sm font-semibold text-gray3 ps-2">{title}</h2>
      </div>

      <EditProfileModal
        isOpen={isOpen}
        onOpenChange={handleModalOpenChange}
        title={title}
        onSave={handleSave}
        onReset={handleReset}
      />
    </div>
  );
};

export default ProfileEditor;