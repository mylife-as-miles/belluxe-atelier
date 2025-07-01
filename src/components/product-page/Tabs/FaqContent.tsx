import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  question: string;
  answer: string;
};

const faqsData: FaqItem[] = [
  {
    question: "What type of movement does this watch have?",
    answer:
      "This watch features a Swiss automatic movement, providing precise timekeeping and a power reserve of approximately 42 hours.",
  },
  {
    question: "Is this watch water resistant?",
    answer:
      "Yes, this timepiece is water resistant up to 100 meters (330 feet), making it suitable for swimming and snorkeling.",
  },
  {
    question: "What materials are used in the construction?",
    answer:
      "The case is crafted from premium stainless steel with a sapphire crystal glass for maximum durability and scratch resistance.",
  },
  {
    question: "Does this watch come with a warranty?",
    answer:
      "Yes, all our watches come with a 2-year international warranty covering manufacturing defects.",
  },
  {
    question: "What are the shipping options and costs?",
    answer:
      "We offer free worldwide shipping on all orders over $500. Express shipping options are available for faster delivery.",
  },
  {
    question: "What is the return policy for watches?",
    answer:
      "We offer a 30-day return policy for unworn watches in original condition with all packaging and documentation.",
  },
];

const FaqContent = () => {
  return (
    <section>
      <h3 className="text-xl sm:text-2xl font-bold text-black mb-5 sm:mb-6">
        Frequently asked questions
      </h3>
      <Accordion type="single" collapsible>
        {faqsData.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx + 1}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FaqContent;