import React, { useState } from "react";
import SocialInput from "./SocialInput"; // Adjust the import path as needed
import FormStem2 from "./FormStem2"; // Adjust the import path as needed
import { Button } from "@nextui-org/react";
import { IoMdAdd } from "react-icons/io";

const AddSocialBtn: React.FC = () => {
  const [socialInputs, setSocialInputs] = useState<{ id: number }[]>([]);

  const addSocialInput = () => {
    setSocialInputs([...socialInputs, { id: Date.now() }]);
  };

  const removeSocialInput = (id: number) => {
    setSocialInputs(socialInputs.filter((input) => input.id !== id));
  };

  return (
    <div>
      <FormStem2>
        {socialInputs.map((input) => (
          <SocialInput
            key={input.id}
            onRemove={() => removeSocialInput(input.id)}
          />
        ))}
      </FormStem2>
      <Button
        onClick={addSocialInput}
        color="primary"
        variant="bordered"
        className="bg-light4 font-light rounded-lg border border-light2"
        startContent={<IoMdAdd />}
      >
        Add social link
      </Button>
    </div>
  );
};

export default AddSocialBtn;
