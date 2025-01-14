import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useTranslation } from "react-i18next";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  cancelText?: string;
  confirmText?: string;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  cancelText,
  confirmText,
}) => {
  const { t } = useTranslation();

  // Use provided text or fallback to translations
  const modalTitle = title || t('common.deleteConfirmation');
  const modalMessage = message || t('common.deleteConfirmationMessage');
  const modalCancelText = cancelText || t('common.cancel');
  const modalConfirmText = confirmText || t('common.delete');

  return (
    <Modal 
      className="shadow border" 
      isOpen={isOpen} 
      onClose={onClose} 
      size="sm"
    >
      <ModalContent className="bg-white rounded-lg shadow p-3">
        <ModalHeader className="text-gray3">{modalTitle}</ModalHeader>
        <ModalBody>
          <p className="text-gray4">{modalMessage}</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="light"
            onClick={onClose}
            className="bg-light4 text-gray4 font-light rounded-lg border border-light2 text-xs hover:border-purple-500 hover:bg-primary50"
          >
            {modalCancelText}
          </Button>
          <Button
            color="primary"
            className="bg-primary text-white border border-primary200 hover:bg-primary400 rounded-lg text-xs"
            onClick={onConfirm}
          >
            {modalConfirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;