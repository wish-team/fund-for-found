import { Accordion, AccordionItem } from "@nextui-org/accordion";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { FaPlus, FaTrashCan, FaPencil , FaSquare } from "react-icons/fa6";
import CreatorsTitle from "../title/CreatorsTitle";

// Define types for accordion items
interface AccordionItemType {
  title: string;
  content: string;
}

const AccordionMenu: React.FC = () => {
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onOpenChange: onAddOpenChange,
  } = useDisclosure();

  const [accordionItems, setAccordionItems] = useState<AccordionItemType[]>([
    {
      title: "Lorem ipsum dolor sit amet?",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ]);

  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleEdit = (index: number) => {
    setSelectedItemIndex(index);
    setNewTitle(accordionItems[index].title);
    setNewContent(accordionItems[index].content);
    onEditOpen();
  };

  const handleSaveEdit = () => {
    if (selectedItemIndex !== null) {
      const updatedItems = [...accordionItems];
      updatedItems[selectedItemIndex] = {
        title: newTitle,
        content: newContent,
      };
      setAccordionItems(updatedItems);
      onEditOpenChange(false);
    }
  };

  const handleAddQuestion = () => {
    const newItem: AccordionItemType = { title: newTitle, content: newContent };
    setAccordionItems((prevItems) => [
      ...prevItems,
      newItem,
    ]);
    setOpenIndex(accordionItems.length); // Open the newly added item
    setNewTitle(""); // Reset input
    setNewContent(""); // Reset input
    onAddOpenChange(false);
  };

  const handleDelete = (index: number) => {
    const updatedItems = accordionItems.filter((_, i) => i !== index);
    setAccordionItems(updatedItems);
    if (openIndex === index) {
      setOpenIndex(null); // Close if the deleted item was open
    } else if (openIndex > index) {
      setOpenIndex(openIndex - 1); // Adjust open index if necessary
    }
  };

  return (
    <section className="w-[400px] lg:w-[935px] md:w-[715px] sm:w-[500px] flex flex-col mx-auto p-4 text-gray3 text-sm my-8">
      <CreatorsTitle title="FAQ" />
      <Accordion variant="splitted">
        {accordionItems.map((item, index) => (
          <AccordionItem
            key={index}
            className="border rounded-lg shadow-shadow1 mb-2"
            aria-label={item.title}
            title={item.title}
            isOpen={openIndex === index} // Control open state
            onOpenChange={() => setOpenIndex(openIndex === index ? null : index)} // Toggle open state
          >
            <div>{item.content}</div>
            <div className="flex justify-between mt-2">
              <Button
                onPress={() => handleEdit(index)}
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
                onPress={() => handleDelete(index)}
                size="sm"
              >
                Delete
              </Button>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
      <Button
        startContent={<FaPlus />}
        onPress={onAddOpen}
        className="mt-4 border border-light3 w-[180px] mx-auto rounded-lg text-gray4 text-sm hover:bg-primary50 hover:border-purple-500"
      >
        Add Question
      </Button>

      {/* Edit Modal */}
      <Modal
        backdrop="blur"
        className="bg-white border shadow-shadow1 p-2 rounded-lg max-w-[400px] sm:max-w-[500px] md:max-w-[715px] lg:max-w-[935px] w-full"
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-gray3">
                Edit Question
              </ModalHeader>
              <ModalBody>
                <Input
                  placeholder="Question"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="mt-4 shadow-shadow1 border border-light3 rounded-lg text-sm text-gray3 font-extralight hover:border-purple-500 focus:border-purple-500"
                />
                <Input
                  placeholder="Answer"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="mt-4 shadow-shadow1 border border-light3 rounded-lg text-sm text-gray3 font-extralight hover:border-purple-500 focus:border-purple-500"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  className="text-gray4 text-sm border border-light3 rounded-lg hover:bg-primary50 hover:border-purple-500"
                  variant="light"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  className="text-white text-sm rounded-lg hover:bg-primary400"
                  onPress={() => {
                    handleSaveEdit();
                    onClose(); // Close the modal
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Modal for adding new question */}
      <Modal
        backdrop="blur"
        className="bg-white border shadow-shadow1 p-2 rounded-lg max-w-[400px] sm:max-w-[500px] md:max-w-[715px] lg:max-w-[935px] w-full"
        isOpen={isAddOpen}
        onOpenChange={onAddOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-gray3">
                Add New Question
              </ModalHeader>
              <ModalBody>
                <Input
                  placeholder="Question"
                  value={newTitle}
                  className="mt-4 shadow-shadow1 border border-light3 rounded-lg text-sm text-gray3 font-extralight hover:border-purple-500 focus:border-purple-500"
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <Input
                  placeholder="Answer"
                  value={newContent}
                  className="mt-4 shadow-shadow1 border border-light3 rounded-lg text-sm text-gray3 font-extralight hover:border-purple-500 focus:border-purple-500"
                  onChange={(e) => setNewContent(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  className="text-gray4 text-sm border border-light3 rounded-lg hover:bg-primary50 hover:border-purple-500"
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  className="text-white text-sm rounded-lg hover:bg-primary400"
                  color="primary"
                  onPress={() => {
                    handleAddQuestion();
                    onClose(); // Close the modal
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};

export default AccordionMenu;
