import { IoMdAdd } from "react-icons/io";
import { Button } from "@nextui-org/react";

interface AddSocialBtnProps {
  onAdd: () => void;
  children?: React.ReactNode;
}

export const AddSocialBtn: React.FC<AddSocialBtnProps> = ({
  onAdd,
  children,
}) => {
  return (
    <div className="flex flex-col">
      {children}
      <Button
        onClick={onAdd}
        color="primary"
        variant="bordered"
        className="bg-light4 font-light rounded-lg border border-light2 w-[250px]"
        startContent={<IoMdAdd />}
      >
        Add social link
      </Button>
    </div>
  );
};


