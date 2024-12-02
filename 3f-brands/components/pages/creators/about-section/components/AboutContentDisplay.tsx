import React from "react";
import { Button } from "@nextui-org/react";
import { HiOutlinePencil } from "react-icons/hi";
import CreatorsTitle from "../../../creators/title/CreatorsTitle";
import { ContentData, EditorBlock } from "../types/content.types";
import { renderContentBlock } from "../utils/content-renderer";
import { OutputBlockData } from "@editorjs/editorjs";

interface AboutContentDisplayProps {
  content: ContentData;
  onEditClick: () => void;
}

// Type guard to convert OutputBlockData to EditorBlock
const convertToEditorBlock = (block: OutputBlockData<string, any>): EditorBlock | null => {
  // Map OutputBlockData to EditorBlock based on type
  switch (block.type) {
    case "paragraph":
      return {
        type: "paragraph",
        data: { text: block.data.text },
        alignment: block.data.alignment
      };
    case "header":
      return {
        type: "header",
        data: { 
          text: block.data.text, 
          level: block.data.level as 1 | 2 | 3 | 4 
        },
        alignment: block.data.alignment
      };
    case "list":
      return {
        type: "list",
        data: { 
          style: block.data.style, 
          items: block.data.items 
        }
      };
    case "checklist":
      return {
        type: "checklist",
        data: { items: block.data.items }
      };
    case "quote":
      return {
        type: "quote",
        data: { 
          text: block.data.text, 
          caption: block.data.caption 
        }
      };
    case "warning":
      return {
        type: "warning",
        data: { 
          title: block.data.title, 
          message: block.data.message 
        }
      };
    case "image":
      return {
        type: "image",
        data: { 
          file: { url: block.data.file.url },
          caption: block.data.caption 
        }
      };
    case "delimiter":
      return { type: "delimiter" };
    case "table":
      return {
        type: "table",
        data: { content: block.data.content }
      };
    case "code":
      return {
        type: "code",
        data: { code: block.data.code }
      };
    case "raw":
      return {
        type: "raw",
        data: { html: block.data.html }
      };
    default:
      return null;
  }
};

export const AboutContentDisplay: React.FC<AboutContentDisplayProps> = ({
  content,
  onEditClick,
}) => {
  return (
    <div className="w-full mt-36 mx-auto">
      <div className="flex items-center gap-6">
        <CreatorsTitle title="About" />
        <Button
          onClick={onEditClick}
          color="primary"
          startContent={<HiOutlinePencil />}
          className="bg-light3 border border-primary200 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
        >
          Edit
        </Button>
      </div>

      {/* Display Area */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={content.image}
          alt="Content"
          className="w-full bg-gray-400 h-64 object-cover"
        />
        <div className="p-4">
          {content.text.blocks
            .map(convertToEditorBlock)
            .filter((block): block is EditorBlock => block !== null)
            .map(renderContentBlock)}
        </div>
      </div>
    </div>
  );
};