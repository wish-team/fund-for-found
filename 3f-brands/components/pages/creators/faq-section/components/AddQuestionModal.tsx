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
import { FAQFormData, faqSchema } from '../types/accordion';
import { useTranslation } from 'react-i18next';


interface AddQuestionModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (update: FAQFormData) => void;
}

export const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  isOpen,
  onOpenChange,
  onSave
}) => {
  const { t, i18n } = useTranslation();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FAQFormData>({
    resolver: zodResolver(faqSchema)
  });

  const isRTL = i18n.language === 'fa';
  const containerDirection = isRTL ? 'rtl' : 'ltr';

  const onSubmit = (data: FAQFormData) => {
    onSave(data);
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className={`bg-white border shadow-shadow1 p-2 rounded-lg max-w-[400px] sm:max-w-[500px] md:max-w-[715px] lg:max-w-[935px] w-full ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)} dir={containerDirection}>
            <ModalHeader className="flex flex-col gap-1 text-gray3">
              {t('translation:faq.modal.addTitle')}
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div>
                  <Input
                    {...register('title')}
                    placeholder={t('translation:faq.modal.questionPlaceholder')}
                    classNames={{
                      input: isRTL ? 'text-right' : 'text-left',
                      inputWrapper: 'mt-4 shadow-shadow1 border border-light3 rounded-lg hover:border-purple-500 focus:border-purple-500'
                    }}
                    className="text-sm text-gray3 font-extralight"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {t('translation:faq.validation.questionRequired')}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    {...register('content')}
                    placeholder={t('translation:faq.modal.answerPlaceholder')}
                    classNames={{
                      input: isRTL ? 'text-right' : 'text-left',
                      inputWrapper: 'mt-4 shadow-shadow1 border border-light3 rounded-lg hover:border-purple-500 focus:border-purple-500'
                    }}
                    className="text-sm text-gray3 font-extralight"
                  />
                  {errors.content && (
                    <p className="text-red-500 text-sm mt-1">
                      {t('translation:faq.validation.answerRequired')}
                    </p>
                  )}
                </div>
              </div>
            </ModalBody>
            <ModalFooter className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
              <Button
                className="text-gray4 text-sm border border-light3 rounded-lg hover:bg-primary50 hover:border-purple-500"
                variant="light"
                onPress={() => {
                  reset();
                  onClose();
                }}
              >
                {t('translation:faq.modal.cancel')}
              </Button>
              <Button
                type="submit"
                color="primary"
                className="text-white text-sm rounded-lg hover:bg-primary400"
              >
                {t('translation:faq.modal.save')}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};