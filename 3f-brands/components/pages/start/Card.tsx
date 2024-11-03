import Image from "next/image";
import cardImage from "@/app/images/card/businessCard.svg";
import Title from "@/components/shared/Title";
import { Button } from "@nextui-org/react";
import Links from "@/components/shared/Links";
import Link from "next/link";

const Card = () => {
  return (
    <section className="border mt-12 border-primary shadow-shadow1 rounded-2xl flex flex-col items-center h-[380px] w-[320px]">
      <div className="py-10">
        <Image
          src={cardImage}
          alt="Business Card"
          className="w-[88px] h-[88px]"
        />
      </div>
      <div className="px-8 flex flex-col items-center w-full text-justify">
        <Title
          title="Brand or Organization"
          desc="If your brand is established and you're looking for continuous support, get started now."
          fontWeight="font-light"
          fontSize="text-2xl"
          descSize="text-sm"
        />
        <Link href="/steps/1">
          <Button
            color="secondary"
            variant="solid"
            className="font-light my-4 px-28 bg-primary mb-1 text-white rounded-lg border border-light2"
          >
            Start
          </Button>
        </Link>

        <Links href="/about" text="Learn more" />
      </div>
    </section>
  );
};

export default Card;
