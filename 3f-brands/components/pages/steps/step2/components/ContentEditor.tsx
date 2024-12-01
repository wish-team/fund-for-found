import React, { useState } from 'react';
import { useEditor } from '../hooks/useEditor';
import { Button } from '@nextui-org/react';
import { EditorData } from '../types';
import { OutputData } from '@editorjs/editorjs';

interface ContentEditorProps {
  onContentChange: (content: EditorData) => void;
  initialContent?: EditorData;
}

interface PlaceholderSectionProps {
  title: string;
  items: string[];
}

const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({ title, items }) => (
  <>
    <p className="text-lg font-bold pe-2">{title}</p>
    <ul className="list-disc ps-6 py-2 text-base font-light">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </>
);

export const ContentEditor: React.FC<ContentEditorProps> = ({
  onContentChange,
  initialContent,
}) => {
  const [isEmpty, setIsEmpty] = useState(!initialContent);
  const [editorContent, setEditorContent] = useState<EditorData | null>(initialContent || null);

  const handleEditorChange = (content: OutputData) => {
    const editorData: EditorData = {
      blocks: content.blocks,
      time: content.time || Date.now(),
      version: content.version || '2.0' // Provide fallback for version
    };
    setEditorContent(editorData);
    setIsEmpty(!content.blocks || content.blocks.length === 0);
    onContentChange(editorData);
  };

  const { editorRef, editorInstance } = useEditor(handleEditorChange, initialContent);

  const handleSave = async () => {
    try {
      if (editorInstance.current) {
        const content = await editorInstance.current.save();
        handleEditorChange(content);
      }
    } catch (error) {
      console.error('Failed to save editor content:', error);
    }
  };

  const handleClear = async () => {
    if (editorInstance.current) {
      await editorInstance.current.clear();
      setIsEmpty(true);
      setEditorContent(null);
      onContentChange({ blocks: [], time: Date.now(), version: '2.0' });
    }
  };

  const placeholderSections = [
    {
      title: "Short Summary",
      items: [
        "Introduce yourself, your team (if you have) and your background.",
        "Briefly describe the long-term and short-term goals of your brand and why it's important to you.",
      ],
    },
    {
      title: "The Impact",
      items: [
        "Share more about your brand and highlight how contributions can make a meaningful impact.",
        "Explain why your brand is important to contributors and how it positively influences the world.",
        "Showcase your brand's proven success and past achievements, if applicable.",
        "Help people connect with your brand's mission and build trust by sharing authentic stories and experiences.",
      ],
    },
    {
      title: "The Story",
      items: [
        "Share the vision of your organization and the journey that led to its establishment.",
      ],
    },
  ];

  return (
    <div className="border border-light3 shadow-lg hover:border-purple-500 focus:border-purple-500 rounded-lg my-4 relative">
      <div className="min-h-[580px] border border-red-600 md:min-h-[300px] relative">
        <div 
          className="editor-content border border-green-600  p-4 min-h-[590px] md:min-h-[300px] relative" 
          ref={editorRef}
          onClick={() => {
            if (editorInstance.current && isEmpty) {
              editorInstance.current.focus();
            }
          }}
        />
        
        {isEmpty && (
          <div className="absolute top-0 left-0 w-full p-4 pointer-events-none border border-blue-600  text-gray-400 max-h-[580px] md:min-h-[300px] overflow-auto bg-white">
            {placeholderSections.map((section, index) => (
              <PlaceholderSection
                key={index}
                title={section.title}
                items={section.items}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 p-2 border-t border-light3">
        <Button
          color="primary"
          variant="bordered"
          className="bg-light4 font-light rounded-lg border border-light2"
          onClick={handleClear}
        >
          Clear
        </Button>
        <Button
          onClick={handleSave}
          color="secondary"
          variant="solid"
          className="font-light bg-primary mb-1 text-white rounded-lg border border-light2"
        >
          Save
        </Button>
      </div>

      {/* Editor.js specific styles that can't be replaced with Tailwind */}
      <style jsx global>{`
        .codex-editor { padding: 0 !important; }
        .ce-block__content { max-width: 100% !important; margin: 0 !important; }
        .ce-toolbar__content { max-width: 100% !important; }
        .ce-toolbar__plus { left: -2px !important; z-index: 100 !important; }
        .ce-toolbar__actions { right: 0 !important; }
        .ce-toolbar, .ce-toolbar__settings-btn { z-index: 100 !important; }
        .ce-popover, .ce-inline-toolbar { z-index: 1000 !important; }
        .ce-block--selected { @apply bg-purple-100 rounded; }
      `}</style>
    </div>
  );
};