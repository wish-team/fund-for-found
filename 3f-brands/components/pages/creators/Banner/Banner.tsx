import React, { useState, useRef, useCallback } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import { Pencil, ZoomIn, ZoomOut, Type } from 'lucide-react';
import ProfileEdit from './ProfileEdit';
import EditProfilePicture from './ProfileEdit';
// Types
interface CoverImageEditorProps {
  defaultImage?: string;
  defaultTitle?: string;
  onSave?: (imageData: { url: string; zoom: number; title: string }) => void;
  className?: string;
  maxSizeMB?: number;
}

// Constants
const DEFAULT_ZOOM = {
  min: 1,
  max: 2,
  step: 0.1,
  default: 1,
};

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

// Use a placeholder image URL instead of relative path
const DEFAULT_IMAGE = '/app/images/creators/brandBanner.svg';

const CoverImageEditor: React.FC<CoverImageEditorProps> = ({
  defaultImage = DEFAULT_IMAGE,
  defaultTitle = 'Brand or Organization',
  onSave,
  className = '',
  maxSizeMB = 5,
}) => {
  // State management remains the same as your original code
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(defaultImage);
  const [currentTitle, setCurrentTitle] = useState(defaultTitle);
  const [tempImage, setTempImage] = useState(defaultImage);
  const [tempTitle, setTempTitle] = useState(defaultTitle);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM.default);
  const [tempZoom, setTempZoom] = useState(DEFAULT_ZOOM.default);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [error, setError] = useState<string>('');
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  // Handlers remain the same as your original code
  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
    setTempImage(currentImage);
    setTempTitle(currentTitle);
    setTempZoom(zoom);
    setError('');
  }, [currentImage, currentTitle, zoom]);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
    setError('');
    setIsEditingTitle(false);
  }, []);

  const handleSave = useCallback(() => {
    setCurrentImage(tempImage);
    setCurrentTitle(tempTitle);
    setZoom(tempZoom);
    onSave?.({ url: tempImage, zoom: tempZoom, title: tempTitle });
    handleCloseModal();
  }, [tempImage, tempTitle, tempZoom, onSave, handleCloseModal]);

  const handleReset = useCallback(() => {
    setTempImage(defaultImage);
    setTempTitle(defaultTitle);
    setTempZoom(DEFAULT_ZOOM.default);
    setError('');
  }, [defaultImage, defaultTitle]);

  const handleImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError('');

    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setTempImage(reader.result as string);
      setTempZoom(DEFAULT_ZOOM.default);
    };
    reader.readAsDataURL(file);
  }, [maxSizeMB]);

  const handleTitleClick = useCallback(() => {
    setIsEditingTitle(true);
    setTimeout(() => {
      titleInputRef.current?.focus();
    }, 0);
  }, []);

  const handleTitleBlur = useCallback(() => {
    setIsEditingTitle(false);
  }, []);

  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempZoom(parseFloat(e.target.value));
  };

  // Modified render helper with left-aligned title
  const renderImagePreview = (imageUrl: string, imageZoom: number, title: string, isModal: boolean = false) => (
    <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100">
      <div 
        className="w-full h-full bg-cover bg-center transition-transform duration-300"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          backgroundColor: 'rgba(158, 158, 158, 0.5)',
          backgroundBlendMode: 'overlay',
          transform: `scale(${imageZoom})`,
        }}
      />
      <div className="absolute inset-0 flex items-center" style={{ transform: 'none', paddingLeft: '2rem' }}>
        {isModal && isEditingTitle ? (
          <Input
            ref={titleInputRef}
            value={title}
            onChange={(e) => setTempTitle(e.target.value)}
            onBlur={handleTitleBlur}
            className="max-w-xs bg-transparent"
            size="lg"
            variant="bordered"
            classNames={{
              input: "text-white text-4xl font-bold",
              inputWrapper: "bg-transparent hover:bg-opacity-20 hover:bg-white"
            }}
          />
        ) : (
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={isModal ? handleTitleClick : undefined}
          >
            <h1 className="text-4xl font-bold text-white">{title}</h1>
            {isModal && <Type size={24} className="text-white" />}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className='relative my-2'>
        {renderImagePreview(currentImage, zoom, currentTitle)}
        
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
        backdrop='blur'
        scrollBehavior="inside"
        className='bg-white max-w-[800px] rounded-xl shadow-shadow1'
      >
        <ModalContent>
          <ModalHeader className="text-center text-gray3">Add cover image</ModalHeader>
          
          <ModalBody>
            {renderImagePreview(tempImage, tempZoom, tempTitle, true)}
            
            {error && (
              <div className="text-danger text-sm mt-2">
                {error}
              </div>
            )}

            <div className="flex items-center gap-4 mt-4 px-2">
              <ZoomOut size={20} className="text-gray-500" />
              <div className="flex-1 relative">
                <input
                  type="range"
                  min={DEFAULT_ZOOM.min}
                  max={DEFAULT_ZOOM.max}
                  step={DEFAULT_ZOOM.step}
                  value={tempZoom}
                  onChange={handleZoomChange}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-purple-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer"
                />
              </div>
              <ZoomIn size={20} className="text-gray-500" />
            </div>
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
              accept={ACCEPTED_IMAGE_TYPES.join(',')}
              onChange={handleImageChange}
              className="hidden"
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* <EditProfilePicture /> */}
    </>
  );
};

export default CoverImageEditor;