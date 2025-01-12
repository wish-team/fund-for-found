import Title from "../../shared/Title";
import Image from "next/image";
import Step4Img from "../../../app/images/steps/brandStep4.svg";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const Step4 = () => {
  const router = useRouter();
  const {t} = useTranslation();

 
  // This should be replaced with authentication context
  const userId = "1"; 

  const handleProfileNavigation = () => {
    router.push(`/creators/${userId}`);
  };

  return (
    <section className="mt-12 flex flex-col items-center">
      <Title title="Congratulation!" titleKey="step4.title" fontWeight="font-light" />
      <Image
        src={Step4Img}
        className="max-w-[350px] py-8"
        alt="Waiting to approve"
      />
      <h4 className="text-gray3 font-medium text-2xl">
        {t("step4.descripton")}
      </h4>
      <p className="text-gray4 font-light text-sm pt-2">
      {t("step4.info")}
      </p>
      <Button
        color="secondary"
        variant="bordered"
        onPress={handleProfileNavigation}
        className="text-white bg-primary text-sm px-6 mt-4 font-light rounded-lg border border-light2"
      >
        {t("step4.button")}
      </Button>
    </section>
  );
};

export default Step4;