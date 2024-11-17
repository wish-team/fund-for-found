import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from "@nextui-org/react";
import CreatorsTitle from "../title/CreatorsTitle";
import aboutImg from "../../../../app/images/creators/AboutPlaceHolder.svg";
import Image from "next/image";
import Editor from "./Editor";

const About = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editorData, setEditorData] = useState({
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
  });

  const handleSave = (data) => {
    setEditorData(data);
    onClose();
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
        <p>{editorData.blocks.find(block => block.type === 'paragraph')?.data.text}</p>
        <h2>The Impact</h2>
        <ul>
          {editorData.blocks.find(block => block.type === 'list')?.data.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <h2>The Story</h2>
        <ul>
          {editorData.blocks.find(block => block.type === 'list', 1)?.data.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <Modal className="bg-white" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Edit Content
          </ModalHeader>
          <ModalBody>
            <Editor initialData={editorData} onSave={handleSave} />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default About;