import React, { useState, useEffect, useRef } from "react";
import { FiEdit2 } from "react-icons/fi";

export interface EditableTextProps {
  value: string;
  placeholder?: string;
  onSave: (newValue: string) => void;
}

const EditableText: React.FC<EditableTextProps> = ({ value, placeholder, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    setIsEditing(false);
    onSave(editValue);
  };

  return (
    <div className="flex items-center">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => { if (e.key === "Enter") handleSave(); }}
          placeholder={placeholder}
          className="flex-grow px-1 bg-transparent border-b border-transparent focus:border-blue-500 outline-none"
        />
      ) : (
        <>
          <span className="flex-grow px-1">{value || placeholder}</span>
          <button onClick={() => setIsEditing(true)} className="ml-1 text-gray-500 hover:text-blue-500">
            <FiEdit2 size={16} />
          </button>
        </>
      )}
    </div>
  );
};

export default EditableText;
