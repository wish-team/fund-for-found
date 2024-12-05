import { useState, useRef, useCallback } from 'react';
import EditorJS from '@editorjs/editorjs';
import { ContentData, EditorBlock } from '../types/content.types';

const DEFAULT_IMAGE = 'https://dummyjson.com/image/200x100';

const DEFAULT_BLOCKS: EditorJS.OutputBlockData[] = [
    {
      type: 'paragraph',
      data: {
        text: 'Summary',
      }
    },
    {
      type: 'paragraph',
      data: {
        text: 'Introduce yourself, your team(if you have) and your background.',
      }
    },
    {
      type: 'paragraph',
      data: {
        text: 'Briefly describe about the long term and short term goal of your brand and why it is important to you.',
      }
    },
    {
      type: 'paragraph',
      data: {
        text: 'The Impact',
      }
    },
    {
      type: 'paragraph',
      data: {
        text: 'Share more about your brand and highlight how contributions can make a meaningful impact',
      }
    },
    {
      type: 'paragraph',
      data: {
        text: 'Explain why your brand is important to contributors and how it positively influences the world.',
      }
    },
    {
      type: 'paragraph',
      data: {
        text: 'Showcase your brand is proven success and past achievements, if applicable',
      }
    },
    {
      type: 'paragraph',
      data: {
        text: 'Help people connect with your brand is mission and build trust by sharing authentic stories and experiences',
      }
    },
    {
      type: 'paragraph',
      data: {
        text: 'The Story',
      }
    },
    {
      type: 'paragraph',
      data: {
        text: 'Share the vision of your organization and the journey that led to its establishment.',
      }
    },
  ];

export const useEditorContent = () => {
  const [content, setContent] = useState<ContentData>({
    image: DEFAULT_IMAGE,
    text: {
      blocks: DEFAULT_BLOCKS
    }
  });
  const [mainImage, setMainImage] = useState<string>(DEFAULT_IMAGE);
  const editorRef = useRef<EditorJS | null>(null);

  const updateContent = useCallback((newContent: ContentData) => {
    setContent(newContent);
    setMainImage(newContent.image);
  }, []);

  const resetContent = useCallback(() => {
    setContent({
      image: DEFAULT_IMAGE,
      text: {
        blocks: DEFAULT_BLOCKS
      }
    });
    setMainImage(DEFAULT_IMAGE);
  }, []);

  return {
    content,
    mainImage,
    setMainImage,
    updateContent,
    resetContent,
    editorRef
  };
};