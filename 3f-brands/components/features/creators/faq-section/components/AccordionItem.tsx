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
      className="border rounded-lg shadow-shadow1 mb-2"
    >
      <div>{item.content}</div>
      <div className="flex justify-between mt-2">
        <Button
          onPress={() => onEdit(item)}
          size="sm"
          startContent={<FaPencil />}
          className="border border-primary100 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
        >
          Edit
        </Button>
        <Button
          startContent={<FaTrashCan />}
          className="border border-primary100 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
          onPress={() => onDelete(item.id)}
          size="sm"
        >
          Delete
        </Button>
      </div>
    </NextUIAccordionItem>
  );
};