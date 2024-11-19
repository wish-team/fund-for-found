import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";

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
    if (!editorRef.current) return;

    const editor = new EditorJS({
      holder: editorRef.current,
      data: initialData,
      tools: {
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
                  // Fetch the image and convert to base64
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
        delimiter: Delimiter,
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
      },
      onReady: () => {
        console.log('Editor.js is ready to work!');
      },
      onChange: async (api, event) => {
        const savedData = await editor.save();
        onContentChange(savedData);
      },
      autofocus: true,
    //   placeholder: 'Press Tab for commands or start writing',
    });

    editorInstance.current = editor;

    return () => {
      if (editorInstance.current) {
        editor.isReady
          .then(() => {
            editor.destroy();
            editorInstance.current = null;
          })
          .catch(e => console.error('ERROR destroying editor:', e));
      }
    };
  }, []); // Empty dependency array to ensure editor is only initialized once

  return {
    editorRef,
    editorInstance,
  };
};