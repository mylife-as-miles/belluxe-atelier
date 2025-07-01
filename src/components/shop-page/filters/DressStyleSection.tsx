import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

type WatchStyle = {
  title: string;
  slug: string;
};

const watchStylesData: WatchStyle[] = [
  {
    title: "Sport",
    slug: "/shop",
  },
  {
    title: "Luxury",
    slug: "/shop",
  },
  {
    title: "Smart",
    slug: "/shop",
  },
  {
    title: "Classic",
    slug: "/shop",
  },
];

const DressStyleSection = () => {
  return (
    <Accordion type="single" collapsible defaultValue="filter-style">
      <AccordionItem value="filter-style" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Watch Style
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex flex-col text-black/60 space-y-0.5">
            {watchStylesData.map((wStyle, idx) => (
              <Link
                key={idx}
                href={wStyle.slug}
                className="flex items-center justify-between py-2"
              >
                {wStyle.title} <MdKeyboardArrowRight />
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DressStyleSection;