import React from "react";
import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import { TierForm } from "./TierForm";
import { TierFormData } from "../types/tier";

interface TierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TierFormData) => void;
  initialValues?: Partial<TierFormData>;
  imagePreview: string | null;
  onImageChange: (file: File) => void;
  editingIndex: number | null;
}

export const TierModal: React.FC<TierModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  imagePreview,
  onImageChange,
  editingIndex,
}) => (
  <Modal className="bg-white rounded-lg shadow" isOpen={isOpen} backdrop="blur" onClose={onClose} size="3xl">
    <ModalContent>
      <ModalHeader className="text-xl font-semibold">
        <h2 className="text-primary">
          {editingIndex !== null ? "Edit Tier" : "Add New Tier"}
        </h2>
      </ModalHeader>
      <div className="p-6">
        <TierForm
          onSubmit={onSubmit}
          onCancel={onClose}
          initialValues={initialValues}
          imagePreview={imagePreview}
          onImageChange={onImageChange}
        />
      </div>
    </ModalContent>
  </Modal>
);
