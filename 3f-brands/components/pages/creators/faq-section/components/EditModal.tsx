import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  Input 
} from "@nextui-org/react";
import { AccordionItemType, FAQFormData, faqSchema } from '../types/accordion';

interface EditModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  item: AccordionItemType | null;
  onSave: (update: FAQFormData) => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onOpenChange,
  item,
  onSave
}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FAQFormData>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      title: item?.title || '',
      content: item?.content || ''
    }
  });

  React.useEffect(() => {
    if (item) {
      reset({
        title: item.title,
        content: item.content
      });
    }
  }, [item, reset]);

  const onSubmit = (data: FAQFormData) => {
    onSave(data);
    reset();
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen && item !== null}
      onOpenChange={onOpenChange}
      className="bg-white border shadow-shadow1 p-2 rounded-lg max-w-[400px] sm:max-w-[500px] md:max-w-[715px] lg:max-w-[935px] w-full"
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1 text-gray3">
              Edit Question
            </ModalHeader>
            <ModalBody>
              <div>
                <Input
                  {...register('title')}
                  placeholder="Question"
                  className="mt-4 shadow-shadow1 border border-light3 rounded-lg text-sm text-gray3 font-extralight hover:border-purple-500 focus:border-purple-500"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>
              <div>
                <Input
                  {...register('content')}
                  placeholder="Answer"
                  className="mt-4 shadow-shadow1 border border-light3 rounded-lg text-sm text-gray3 font-extralight hover:border-purple-500 focus:border-purple-500"
                />
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="text-gray4 text-sm border border-light3 rounded-lg hover:bg-primary50 hover:border-purple-500"
                variant="light"
                onPress={() => {
                  reset();
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                className="text-white text-sm rounded-lg hover:bg-primary400"
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};