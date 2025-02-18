declare module "@editorjs/raw" {
  import { BlockTool } from "@editorjs/editorjs";

  class Raw implements BlockTool {
    constructor(config?: any);
  }

  export = Raw;
}

declare module "@editorjs/checklist" {
  import { BlockTool } from "@editorjs/editorjs";

  class Checklist implements BlockTool {
    constructor(config?: any);
  }

  export = Checklist;
}

declare module "editorjs-text-alignment-blocktune" {
  import { BlockTune } from "@editorjs/editorjs";

  class AlignmentTuneTool implements BlockTune {
    constructor(config?: { default?: string; blocks?: Record<string, string> });
  }

  export = AlignmentTuneTool;
}

declare module "@editorjs/attaches" {
  import { BlockTool } from "@editorjs/editorjs";

  class AttachesTool implements BlockTool {
    constructor(config?: {
      endpoint?: string;
      customUploader?: {
        uploadByFile?: (file: File) => Promise<{
          success: number;
          file: {
            url: string;
          };
        }>;
      };
    });
  }

  export = AttachesTool;
}
