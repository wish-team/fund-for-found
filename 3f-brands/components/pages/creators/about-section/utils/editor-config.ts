// src/components/pages/creators/about/utils/editor-config.ts
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import Delimiter from '@editorjs/delimiter';
import Warning from '@editorjs/warning';
import InlineCode from '@editorjs/inline-code';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import Code from '@editorjs/code';
import RawTool from '@editorjs/raw';
import Checklist from '@editorjs/checklist';
import Underline from '@editorjs/underline';
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune';
import AttachesTool from '@editorjs/attaches';
import ImageTool from '@editorjs/image';
import { BlockToolConstructable, ToolSettings, BlockTune } from '@editorjs/editorjs';

// Define a custom interface for the alignment tune configuration
interface AlignmentTuneConfig {
  default?: string;
  blocks?: Record<string, string>;
}

export const createEditorConfig = (
  onImageUpload: (file: File) => Promise<{ success: number; file: { url: string } }>,
  initialData?: EditorJS.OutputData
): EditorJS.EditorConfig => ({
  holder: 'editorjs-container',
  data: initialData,
  tools: {
    header: {
      class: Header as unknown as BlockToolConstructable,
      inlineToolbar: ['link', 'marker', 'bold', 'italic', 'underline'],
      config: {
        placeholder: 'Enter a header',
        levels: [1, 2, 3, 4],
        defaultLevel: 2
      }
    },
    paragraph: {
      class: Paragraph as unknown as BlockToolConstructable,
      inlineToolbar: true,
      tunes: ['alignmentTune']
    },
    list: {
      class: List as unknown as BlockToolConstructable,
      inlineToolbar: true
    },
    checklist: {
      class: Checklist as unknown as BlockToolConstructable,
      inlineToolbar: true
    },
    quote: {
      class: Quote as unknown as BlockToolConstructable,
      inlineToolbar: true,
      config: {
        quotePlaceholder: 'Enter a quote',
        captionPlaceholder: 'Quote author'
      }
    },
    warning: {
      class: Warning as unknown as BlockToolConstructable,
      inlineToolbar: true,
      config: {
        titlePlaceholder: 'Title',
        messagePlaceholder: 'Message'
      }
    },
    delimiter: Delimiter,
    inlineCode: {
      class: InlineCode as unknown as BlockToolConstructable,
      shortcut: 'CMD+E'
    },
    underline: Underline,
    embed: {
      class: Embed as unknown as BlockToolConstructable,
      config: {
        services: {
          youtube: true,
          coub: true,
          twitter: true
        }
      }
    },
    table: {
      class: Table as unknown as BlockToolConstructable,
      inlineToolbar: true,
      config: {
        rows: 2,
        cols: 3
      }
    },
    code: Code,
    raw: {
      class: RawTool as unknown as BlockToolConstructable,
    } as ToolSettings,
    image: {
      class: ImageTool as unknown as BlockToolConstructable,
      config: {
        uploader: {
          uploadByFile: onImageUpload
        }
      }
    },
    attaches: {
      class: AttachesTool as unknown as BlockToolConstructable,
      config: {
        endpoint: '/api/uploadFile'
      }
    },
    alignmentTune: {
      class: AlignmentTuneTool,
      config: {
        default: "left",
        blocks: {
          header: 'center',
          paragraph: 'left'
        }
      } as AlignmentTuneConfig
    } as ToolSettings
  },
  tunes: ['alignmentTune']
});