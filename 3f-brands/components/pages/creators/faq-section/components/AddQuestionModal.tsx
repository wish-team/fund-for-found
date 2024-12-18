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
import { AccordionItemUpdate } from '../types/accordion';

interface AddQuestionModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (update: AccordionItemUpdate) => void;
}

export const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  isOpen,
  onOpenChange,
  onSave
}) => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const handleSave = () => {
    onSave({ title, content });
    // Reset inputs
    setTitle('');
    setContent('');
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
              Add New Question
            </ModalHeader>
            <ModalBody>
              <Input
                placeholder="Question"
                value={title}
                className="mt-4 shadow-shadow1 border border-light3 rounded-lg text-sm text-gray3 font-extralight hover:border-purple-500 focus:border-purple-500"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                placeholder="Answer"
                value={content}
                className="mt-4 shadow-shadow1 border border-light3 rounded-lg text-sm text-gray3 font-extralight hover:border-purple-500 focus:border-purple-500"
                onChange={(e) => setContent(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                className="text-gray4 text-sm border border-light3 rounded-lg hover:bg-primary50 hover:border-purple-500"
                color="danger"
                variant="light"
                onPress={onClose}
              >
                Cancel
              </Button>
              <Button
                className="text-white text-sm rounded-lg hover:bg-primary400"
                color="primary"
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