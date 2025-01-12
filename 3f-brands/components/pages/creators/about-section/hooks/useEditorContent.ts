// src/components/pages/creators/about/hooks/useEditorContent.ts
import { useEffect, useRef, useCallback } from 'react';
import EditorJS from '@editorjs/editorjs';
import { useTranslation } from 'react-i18next';
import { useEditorStore } from '../store/editorStore';
import { OutputBlockData } from '@editorjs/editorjs';

export const useEditorContent = () => {
  const { t, i18n } = useTranslation();
  const editorRef = useRef<EditorJS | null>(null);
  const { 
    content, 
    mainImage, 
    setContent, 
    setMainImage, 
    resetContent, 
    initializeContent 
  } = useEditorStore();

  const getDefaultBlocks = useCallback((): OutputBlockData[] => [
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
  ], [t]);

  // Initialize content when component mounts and content is empty
  useEffect(() => {
    if (content.text.blocks.length === 0) {
      initializeContent(getDefaultBlocks());
    }
  }, [initializeContent, getDefaultBlocks]);

  // Handle language changes
  const previousLanguageRef = useRef(i18n.language);
  useEffect(() => {
    // Only update if language actually changed
    if (previousLanguageRef.current !== i18n.language) {
      previousLanguageRef.current = i18n.language;
      resetContent(getDefaultBlocks());
    }
  }, [i18n.language, getDefaultBlocks, resetContent]);

  return {
    content,
    mainImage,
    setMainImage,
    updateContent: setContent,
    resetContent: () => resetContent(getDefaultBlocks()),
    editorRef
  };
};