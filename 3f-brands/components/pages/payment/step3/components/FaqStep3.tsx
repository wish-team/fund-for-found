"use client";

import { memo, useState } from "react";
import {
  Card,
  CardBody,
  Accordion,
  AccordionItem,
  Checkbox,
  Link,
} from "@nextui-org/react";
import { MdRemoveShoppingCart } from "react-icons/md";
import { FaSquare } from "react-icons/fa6";

interface FAQItem {
  title: string;
  content: string;
}

const FAQ_ITEMS: readonly FAQItem[] = [
  {
    title: "Is my contribution secure?",
    content: "Your contribution is a way to support an entrepreneur, but does not guarantee that you will receive a perk. There is a risk that, despite a creator's best effort, your reward may not be fulfilled. Therefore, 3f does not guarantee the reward.",
  },
  {
    title: "What's the difference between an individual and an organization profile?",
    content: "Organizations represent a brand or company, while individual profiles represent a person. Organization profiles can have multiple team members (individual profiles) who have access to edit it and make financial contributions in its name. If a contribution or expense is for a brand, it's important to use an organization profile so the correct billing information shows up on receipts and invoices.",
  },
  {
    title: "What are the features of automatic monthly support?",
    content: "By setting up automatic yearly support, you can save time and provide recurring support to your favourite creator instead of just a one-time contribution. You can choose the number of years and the amount yourself. At the beginning of each calendar year, the support will automatically be deducted from the account you specify. If you change your mind, you can cancel the yearly support authorization anytime via a link sent to your email or through your supporter dashboard. This method doesn't support crypto currency.",
  },
] as const;

interface FaqStep3Props {
  className?: string;
}

const FaqStep3 = memo(function FaqStep3({ className = "" }: FaqStep3Props) {
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <Card className={`mx-auto border rounded-xl shadow p-2 sm:p-6 ${className}`}>
      <CardBody>
        <div className="text-primary text-2xl border-b-2 rounded-xl pb-4 mb-4">
          <h4 className="text-center">Contribution summary</h4>
        </div>

        <div className="py-3">
          <h4 className="text-gray3">Payment currency</h4>
          <h6 className="bg-light3 p-2 rounded-lg mb-4 text-light1 text-sm">11 CAD – Canadian Dollar</h6>
          <h4 className="text-gray3">Payment amount</h4>
          <h6 className="bg-light3 p-2 rounded-lg mb-4 text-light1 text-sm">8.16 US dollars</h6>
        </div>

        <h5 className="font-semibold text-gray4 flex items-center">
          <FaSquare className="text-primary text-sm" aria-hidden="true" />
          <span className="text-xl ps-2">FAQ</span>
        </h5>

        <Accordion variant="bordered" className="mb-6">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem
              key={item.title}
              aria-label={item.title}
              title={item.title}
              className="text-gray4 text-sm font-light border hover:border-primary transition-all duration-300 rounded-lg shadow-shadow1 px-3 my-2"
            >
              {item.content}
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex items-center mt-4">
          <Checkbox 
            size="sm" 
            radius="full"
            isSelected={isAgreed}
            onValueChange={setIsAgreed}
          />
          <h4 className="text-sm text-gray4">
            I agree with the{" "}
            <Link href="/terms" className="text-primary hover:underline">
              terms of service
            </Link>{" "}
            of 3F.
          </h4>
        </div>
      </CardBody>
    </Card>
  );
});

export default FaqStep3;