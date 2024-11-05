// components/Editor.js
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

const Editor = ({ onSave }) => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null); // Ref to store the editor instance
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    // Initialize EditorJS
    try {
      editorInstance.current = new EditorJS({
        holder: editorRef.current,
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
  }, []);

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
      <div className="editor-content relative" ref={editorRef}>
        {isEmpty && (
          <div className="multiline-placeholder max-h-[300px] overflow-auto px-4">
            <p className="text-lg font-bold pe-2">Short Summary</p>
            <ul className="list-disc ps-6 py-2 text-base font-light">
              <li>
                Introduce yourself, your team (if you have) and your background.
              </li>
              <li>
                Briefly describe the long-term and short-term goals of your
                brand and why it's important to you.
              </li>
            </ul>
            <p className="text-lg font-bold pe-2">The Impact</p>
            <ul className="list-disc ps-6 py-2 text-base font-light">
              <li>
                Share more about your brand and highlight how contributions can
                make a meaningful impact.
              </li>
              <li>
                Explain why your brand is important to contributors and how it
                positively influences the world.
              </li>
              <li>
                Showcase your brand's proven success and past achievements, if
                applicable.
              </li>
              <li>
                Help people connect with your brand's mission and build trust by
                sharing authentic stories and experiences.
              </li>
            </ul>
            <p className="text-lg font-bold pe-2">The Story</p>
            <ul className="list-disc ps-6 py-2 text-base font-light">
              <li>
                Share the vision of your organization and the journey that led
                to its establishment.
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex justify-end space-x-2 p-2">
        <Button
          color="primary"
          variant="bordered"
          className="bg-light4 font-light rounded-lg border border-light2"
          onClick={() => {
            /* Add edit functionality here */
          }}
        >
          Edit
        </Button>
        <Button
          onClick={saveData}
          color="secondary"
          variant="solid"
          className="font-light bg-primary mb-1 text-white rounded-lg border border-light2"
        >
          Save
        </Button>
      </div>
      <style jsx>{`
        .multiline-placeholder {
          color: #999; /* Placeholder text color */
          position: absolute;
          top: 10px; /* Adjust as needed */
          left: 10px; /* Adjust as needed */
          pointer-events: none; /* Prevent interaction */
        }
        .editor-content {
          min-height: 200px; /* Set height for the editor */
          position: relative; /* Required for absolute positioning of the placeholder */
        }
      `}</style>
    </div>
  );
};

export default Editor;
