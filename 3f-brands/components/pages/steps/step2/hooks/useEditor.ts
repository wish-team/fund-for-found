import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";

// Dynamic imports to handle potential module resolution issues
const importTool = async (importFn: () => Promise<any>) => {
  try {
    const module = await importFn();
    return module.default || module;
  } catch (error) {
    console.error('Error importing tool:', error);
    return null;
  }
};

export const useEditor = (
  onContentChange: (content: any) => void,
  initialData?: any
) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<EditorJS | null>(null);

  const handleImageUpload = async (file: File): Promise<{ success: number; file: { url: string } }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve({
          success: 1,
          file: {
            url: reader.result as string
          }
        });
      };
      reader.onerror = error => reject(error);
    });
  };

  useEffect(() => {
    const initializeEditor = async () => {
      if (!editorRef.current) return;

      // Dynamically import tools
      const [
        Header, 
        List, 
        Image, 
        Paragraph, 
        Delimiter, 
        Embed, 
        Table
      ] = await Promise.all([
        importTool(() => import("@editorjs/header")),
        importTool(() => import("@editorjs/list")),
        importTool(() => import("@editorjs/image")),
        importTool(() => import("@editorjs/paragraph")),
        importTool(() => import("@editorjs/delimiter")),
        importTool(() => import("@editorjs/embed")),
        importTool(() => import("@editorjs/table"))
      ]);

      const tools = {
        header: {
          class: Header,
          inlineToolbar: true,
          config: {
            levels: [1, 2, 3, 4],
            defaultLevel: 3
          }
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          }
        },
        image: {
          class: Image,
          config: {
            uploader: {
              uploadByFile: handleImageUpload,
              uploadByUrl: async (url: string) => {
                try {
                  const response = await fetch(url);
                  const blob = await response.blob();
                  return handleImageUpload(blob as File);
                } catch (error) {
                  console.error('Error uploading image by URL:', error);
                  return {
                    success: 0,
                    file: {
                      url: ''
                    }
                  };
                }
              }
            }
          }
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true
        },
        delimiter: {
          class: Delimiter
        },
        embed: {
          class: Embed,
          inlineToolbar: true,
          config: {
            services: {
              youtube: true,
              coub: true
            }
          }
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        }
      };

      const editor = new EditorJS({
        holder: editorRef.current,
        data: initialData,
        tools,
        onReady: () => {
          console.log('Editor.js is ready to work!');
        },
        onChange: async (api, event) => {
          const savedData = await editor.save();
          onContentChange(savedData);
        },
        autofocus: true,
      });

      editorInstance.current = editor;
    };

    initializeEditor().catch(console.error);

    return () => {
      if (editorInstance.current) {
        editorInstance.current.isReady
          .then(() => {
            editorInstance.current?.destroy();
            editorInstance.current = null;
          })
          .catch(e => console.error('ERROR destroying editor:', e));
      }
    };
  }, []); 

  return {
    editorRef,
    editorInstance,
  };
};