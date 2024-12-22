"use client";

import Image from "next/image";
import cardImage from "@/app/images/card/businessCard.svg";
import Title from "@/components/shared/Title";
import { Button } from "@nextui-org/react";
import Links from "@/components/shared/Links";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

const Card = () => {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleStartClick = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        // User is authenticated, navigate to steps
        router.push("/steps/1");
      } else {
        // User is not authenticated, redirect to login
        router.push("http://localhost:3000/login");
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      // In case of error, redirect to login as a fallback
      router.push("/login");
    }
  };

  return (
    <section className="border my-8 border-primary shadow-shadow1 rounded-2xl flex flex-col items-center h-[380px] w-[320px]">
      <div className="py-8">
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
          fontSize="text-2xl"
          descSize="text-sm"
          paddingTop="p-0"
        />
        <Button
          color="secondary"
          variant="solid"
          onClick={handleStartClick}
          className="font-light my-4 px-28 bg-primary mb-1 text-white rounded-lg border border-light2"
        >
          Start
        </Button>

        <Links href="/about" text="Learn more" />
      </div>
    </section>
  );
};

export default Card;
