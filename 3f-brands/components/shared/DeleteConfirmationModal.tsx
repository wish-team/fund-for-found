import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  cancelText?: string;
  confirmText?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Confirmation",
  message = "This item will be deleted, are you sure?",
  cancelText = "Cancel",
  confirmText = "Delete",
}) => {
  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size="sm">
      <ModalContent className="bg-white rounded-lg shadow p-3">
        <ModalHeader className="text-gray3">{title}</ModalHeader>
        <ModalBody>
          <p className="text-gray4">{message}</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="light"
            onClick={onClose}
            className="bg-light4 text-gray4 font-light rounded-lg border border-light2 text-xs hover:border-purple-500 hover:bg-primary50"
          >
            {cancelText}
          </Button>
          <Button
            color="primary"
            className="bg-primary text-white border border-primary200 hover:bg-primary400 rounded-lg text-xs"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;
