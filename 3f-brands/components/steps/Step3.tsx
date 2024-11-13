import Title from "../shared/Title";
import Image from "next/image";
import Step3Img from "../../app/images/steps/brandStep3.svg"

const Step3 = () => {
  return (
    <section className="mt-12 flex flex-col items-center">
      <Title 
      title="Waiting to approve"
      fontWeight="font-light"
      />
      <Image src={Step3Img} className="max-w-[350px] py-8" alt="Waiting to approve" />
      <h4 className="text-gray3 font-medium text-2xl">You will be notified as soon as it is approved</h4>
      <p className="text-gray4 font-light text-sm pt-2">Your information is under review and will be confirmed within 2 to 5 business days.</p>
    </section>
  )
}
export default Step3