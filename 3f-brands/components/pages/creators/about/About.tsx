
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
  } from "@nextui-org/react";
  import CreatorsTitle from "../title/CreatorsTitle";
  import aboutImg from "../../../../app/images/creators/AboutPlaceHolder.svg";
  import Image from "next/image";
  import Editor from "../../../shared/editor/Editor"; // Ensure this path is correct
  
  export default function App() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
    const initialData = {
      time: Date.now(),
      blocks: [
        {
          type: 'header',
          data: {
            text: 'Edit Your Summary',
            level: 2,
          },
        },
        {
          type: 'paragraph',
          data: {
            text: 'Introduce yourself, your team (if you have) and your background.',
          },
        },
        {
          type: 'header',
          data: {
            text: 'The Impact',
            level: 2,
          },
        },
        {
          type: 'list',
          data: {
            items: [
              'Share more about your brand and highlight how contributions can make a meaningful impact',
              'Explain why your brand is important to contributors and how it positively influences the world.',
              'Showcase your brand\'s proven success and past achievements, if applicable',
              'Help people connect with your brand\'s mission and build trust by sharing authentic stories and experiences',
            ],
          },
        },
        {
          type: 'header',
          data: {
            text: 'The Story',
            level: 2,
          },
        },
        {
          type: 'list',
          data: {
            items: [
              'Share the vision of your organization and the journey that led to its establishment',
            ],
          },
        },
      ],
    };
  
    const handleSave = (data) => {
      console.log("Saved Data:", data);
      onOpenChange(false); // Close the modal after saving
    };
  
    return (
      <>
        <div className="flex items-center mt-40">
          <CreatorsTitle title="About" />
          <Button onPress={onOpen}>edit</Button>
        </div>
        <div className="text-light1 content-container">
          <Image className="rounded-lg border bg-light3" src={aboutImg} alt="place holder" />
          <h2>Summary</h2>
          <p>Introduce yourself, your team (if you have) and your background.</p>
          <p>Briefly describe the long-term and short-term of your brand and why it's important to you.</p>
          <h2>The Impact</h2>
          <ul>
            <li>Share more about your brand and highlight how contributions can make a meaningful impact</li>
            <li>Explain why your brand is important to contributors and how it positively influences the world.</li>
            <li>Showcase your brand's proven success and past achievements, if applicable</li>
            <li>Help people connect with your brand's mission and build trust by sharing authentic stories and experiences</li>
          </ul>
          <h2>The Story</h2>
          <ul>
            <li>Share the vision of your organization and the journey that led to its establishment</li>
          </ul>
        </div>
        <Modal className="bg-white" isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Content
                </ModalHeader>
                <ModalBody>
                  <Editor initialData={initialData} onSave={handleSave} />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={handleSave}>
                    Save
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  