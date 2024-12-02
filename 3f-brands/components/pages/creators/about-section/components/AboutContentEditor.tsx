// src/components/pages/creators/about/components/AboutContentEditor.tsx
import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import EditorJS from "@editorjs/editorjs";
import { ImageUploader } from "./ImageUploader";
import { createEditorConfig } from "../utils/editor-config";
import { ContentData, EditorBlock } from "../types/content.types";
import { OutputBlockData } from "@editorjs/editorjs";

interface AboutContentEditorProps {
  isOpen: boolean;
  onClose: () => void;
  content: ContentData;
  onSave: (newContent: ContentData) => void;
  mainImage: string;
}

export const AboutContentEditor: React.FC<AboutContentEditorProps> = ({
  isOpen,
  onClose,
  content,
  onSave,
  mainImage,
}) => {
  const [editorInstance, setEditorInstance] = React.useState<EditorJS | null>(
    null
  );
  const [currentImage, setCurrentImage] = React.useState(mainImage);

  // Handle image change
  const handleImageChange = (newImageUrl: string) => {
    setCurrentImage(newImageUrl);
  };

  // Initialize Editor
  useEffect(() => {
    if (isOpen) {
      const editor = new EditorJS(
        createEditorConfig(
          // Image upload handler
          (file) => {
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                const imageUrl = reader.result as string;
                resolve({
                  success: 1,
                  file: {
                    url: imageUrl,
                  },
                });
              };
              reader.readAsDataURL(file);
            });
          },
          // Initial data
          { blocks: content.text.blocks }
        )
      );

      setEditorInstance(editor);

      return () => {
        editor.destroy();
      };
    }
  }, [isOpen, content]);

  // Save handler
  const handleSave = async () => {
    if (editorInstance) {
      try {
        const savedData = await editorInstance.save();

        // Create a deep copy of the blocks to maintain original structure
        const finalBlocks: OutputBlockData<string, any>[] = savedData.blocks.map((block) => {
          // For paragraph blocks, preserve alignment
          if (block.type === "paragraph") {
            return {
              ...block,
              data: {
                ...block.data,
                alignment: block.tunes?.alignmentTune?.alignment || "left",
              },
            };
          }
          return block;
        });

        onSave({
          image: currentImage,
          text: {
            ...savedData,
            blocks: finalBlocks,
          },
        });

        onClose();
      } catch (error) {
        console.error("Saving failed", error);
      }
    }
  };

  return (
    <Modal
      backdrop="blur"
      className="bg-white shadow rounded-lg p-3"
      isOpen={isOpen}
      size="5xl"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="text-gray3">Edit Content</ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-1 gap-4">
            {/* Image Uploader */}
            <ImageUploader
              currentImage={mainImage}
              onImageChange={handleImageChange}
            />

            {/* EditorJS Container */}
            <div>
              <div
                id="editorjs-container"
                className="border rounded p-2 min-h-[600px]"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="light"
            className="bg-light3 border border-primary200 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            className="bg-primary text-white border border-primary200 hover:bg-primary400 rounded-lg text-xs"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
