// src/components/pages/creators/FAQ/FAQ.tsx
import React from 'react';
import { 
  Accordion, 
  AccordionItem as NextUIAccordionItem 
} from "@nextui-org/react";
import { 
  Button, 
  useDisclosure 
} from "@nextui-org/react";
import { FaPlus, FaTrashCan, FaPencil } from "react-icons/fa6";

import { useAccordionState } from './hooks/useAccordionState';
import { EditModal } from './components/EditModal';
import { AddQuestionModal } from './components/AddQuestionModal';
import CreatorsTitle from "../title/CreatorsTitle";
import { AccordionItemType } from './types/accordion';

const FAQ: React.FC = () => {
  const { 
    accordionItems, 
    selectedKeys, 
    setSelectedKeys, 
    addItem, 
    updateItem, 
    deleteItem 
  } = useAccordionState([
    {
      id: 'initial-1',
      title: "Lorem ipsum dolor sit amet?",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
  ]);

  const editModal = useDisclosure();
  const addModal = useDisclosure();

  const [selectedItem, setSelectedItem] = React.useState<AccordionItemType | null>(null);

  const handleEdit = (item: AccordionItemType) => {
    setSelectedItem(item);
    editModal.onOpen();
  };

  const handleAddQuestion = () => {
    const newItem = addItem();
    setSelectedItem(newItem);
    addModal.onOpen();
  };

  return (
    <section className="w-[400px] lg:w-[935px] md:w-[715px] sm:w-[500px] flex flex-col mx-auto p-4 text-gray3 text-sm my-8">
      <CreatorsTitle title="FAQ" />
      <Accordion 
      variant="splitted" 
      selectedKeys={selectedKeys}
      onSelectionChange={(keys) => setSelectedKeys(new Set(Array.from(keys).map(String)))}
    >
        {accordionItems.map((item) => (
          <NextUIAccordionItem
            key={item.id}
            className="border rounded-lg shadow-shadow1 mb-2"
            aria-label={item.title}
            title={item.title}
          >
            <div>{item.content}</div>
            <div className="flex justify-between mt-2">
              <Button
                onPress={() => handleEdit(item)}
                size="sm"
                startContent={<FaPencil />}
                className="border border-primary100 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
              >
                Edit
              </Button>
              <Button
                startContent={<FaTrashCan />}
                variant="bordered"
                className="border border-primary100 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
                onPress={() => deleteItem(item.id)}
                size="sm"
              >
                Delete
              </Button>
            </div>
          </NextUIAccordionItem>
        ))}
      </Accordion>

      <Button
        startContent={<FaPlus />}
        onPress={handleAddQuestion}
        className="mt-4 border border-light3 w-[180px] mx-auto rounded-lg text-gray4 text-sm hover:bg-primary50 hover:border-purple-500"
      >
        Add Question
      </Button>

      {selectedItem && (
        <>
          <EditModal
            isOpen={editModal.isOpen}
            onOpenChange={editModal.onOpenChange}
            item={selectedItem}
            onSave={(update) => updateItem(selectedItem.id, update)}
          />
          <AddQuestionModal
            isOpen={addModal.isOpen}
            onOpenChange={addModal.onOpenChange}
            onSave={(update) => updateItem(selectedItem.id, update)}
          />
        </>
      )}
    </section>
  );
};

export default FAQ;