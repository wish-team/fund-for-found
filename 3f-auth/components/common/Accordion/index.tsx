import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@radix-ui/react-accordion'

interface AccordionItem {
  id: string
  question: string
  answer: string
}

const AccordionComp = ({ items }: { items: AccordionItem[] }) => {
  return (
    <Accordion type="multiple">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="flex items-center justify-between px-4 py-3 font-semibold text-gray-800">
            <span>{item.question}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 13.586V10.5l-6-6L6 10.5v3.086l6 6 6-6z" />
            </svg>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3 text-gray-700">
            <p>{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default AccordionComp
