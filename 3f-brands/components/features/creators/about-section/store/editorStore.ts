// src/store/editorStore.ts
import { create } from 'zustand';
import { OutputBlockData } from '@editorjs/editorjs';

interface EditorState {
  content: {
    image: string;
    text: {
      blocks: OutputBlockData[];
    };
  };
  mainImage: string;
  setContent: (content: EditorState['content']) => void;
  setMainImage: (image: string) => void;
  resetContent: (defaultBlocks: OutputBlockData[]) => void;
  initializeContent: (defaultBlocks: OutputBlockData[]) => void;
}

const DEFAULT_IMAGE = 'https://dummyjson.com/image/200x100';

export const useEditorStore = create<EditorState>((set) => ({
  content: {
    image: DEFAULT_IMAGE,
    text: {
      blocks: []
    }
  },
  mainImage: DEFAULT_IMAGE,
  setContent: (content) => set({ content }),
  setMainImage: (image) => set({ mainImage: image }),
  resetContent: (defaultBlocks) => set({
    content: {
      image: DEFAULT_IMAGE,
      text: { blocks: defaultBlocks }
    },
    mainImage: DEFAULT_IMAGE
  }),
  initializeContent: (defaultBlocks) => set(state => {
    // Only initialize if blocks are empty
    if (state.content.text.blocks.length === 0) {
      return {
        content: {
          image: DEFAULT_IMAGE,
          text: { blocks: defaultBlocks }
        },
        mainImage: DEFAULT_IMAGE
      };
    }
    return state;
  })
}));