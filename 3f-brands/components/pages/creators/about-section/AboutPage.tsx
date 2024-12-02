// src/components/pages/creators/about/AboutPage.tsx
"use client";

import React from "react";
import { useDisclosure } from "@nextui-org/react";
import { useEditorContent } from "./hooks/useEditorContent";
import { AboutContentDisplay } from "./components/AboutContentDisplay";
import { AboutContentEditor } from "./components/AboutContentEditor";

const AboutPage: React.FC = () => {
  // Use disclosure hook for modal
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  // Use custom hook for managing content
  const { content, mainImage, updateContent } = useEditorContent();

  // Handle save of new content
  const handleContentSave = (newContent: typeof content) => {
    updateContent(newContent);
    onClose();
  };

  return (
    <section className="mt-20">
      {/* Content Display */}
      <AboutContentDisplay content={content} onEditClick={onOpen} />

      {/* Content Editor Modal */}
      <AboutContentEditor
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleContentSave}
        content={content}
        mainImage={mainImage}
      />
    </section>
  );
};

export default AboutPage;
