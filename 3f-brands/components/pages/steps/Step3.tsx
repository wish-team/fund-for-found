import Title from "../../shared/Title";
import Image from "next/image";
import Step3Img from "../../../app/images/steps/brandStep3.svg"
import { useTranslation } from "react-i18next";

const Step3 = () => {
  const {t} = useTranslation();
  return (
    <section className="mt-12 flex flex-col items-center">
      <Title 
      title="Waiting to approve"
      titleKey="step3.title"
      fontWeight="font-light"
      />
      <Image src={Step3Img} className="max-w-[350px] py-8" alt="Waiting to approve" />
      <h4 className="text-gray3 font-medium text-2xl">{t("step3.descripton")}</h4>
      <p className="text-gray4 font-light text-sm pt-2">{t("step3.info")}</p>
    </section>
  )
}
export default Step3