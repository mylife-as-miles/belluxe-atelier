import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

type FashionBagCategory = {
  title: string;
  slug: string;
};

const fashionBagCategoriesData: FashionBagCategory[] = [
  {
    title: "Tote Bags",
    slug: "/shop",
  },
  {
    title: "Shoulder Bags",
    slug: "/shop",
  },
  {
    title: "Crossbody Bags",
    slug: "/shop",
  },
  {
    title: "Clutches",
    slug: "/shop",
  },
  {
    title: "Backpacks",
    slug: "/shop",
  },
];

const DressStyleSection = () => {
  return (
    <Accordion type="single" collapsible defaultValue="filter-style">
      <AccordionItem value="filter-style" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Fashion Bag Category
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex flex-col text-black/60 space-y-0.5">
            {fashionBagCategoriesData.map((category, idx) => (
              <Link
                key={idx}
                href={category.slug}
                className="flex items-center justify-between py-2"
              >
                {category.title} <MdKeyboardArrowRight />
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DressStyleSection;