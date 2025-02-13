import React from "react";
import { AccordionItem, Button } from "@nextui-org/react";
import { FaTrashCan, FaPencil } from "react-icons/fa6";
import { AccordionItemType } from "../types/accordion";
import { useTranslation } from "react-i18next";

interface FAQItemProps {
  item: AccordionItemType;
  onEdit: (item: AccordionItemType) => void;
  onDelete: (id: string) => void;
  isAuthenticated: boolean;
}

export const FAQItem = React.memo(
  ({ item, onEdit, onDelete, isAuthenticated }: FAQItemProps) => {
    const { t } = useTranslation();

    return (
      <AccordionItem
        key={item.id}
        className="border rounded-lg shadow-shadow1 mb-2"
        aria-label={item.title}
        title={item.title}
      >
        <div>{item.content}</div>
        {isAuthenticated && (
          <div className="flex justify-between mt-2">
            <Button
              onPress={() => onEdit(item)}
              size="sm"
              startContent={<FaPencil />}
              className="border border-primary100 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
            >
              {t("translation:faq.editQuestion")}
            </Button>
            <Button
              startContent={<FaTrashCan />}
              variant="bordered"
              className="border border-primary100 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
              onPress={() => onDelete(item.id)}
              size="sm"
            >
              {t("translation:faq.deleteQuestion")}
            </Button>
          </div>
        )}
      </AccordionItem>
    );
  }
);

FAQItem.displayName = "FAQItem";
