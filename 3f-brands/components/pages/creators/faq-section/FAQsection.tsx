// src/components/pages/creators/FAQ/FAQSection.tsx
import React from "react";
import {
  Accordion,
  AccordionItem as NextUIAccordionItem,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FaPlus, FaTrashCan, FaPencil } from "react-icons/fa6";

import { EditModal } from "./components/EditModal";
import { AddQuestionModal } from "./components/AddQuestionModal";
import DeleteConfirmationModal from "../../../shared/DeleteConfirmationModal";
import CreatorsTitle from "../title/CreatorsTitle";
import { AccordionItemType } from "./types/accordion";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { useFAQStore } from "./store/faqStore";
import { useAuthStore } from "@/store/authStore";
import { useTranslation } from "react-i18next";

const FAQ: React.FC = () => {
  const { t, i18n } = useTranslation();
  const {
    accordionItems,
    selectedKeys,
    selectedItem,
    setSelectedItem,
    setSelectedKeys,
    addItem,
    updateItem,
    deleteItem,
    initializeFAQ,
  } = useFAQStore();

  const user = useAuthStore((state) => state.user);

  React.useEffect(() => {
    // Initialize with default items if needed
    if (accordionItems.length === 0) {
      initializeFAQ([
        {
          id: "initial-1",
          title: "Lorem ipsum dolor sit amet?",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
      ]);
    }
  }, []);

  const editModal = useDisclosure();
  const addModal = useDisclosure();
  const deleteModal = useDisclosure();
  const [itemToDelete, setItemToDelete] = React.useState<string | null>(null);

  const handleEdit = (item: AccordionItemType) => {
    setSelectedItem(item);
    editModal.onOpen();
  };

  const handleCloseEdit = () => {
    setSelectedItem(null);
    editModal.onClose();
  };

  const handleAddQuestion = () => {
    addModal.onOpen();
  };

  const handleCloseAdd = () => {
    setSelectedItem(null);
    addModal.onClose();
  };

  const handleAddSubmit = (data: FAQFormData) => {
    const newItem = addItem({ title: data.title, content: data.content });
    addModal.onClose();
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
      <section className="flex flex-col mx-auto text-gray3 text-sm pb-8">
        <CreatorsTitle title={t("translation:faq.title")} />
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
                    {t("translation:faq.editQuestion")}
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
                    {t("translation:faq.deleteQuestion")}
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
            {t("translation:faq.addQuestion")}
          </Button>
        )}

        <EditModal
          isOpen={editModal.isOpen}
          onOpenChange={handleCloseEdit}
          item={selectedItem}
          onSave={(update) => {
            if (selectedItem) {
              updateItem(selectedItem.id, update);
              handleCloseEdit();
            }
          }}
        />

        <AddQuestionModal
          isOpen={addModal.isOpen}
          onOpenChange={addModal.onClose}
          onSave={handleAddSubmit}
        />

        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.onClose}
          onConfirm={confirmDelete}
          title={t("translation:faq.modal.delete.title")}
          message={t("translation:faq.modal.delete.message")}
        />
      </section>
    </AuthWrapper>
  );
};

export default FAQ;
