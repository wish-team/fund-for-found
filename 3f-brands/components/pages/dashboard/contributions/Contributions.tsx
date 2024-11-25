import React from "react";
import { TierFormData } from "../../creators/contributors/types/tier";
import { DEFAULT_IMAGE } from "../../creators/contributors/utils/constants";
import { useTierStorage } from "../../creators/contributors/hooks/useTierStorage";
import { useImagePreview } from "../../creators/contributors/hooks/useImagePreview";
import { useTierModal } from "../../creators/contributors/hooks/useTierModal";
import { useDeleteConfirmation } from "../../creators/contributors/hooks/useDeleteConfirmation";
import { AddTierButton } from "../../creators/contributors/components/AddTierButton";
import { TierList } from "../../creators/contributors/components/TierList";
import { TierModal } from "../../creators/contributors/components/TierModal";
import DeleteConfirmationModal from "@/components/shared/DeleteConfirmationModal";
import CreatorsTitle from "../../creators/title/CreatorsTitle";

export const Contributions = () => {
  const { tiers, saveTiers } = useTierStorage();
  const { imagePreview, handleImageChange, resetImagePreview } =
    useImagePreview();
  const { isOpen, editingIndex, openModal, closeModal, editTier } =
    useTierModal();
  const { deleteConfirmation, showDeleteConfirmation, hideDeleteConfirmation } =
    useDeleteConfirmation();

  const handleSubmit = (data: TierFormData) => {
    const newTiers = [...tiers];
    const submissionData = {
      name: data.name,
      rewardDescription: data.rewardDescription,
      amount: data.amount,
      imagePreview: imagePreview || DEFAULT_IMAGE,
    };

    if (editingIndex !== null) {
      newTiers[editingIndex] = submissionData;
    } else {
      newTiers.push(submissionData);
    }

    saveTiers(newTiers);
    closeModal();
    resetImagePreview();
  };

  const handleEdit = (index: number) => {
    const tier = editTier(index, tiers[index]);
    handleImageChange(tier.imagePreview as unknown as File);
  };

  const handleDelete = (index: number) => {
    showDeleteConfirmation(index);
  };

  const confirmDelete = () => {
    if (deleteConfirmation.index !== null) {
      const newTiers = tiers.filter((_, i) => i !== deleteConfirmation.index);
      saveTiers(newTiers);
    }
    hideDeleteConfirmation();
  };

  const handleModalClose = () => {
    closeModal();
    resetImagePreview();
  };

  return (
    <div className="md:p-6">
      <div className="">
        <CreatorsTitle title="Contribution Tier" />
        <div className="">
          <div className="">
            <AddTierButton onClick={openModal} />
          </div>
          <TierList
            layout="vertical"
            tiers={tiers}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <TierModal
        isOpen={isOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
        initialValues={editingIndex !== null ? tiers[editingIndex] : undefined}
        imagePreview={imagePreview}
        onImageChange={handleImageChange}
        editingIndex={editingIndex}
      />

      <DeleteConfirmationModal
        isOpen={deleteConfirmation.show}
        onClose={hideDeleteConfirmation}
        onConfirm={confirmDelete}
        title="Delete Tier"
        message="This tier will be deleted. Are you sure you want to proceed?"
      />
    </div>
  );
};
