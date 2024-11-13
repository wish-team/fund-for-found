import { useState, useCallback } from 'react';
import { validateImage } from '../utils/validators';
import { ZOOM_SETTINGS } from '../utils/constants';
import { useLocalStorage } from './useLocalStorage';

interface UseImageEditorProps {
  defaultImage: string;
  defaultTitle: string;
  maxSizeMB: number;
  onSave?: (image: string, title: string, zoom: number) => void;
}

export const useImageEditor = ({
  defaultImage,
  defaultTitle,
  maxSizeMB,
  onSave,
}: UseImageEditorProps) => {
  const [storedData, setStoredData] = useLocalStorage('coverImageData', {
    image: defaultImage,
    title: defaultTitle,
    zoom: ZOOM_SETTINGS.default,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [tempImage, setTempImage] = useState(storedData.image);
  const [tempTitle, setTempTitle] = useState(storedData.title);
  const [tempZoom, setTempZoom] = useState(storedData.zoom);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleOpenModal = useCallback(() => {
    setTempImage(storedData.image);
    setTempTitle(storedData.title);
    setTempZoom(storedData.zoom);
    setError(undefined);
    setIsOpen(true);
  }, [storedData]);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
    setError(undefined);
  }, []);

  const handleSave = useCallback(() => {
    setStoredData({
      image: tempImage,
      title: tempTitle,
      zoom: tempZoom,
    });
    onSave?.(tempImage, tempTitle, tempZoom);
    handleCloseModal();
  }, [tempImage, tempTitle, tempZoom, onSave, handleCloseModal, setStoredData]);

  const handleReset = useCallback(() => {
    setTempImage(defaultImage);
    setTempTitle(defaultTitle);
    setTempZoom(ZOOM_SETTINGS.default);
    setError(undefined);
  }, [defaultImage, defaultTitle]);

  const handleImageChange = useCallback(
    (file: File | undefined) => {
      if (!file) return;

      const validation = validateImage(file, maxSizeMB);
      if (!validation.isValid) {
        setError(validation.error);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
        setError(undefined);
      };
      reader.readAsDataURL(file);
    },
    [maxSizeMB]
  );

  return {
    isOpen,
    currentImage: storedData.image,
    currentTitle: storedData.title,
    currentZoom: storedData.zoom,
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
  };
};