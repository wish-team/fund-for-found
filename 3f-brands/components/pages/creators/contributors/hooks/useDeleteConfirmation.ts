import { useState } from 'react';

interface DeleteConfirmationState {
  show: boolean;
  index: number | null;
}

export const useDeleteConfirmation = () => {
  const [deleteConfirmation, setDeleteConfirmation] = useState<DeleteConfirmationState>({
    show: false,
    index: null,
  });

  const showDeleteConfirmation = (index: number) => {
    setDeleteConfirmation({ show: true, index });
  };

  const hideDeleteConfirmation = () => {
    setDeleteConfirmation({ show: false, index: null });
  };

  return {
    deleteConfirmation,
    showDeleteConfirmation,
    hideDeleteConfirmation,
  };
};