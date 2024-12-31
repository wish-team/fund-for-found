import React from "react";
import { Type } from "lucide-react";
import { Input } from "@nextui-org/react";

interface ImagePreviewProps {
  imageUrl: string;
  imageZoom: number;
  title: string;
  isModal?: boolean;
  isEditingTitle?: boolean;
  onTitleClick?: () => void;
  onTitleChange?: (value: string) => void;
  onTitleBlur?: () => void;
  titleInputRef?: React.RefObject<HTMLInputElement>;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  imageZoom,
  title,
  isModal = false,
  isEditingTitle = false,
  onTitleClick,
  onTitleChange,
  onTitleBlur,
  titleInputRef,
}) => (
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
      {isModal && isEditingTitle ? (
        <Input
          ref={titleInputRef}
          value={title}
          onChange={(e) => onTitleChange?.(e.target.value)}
          onBlur={onTitleBlur}
          className="max-w-xs bg-transparent"
          size="lg"
          variant="bordered"
          classNames={{
            input: "text-white text-4xl font-bold",
            inputWrapper: "bg-transparent hover:bg-opacity-20 hover:bg-white",
          }}
        />
      ) : (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={isModal ? onTitleClick : undefined}
        >
          <h1 className="text-4xl font-bold text-white">{title}</h1>
          {isModal && <Type size={24} className="text-white" />}
        </div>
      )}
    </div>
  </div>
);
