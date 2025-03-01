// src/components/pages/creators/about/types/editor.types.ts
import EditorJS from "@editorjs/editorjs";

export interface EditorToolConfig {
  placeholder?: string;
  
}

export interface EditorInstance {
  editor: EditorJS | null;
  initEditor: (config: EditorJS.EditorConfig) => void;
  saveContent: () => Promise<EditorJS.OutputData>;
  destroyEditor: () => void;
}
