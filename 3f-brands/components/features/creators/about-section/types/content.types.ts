// src/components/pages/creators/about/types/content.types.ts
import { OutputBlockData } from '@editorjs/editorjs';

export interface BlockAlignment {
  alignment?: "left" | "center" | "right";
}

export interface ParagraphBlock extends BlockAlignment {
  type: "paragraph";
  data: {
    text: string;
    alignment?: "left" | "center" | "right";
  };
}

export interface HeaderBlock extends BlockAlignment {
  type: "header";
  data: {
    text: string;
    level: 1 | 2 | 3 | 4;
    alignment?: "left" | "center" | "right";
  };
}

export interface ListBlock {
  type: "list";
  data: {
    style: "ordered" | "unordered";
    items: string[];
  };
}

export interface ChecklistBlock {
  type: "checklist";
  data: {
    items: Array<{
      text: string;
      checked: boolean;
    }>;
  };
}

export interface QuoteBlock {
  type: "quote";
  data: {
    text: string;
    caption?: string;
  };
}

export interface WarningBlock {
  type: "warning";
  data: {
    title: string;
    message: string;
  };
}

export interface ImageBlock {
  type: "image";
  data: {
    file: {
      url: string;
    };
    caption?: string;
  };
}

export interface DelimiterBlock {
  type: "delimiter";
  data?: {}; // Add an optional empty data object
}

export interface TableBlock {
  type: "table";
  data: {
    content: string[][];
  };
}

export interface CodeBlock {
  type: "code";
  data: {
    code: string;
  };
}

export interface RawBlock {
  type: "raw";
  data: {
    html: string;
  };
}

export type EditorBlock =
  | ParagraphBlock
  | HeaderBlock
  | ListBlock
  | ChecklistBlock
  | QuoteBlock
  | WarningBlock
  | ImageBlock
  | DelimiterBlock
  | TableBlock
  | CodeBlock
  | RawBlock;

export interface ContentData {
  image: string;
  text: {
    blocks: OutputBlockData<string, any>[];
  };
}