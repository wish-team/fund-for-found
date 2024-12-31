import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import { useSocialLinks } from '../hooks/useSocialLinks';
import { SocialLinkForm } from './SocialLinkForm';
import { SocialLinkDisplay } from './SocialLinkDisplay';
import { socialLinksSchema, SocialLinksSchema } from '../utils/validation';

const SocialLinkEditor: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { links, setLinks, socialLinks } = useSocialLinks();

  const form = useForm<SocialLinksSchema>({
    resolver: zodResolver(socialLinksSchema),
    defaultValues: {
      socialLinks
    },
    mode: 'onChange'
  });

  const handleSave = (data: SocialLinksSchema) => {
    const newLinks = data.socialLinks.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.type]: curr.url,
      }),
      {}
    );

    setLinks(newLinks);
    onOpenChange();
  };

  // Reset form when modal opens
  const handleOpen = () => {
    form.reset({
      socialLinks: Object.entries(links).map(([type, url]) => ({ type, url }))
    });
    onOpen();
  };

  // Reset form when modal closes without saving
  const handleModalChange = () => {
    if (isOpen) {
      form.reset({
        socialLinks: Object.entries(links).map(([type, url]) => ({ type, url }))
      });
    }
    onOpenChange();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <SocialLinkDisplay links={links} onEditClick={handleOpen} />

      <Modal
        isOpen={isOpen}
        backdrop="blur"
        onOpenChange={handleModalChange}
        size="2xl"
        className='bg-white rounded-xl shadow-shadow1 p-4'
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={form.handleSubmit(handleSave)} noValidate>
              <ModalHeader className='text-gray3 text-base font-bold'>Help your contributors find you faster </ModalHeader>
              <ModalBody>
                <SocialLinkForm form={form} />
              </ModalBody>
              <ModalFooter className='flex justify-between'>
                <Button
                  color="danger"
                  variant="light"
                  className="bg-light3 border border-primary200 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  isDisabled={!form.formState.isValid}
                  className="bg-primary text-white border border-primary200 hover:bg-primary400 rounded-lg text-xs"
                >
                  Save
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SocialLinkEditor;