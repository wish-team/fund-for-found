import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import { Button } from "@nextui-org/react";

const Editor = ({ initialData, onSave }) => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    // Initialize EditorJS
    try {
      editorInstance.current = new EditorJS({
        holder: editorRef.current,
        data: initialData,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              placeholder: "Header",
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              placeholder: "List",
            },
          },
          image: {
            class: Image,
            inlineToolbar: true,
            config: {
              placeholder: "Image",
            },
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          delimiter: {
            class: Delimiter,
            inlineToolbar: true,
          },
          embed: {
            class: Embed,
            inlineToolbar: true,
            config: {
              placeholder: "Embed",
            },
          },
          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              placeholder: "Table",
            },
          },
        },
        onReady: () => {
          console.log("Editor.js is ready to work!");
        },
        onChange: () => {
          editorInstance.current.save().then((outputData) => {
            setIsEmpty(Object.keys(outputData.blocks).length === 0);
          });
        },
      });
    } catch (error) {
      console.error("Failed to initialize EditorJS:", error);
    }

    return () => {
      // Clean up the editor instance
      if (editorInstance.current && typeof editorInstance.current.destroy === 'function') {
        editorInstance.current.destroy();
      } else {
        console.warn("Editor instance not available or destroy method not found.");
      }
    };
  }, [initialData]);

  const saveData = async () => {
    try {
      const savedData = await editorInstance.current.save();
      if (onSave) {
        onSave(savedData);
      }
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  };

  return (
    <div className="border border-light3 shadow-lg hover:border-purple-500 focus:border-purple-500 rounded-lg my-4 relative">
      <div className="flex justify-end space-x-2 p-2">
        <Button
          onClick={saveData}
          color="secondary"
          variant="solid"
          className="font-light bg-primary mb-1 text-white rounded-lg border border-light2"
        >
          Save
        </Button>
      </div>
      <div className="editor-content" ref={editorRef} />
    </div>
  );
};

export default Editor;