import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

type JewelryCategory = {
  title: string;
  slug: string;
};

const jewelryCategoriesData: JewelryCategory[] = [
  {
    title: "Earrings",
    slug: "/shop",
  },
  {
    title: "Necklaces",
    slug: "/shop",
  },
  {
    title: "Rings",
    slug: "/shop",
  },
  {
    title: "Bracelets",
    slug: "/shop",
  },
  {
    title: "Watches",
    slug: "/shop",
  },
  {
    title: "Anklets",
    slug: "/shop",
  },
  {
    title: "Brooches & Pins",
    slug: "/shop",
  },
  {
    title: "Body Jewelry",
    slug: "/shop",
  },
  {
    title: "Jewelry Sets",
    slug: "/shop",
  },
];

const DressStyleSection = () => {
  return (
    <Accordion type="single" collapsible defaultValue="filter-style">
      <AccordionItem value="filter-style" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Jewelry Category
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex flex-col text-black/60 space-y-0.5">
            {jewelryCategoriesData.map((category, idx) => (
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