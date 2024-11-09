import React from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@nextui-org/react';
import Image from 'next/image';
import { getFirstLetter, handleImageFileUpload } from '../utils/imageUtils';

interface EditProfileModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  tempImage: string | null;
  title: string;
  onSave: () => void;
  onReset: () => void;
  onImageUpload: (image: string) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onOpenChange,
  tempImage,
  title,
  onSave,
  onReset,
  onImageUpload,
}) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageFileUpload(file, onImageUpload);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      backdrop="blur"
      onOpenChange={onOpenChange}
      size="2xl"
      className="p-6 bg-white rounded-xl shadow-shadow1"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-gray3">Edit profile</h2>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center gap-8">
                <div className="relative rounded-lg overflow-hidden shadow-shadow1 w-32 h-32">
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-primary">
                    {tempImage ? (
                      <Image
                        src={tempImage}
                        alt={getFirstLetter(title)}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-primary200 text-6xl font-extrabold">
                          {getFirstLetter(title)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex w-full justify-between gap-4">
                  <div className="flex gap-4">
                    <Button
                      color="primary"
                      className="bg-primary text-white border border-primary200 hover:bg-primary400 rounded-lg text-xs"
                      onPress={onSave}
                    >
                      Save
                    </Button>
                    <Button
                      variant="bordered"
                      onPress={onReset}
                      className="bg-light3 border border-primary200 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
                    >
                      Reset
                    </Button>
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="imageUpload"
                      onChange={handleImageUpload}
                    />
                    <Button
                      as="label"
                      htmlFor="imageUpload"
                      variant="bordered"
                      className="bg-light3 border border-primary200 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
                    >
                      Upload new image
                    </Button>
                  </div>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};