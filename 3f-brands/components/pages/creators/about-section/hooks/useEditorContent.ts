// src/components/pages/creators/about/hooks/useEditorContent.ts
import { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import { useTranslation } from 'react-i18next';
import { useEditorStore } from '../store/editorStore';

export const useEditorContent = () => {
  const { t } = useTranslation();
  const editorRef = useRef<EditorJS | null>(null);
  const { 
    content, 
    mainImage, 
    setContent, 
    setMainImage, 
    resetContent, 
    initializeContent 
  } = useEditorStore();

  const DEFAULT_BLOCKS = [
    {
      type: 'paragraph',
      data: {
        text: t('about.defaultContent.summary'),
      }
    },
    {
      type: 'paragraph',
      data: {
        text: t('about.defaultContent.summaryText1'),
      }
    },
    {
      type: 'paragraph',
      data: {
        text: t('about.defaultContent.summaryText2'),
      }
    },
    {
      type: 'paragraph',
      data: {
        text: t('about.defaultContent.impact'),
      }
    },
    {
      type: 'paragraph',
      data: {
        text: t('about.defaultContent.impactText1'),
      }
    },
    {
      type: 'paragraph',
      data: {
        text: t('about.defaultContent.impactText2'),
      }
    },
    {
      type: 'paragraph',
      data: {
        text: t('about.defaultContent.impactText3'),
      }
    },
    {
      type: 'paragraph',
      data: {
        text: t('about.defaultContent.impactText4'),
      }
    },
    {
      type: 'paragraph',
      data: {
        text: t('about.defaultContent.story'),
      }
    },
    {
      type: 'paragraph',
      data: {
        text: t('about.defaultContent.storyText'),
      }
    },
  ];

  // Initialize content with default blocks when component mounts
  useEffect(() => {
    initializeContent(DEFAULT_BLOCKS);
  }, [initializeContent, t]); // Add t as dependency to update when language changes

  return {
    content,
    mainImage,
    setMainImage,
    updateContent: setContent,
    resetContent: () => resetContent(DEFAULT_BLOCKS),
    editorRef
  };
};