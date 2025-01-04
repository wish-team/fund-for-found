import React from "react";
import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import { TierForm } from "./TierForm";
import { useTierStore } from "../store/tierStore";

export const TierModal: React.FC = () => {
  const { 
    isModalOpen, 
    closeModal, 
    handleSubmit,
    editingIndex,
    imagePreview,
    handleImageChange,
    tiers 
  } = useTierStore();

  const initialValues = editingIndex !== null ? tiers[editingIndex] : undefined;

  return (
    <Modal 
      className="bg-white rounded-lg shadow" 
      isOpen={isModalOpen} 
      backdrop="blur" 
      onClose={closeModal} 
      size="3xl"
    >
      <ModalContent>
        <ModalHeader className="text-xl font-semibold">
          <h2 className="text-primary">
            {editingIndex !== null ? "Edit Tier" : "Add New Tier"}
          </h2>
        </ModalHeader>
        <div className="p-6">
          <TierForm
            onSubmit={handleSubmit}
            onCancel={closeModal}
            initialValues={initialValues}
            imagePreview={imagePreview}
            onImageChange={handleImageChange}
          />
        </div>
      </ModalContent>
    </Modal>
  );
};