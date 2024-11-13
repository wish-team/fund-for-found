import React from 'react';
import { TierFormData } from './types/tier';
import { DEFAULT_IMAGE } from './utils/constants';
import { useTierStorage } from './hooks/useTierStorage';
import { useImagePreview } from './hooks/useImagePreview';
import { useTierModal } from './hooks/useTierModal';
import { useDeleteConfirmation } from './hooks/useDeleteConfirmation';
import { AddTierButton } from './components/AddTierButton';
import { TierList } from './components/TierList';
import { TierModal } from './components/TierModal';
import DeleteConfirmationModal from "@/components/shared/DeleteConfirmationModal";
import CreatorsTitle from '../title/CreatorsTitle';

export const TierManagement = () => {
  const { tiers, saveTiers } = useTierStorage();
  const { imagePreview, handleImageChange, resetImagePreview } = useImagePreview();
  const { isOpen, editingIndex, openModal, closeModal, editTier } = useTierModal();
  const { deleteConfirmation, showDeleteConfirmation, hideDeleteConfirmation } = useDeleteConfirmation();

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
    <div className="p-6">
      <div className="max-w-[1048px] mx-auto">
        <CreatorsTitle title='Contribution Tier' />
        <h2 className='ps-2 mx-2 mb-6 text-lg text-gray2 border-s-4 border-primary'>Recurring or One time </h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-80 md:flex-none">
            <AddTierButton onClick={openModal} />
          </div>
          <TierList
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