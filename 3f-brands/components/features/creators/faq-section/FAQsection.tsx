import React from "react";
import { Accordion, Button, useDisclosure } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";
import { EditModal } from "./components/EditModal";
import { AddQuestionModal } from "./components/AddQuestionModal";
import DeleteConfirmationModal from "../../../shared/DeleteConfirmationModal";
import CreatorsTitle from "../title/CreatorsTitle";
import { FAQItem } from "./components/FAQItem";
import { AccordionItemType, FAQFormData } from "./types/accordion";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { useFAQStore } from "./store/faqStore";
import { useAuthStore } from "@/store/authStore";
import { useTranslation } from "react-i18next";

const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const {
    accordionItems,
    selectedKeys,
    selectedItem,
    isLoading,
    error,
    fetchFAQs,
    setSelectedItem,
    setSelectedKeys,
    addItem,
    updateItem,
    deleteItem,
  } = useFAQStore();

  const user = useAuthStore((state) => state.user);

  const editModal = useDisclosure();
  const addModal = useDisclosure();
  const deleteModal = useDisclosure();
  const [itemToDelete, setItemToDelete] = React.useState<string | null>(null);

  // Memoized handlers
  const handleEdit = React.useCallback(
    (item: AccordionItemType) => {
      setSelectedItem(item);
      editModal.onOpen();
    },
    [setSelectedItem, editModal]
  );

  const handleCloseEdit = React.useCallback(() => {
    setSelectedItem(null);
    editModal.onClose();
  }, [setSelectedItem, editModal]);

  const handleAddQuestion = React.useCallback(() => {
    addModal.onOpen();
  }, [addModal]);

  const handleDeleteClick = React.useCallback(
    (id: string) => {
      setItemToDelete(id);
      deleteModal.onOpen();
    },
    [deleteModal]
  );

  const handleAddSubmit = React.useCallback(
    (data: FAQFormData) => {
      addItem({ title: data.title, content: data.content });
      addModal.onClose();
    },
    [addItem, addModal]
  );

  const confirmDelete = React.useCallback(() => {
    if (itemToDelete) {
      deleteItem(itemToDelete);
      deleteModal.onClose();
      setItemToDelete(null);
    }
  }, [itemToDelete, deleteItem, deleteModal]);

  // Memoized selection change handler
  const handleSelectionChange = React.useCallback(
    (keys: any) => {
      setSelectedKeys(new Set(Array.from(keys).map(String)));
    },
    [setSelectedKeys]
  );

  // Fetch FAQs on mount
  React.useEffect(() => {
    fetchFAQs();
  }, [fetchFAQs]);

  // Memoized save handler for edit modal
  const handleEditSave = React.useCallback(
    (update: FAQFormData) => {
      if (selectedItem) {
        updateItem(selectedItem.id, update);
        handleCloseEdit();
      }
    },
    [selectedItem, updateItem, handleCloseEdit]
  );

  // Loading and error states
  if (isLoading) {
    return (
      // <AuthWrapper>
        <section className="flex flex-col mx-auto text-gray3 text-sm pb-8">
          <CreatorsTitle title={t("translation:faq.title")} />
          <div>Loading...</div>
        </section>
      // </AuthWrapper>
    );
  }

  if (error) {
    return (
      // <AuthWrapper>
        <section className="flex flex-col mx-auto text-gray3 text-sm pb-8">
          <CreatorsTitle title={t("translation:faq.title")} />
          <div className="text-red-500">{error}</div>
        </section>
      // </AuthWrapper>
    );
  }

  return (
    // <AuthWrapper>
      <section className="flex flex-col mx-auto text-gray3 text-sm pb-8">
        <CreatorsTitle title={t("translation:faq.title")} />
        <Accordion
          variant="splitted"
          selectedKeys={selectedKeys}
          onSelectionChange={handleSelectionChange}
        >
          {accordionItems.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              isAuthenticated={!!user}
            />
          ))}
        </Accordion>

        {/* {user && ( */}
          <Button
            startContent={<FaPlus />}
            onPress={handleAddQuestion}
            className="mt-4 border border-light3 w-[180px] mx-auto rounded-lg text-gray4 text-sm hover:bg-primary50 hover:border-purple-500"
          >
            {t("translation:faq.addQuestion")}
          </Button>
        {/* )} */}

        <EditModal
          isOpen={editModal.isOpen}
          onOpenChange={handleCloseEdit}
          item={selectedItem}
          onSave={handleEditSave}
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
    // </AuthWrapper>
  );
};

export default React.memo(FAQ);
