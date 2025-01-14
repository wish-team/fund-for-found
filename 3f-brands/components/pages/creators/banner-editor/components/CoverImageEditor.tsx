// CoverImageEditor.tsx
import React, { useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Pencil } from "lucide-react";
import { CoverImageEditorProps } from "../types";
import { ACCEPTED_IMAGE_TYPES } from "../utils/constants";
import { ImagePreview } from "./ImagePreview";
import { ZoomControl } from "./ZoomControl";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { useBannerStore } from "../store/bannerStore";
import { useTranslation } from "react-i18next";

export const CoverImageEditor: React.FC<CoverImageEditorProps> = ({
  maxSizeMB = 5,
  onSave,
}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const {
    image,
    title,
    zoom,
    isEditing,
    error,
    tempImage,
    tempTitle,
    tempZoom,
    openEditor,
    closeEditor,
    setTempTitle,
    setTempZoom,
    saveBanner,
    resetBanner,
    updateBanner,
  } = useBannerStore();

  const handleSave = () => {
    saveBanner();
    onSave?.({
      url: tempImage,
      title: tempTitle,
      zoom: tempZoom,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateBanner(file, maxSizeMB);
    }
  };

  return (
    <AuthWrapper>
      {(user) => (
        <div>
          <div className="relative my-2">
            <ImagePreview imageUrl={image} imageZoom={zoom} title={title} />
            {user && (
              <Button
                onPress={openEditor}
                className="absolute top-4 right-4 bg-light3 border border-primary200 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
                color="primary"
                variant="flat"
                startContent={<Pencil size={16} />}
              >
                {t("banner.coverImage.editCover")}
              </Button>
            )}
          </div>
          <Modal
            isOpen={isEditing}
            onClose={closeEditor}
            size="2xl"
            scrollBehavior="inside"
            className="bg-white max-w-[800px] rounded-xl shadow-shadow1"
          >
            <ModalContent>
              <ModalHeader className="text-center text-gray3">
                {t("banner.coverImage.addCover")}
              </ModalHeader>

              <ModalBody>
                <ImagePreview
                  imageUrl={tempImage}
                  imageZoom={tempZoom}
                  title={tempTitle}
                  isModal
                  titleInputRef={titleInputRef}
                  onTitleChange={setTempTitle}
                />

                {error && (
                  <div className="text-danger text-sm mt-2">
                    {t("banner.coverImage.error.processing")}
                  </div>
                )}

                <ZoomControl value={tempZoom} onChange={setTempZoom} />
              </ModalBody>

              <ModalFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button
                    color="secondary"
                    onPress={handleSave}
                    className="bg-primary text-white border border-primary200 hover:bg-primary400 rounded-lg text-xs"
                  >
                    {t('banner.coverImage.save')}
                  </Button>
                  <Button
                    variant="bordered"
                    className="bg-light3 border border-primary200 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
                    onPress={resetBanner}
                  >
                    {t('banner.coverImage.reset')}
                  </Button>
                </div>
                <Button
                  variant="bordered"
                  className="bg-light3 border border-primary200 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
                  onPress={() => fileInputRef.current?.click()}
                >
                  {t('banner.coverImage.uploadNew')}
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
        </div>
      )}
    </AuthWrapper>
  );
};

export default React.memo(CoverImageEditor);
