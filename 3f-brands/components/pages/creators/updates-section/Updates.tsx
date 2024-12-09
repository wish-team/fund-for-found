import React from "react";
import CreatorsTitle from "../title/CreatorsTitle";
import { Button } from "@nextui-org/react";
import { BsDiscord } from "react-icons/bs";
import sampleImg from "@/app/images/logo.svg";
import Image from "next/image";

// Define the prop types
interface UpdatesProps {
  user?: any; // You can replace 'any' with a more specific type if available
}

const Updates: React.FC<UpdatesProps> = ({ user }) => {
  return (
    <section className="mb-6 mt-3">
      <CreatorsTitle title="Updates" />
      <div className="p-8 border shadow-shadow1 rounded-lg hover:border-purple-500 transition-all">
        <div className="flex items-center gap-4 justify-between">
          <Image
            className="border-4 border-primary rounded-lg w-16 h-16"
            src={sampleImg}
            alt="profile image"
          />
          <div className="flex justify-start flex-1 gap-1 text-gray2">
            <h6 className="text-justify">Amirhossein Shirani <span className="font-thin">published a new update on </span> <strong>Discord</strong></h6>
          </div>
          <div className="flex justify-between">
            <span className="font-thin text-primary300 text-base">10 july 2024</span>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray2 text-justify font-thin">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.{" "}
          </p>
          <Button className="bg-primary100 border border-primary200 text-primary text-sm rounded-lg mt-4" startContent={<BsDiscord />}>Discord</Button>
        </div>
      </div>
    </section>
  );
};

export default Updates;