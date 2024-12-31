import React from "react";
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

interface FAQSectionProps {
  className?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ className }) => {
  const faqItems = [
    {
      title: "Is my contribution secure?",
      content: "Content for security information goes here.",
    },
    {
      title:
        "What's the difference between an individual and an organization profile?",
      content:
        "Content explaining the differences between profile types goes here.",
    },
    {
      title: "What are the features of automatic monthly support?",
      content:
        "Content describing automatic monthly support features goes here.",
    },
  ];

  return (
    <Card
      className={`max-w-md mx-auto border rounded-xl shadow p-6 ${className}`}
    >
      <CardBody>
        <div className="flex items-center gap-4 text-primary justify-center font-bold mb-4">
          <h4>Reward aren't guaranteed</h4>
          <MdRemoveShoppingCart className="w-5 h-5" />
        </div>

        <div className="bg-purple-50 p-4 mb-4 rounded-lg">
          <h4 className="text-gray-700 text-sm text-center text-gray4">
            Crowdfunding is not shopping!
          </h4>
        </div>

        <h5 className="font-semibold text-gray4 flex items-center">
          <span>
            <FaSquare className="text-primary text-sm" />
          </span>
          <span className="text-xl ps-2">FAQ</span>
        </h5>

        <Accordion variant="bordered" className="mb-6 ">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              aria-label={item.title}
              title={item.title}
              className="text-gray4 text-sm font-light border hover:border-primary transition-all duration-300 rounded-lg shadow-shadow1 px-3 my-2"
            >
              {item.content}
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex items-center mt-4">
          <Checkbox size="sm" radius="full" />
          <h4 className="text-sm text-gray4">
            I agree with the{" "}
            <Link href="#" className="text-primary hover:underline">
              terms of service
            </Link>{" "}
            of 3F.
          </h4>
        </div>
      </CardBody>
    </Card>
  );
};

export default FAQSection;
