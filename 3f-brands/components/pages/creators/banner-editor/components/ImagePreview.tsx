// ImagePreview.tsx
import React, { useRef, useEffect } from "react";
import { LuType } from  "react-icons/lu";
import { Input } from "@nextui-org/react";
import { useBannerStore } from "../store/bannerStore";

interface ImagePreviewProps {
  imageUrl: string;
  imageZoom: number;
  title: string;
  isModal?: boolean;
  titleInputRef?: React.RefObject<HTMLInputElement>;
  onTitleChange?: (value: string) => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  imageZoom,
  title,
  isModal = false,
  titleInputRef,
  onTitleChange,
}) => {
  const { isTitleEditing, setTitleEditing } = useBannerStore();
  const localInputRef = useRef<HTMLInputElement>(null);
  const inputRef = titleInputRef || localInputRef;

  useEffect(() => {
    if (isTitleEditing) {
      inputRef.current?.focus();
    }
  }, [isTitleEditing]);

  const handleTitleClick = () => {
    if (isModal) {
      setTitleEditing(true);
    }
  };

  const handleTitleBlur = () => {
    setTitleEditing(false);
  };

  return (
    <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100">
      <div
        className="w-full h-full bg-cover bg-center transition-transform duration-300"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundColor: "rgba(158, 158, 158, 0.5)",
          backgroundBlendMode: "overlay",
          transform: `scale(${imageZoom})`,
        }}
      />
      <div
        className="absolute inset-0 flex items-center"
        style={{ transform: "none", paddingLeft: "2rem" }}
      >
        {isModal && isTitleEditing ? (
          <Input
            ref={inputRef}
            value={title}
            onChange={(e) => onTitleChange?.(e.target.value)}
            onBlur={handleTitleBlur}
            className="max-w-xs bg-transparent"
            size="lg"
            variant="bordered"
            classNames={{
              input: "text-white text-4xl font-bold",
              inputWrapper: "bg-transparent hover:bg-opacity-20 hover:bg-white",
            }}
            autoFocus
          />
        ) : (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleTitleClick}
          >
            <h1 className="text-4xl font-bold text-white">{title}</h1>
            {isModal && <LuType size={24} className="text-white" />}
          </div>
        )}
      </div>
    </div>
  );
};