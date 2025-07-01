import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

type Category = {
  title: string;
  slug: string;
};

const categoriesData: Category[] = [
  {
    title: "Sport Watches",
    slug: "/shop",
  },
  {
    title: "Dress Watches",
    slug: "/shop",
  },
  {
    title: "Smart Watches",
    slug: "/shop",
  },
  {
    title: "Chronographs",
    slug: "/shop",
  },
  {
    title: "Luxury Watches",
    slug: "/shop",
  },
];

const CategoriesSection = () => {
  return (
    <div className="flex flex-col space-y-0.5 text-black/60">
      {categoriesData.map((category, idx) => (
        <Link
          key={idx}
          href={category.slug}
          className="flex items-center justify-between py-2"
        >
          {category.title} <MdKeyboardArrowRight />
        </Link>
      ))}
    </div>
  );
};

export default CategoriesSection;