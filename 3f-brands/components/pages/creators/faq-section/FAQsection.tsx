import React from "react";
import {
  Accordion,
  AccordionItem as NextUIAccordionItem,
} from "@nextui-org/react";
import { Button, useDisclosure } from "@nextui-org/react";
import { FaPlus, FaTrashCan, FaPencil } from "react-icons/fa6";

import { useAccordionState } from "./hooks/useAccordionState";
import { EditModal } from "./components/EditModal";
import { AddQuestionModal } from "./components/AddQuestionModal";
import DeleteConfirmationModal from "../../../shared/DeleteConfirmationModal";
import CreatorsTitle from "../title/CreatorsTitle";
import { AccordionItemType } from "./types/accordion";
import { AuthWrapper } from "@/app/auth/callback/AuthWrapper";
import { AuthUser } from "@/app/hooks/useAuth";

const FAQ: React.FC = () => {
  const {
    accordionItems,
    selectedKeys,
    setSelectedKeys,
    addItem,
    updateItem,
    deleteItem,
  } = useAccordionState([
    {
      id: "initial-1",
      title: "Lorem ipsum dolor sit amet?",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ]);

  const editModal = useDisclosure();
  const addModal = useDisclosure();
  const deleteModal = useDisclosure();

  const [selectedItem, setSelectedItem] =
    React.useState<AccordionItemType | null>(null);
  const [itemToDelete, setItemToDelete] = React.useState<string | null>(null);

  const handleEdit = (item: AccordionItemType) => {
    setSelectedItem(item);
    editModal.onOpen();
  };

  const handleAddQuestion = () => {
    const newItem = addItem();
    setSelectedItem(newItem);
    addModal.onOpen();
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete);
      deleteModal.onClose();
      setItemToDelete(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    deleteModal.onOpen();
  };

  return (
    <AuthWrapper>
      {(user) => (
        <section className="flex flex-col mx-auto text-gray3 text-sm pb-8">
          <CreatorsTitle title="FAQ" />
          <Accordion
            variant="splitted"
            selectedKeys={selectedKeys}
            onSelectionChange={(keys) =>
              setSelectedKeys(new Set(Array.from(keys).map(String)))
            }
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
                  {user && (
                    <Button
                      onPress={() => handleEdit(item)}
                      size="sm"
                      startContent={<FaPencil />}
                      className="border border-primary100 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
                    >
                      Edit
                    </Button>
                  )}
                  {user && (
                    <Button
                      startContent={<FaTrashCan />}
                      variant="bordered"
                      className="border border-primary100 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
                      onPress={() => handleDeleteClick(item.id)}
                      size="sm"
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </NextUIAccordionItem>
            ))}
          </Accordion>
          {user && (
            <Button
              startContent={<FaPlus />}
              onPress={handleAddQuestion}
              className="mt-4 border border-light3 w-[180px] mx-auto rounded-lg text-gray4 text-sm hover:bg-primary50 hover:border-purple-500"
            >
              Add Question
            </Button>
          )}

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

          <DeleteConfirmationModal
            isOpen={deleteModal.isOpen}
            onClose={deleteModal.onClose}
            onConfirm={confirmDelete}
            title="Delete FAQ Item"
            message="Are you sure you want to delete this FAQ item? This action cannot be undone."
          />
        </section>
      )}
    </AuthWrapper>
  );
};

export default FAQ;