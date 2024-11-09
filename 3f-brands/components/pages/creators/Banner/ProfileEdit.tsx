"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";
import Image from "next/image";
import { BsPencil } from "react-icons/bs";

const ProfileEditor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const title = "Wish Work";

  const getFirstLetter = (text: string) => text.trim()[0].toUpperCase() || "W";

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setSelectedImage(savedImage);
    }
  }, []);

  const handleOpenModal = () => {
    setTempImage(selectedImage);
    setIsOpen(true);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (tempImage !== selectedImage) {
      setSelectedImage(tempImage);
      if (tempImage) {
        localStorage.setItem("profileImage", tempImage);
      } else {
        localStorage.removeItem("profileImage");
      }
    }
    setIsOpen(false);
  };

  const handleReset = () => {
    setTempImage(null);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-3">
        {/* Profile Image Container with Overlay Edit Button */}
        <div className="relative  w-32 h-32 group">
          {/* Background Square */}
          <div className="absolute inset-0 bg-primary rounded-2xl"></div>

          {/* Image or Default Letter */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            {selectedImage ? (
              <Image
                src={selectedImage}
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

          {/* Overlay Edit Button */}
          <button
            onClick={handleOpenModal}
            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl"
          >
            <div className="flex justify-center bg-light4 px-4 py-2 rounded-lg text-purple-500 border-purple-500 gap-2">
              <BsPencil />
              <span className="text-sm">Edit</span>
            </div>
          </button>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray3 ps-2">{title}</h2>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isOpen}
        backdrop="blur"
        onOpenChange={(open) => {
          if (!open) {
            setTempImage(selectedImage);
          }
          setIsOpen(open);
        }}
        size="2xl"
        className="p-6 bg-white rounded-xl shadow-shadow1 "
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold text-gray3">Edit profile</h2>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center gap-8">
                  {/* Profile Image Preview */}
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

                  {/* Buttons Container */}
                  <div className="flex w-full justify-between gap-4">
                    {/* Left side buttons */}
                    <div className="flex gap-4">
                      <Button
                        color="primary"
                        className="bg-primary text-white border border-primary200 hover:bg-primary400 rounded-lg text-xs"
                        onPress={handleSave}
                      >
                        Save
                      </Button>
                      <Button
                        variant="bordered"
                        onPress={handleReset}
                        className="bg-light3 border border-primary200 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
                      >
                        Reset
                      </Button>
                    </div>

                    {/* Right side upload button */}
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
    </div>
  );
};

export default ProfileEditor;