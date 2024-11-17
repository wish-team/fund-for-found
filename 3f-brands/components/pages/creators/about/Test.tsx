import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import dynamic from 'next/dynamic';

const EditorJS = dynamic(() => import('@editorjs/editorjs'), { ssr: false });

const EditableComponent: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const editorRef = useRef<any>(null);

  const handler = () => setVisible(true);
  const closeHandler = () => setVisible(false);

  const saveContent = () => {
    // Save the content from the EditorJS editor
    console.log('Saved content:', editorContent);
    setVisible(false);
  };

  useEffect(() => {
    if (visible) {
      initEditor();
    }
  }, [visible]);

  const initEditor = () => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: 'editorjs',
        placeholder: 'Let\'s write an awesome story!',
        tools: {
          // Add the desired EditorJS tools here
        },
        onChange: (api, event) => {
          api.saver.save().then((outputData) => {
            setEditorContent(JSON.stringify(outputData));
          });
        },
      });
    }
  };

  return (
    <>
      <Button onClick={handler}>Edit</Button>
      <Modal
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <ModalHeader>
            Edit Content
        </ModalHeader>
        <ModalBody>
          <div id="editorjs" />
        </ModalBody>
        <ModalFooter>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          <Button auto onClick={saveContent}>
            Save
          </Button>
        </ModalFooter>
      </Modal>

      {/* Display the saved content */}
      {editorContent && <div dangerouslySetInnerHTML={{ __html: editorContent }} />}
    </>
  );
};

export default EditableComponent;