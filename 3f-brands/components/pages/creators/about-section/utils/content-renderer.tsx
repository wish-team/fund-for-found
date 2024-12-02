// src/components/pages/creators/about/utils/content-renderer.tsx
import React from "react";
import { EditorBlock } from "../types/content.types";

export const renderContentBlock = (block: EditorBlock, index: number) => {
  switch (block.type) {
    case "paragraph":
      const specialTexts = ["Summary", "The Impact", "The Story"];
      const isSpecialText = specialTexts.includes(block.data.text.trim());
      return (
        <p
          key={index}
          className={`
            ${
              isSpecialText
                ? "py-2 font-bold text-light1 text-lg"
                : "text-light1"
            }
            text-${block.alignment || "left"}
          `}
        >
          {block.data.text.split("\n").map((line, lineIndex) => (
            <React.Fragment key={lineIndex}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      );

    case "header":
      const HeaderTag = `h${block.data.level}` as keyof JSX.IntrinsicElements;
      return React.createElement(
        HeaderTag,
        {
          key: index,
          className: `text-${
            block.data.level === 1 ? "xl" : block.data.level === 2 ? "lg" : "md"
          } font-bold mb-2 text-${block.alignment || "left"}`,
        },
        block.data.text
      );

    case "list":
      const ListComponent = block.data.style === "ordered" ? "ol" : "ul";
      return React.createElement(
        ListComponent,
        {
          key: index,
          className:
            "list-" +
            (block.data.style === "ordered" ? "decimal" : "disc") +
            " pl-5 mb-4",
        },
        block.data.items.map((item: string, itemIndex: number) => (
          <li key={itemIndex}>{item}</li>
        ))
      );

    case "checklist":
      return (
        <div key={index} className="mb-4">
          {block.data.items.map((item, itemIndex) => (
            <div key={itemIndex} className="flex items-center">
              <input
                type="checkbox"
                checked={item.checked}
                readOnly
                className="mr-2"
              />
              <span
                className={item.checked ? "line-through text-gray-500" : ""}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      );

    case "quote":
      return (
        <blockquote
          key={index}
          className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4"
        >
          {block.data.text}
          {block.data.caption && (
            <footer className="text-right text-sm">
              - {block.data.caption}
            </footer>
          )}
        </blockquote>
      );

    case "warning":
      return (
        <div
          key={index}
          className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4"
        >
          <p className="font-bold">{block.data.title}</p>
          <p>{block.data.message}</p>
        </div>
      );

    case "image":
      return (
        <div key={index} className="my-4">
          <img
            src={block.data.file.url}
            alt={block.data.caption || "Image"}
            className="max-w-full h-auto mx-auto"
          />
          {block.data.caption && (
            <p className="text-center text-gray-600 mt-2">
              {block.data.caption}
            </p>
          )}
        </div>
      );
      case 'delimiter':
        return <hr key={index} className="border-t-2 border-gray-200 my-4" />;
      
      case 'table':
        return (
          <table 
            key={index} 
            className="w-full border-collapse border border-gray-300 mb-4"
          >
            <tbody>
              {block.data.content.map((row: string[], rowIndex: number) => (
                <tr key={rowIndex}>
                  {row.map((cell: string, cellIndex: number) => (
                    <td 
                      key={cellIndex} 
                      className="border border-gray-300 p-2"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );

        case 'code':
          return (
            <pre 
              key={index} 
              className="bg-gray-100 p-4 rounded overflow-x-auto"
            >
              <code>{block.data.code}</code>
            </pre>
          );
        
        case 'raw':
          return (
            <div 
              key={index} 
              dangerouslySetInnerHTML={{ __html: block.data.html }}
            />
          );

    default:
      return null;
  }
};
