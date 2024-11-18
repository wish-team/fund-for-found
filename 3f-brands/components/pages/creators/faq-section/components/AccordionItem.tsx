// src/components/pages/creators/FAQ/components/AccordionItem.tsx
import React from 'react';
import { AccordionItem as NextUIAccordionItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { FaTrashCan, FaPencil } from "react-icons/fa6";
import { AccordionItemType } from '../types/accordion';

interface AccordionItemProps {
  item: AccordionItemType;
  onEdit: (item: AccordionItemType) => void;
  onDelete: (id: string) => void;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ 
  item, 
  onEdit, 
  onDelete 
}) => {
  return (
    <NextUIAccordionItem
      key={item.id}
      title={item.title}
      aria-label={item.title}
    >
      <div>{item.content}</div>
      <div className="action-buttons">
        <Button
          onPress={() => onEdit(item)}
          size="sm"
          startContent={<FaPencil />}
          className="edit-button"
        >
          Edit
        </Button>
        <Button
          startContent={<FaTrashCan />}
          className="delete-button"
          onPress={() => onDelete(item.id)}
          size="sm"
        >
          Delete
        </Button>
      </div>
    </NextUIAccordionItem>
  );
};