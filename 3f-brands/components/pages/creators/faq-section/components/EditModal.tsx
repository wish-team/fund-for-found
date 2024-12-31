// src/components/pages/creators/FAQ/components/EditModal.tsx
import React from 'react';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  Input 
} from "@nextui-org/react";
import { AccordionItemType, AccordionItemUpdate } from '../types/accordion';

interface EditModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  item: AccordionItemType;
  onSave: (update: AccordionItemUpdate) => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onOpenChange,
  item,
  onSave
}) => {
  const [title, setTitle] = React.useState(item.title);
  const [content, setContent] = React.useState(item.content);

  const handleSave = () => {
    onSave({ title, content });
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="bg-white border shadow-shadow1 p-2 rounded-lg max-w-[400px] sm:max-w-[500px] md:max-w-[715px] lg:max-w-[935px] w-full"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-gray3">
              Edit Question
            </ModalHeader>
            <ModalBody>
              <Input
                placeholder="Question"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-4 shadow-shadow1 border border-light3 rounded-lg text-sm text-gray3 font-extralight hover:border-purple-500 focus:border-purple-500"
              />
              <Input
                placeholder="Answer"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-4 shadow-shadow1 border border-light3 rounded-lg text-sm text-gray3 font-extralight hover:border-purple-500 focus:border-purple-500"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                className="text-gray4 text-sm border border-light3 rounded-lg hover:bg-primary50 hover:border-purple-500"
                variant="light"
                onPress={onClose}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                className="text-white text-sm rounded-lg hover:bg-primary400"
                onPress={() => {
                  handleSave();
                  onClose(); 
                }}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};