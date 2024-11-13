import React, { useState } from "react";
import SocialInput from "./SocialInput";
import FormStem2 from "./FormStem2";
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
    <FormStem2>
      <div className="flex flex-col">
        {socialInputs.map((input) => (
          <SocialInput
            key={input.id}
            onRemove={() => removeSocialInput(input.id)}
          />
        ))}
        <Button
          onClick={addSocialInput}
          color="primary"
          variant="bordered"
          className="bg-light4 font-light rounded-lg border border-light2 w-[250px]"
          startContent={<IoMdAdd />}
        >
          Add social link
        </Button>
      </div>
    </FormStem2>
  );
};

export default AddSocialBtn;
