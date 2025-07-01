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
    slug: "/shop?category=sport-watches",
  },
  {
    title: "Dress Watches",
    slug: "/shop?category=dress-watches",
  },
  {
    title: "Smart Watches",
    slug: "/shop?category=smart-watches",
  },
  {
    title: "Chronographs",
    slug: "/shop?category=chronographs",
  },
  {
    title: "Luxury Watches",
    slug: "/shop?category=luxury-watches",
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