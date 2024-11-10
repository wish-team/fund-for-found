import React, { useRef, useCallback, memo } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { Pencil } from 'lucide-react';
import { CoverImageEditorProps } from '../types';
import { DEFAULT_IMAGE, ACCEPTED_IMAGE_TYPES } from '../utils/constants';
import { useImageEditor } from '../hooks/useImageEditor';
import { ImagePreview } from './ImagePreview';
import { ZoomControl } from './ZoomControl';

export const CoverImageEditor: React.FC<CoverImageEditorProps> = ({
  defaultImage = DEFAULT_IMAGE,
  defaultTitle = "Brand or Organization",
  onSave,
  className = "",
  maxSizeMB = 5,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const {
    isOpen,
    currentImage,
    currentTitle,
    currentZoom,
    tempImage,
    tempTitle,
    tempZoom,
    isEditingTitle,
    error,
    setTempZoom,
    setTempTitle,
    setIsEditingTitle,
    handleOpenModal,
    handleCloseModal,
    handleSave,
    handleReset,
    handleImageChange,
  } = useImageEditor({
    defaultImage,
    defaultTitle,
    maxSizeMB,
    onSave,
  });

  const handleTitleClick = useCallback(() => {
    setIsEditingTitle(true);
    setTimeout(() => {
      titleInputRef.current?.focus();
    }, 0);
  }, [setIsEditingTitle]);

  const handleTitleBlur = useCallback(() => {
    setIsEditingTitle(false);
  }, [setIsEditingTitle]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageChange(event.target.files?.[0]);
  };

  return (
    <>
      <div className="relative my-2">
        <ImagePreview
          imageUrl={currentImage}
          imageZoom={currentZoom}
          title={currentTitle}
        />

        <Button
          onPress={handleOpenModal}
          className="absolute top-4 right-4 bg-light3 border border-primary200 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
          color="primary"
          variant="flat"
          startContent={<Pencil size={16} />}
        >
          Edit cover
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        size="2xl"
        backdrop="blur"
        scrollBehavior="inside"
        className="bg-white max-w-[800px] rounded-xl shadow-shadow1"
      >
        <ModalContent>
          <ModalHeader className="text-center text-gray3">
            Add cover image
          </ModalHeader>

          <ModalBody>
            <ImagePreview
              imageUrl={tempImage}
              imageZoom={tempZoom}
              title={tempTitle}
              isModal
              isEditingTitle={isEditingTitle}
              onTitleClick={handleTitleClick}
              onTitleChange={setTempTitle}
              onTitleBlur={handleTitleBlur}
              titleInputRef={titleInputRef}
            />

            {error && <div className="text-danger text-sm mt-2">{error}</div>}

            <ZoomControl
              value={tempZoom}
              onChange={setTempZoom}
            />
          </ModalBody>

          <ModalFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button
                color="secondary"
                onPress={handleSave}
                className="bg-primary text-white border border-primary200 hover:bg-primary400 rounded-lg text-xs"
              >
                Save
              </Button>
              <Button
                variant="bordered"
                className="bg-light3 border border-primary200 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
                onPress={handleReset}
              >
                Reset
              </Button>
            </div>
            <Button
              variant="bordered"
              className="bg-light3 border border-primary200 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
              onPress={() => fileInputRef.current?.click()}
            >
              Upload new image
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_IMAGE_TYPES.join(",")}
              onChange={handleFileChange}
              className="hidden"
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default memo(CoverImageEditor);