import Title from "../shared/Title";
import Image from "next/image";
import Step4Img from "../../app/images/steps/brandStep4.svg"
import { Button } from "@nextui-org/react";

const Step4 = () => {
  return (
    <section className="mt-12 flex flex-col items-center">
      <Title 
      title="Congratulation!"
      fontWeight="font-light"
      />
      <Image src={Step4Img} className="max-w-[350px] py-8" alt="Waiting to approve" />
      <h4 className="text-gray3 font-medium text-2xl">Your Creative Starter has been approved by our experts!</h4>
      <p className="text-gray4 font-light text-sm pt-2">Welcome aboard! Let's dive in and get started</p>
      <Button
        color="secondary"
        variant="bordered"
        className="text-white bg-primary text-sm px-6 mt-4 font-light rounded-lg border border-light2"
      >
        Go to my profile
      </Button>
    </section>
  )
}
export default Step4